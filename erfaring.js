(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Experience data (newest first)
  const experiences = [
    {
      period: 'aug 2026', current: true, img: 'images/jobb.jpg', imgAlt: 'Hamdi jobber ved en PC med hodetelefoner', role: 'IT Praksisstudent', org: 'KPMG Norway · Kristiansand',
      summary: 'Praksisstudent i KPMGs Tech-avdeling, i det første kullet med praksisstudenter. Fokus på å utforske og dokumentere hvordan AI-assisterte utviklingsverktøy kan brukes i utviklingsprosessen (SDLC) på ServiceNow.',
      points: [
        'Utvikler en metodikk for AI-assistert ServiceNow-utvikling, bygget rundt prompting, kontekststyring, arbeidsflyt og kvalitetskontroll',
        'Bygger en ressursallokerings-applikasjon som testcase og gjenskaper den med ulike tilnærminger for å sammenligne resultatene',
        'Undersøker integrasjonen mellom Claude Code og ServiceNow-instanser via ServiceNow SDK, Studio og Source Control',
        'Sammenligner Claude Code og Now Assist til ulike utviklingsformål',
        'Logger eksperimenter systematisk i GitHub og skal presentere funnene for deler av selskapet i november',
      ],
      tags: ['ServiceNow', 'Claude Code', 'AI-assistert utvikling', 'SDLC'],
    },
    {
      period: 'apr 2026', current: true, role: 'Junior utvikler og Team Lead', org: 'Landmarker · startup',
      summary: 'Kombinerer teknisk utvikling med ansvar for teamet. Håndterer oppgaver som blir delegert, og tar initiativ til å drive arbeidet fremover der det trengs.',
      points: [
        'Delegerer oppgaver og koordinerer arbeidsflyten i utviklingsteamet for effektivt samarbeid og fremdrift',
        'Gjennomgår kode, gir tilbakemeldinger og støtter teammedlemmer i teknisk problemløsning',
        'Utvikler, vedlikeholder og optimaliserer kode i applikasjoner, fra idé til ferdig løsning',
      ],
      tags: ['Team Lead', 'Kodegjennomgang', 'Backend'],
    },
    {
      period: '2025', current: true, role: 'Lærerassistent i programmering og mentor', org: 'Universitetet i Agder (UiA)',
      summary: 'Veileder førsteårsstudenter i introduksjonskurs i programmering (IS118) og støtter dem gjennom overgangen til studielivet.',
      points: [
        'Kodegjennomgang, feilsøking og problemløsning med studenter i programmering',
        'Tilpasser veiledningen til studentenes ulike behov, både faglig og sosialt',
        'Fullførte innføringsemne for studentmentorer: menneskemøtekompetanse, teambuilding og mer',
      ],
      tags: ['Mentoring', 'Programmering', 'Kommunikasjon'],
    },
    {
      period: 'mai 2024', current: true, role: 'Salgsrådgiver', org: 'Clas Ohlson · Kristiansand',
      summary: 'Jobb ved siden av studiene.',
      points: [],
      tags: ['Salg', 'Kundekontakt'],
    },
    {
      period: 'juni – aug 2022', role: 'Ungdomsarbeider', org: 'Forandringshuset Drammen',
      summary: 'Hadde ansvar for unge i ulike typer opplegg og for å organisere aktiviteter.',
      points: [],
      tags: ['Ungdomsarbeid', 'Organisering'],
    },
    {
      period: 'okt 2020 – juni 2022', role: 'Ungdomsråd', org: 'Drammen kommune',
      summary: 'Verv i ungdomsrådet i Drammen kommune.',
      points: [],
      tags: ['Engasjement', 'Demokrati'],
    },
  ];

  const timeline = $('#timeline');
  timeline.innerHTML = experiences.map((e, i) => `
    <article class="job reveal">
      <button class="job-head" aria-expanded="false" aria-controls="job-body-${i}" id="job-btn-${i}">
        <div class="period">${e.period}${e.current ? '<span class="now">Nå</span>' : ''}</div>
        <div class="job-title"><b>${e.role}</b><span>${e.org}</span></div>
        <span class="chev" aria-hidden="true">▾</span>
      </button>
      <div class="job-body" id="job-body-${i}" role="region" aria-labelledby="job-btn-${i}">
        <div>
          <div class="job-content">
            ${e.img ? `<img class="job-img" src="${e.img}" alt="${e.imgAlt}" loading="lazy">` : ''}
            <p>${e.summary}</p>
            ${e.points.length ? `<ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
            <div class="job-tags">${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    </article>`).join('');

  timeline.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.job-head');
    if (!btn) return;
    const card = btn.closest('.job');
    const open = !card.classList.contains('open');
    card.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

})();
