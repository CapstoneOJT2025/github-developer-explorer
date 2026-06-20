async function searchUser() {

  const username = searchInput.value.trim()

  // Don't search if input is empty
  if (username === '') {
    searchError.textContent = 'Please enter a username!'
    return
  }

  // Reset UI before new search
  searchError.textContent = ''
  profileSection.classList.add('hidden')
  reposSection.classList.add('hidden')
  loadingSpinner.classList.remove('hidden')

  try {

    // Step 1: fetch user profile
    const userResponse = await fetch('https://api.github.com/users/' + username)

    if (userResponse.status === 404) {
      loadingSpinner.classList.add('hidden')
      searchError.textContent = 'User not found! Check the username.'
      return
    }

    const user = await userResponse.json()

    // Step 2: fetch their repos (up to 100)
    const reposResponse = await fetch('https://api.github.com/users/' + username + '/repos?per_page=100')
    const repos = await reposResponse.json()

    // Save to shared state so sort.js can reuse without re-fetching
    allRepos = repos

    loadingSpinner.classList.add('hidden')

    // Step 3: render everything
    showProfile(user)
    showRepos(repos)

    profileSection.classList.remove('hidden')
    reposSection.classList.remove('hidden')

  } catch (error) {
    loadingSpinner.classList.add('hidden')
    searchError.textContent = 'Something went wrong. Check your internet!'
  }
}