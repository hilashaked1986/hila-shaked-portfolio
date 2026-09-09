const header=document.querySelector('[data-header]');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>35),{passive:true});
(()=>{
  const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
  if(!fine.matches)return;
  const cursor=document.querySelector('.custom-cursor');
  const ring=cursor?.querySelector('.custom-cursor__ring');
  const dot=cursor?.querySelector('.custom-cursor__dot');
  if(!cursor||!ring||!dot)return;
  document.documentElement.classList.add('has-custom-cursor');
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,visible=false;
  const render=()=>{
    rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
    ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
    dot.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(render);
  };
  render();
  const setState=t=>{
    const project=t.closest('.cp-more__card');
    const interactive=t.closest('a,button,[role="button"]');
    cursor.classList.toggle('is-project',Boolean(project));
    cursor.classList.toggle('is-interactive',Boolean(interactive)&&!project);
  };
  addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    if(!visible){visible=true;cursor.classList.add('is-visible')}
    setState(e.target);
  });
  addEventListener('mouseleave',()=>{visible=false;cursor.classList.remove('is-visible','is-project','is-interactive')});
})();