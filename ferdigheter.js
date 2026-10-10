(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Skills data and filters
  const skillGroups = [
    { key: 'backend', name: 'Backend & data', items: ['C# (.NET)', 'REST API-utvikling', 'PostgreSQL', 'SQL', 'Databaseadministrasjon', 'Meldingsbaserte systemer'] },
    { key: 'frontend', name: 'Frontend', items: ['React', 'TypeScript'] },
    { key: 'sky', name: 'Sky & verktøy', items: ['Azure', 'Git', 'Versjonskontroll', 'Scrum / Agile'] },
    { key: 'plattform', name: 'Plattform', items: ['ServiceNow', 'ServiceNow SDK', 'Claude Code', 'Now Assist'] },
    { key: 'ai', name: 'AI & automatisering', items: ['Generativ AI', 'AI-assistert utvikling', 'Automatisering', 'Prompting & kontekststyring'] },
    { key: 'sikkerhet', name: 'Sikkerhet & dokumentasjon', items: ['Informasjonssikkerhet', 'Teknisk dokumentasjon', 'Systemdesign (grunnleggende til middels)'] },
    { key: 'ledelse', name: 'Ledelse & kommunikasjon', items: ['Teamledelse', 'Delegering', 'Kodegjennomgang', 'Presentasjoner for større grupper'] },
  ];

  const filters = $('#filters');
  const grid = $('#skillGrid');
  const filterKeys = [{ key: 'all', name: 'Alle' }, ...skillGroups.map(g => ({ key: g.key, name: g.name }))];
  filters.innerHTML = filterKeys.map((f, i) =>
    `<button class="filter" data-key="${f.key}" aria-pressed="${i === 0}">${f.name}</button>`).join('');
  grid.innerHTML = skillGroups.map(g => `
    <div class="skill-group" data-key="${g.key}">
      <h3>${g.name}</h3>
      <div class="chips">${g.items.map(s => `<span class="chip">${s}</span>`).join('')}</div>
    </div>`).join('');

  filters.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.filter');
    if (!btn) return;
    const key = btn.dataset.key;
    $$('.filter', filters).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    $$('.skill-group', grid).forEach(g => {
      g.classList.toggle('dim', key !== 'all' && g.dataset.key !== key);
    });
  });

})();
