// Fetches GitHub stats at build time and writes them to public/github-stats.json.
// The token stays on the build machine (CI secret or local .env) and never reaches the browser.
import { mkdir, writeFile } from 'node:fs/promises';

const USERNAME = 'areynard13';
const OUTPUT = new URL('../public/github-stats.json', import.meta.url);

const token = process.env.GH_STATS_TOKEN;
if (!token) {
  console.error('GH_STATS_TOKEN is missing (set it in .env or as a CI secret).');
  process.exit(1);
}

const query = `
  query($login: String!) {
    user(login: $login) {
      followers { totalCount }
      following { totalCount }
      pullRequests { totalCount }
      contributionsCollection { contributionCalendar { totalContributions } }
    }
  }
`;

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'portfolio-stats-build',
  },
  body: JSON.stringify({ query, variables: { login: USERNAME } }),
});

if (!response.ok) {
  console.error(`GitHub API responded ${response.status}: ${await response.text()}`);
  process.exit(1);
}

const json = await response.json();
const user = json.data?.user;
if (json.errors || !user) {
  console.error('GitHub GraphQL error:', JSON.stringify(json.errors ?? json));
  process.exit(1);
}

const stats = {
  contribution: user.contributionsCollection.contributionCalendar.totalContributions,
  followers: user.followers.totalCount,
  following: user.following.totalCount,
  pullRequestsOpened: user.pullRequests.totalCount,
  updatedAt: new Date().toISOString(),
};

await mkdir(new URL('.', OUTPUT), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify(stats, null, 2)}\n`);
console.log('Wrote public/github-stats.json', stats);
