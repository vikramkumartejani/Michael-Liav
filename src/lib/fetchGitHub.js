export async function getGitHubRepos() {
    const res = await fetch("https://api.github.com/users/michaelliav/repos");
    return res.json();
  }
  