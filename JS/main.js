
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