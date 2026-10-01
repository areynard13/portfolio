import { useEffect, useState } from 'react';
import CountUp from '../../components/CountUp';
import SpotlightCard from '../../components/SpotlightCard';
import useReveal from '../../hooks/useReveal';
import { fetchGitHubStats } from '../../lib/github';
import './Stats.css';

const Stats = () => {
  const ref = useReveal();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchGitHubStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load GitHub stats', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statItems = [
    { label: 'Total Contributions', value: stats?.contribution ?? 0, id: 'contributions' },
    { label: 'Pull Requests Opened', value: stats?.pullRequestsOpened ?? 0, id: 'prs' },
    { label: 'GitHub Followers', value: stats?.followers ?? 0, id: 'followers' },
    { label: 'Following', value: stats?.following ?? 0, id: 'following' },
  ];

  return (
    <section className="stats-section" id="stats" ref={ref} aria-labelledby="stats-title">
      <div className="stats-inner">
        <header className="stats-header">
          <div>
            <span className="stats-index">05 / Stats</span>
            <h2 id="stats-title">
              GitHub
              <br />
              <em>Github Stats.</em>
            </h2>
          </div>
        </header>

        {loading ? (
          <div className="stats-loading">Loading stats...</div>
        ) : (
          <ul className="stats-grid">
            {statItems.map((item) => (
              <li className="stats-item" key={item.id}>
                <SpotlightCard className="stats-card" spotlightColor="rgba(var(--brand-rgb), 0.5)">
                  <div className="stats-value-wrapper">
                    <CountUp
                      from={0}
                      to={item.value}
                      separator=","
                      direction="up"
                      duration={1}
                      className="stats-number"
                    />
                  </div>
                  <p className="stats-label">{item.label}</p>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Stats;