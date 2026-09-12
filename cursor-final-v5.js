(()=>{
  const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
  if(!fine.matches) return;

  const cursor=document.querySelector('.custom-cursor');
  if(!cursor) return;
  const ring=cursor.querySelector('.custom-cursor__ring');
  const dot=cursor.querySelector('.custom-cursor__dot');
  if(!ring||!dot) return;

  document.documentElement.classList.add('has-custom-cursor');

  let mouseX=innerWidth/2, mouseY=innerHeight/2;
  let ringX=mouseX, ringY=mouseY;
  let visible=false;

  const clearState=()=>{
    cursor.classList.remove('is-project','is-interactive');
  };

  const updateState=()=>{
    const el=document.elementFromPoint(mouseX,mouseY);
    if(!el){ clearState(); return; }
    const project=el.closest('.work-card-v5,.cp-more__card');
    const interactive=el.closest('a,button,[role="button"]');
    cursor.classList.toggle('is-project',Boolean(project));
    cursor.classList.toggle('is-interactive',Boolean(interactive)&&!project);
  };

  const show=()=>{
    if(!visible){ visible=true; cursor.classList.add('is-visible'); }
  };
  const hide=()=>{
    visible=false;
    cursor.classList.remove('is-visible');
    clearState();
  };

  const render=()=>{
    ringX+=(mouseX-ringX)*.18;
    ringY+=(mouseY-ringY)*.18;
    ring.style.transform=`translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
    dot.style.transform=`translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(render);
  };
  render();

  window.addEventListener('pointermove',e=>{
    mouseX=e.clientX; mouseY=e.clientY;
    show();
    updateState();
  },{passive:true});

  window.addEventListener('scroll',updateState,{passive:true});
  window.addEventListener('blur',hide);
  document.addEventListener('visibilitychange',()=>{ if(document.hidden) hide(); });
  document.addEventListener('mouseleave',hide);
  document.addEventListener('mouseenter',()=>{ if(visible) cursor.classList.add('is-visible'); });
  window.addEventListener('pointerdown',updateState,{passive:true});
  window.addEventListener('pointerup',updateState,{passive:true});
})();
