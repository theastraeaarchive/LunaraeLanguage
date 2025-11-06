async function loadLexicon() {
  const response = await fetch('lexicon.json');
  const data = await response.json();
  const container = document.getElementById('lexicon');
  const searchBox = document.getElementById('searchBox');

  function render(words) {
    container.innerHTML = '';
    for (let key in words) {
      const w = words[key];
      const entry = document.createElement('div');
      entry.className = 'entry';
      entry.innerHTML = `
        <h2>${key}</h2>
        <p><strong>Type:</strong> ${w.type}</p>
        <p><strong>Meaning:</strong> ${w.meaning}</p>
        <p><strong>Etymology:</strong> ${w.etymology}</p>
        <p><strong>Related:</strong> ${w.related.join(', ')}</p>
        <p><strong>Example:</strong> ${w.example}</p>
      `;
      container.appendChild(entry);
    }
  }

  render(data);

  searchBox.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = Object.fromEntries(
      Object.entries(data).filter(([key, val]) =>
        key.toLowerCase().includes(term) ||
        val.meaning.toLowerCase().includes(term)
      )
    );
    render(filtered);
  });
}

loadLexicon();
