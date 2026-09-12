(() => {
  const desktopQuery = window.matchMedia('(min-width: 901px)');
  if (!desktopQuery.matches) return;

  const cards = [...document.querySelectorAll('.work-card-v5[href]')];
  if (!cards.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(card => {
    card.addEventListener('click', (event) => {
      if (reduced) return;
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;

      const href = card.getAttribute('href');
      const img = card.querySelector('figure img');
      if (!href || !img) return;

      event.preventDefault();

      const rect = card.getBoundingClientRect();
      const overlay = document.createElement('div');
      overlay.className = 'project-transition-overlay';

      const clone = img.cloneNode(true);
      clone.removeAttribute('loading');
      clone.removeAttribute('decoding');
      overlay.appendChild(clone);

      Object.assign(overlay.style, {
        left: rect.left + 'px',
        top: rect.top + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px'
      });

      document.body.appendChild(overlay);
      document.body.classList.add('project-transitioning');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => overlay.classList.add('is-expanding'));
      });

      window.setTimeout(() => {
        window.location.href = href;
      }, 520);
    });
  });
})();