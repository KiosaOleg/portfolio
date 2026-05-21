import { curatedProjects } from "@/lib/curated-projects";

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner_login: string;
  is_collaborator: boolean;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

function normalizeRepo(
  repo: GitHubRepoResponse,
  username: string,
): Repository {
  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    owner_login: repo.owner.login,
    is_collaborator:
      repo.owner.login.toLowerCase() !== username.toLowerCase(),
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    language: repo.language,
    updated_at: repo.updated_at,
  };
}

function isExcludedRepo(repo: Repository): boolean {
  const name = repo.name.toLowerCase();
  const fullName = repo.full_name.toLowerCase();

  if (name.includes("goit-react-hw")) return true;
  if (name.includes("node.js")) return true;
  if (name.includes("my-autotaile1")) return true;
  if (name === "group6-team-project") return true;
  if (fullName === "oleksandrb93/portfolio") return true;

  return false;
}

function mergeRepos(repos: Repository[]): Repository[] {
  const byId = new Map<number, Repository>();

  for (const repo of repos) {
    if (isExcludedRepo(repo)) continue;
    byId.set(repo.id, repo);
  }

  return [...byId.values()].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

async function fetchGitHubRepos(
  url: string,
  headers: HeadersInit,
): Promise<GitHubRepoResponse[]> {
  const res = await fetch(url, { headers, next: { revalidate: 3600 } });

  if (!res.ok) {
    console.error(`Failed to fetch repos from ${url}: ${res.status}`);
    return [];
  }

  return res.json();
}

// Fallback demo data for when GitHub is not configured
const demoRepos: Repository[] = [
  {
    id: 1,
    name: "demo-project-1",
    full_name: "you/demo-project-1",
    owner_login: "you",
    is_collaborator: false,
    description:
      "This is a demo project. Set up GITHUB_USERNAME in .env.local to see your real repos!",
    html_url: "https://github.com",
    homepage: "https://example.com",
    stargazers_count: 42,
    forks_count: 10,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "demo-project-2",
    full_name: "team/demo-project-2",
    owner_login: "team",
    is_collaborator: true,
    description: "Another demo project showing how your portfolio will look.",
    html_url: "https://github.com",
    homepage: null,
    stargazers_count: 15,
    forks_count: 3,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
];

export async function getRepos(): Promise<Repository[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;
  const includeCollaborator =
    process.env.GITHUB_INCLUDE_COLLABORATOR !== "false";

  // Return demo data if GitHub is not configured
  if (!username) {
    console.warn(
      "GITHUB_USERNAME not set, returning demo data. Create .env.local with your credentials.",
    );
    return mergeRepos([...curatedProjects, ...demoRepos]);
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const ownedUrl = token
    ? `https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=20`
    : `https://api.github.com/users/${username}/repos?sort=updated&per_page=20&type=owner`;

  const requests = [
    fetchGitHubRepos(ownedUrl, headers).then((repos) =>
      repos
        .filter((repo) => !repo.fork)
        .map((repo) => normalizeRepo(repo, username)),
    ),
  ];

  if (token && includeCollaborator) {
    requests.push(
      fetchGitHubRepos(
        "https://api.github.com/user/repos?affiliation=collaborator&sort=updated&per_page=20",
        headers,
      ).then((repos) =>
        repos
          .filter((repo) => !repo.fork)
          .map((repo) => normalizeRepo(repo, username)),
      ),
    );
  } else if (includeCollaborator && !token) {
    console.warn(
      "GITHUB_TOKEN not set — collaborator repositories will not be loaded.",
    );
  }

  const results = await Promise.all(requests);
  const merged = mergeRepos([...curatedProjects, ...results.flat()]);

  if (merged.length === 0) {
    console.error("No repositories fetched, returning demo data");
    return mergeRepos(curatedProjects);
  }

  return merged;
}

export async function getRepo(name: string): Promise<Repository> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    const demo = demoRepos.find((r) => r.name === name);
    if (demo) return demo;
    throw new Error("GITHUB_USERNAME is not defined");
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`https://api.github.com/repos/${username}/${name}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch repo: ${res.status}`);
  }

  const repo: GitHubRepoResponse = await res.json();
  return normalizeRepo(repo, username);
}
