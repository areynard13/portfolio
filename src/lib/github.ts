import * as dotenv from 'dotenv';

dotenv.config();

const GITHUB_API_URL = 'https://api.github.com';
const USERNAME = 'areynard13'

export interface GithubStats {
  publicRepos: number;
  followers: number;
  following: number;
  pullRequestsOpened: number;
}

export async function fetchGitHubStats(
  token: string = process.env.GITHUB_TOKEN || ''
): Promise<GithubStats> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'TypeScript-App',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const userResponse = await fetch(`${GITHUB_API_URL}/users/${USERNAME}`, { headers });
    if (!userResponse.ok) {
      throw new Error(`Error profil: ${userResponse.statusText}`);
    }
    const userData = await userResponse.json();

    const prResponse = await fetch(`${GITHUB_API_URL}/search/issues?q=author:${USERNAME}+type:pr`, { headers });
    const prData = prResponse.ok ? await prResponse.json() : { total_count: 0 };

    return {
      publicRepos: userData.public_repos ?? 0,
      followers: userData.followers ?? 0,
      following: userData.following ?? 0,
      pullRequestsOpened: prData.total_count ?? 0,
    };
  } catch (error) {
    console.error('Error during github stats recuperation', error);
    throw error;
  }
}