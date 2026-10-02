import { useEffect, useRef } from 'react';
import BubbleMenu from './BubbleMenu';
import { navLinks } from '../data/nav';
import './MobileMenu.css';

const items = navLinks.map(link => ({
  label: link.label,
  href: link.href,
  ariaLabel: `Go to ${link.label}`,
  rotation: 0,
  hoverStyles: { bgColor: 'var(--brand)', textColor: '#ffffff' },
}));

const logo = (
  <a href="#home" className="mm-logo" aria-label="Back to top">
    AR<span>.</span>
  </a>
);

const MobileMenu = () => {
  const rootRef = useRef(null);
  const openRef = useRef(false);

  // lock page scroll while the menu is open
  const handleOpenChange = open => {
    openRef.current = open;
    document.body.style.overflow = open ? 'hidden' : '';
  };

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    []
  );

  // BubbleMenu has no close API, so we press its own toggle:
  // a tap on a link, on the logo or on the backdrop closes the menu.
  const handleClick = e => {
    if (!openRef.current) return;
    if (e.target.closest('.pill-link, .mm-logo, .bubble-menu-items')) {
      rootRef.current?.querySelector('.toggle-bubble')?.click();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div ref={rootRef} className="mobile-menu" onClick={handleClick}>
      <BubbleMenu
        logo={logo}
        items={items}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.08}
        onMenuClick={handleOpenChange}
      />
    </div>
  );
};

export default MobileMenu;
