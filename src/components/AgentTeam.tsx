import React from 'react';
import { AGENTS } from '../data/content';

export const AgentTeam: React.FC = () => {
  return (
    <section className="section agent-team" id="team" aria-labelledby="team-title">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-label">The AI Team</span>
          <h2 className="section-title" id="team-title">Meet F.A.C.T. and the Crew</h2>
          <p className="section-subtitle">Six specialized agents. Every decision logged. Every action auditable.</p>
        </div>

        <div className="agent-grid" role="list" aria-label="AI agent team members">
          {AGENTS.map((agent) => (
            <article 
              key={agent.acronym}
              className={`agent-card ${agent.isDirector ? 'agent-card--director' : ''} is-visible`}
              role="listitem"
            >
              <div className="agent-card-top">
                <div className={`agent-avatar ${agent.avatarClass}`} aria-hidden="true">
                  <span className="avatar-initials">{agent.initials}</span>
                </div>
                <div className="agent-meta">
                  <span className={`agent-role-badge ${!agent.isDirector ? 'agent-role-badge--staff' : ''}`}>
                    {agent.role}
                  </span>
                  <h3 className="agent-acronym">{agent.acronym}</h3>
                </div>
              </div>
              <p className="agent-fullname">{agent.fullName}</p>
              <p className="agent-desc">{agent.description}</p>
              <div className="agent-tags" aria-label="Agent capabilities">
                {agent.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
