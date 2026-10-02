import { useCallback, useEffect, useState } from 'react';
import { FiGitCommit, FiGitPullRequest, FiUsers, FiUserPlus } from 'react-icons/fi';
import CountUp from '../../components/CountUp';
import SpotlightCard from '../../components/SpotlightCard';
import useReveal from '../../hooks/useReveal';
import { fetchGitHubStats } from '../../lib/github';
import { contact } from '../../data/contact';
import './Stats.css';

const CACHE_KEY = 'gh-stats-v1';
const CACHE_MS = 10 * 60 * 1000; // 10 minutes

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { t, data } = JSON.parse(raw);
    return Date.now() - t < CACHE_MS ? data : null;
  } catch {
    return null;
  }
};

const writeCache = data => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* storage unavailable: ignore */
  }
};

const ITEMS = [
  { id: 'contributions', key: 'contribution', label: 'Total contributions', icon: FiGitCommit },
  { id: 'prs', key: 'pullRequestsOpened', label: 'Pull requests opened', icon: FiGitPullRequest },
  { id: 'followers', key: 'followers', label: 'Followers', icon: FiUsers },
  { id: 'following', key: 'following', label: 'Following', icon: FiUserPlus },
];

const handle = contact.github.split('/').filter(Boolean).pop();

const Stats = () => {
  const ref = useReveal();
  const [stats, setStats] = useState(readCache);
  const [error, setError] = useState(false);
  const loading = !stats && !error;

  const load = useCallback(async () => {
    setError(false);
    try {
      const data = await fetchGitHubStats();
      setStats(data);
      writeCache(data);
    } catch (err) {
      console.error('Failed to load GitHub stats', err);
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (!stats) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retry = () => {
    setStats(null);
    load();
  };

  return (
    <section className="stats-section" id="stats" ref={ref} aria-labelledby="stats-title">
      <div className="stats-inner">
        <header className="stats-header reveal">
          <div>
            <span className="stats-index">05 / Stats</span>
            <h2 id="stats-title">
              My GitHub
              <br />
              <em>in numbers.</em>
            </h2>
          </div>
          <a className="stats-profile" href={contact.github} target="_blank" rel="noreferrer">
            @{handle} <span aria-hidden="true">↗</span>
          </a>
        </header>

        {/* the cards are always rendered, so the reveal observer can find them */}
        <ul className="stats-grid" aria-busy={loading}>
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                className={`stats-item stats-item--${item.id} reveal`}
                style={{ '--d': `${i * 90}ms` }}
                key={item.id}
              >
                <SpotlightCard className="stats-card" spotlightColor="rgba(var(--brand-rgb), 0.35)">
                  {item.id === 'contributions' && <span className="stats-dots" aria-hidden="true" />}

                  <div className="stats-top">
                    <span className="stats-rank">{String(i + 1).padStart(2, '0')}</span>
                    <span className="stats-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  </div>

                  <div className="stats-bottom">
                    <div className="stats-value">
                      {stats ? (
                        <CountUp
                          from={0}
                          to={stats[item.key] ?? 0}
                          separator=","
                          direction="up"
                          duration={2}
                          className="stats-number"
                        />
                      ) : (
                        <span className={`stats-number${loading ? ' is-loading' : ''}`} aria-hidden="true">
                          {loading ? '000' : '—'}
                        </span>
                      )}
                    </div>
                    <p className="stats-label">{item.label}</p>
                  </div>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>

        {error ? (
          <p className="stats-error" role="alert">
            Couldn&apos;t load the live stats right now.
            <button type="button" onClick={retry}>
              Retry
            </button>
          </p>
        ) : (
          <p className="stats-source">Fetched from the GitHub API</p>
        )}
      </div>
    </section>
  );
};

export default Stats;