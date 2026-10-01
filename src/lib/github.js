const GITHUB_API_URL = 'https://api.github.com/graphql';
const USERNAME = 'areynard13';

export async function fetchGitHubStats() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (!token) {
    console.error("Le token GitHub (VITE_GITHUB_TOKEN) est manquant dans le fichier .env !");
  }

  const query = `
    query {
      user(login: "${USERNAME}") {
        followers {
          totalCount
        }
        following {
          totalCount
        }
        pullRequests {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error('Erreur GraphQL:', json.errors);
      throw new Error('Erreur lors de la récupération des données GitHub');
    }

    if (!json.data || !json.data.user) {
      throw new Error('Données utilisateur introuvables via GraphQL');
    }

    const user = json.data.user;

    return {
      contribution: user.contributionsCollection.contributionCalendar.totalContributions ?? 0,
      followers: user.followers.totalCount ?? 0,
      following: user.following.totalCount ?? 0,
      pullRequestsOpened: user.pullRequests.totalCount ?? 0,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des stats GitHub:', error);
    return {
      commits: 0,
      followers: 0,
      following: 0,
      pullRequestsOpened: 0,
    };
  }
}