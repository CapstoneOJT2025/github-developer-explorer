function showLanguageBar(repos) {

  // Step 1: count how many repos use each language
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

  // Step 2: set colours for each language slot
  let colors = ['#f1e05a', '#3178c6', '#e34c26', '#563d7c', '#3572A5', '#b07219']

  let langs = Object.keys(counts)
  let total = repos.length

  let barHTML    = ''
  let legendHTML = ''

  // Step 3: build the coloured bar segments + legend (max 6 languages)
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

  // Step 4: inject into the page
  languageBar.innerHTML = `
    <p class="lang-bar-title">Language Breakdown</p>
    <div class="lang-bar-track">${barHTML}</div>
    <div class="lang-legend">${legendHTML}</div>
  `
}