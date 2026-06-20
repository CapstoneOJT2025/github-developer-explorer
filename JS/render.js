function showProfile(user) {

  let bio      = user.bio      || 'No bio.'
  let location = user.location || 'Location not set'

  profileCard.innerHTML = `
    <div class="profile-card">

      <img class="profile-avatar" src="${user.avatar_url}" alt="avatar" />

      <div class="profile-info">
        <h2 class="profile-name">${user.name || user.login}</h2>
        <p class="profile-username">@${user.login}</p>
        <p class="profile-bio">${bio}</p>
        <p class="profile-meta">📍 ${location}</p>

        <div class="profile-stats">
          <div class="stat-box">
            <span class="num">${user.public_repos}</span>
            <span class="label">Repos</span>
          </div>
          <div class="stat-box">
            <span class="num">${user.followers}</span>
            <span class="label">Followers</span>
          </div>
          <div class="stat-box">
            <span class="num">${user.following}</span>
            <span class="label">Following</span>
          </div>
        </div>

      </div>
    </div>
  `
}


function showRepos(repos) {

  if (repos.length === 0) {
    reposGrid.innerHTML = '<p style="color:var(--text3)">No repositories found.</p>'
    return
  }

  reposGrid.innerHTML = repos.map(function(repo) {

    let desc = repo.description || 'No description.'
    let lang = repo.language    || 'Unknown'

    return `
      <a href="${repo.html_url}" target="_blank" class="repo-card">
        <p class="repo-name">📁 ${repo.name}</p>
        <p class="repo-desc">${desc}</p>
        <div class="repo-meta">
          <span>🔤 ${lang}</span>
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
        </div>
      </a>
    `
  }).join('')

  // Show language breakdown after rendering repos
  showLanguageBar(repos)
}