
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

// Shared state — holds all fetched repos so sort can re-use them
let allRepos = []