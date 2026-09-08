
(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('menu-open', !expanded);
    });
  }

  const cursor = document.querySelector('.custom-cursor');
  if (!cursor || !matchMedia('(pointer:fine)').matches) return;
  const ring = cursor.querySelector('.custom-cursor__ring');
  const dot = cursor.querySelector('.custom-cursor__dot');

  window.addEventListener('mousemove', (e) => {
    ring.style.left = dot.style.left = e.clientX + 'px';
    ring.style.top = dot.style.top = e.clientY + 'px';
    const project = e.target.closest('.cp-more__card');
    const interactive = e.target.closest('a, button, [role="button"]');
    cursor.classList.toggle('is-project', Boolean(project));
    cursor.classList.toggle('is-interactive', Boolean(interactive) && !project);
  });

  document.documentElement.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-project','is-interactive');
  });
})();
