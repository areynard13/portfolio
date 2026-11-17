// Stats are generated at build time by scripts/fetch-github-stats.mjs (see deploy workflow),
// so no token is ever shipped to the browser.
export async function fetchGitHubStats() {
  const response = await fetch(`${import.meta.env.BASE_URL}github-stats.json`, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Failed to load github-stats.json (${response.status})`);
  }
  return response.json();
}
