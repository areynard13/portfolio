import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';
import GlassIcons from '../../components/GlassIcons';
import useReveal from '../../hooks/useReveal';
import { contact } from '../../data/contact';
import './Contact.css';

const items = [
  {
    icon: <FiGithub />,
    color: 'linear-gradient(135deg, #52525b, #18181b)',
    label: 'GitHub',
    href: contact.github,
  },
  {
    icon: <FiLinkedin />,
    color: 'linear-gradient(135deg, #0a66c2, #004182)',
    label: 'LinkedIn',
    href: contact.linkedin,
  },
  {
    icon: <FiMail />,
    color: 'linear-gradient(135deg, var(--brand), var(--brand-soft))',
    label: 'Email',
    href: `mailto:${contact.email}`,
  },
  // {
  //   icon: <FiFileText />,
  //   color: 'linear-gradient(135deg, #f59e0b, #b45309)',
  //   label: 'Resume',
  //   href: contact.cv,
  //   download: true,
  // },
];

const Contact = () => {
  const ref = useReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section className="contact" id="contact" ref={ref} aria-labelledby="contact-title">
      <div className="contact-inner">
        <span className="contact-index reveal">04 / Contact</span>

        <h2 id="contact-title" className="contact-title reveal">
          Let&apos;s work
          <br />
          <em>together.</em>
        </h2>

        <p className="contact-text reveal">
          I&apos;m looking for internships and junior opportunities. Got a project, a question or just
          want to say hi? My inbox is open.
        </p>

        <div className="contact-mail reveal">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <button type="button" onClick={copyEmail} aria-live="polite">
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>

        <div className="reveal" style={{ '--d': '120ms' }}>
          <GlassIcons items={items} className="contact-icons" />
        </div>
      </div>

      <footer className="contact-footer">
        <span>© {new Date().getFullYear()} Adrien Reynard</span>
        <span>Built with React &amp; React Bits</span>
      </footer>
    </section>
  );
};

export default Contact;
