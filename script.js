const searchInput    = document.getElementById('searchInput')
const searchBtn      = document.getElementById('searchBtn')
const searchError    = document.getElementById('searchError')
const loadingSpinner = document.getElementById('loadingSpinner')
const profileSection = document.getElementById('profileSection')
const reposSection   = document.getElementById('reposSection')
const profileCard    = document.getElementById('profileCard')
const reposGrid      = document.getElementById('reposGrid')
const sortSelect     = document.getElementById('sortSelect')
const languageBar    = document.getElementById('languageBar')

let allRepos = []

async function searchUser() {

  const username = searchInput.value.trim()

  if (username === '') {
    searchError.textContent = 'Please enter a username!'
    return
  }

  searchError.textContent = ''
  profileSection.classList.add('hidden')
  reposSection.classList.add('hidden')

  loadingSpinner.classList.remove('hidden')

  try {

    // Talk to GitHub API — get user info
    const userResponse = await fetch('https://api.github.com/users/' + username)

    if (userResponse.status === 404) {
      loadingSpinner.classList.add('hidden')
      searchError.textContent = 'User not found! Check the username.'
      return
    }

    const user = await userResponse.json()

    const reposResponse = await fetch('https://api.github.com/users/' + username + '/repos?per_page=100')
    const repos = await reposResponse.json()

    allRepos = repos

    loadingSpinner.classList.add('hidden')

    showProfile(user)
    showRepos(repos)

    profileSection.classList.remove('hidden')
    reposSection.classList.remove('hidden')

  } catch (error) {
    loadingSpinner.classList.add('hidden')
    searchError.textContent = 'Something went wrong. Check your internet!'
  }
}

// SHOW PROFILE CARD
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

// SHOW REPO CARDS
function showRepos(repos) {

  // If no repos
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

  showLanguageBar(repos)
}

// LANGUAGE BAR — count which language used most
function showLanguageBar(repos) {

  let counts = {}

  for (let i = 0; i < repos.length; i++) {
    let lang = repos[i].language

    if (lang === null) {
      lang = 'Other'
    }

    if (counts[lang]) {
      counts[lang] = counts[lang] + 1
    } else {
      counts[lang] = 1
    }
  }


  let colors = ['#f1e05a', '#3178c6', '#e34c26', '#563d7c', '#3572A5', '#b07219']

  let langs = Object.keys(counts)  
  let total = repos.length

  let barHTML = ''
  let legendHTML = ''

  for (let i = 0; i < langs.length && i < 6; i++) {
    let lang    = langs[i]
    let count   = counts[lang]
    let percent = ((count / total) * 100).toFixed(1)
    let color   = colors[i] || '#8b949e'

    barHTML += `<div class="lang-bar-segment" style="width:${percent}%; background:${color}"></div>`

    legendHTML += `
      <div class="lang-legend-item">
        <span class="lang-dot" style="background:${color}"></span>
        ${lang} ${percent}%
      </div>
    `
  }

  languageBar.innerHTML = `
    <p class="lang-bar-title">Language Breakdown</p>
    <div class="lang-bar-track">${barHTML}</div>
    <div class="lang-legend">${legendHTML}</div>
  `
}

// SORT REPOS when dropdown changes
function sortRepos() {

  // What did user pick from dropdown?
  let method = sortSelect.value

  // Make a copy so we don't mess up the original
  let sorted = allRepos.slice()

  if (method === 'stars') {
    sorted.sort(function(a, b) {
      return b.stargazers_count - a.stargazers_count
    })
  }

  if (method === 'forks') {
    sorted.sort(function(a, b) {
      return b.forks_count - a.forks_count
    })
  }

  if (method === 'name') {
    sorted.sort(function(a, b) {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }

  if (method === 'updated') {
    sorted.sort(function(a, b) {
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
  }

  // Re-render with sorted list
  showRepos(sorted)
}

searchBtn.addEventListener('click', searchUser)

searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    searchUser()
  }
})

sortSelect.addEventListener('change', function() {
  if (allRepos.length > 0) {
    sortRepos()
  }
})
