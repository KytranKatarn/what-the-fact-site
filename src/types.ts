export interface PipelineStep {
  number: string;
  id: string;
  name: string;
  fullName: string;
  description: string;
  iconType: 'ink' | 'bias' | 'verify' | 'draft' | 'publish';
}

export interface Outlet {
  name: string;
  positionPercent: number;
  category: 'Far Left' | 'Center Left' | 'Center' | 'Center Right' | 'Far Right';
  isGold?: boolean;
  isVerifiedCenter?: boolean;
  bottomOffset?: string;
  description: string;
}

export interface Agent {
  acronym: string;
  fullName: string;
  role: string;
  isDirector?: boolean;
  description: string;
  tags: string[];
  avatarClass: string;
  initials: string;
}

export interface GeoArticle {
  id: number;
  title: string;
  lat: number | null;
  lng: number | null;
  province_code: string | null;
  source_name: string;
  bias_band: string | null;
  ai_analyzed: boolean;
}

export interface ProvinceCount {
  count: number;
  band: string;
  avg_score: number;
}

export interface GeoArticlesResponse {
  ok: boolean;
  province_counts?: Record<string, ProvinceCount>;
  articles: GeoArticle[];
}
