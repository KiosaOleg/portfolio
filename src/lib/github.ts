export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

// Fallback demo data for when GitHub is not configured
const demoRepos: Repository[] = [
  {
    id: 1,
    name: "demo-project-1",
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

  // Return demo data if GitHub is not configured
  if (!username) {
    console.warn(
      "GITHUB_USERNAME not set, returning demo data. Create .env.local with your credentials.",
    );
    return demoRepos;
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
    { headers, next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    console.error(`Failed to fetch repos: ${res.status}, returning demo data`);
    return demoRepos;
  }

  return res.json();
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

  return res.json();
}
