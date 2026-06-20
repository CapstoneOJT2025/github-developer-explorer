function sortRepos() {

  let method = sortSelect.value

  // Slice makes a copy — we never mutate the original allRepos array
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

  // Re-render cards with the newly sorted list
  showRepos(sorted)
}