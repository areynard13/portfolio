import Marquee from '../../components/Marquee';
import useReveal from '../../hooks/useReveal';
import { education, marqueeItems } from '../../data/education';
import './Education.css';

const Education = () => {
  const ref = useReveal();

  return (
    <section className="edu" id="education" ref={ref} aria-labelledby="edu-title">
      <Marquee items={marqueeItems} />

      <div className="edu-inner">
        <header className="edu-header reveal">
          <span className="edu-index">01 / Education</span>
          <h2 id="edu-title">
            Where I
            <br />
            <em>learn.</em>
          </h2>
        </header>

        <ul className="edu-list">
          {education.map((item, i) => (
            <li className="edu-item reveal" style={{ '--d': `${i * 90}ms` }} key={item.title}>
              <article className="edu-row">
                <span className="edu-years">{item.years}</span>

                <div className="edu-main">
                  <h3>{item.title}</h3>
                  <p className="edu-school">{item.school}</p>
                </div>

                <div className="edu-side">
                  <p>{item.text}</p>
                  <ul className="edu-tags">
                    {item.tags.map(tag => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Education;
