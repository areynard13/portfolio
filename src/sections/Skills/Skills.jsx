import { useState } from 'react';
import FolderFloat from '../../components/FolderFloat';
import useReveal from '../../hooks/useReveal';
import { skills } from '../../data/skills';
import './Skills.css';

// hover on desktop, tap on touch screens
const detectTrigger = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ? 'hover'
    : 'click';

const Skills = () => {
  const ref = useReveal();
  const [trigger] = useState(detectTrigger);

  return (
    <section className="skills" id="skills" ref={ref} aria-labelledby="skills-title">
      <div className="skills-inner">
        <header className="skills-header reveal">
          <div>
            <span className="skills-index">04 / Skills</span>
            <h2 id="skills-title">
              My
              <br />
              <em>toolbox.</em>
            </h2>
          </div>
          <span className="skills-hint">
            {trigger === 'hover' ? 'Hover a folder · drag the pills' : 'Tap a folder'}
          </span>
        </header>

        <ul className="skills-grid">
          {skills.map((group, i) => (
            <li className="skill reveal" style={{ '--d': `${i * 90}ms` }} key={group.id}>
              <div className="skill-stage">
                <FolderFloat
                  items={group.items}
                  label={group.title}
                  sublabel={`${group.items.length} skills`}
                  trigger={trigger}
                  closeOnSelect={false}
                  physics
                  drift={0.5}
                  folderColor="color-mix(in srgb, var(--brand) 62%, #000)"
                  frontColor="var(--brand)"
                  paperColor="#ffffff"
                  itemColor="#ffffff"
                  itemTextColor="#18181b"
                  labelColor="#ffffff"
                  width={190}
                  height={140}
                  spread={120}
                  lift={22}
                />
              </div>

              <h3>{group.title}</h3>
              <p className="skill-glance">
                {group.items.slice(0, 3).join(' · ')}
                {group.items.length > 3 && <span> +{group.items.length - 3}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
