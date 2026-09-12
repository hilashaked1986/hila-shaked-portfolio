(() => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  const ring = cursor.querySelector('.custom-cursor__ring');
  const label = cursor.querySelector('.custom-cursor__label');
  const dot = cursor.querySelector('.custom-cursor__dot');
  let x = -100, y = -100, rx = -100, ry = -100, raf;

  const projectSelector = '.work-card-v5, .cp-more__card, a[data-cursor="view"]';

  function render(){
    rx += (x-rx)*.18; ry += (y-ry)*.18;
    cursor.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    if (dot) dot.style.transform = `translate3d(${x-rx}px,${y-ry}px,0)`;
    raf = requestAnimationFrame(render);
  }
  function setView(on){
    cursor.classList.toggle('is-view', on);
    if (label) label.textContent = on ? 'VIEW' : '';
  }
  document.addEventListener('mousemove', e => {
    x=e.clientX; y=e.clientY;
    cursor.classList.add('is-visible');
    const el = document.elementFromPoint(x,y);
    setView(!!el?.closest(projectSelector));
  }, {passive:true});
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible','is-view');
    if (label) label.textContent='';
  });
  window.addEventListener('blur', () => {
    cursor.classList.remove('is-visible','is-view');
    if (label) label.textContent='';
  });
  document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  raf=requestAnimationFrame(render);
})();