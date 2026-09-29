import useReveal from '../../hooks/useReveal';
import { experience } from '../../data/experience';
import './Experience.css';

const Experience = () => {
  const ref = useReveal();

  return (
    <section className="exp" id="experience" ref={ref} aria-labelledby="exp-title">
      <div className="exp-inner">
        <header className="exp-header reveal">
          <div>
            <span className="exp-index">02 / Experience</span>
            <h2 id="exp-title">
              Hands-on
              <br />
              <em>experience.</em>
            </h2>
          </div>
          <span className="exp-count" aria-label={`${experience.length} internships`}>
            {String(experience.length).padStart(2, '0')}
            <small>internships</small>
          </span>
        </header>

        <ol className="exp-timeline">
          {experience.map((item, i) => (
            <li className="exp-item reveal" style={{ '--d': `${i * 90}ms` }} key={item.company + item.period}>
              <span className="exp-dot" aria-hidden="true" />

              <article className="exp-card">
                <div className="exp-top">
                  <span className="exp-period">{item.period}</span>
                  {item.current && (
                    <span className="exp-badge">
                      <i aria-hidden="true" />
                      Current
                    </span>
                  )}
                </div>

                <h3>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.company}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  ) : (
                    item.company
                  )}
                </h3>
                <p className="exp-role">
                  {item.role}
                  {item.location && <span> · {item.location}</span>}
                </p>

                <ul className="exp-highlights">
                  {item.highlights.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <ul className="exp-tags">
                  {item.tags.map(tag => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;