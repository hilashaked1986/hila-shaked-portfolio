
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

  window.addEventListener('mousemove', e => {
    ring.style.left = dot.style.left = e.clientX + 'px';
    ring.style.top = dot.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseover', e => {
    const project = e.target.closest('.cp-more__card');
    cursor.classList.toggle('is-project', !!project);
  });
})();
