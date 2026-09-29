import './Marquee.css';

const Marquee = ({ items, duration = 30 }) => (
  <div className="marquee" aria-hidden="true" style={{ '--marquee-duration': `${duration}s` }}>
    <div className="marquee-track">
      {[0, 1].map(copy => (
        <div className="marquee-group" key={copy}>
          {items.map(item => (
            <span key={item}>
              {item}
              <i>✦</i>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
