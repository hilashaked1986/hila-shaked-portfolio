(()=>{
const header=document.querySelector('[data-header]');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>35),{passive:true});
const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
if(!fine.matches)return;
let cursor=document.querySelector('.custom-cursor');
if(!cursor){
  cursor=document.createElement('div');
  cursor.className='custom-cursor';
  cursor.setAttribute('aria-hidden','true');
  cursor.innerHTML='<span class="custom-cursor__ring"><span class="custom-cursor__label">VIEW</span></span><span class="custom-cursor__dot"></span>';
  document.body.appendChild(cursor);
}else{
  const ring0=cursor.querySelector('.custom-cursor__ring');
  if(ring0 && !ring0.querySelector('.custom-cursor__label')){
    ring0.insertAdjacentHTML('beforeend','<span class="custom-cursor__label">VIEW</span>');
  }
}
const ring=cursor.querySelector('.custom-cursor__ring'),dot=cursor.querySelector('.custom-cursor__dot');
if(!ring||!dot)return;
document.documentElement.classList.add('has-custom-cursor');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,visible=false;
const render=()=>{rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;dot.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;requestAnimationFrame(render)};render();
const state=t=>{
 const project=t.closest('.cp-more__card,.work-card-v5');
 const interactive=t.closest('a,button,[role="button"]');
 cursor.classList.toggle('is-project',!!project);
 cursor.classList.toggle('is-interactive',!!interactive&&!project);
};
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(!visible){visible=true;cursor.classList.add('is-visible')}state(e.target)});
addEventListener('mouseleave',()=>{visible=false;cursor.classList.remove('is-visible','is-project','is-interactive')});
})();