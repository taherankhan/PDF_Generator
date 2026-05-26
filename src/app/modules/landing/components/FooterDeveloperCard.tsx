import { FC } from 'react';
import { DEVELOPER, STATS } from '../landingData';
import { GitHubProfile } from '../hooks/useGitHubProfile';

type Props = {
  profile: GitHubProfile;
  loading: boolean;
  displayName: string;
};

const FooterDeveloperCard: FC<Props> = ({ profile, loading, displayName }) => (
  <aside className="lp-footer-dev-card lp-footer-panel" aria-label="Developer">
    <div className="lp-footer-panel-corner lp-footer-panel-corner--tl" aria-hidden="true" />
    <div className="lp-footer-panel-corner lp-footer-panel-corner--br" aria-hidden="true" />

    <div className="lp-dev-hud">
      <span className="lp-dev-hud-tag">// DEV.NODE</span>
      <div className="lp-dev-hud-right">
        <span className="lp-dev-status">
          <span className="lp-dev-status-dot" aria-hidden="true" />
          ONLINE
        </span>
        <span className="lp-dev-badge">Open Source</span>
      </div>
    </div>

    <div className="lp-dev-body">
      <div className="lp-dev-visual">
        <div className={`lp-dev-avatar-ring${loading ? ' is-loading' : ''}`}>
          <div className="lp-dev-avatar-orbit" aria-hidden="true" />
          <img
            src={profile.avatarUrl}
            alt=""
            className="lp-dev-avatar"
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
          />
        </div>

        <dl className="lp-dev-metrics">
          <div className="lp-dev-metric">
            <dt>Role</dt>
            <dd>{DEVELOPER.role.split(' ')[0]}</dd>
          </div>
          <div className="lp-dev-metric">
            <dt>Stack</dt>
            <dd>{DEVELOPER.stack.length} libs</dd>
          </div>
          <div className="lp-dev-metric">
            <dt>License</dt>
            <dd>MIT</dd>
          </div>
        </dl>
      </div>

      <div className="lp-dev-info">
        <div className="lp-dev-identity">
          <h3 className="lp-dev-name">{displayName}</h3>
          <p className="lp-dev-handle">@{profile.login} · {DEVELOPER.role}</p>
          {profile.bio && <p className="lp-dev-bio">{profile.bio}</p>}
        </div>

        <div className="lp-dev-terminal" aria-label="Project stats">
          <div className="lp-dev-terminal-bar">
            <span className="lp-dev-terminal-dot lp-dev-terminal-dot--red" aria-hidden="true" />
            <span className="lp-dev-terminal-dot lp-dev-terminal-dot--amber" aria-hidden="true" />
            <span className="lp-dev-terminal-dot lp-dev-terminal-dot--green" aria-hidden="true" />
            <span className="lp-dev-terminal-title">project.manifest</span>
          </div>
          <div className="lp-dev-terminal-body">
            {STATS.map((stat) => (
              <div key={stat.label} className="lp-dev-terminal-line">
                <span className="lp-dev-terminal-key">{stat.label.toLowerCase().replace(/\s+/g, '_')}</span>
                <span className="lp-dev-terminal-eq">=</span>
                <span className="lp-dev-terminal-val">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-dev-modules" aria-label="Tech stack">
          {DEVELOPER.stack.map((tech, i) => (
            <div key={tech} className="lp-dev-module">
              <span className="lp-dev-module-id">{String(i + 1).padStart(2, '0')}</span>
              <span className="lp-dev-module-name">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="lp-dev-actions">
      <a
        href={profile.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="lp-dev-btn lp-dev-btn--primary"
      >
        <i className="bi bi-github" aria-hidden="true" />
        GitHub Profile
      </a>
      <a
        href={DEVELOPER.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="lp-dev-btn lp-dev-btn--ghost"
      >
        <i className="bi bi-code-slash" aria-hidden="true" />
        View Source
      </a>
    </div>
  </aside>
);

export default FooterDeveloperCard;
