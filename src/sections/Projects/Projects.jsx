import SpotlightCard from '../../components/SpotlightCard';
import useReveal from '../../hooks/useReveal';
import { projects, GITHUB_PROFILE } from '../../data/projects';
import './Projects.css';

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M4 7V5a4 4 0 1 1 8 0v2h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
  </svg>
);

const Projects = () => {
  const ref = useReveal();

  return (
    <section className="proj" id="projects" ref={ref} aria-labelledby="proj-title">
      <div className="proj-inner">
        <header className="proj-header reveal">
          <div>
            <span className="proj-index">03 / Projects</span>
            <h2 id="proj-title">
              Selected
              <br />
              <em>projects.</em>
            </h2>
          </div>
          <a className="proj-all" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
            All on GitHub <span aria-hidden="true">↗</span>
          </a>
        </header>

        <ul className="proj-grid">
          {projects.map((p, i) => (
            <li className="proj-item reveal" style={{ '--d': `${(i % 2) * 90}ms` }} key={p.id}>
              <SpotlightCard className="proj-card" spotlightColor="rgba(var(--brand-rgb), 0.5)">
                <div className="proj-top">
                  <span className="proj-status" data-status={p.status === 'Finished' ? 'done' : 'wip'}>
                    <i aria-hidden="true" />
                    {p.status}
                  </span>
                  {p.lang && (
                    <span className="proj-lang">
                      <i style={{ background: p.langColor }} aria-hidden="true" />
                      {p.lang}
                    </span>
                  )}
                </div>

                <h3 className="proj-name">
                  <span>{p.org} /</span> {p.repo}
                </h3>

                <p className="proj-desc">{p.desc}</p>

                <ul className="proj-tags">
                  {p.tags.map(tag => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                {p.stack.length > 0 && (
                  <p className="proj-stack">
                    <b>Stack</b> {p.stack.join(' · ')}
                  </p>
                )}

                <footer className="proj-footer">
                  <span className="proj-license">{p.license}</span>
                  {p.isPrivate ? (
                    <span className="proj-private">
                      <LockIcon /> Private repository
                    </span>
                  ) : (
                    <a
                      className="proj-link"
                      href={`https://github.com/${p.org}/${p.repo}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on GitHub <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </footer>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
