import DotField from '../../components/DotField';
import TechText from '../../components/TechText';
import { contact } from '../../data/contact';
import { navLinks } from '../../data/nav';
import './Hero.css';

const Hero = () => (
  <section className="hero" id="home">
    <DotField
      dotRadius={1.6}
      dotSpacing={14}
      bulgeStrength={80}
      glowRadius={50}
      sparkle={true}
      waveAmplitude={0}
      cursorRadius={500}
      cursorForce={0.1}
      bulgeOnly
      gradientFrom="#A855F7"
      gradientTo="#B497CF"
      glowColor="#120F17"
    />

    {/* ---------- Top bar ---------- */}
    <nav className="hero-nav hero-anim" aria-label="Main navigation">
      <a href="#home" className="hero-logo">
        AR<span>.</span>
      </a>
      <ul>
        {navLinks.map((link, i) => (
          <li key={link.href}>
            <a href={link.href}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    {/* ---------- Center ---------- */}
    <div className="hero-content">
      <div className="hero-title">
        <TechText
          text="Adrien Reynard"
          fontWeight={600}
          fontSize={150}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          fontFamily=""
          color="#000"
          accentColor="#000"
          letterSpacing={-0.05}
          reach={200}
          softness={0.7}
          strokeWidth={1.5}
          speed={1}
          lineStyle="dashed"
          selection
          labels
          draggable
          sweep
        />
      </div>

      <div className="hero-info">
        <p className="hero-subtitle hero-anim" style={{ '--d': '150ms' }}>
          Computer Science Student @ EPTM
        </p>

        <p className="hero-bio hero-anim" style={{ '--d': '250ms' }}>
          I build web apps and tools, from full-stack projects to AI-powered side projects.
        </p>

        <div className="hero-cta hero-anim" style={{ '--d': '350ms' }}>
          <a className="hero-btn hero-btn--solid" href="#projects">
            View projects <span aria-hidden="true">↓</span>
          </a>
          <a className="hero-btn hero-btn--ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </div>

    {/* ---------- Bottom bar ---------- */}
    <div className="hero-bottom hero-anim" style={{ '--d': '450ms' }}>

      <a className="hero-scroll" href="#education" aria-label="Scroll to content">
        Scroll
        <i aria-hidden="true" />
      </a>

      <div className="hero-socials">
        <a href={contact.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
