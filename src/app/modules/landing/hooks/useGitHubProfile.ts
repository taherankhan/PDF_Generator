import { useEffect, useState } from 'react';

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  htmlUrl: string;
};

const buildFallback = (username: string): GitHubProfile => ({
  login: username,
  name: null,
  avatarUrl: `https://github.com/${username}.png`,
  bio: null,
  htmlUrl: `https://github.com/${username}`,
});

export const useGitHubProfile = (username: string) => {
  const [profile, setProfile] = useState<GitHubProfile>(() => buildFallback(username));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setProfile({
          login: data.login ?? username,
          name: data.name ?? null,
          avatarUrl: data.avatar_url ?? buildFallback(username).avatarUrl,
          bio: data.bio ?? null,
          htmlUrl: data.html_url ?? buildFallback(username).htmlUrl,
        });
      })
      .catch(() => {
        if (!cancelled) setProfile(buildFallback(username));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { profile, loading };
};
