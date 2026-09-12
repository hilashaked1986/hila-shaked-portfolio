(() => {
  const desktopQuery = window.matchMedia('(min-width: 901px)');
  if (!desktopQuery.matches) return;

  const cards = [...document.querySelectorAll('.work-card-v5[href]')];
  if (!cards.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fade = document.createElement('div');
  fade.className = 'project-page-fade';
  document.body.appendChild(fade);

  cards.forEach(card => {
    card.addEventListener('click', (event) => {
      if (reduced) return;
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;

      const href = card.getAttribute('href');
      if (!href || href === '#') return;

      event.preventDefault();

      card.classList.add('is-leaving');
      document.body.classList.add('project-fade-leaving');

      window.setTimeout(() => {
        window.location.assign(href);
      }, 310);
    });
  });
})();