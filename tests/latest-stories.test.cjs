const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createRequire} = require('node:module');
const root = process.env.WTF_PROJECT_ROOT || path.resolve(__dirname, '..');
const req = createRequire(path.join(root, 'package.json'));
const ts = req('typescript');
const React = req('react');
const render = req('react-dom/server').renderToStaticMarkup;
function load({stories, fetchImpl} = {}) {
  const effects = [], updates = [], timers = [];
  const mock = {...React,
    useState(initial) {
      let value = initial;
      if (stories && initial === 'loading') value = 'success';
      if (stories && Array.isArray(initial)) value = stories;
      return [value, next => updates.push(next)];
    },
    useRef: value => ({current:value}),
    useMemo: fn => fn(),
    useCallback: fn => fn,
    useEffect: fn => effects.push(fn),
  };
  const source = fs.readFileSync(path.join(root, 'src/components/LatestStories.tsx'), 'utf8')
    + '\nexport { normalizeArticle, formatBiasBand };';
  const js = ts.transpileModule(source, {compilerOptions:{
    module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.React,
    esModuleInterop:true, target:ts.ScriptTarget.ES2022
  }}).outputText;
  const module = {exports:{}};
  vm.runInNewContext(js, {module,exports:module.exports,
    require: name => name === 'react' ? mock : req(name),
    AbortController, DOMException, fetch:fetchImpl,
    window:{setTimeout:fn => (timers.push(fn), timers.length),clearTimeout(){}}
  });
  return {...module.exports, effects, updates, timers};
}
test('malformed/null feed fields cannot crash normalization or forge analyzed state', () => {
  const m = load();
  for (const id of [0,-1,NaN,Infinity,'1',1.5,Number.MAX_SAFE_INTEGER+1]) {
    assert.equal(m.normalizeArticle({id,title:'Story'}),null);
  }
  assert.equal(m.normalizeArticle(null),null);
  assert.equal(m.normalizeArticle({id:1,title:{}}),null);
  const a = m.normalizeArticle({id:1,title:' Story ',province_code:null,
    bias_band:{},source_name:[],ai_analyzed:'true',lat:Infinity,lng:null});
  assert.equal(a.source_name,'Canadian Source');
  assert.equal(a.province_code,null);
  assert.equal(a.bias_band,null);
  assert.equal(a.ai_analyzed,false);
  assert.equal(a.lat,null);
  assert.equal(m.formatBiasBand('center-left'),'Center Left');
  assert.equal(m.formatBiasBand('center_right'),'Center Right');
});
test('actual card renderer labels pending bias and escapes feed text', () => {
  const m = load({stories:[{id:1,title:'<img src=x onerror=alert(1)>',
    province_code:null,source_name:'Source',bias_band:'center',ai_analyzed:false}]});
  const html = render(React.createElement(m.LatestStories));
  assert.match(html,/Bias pending/);
  assert.match(html,/Analysis Pending/);
  assert.match(html,/&lt;img/);
  assert.doesNotMatch(html,/<img src=x/);
  assert.match(html,/https:\/\/what-the-fact.com\/article\/1/);
});
test('a hung request reaches a retryable timeout error', async () => {
  const m = load({fetchImpl:(_url,{signal}) => new Promise((_resolve,reject) =>
    signal.addEventListener('abort',()=>reject(new DOMException('aborted','AbortError'))))});
  m.LatestStories();
  const cleanup = m.effects[0]();
  assert.equal(m.timers.length,1);
  m.timers[0]();
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(m.updates.includes('error'));
  assert.ok(m.updates.some(x=>typeof x==='string' && /timed out/i.test(x)));
  cleanup();
});

