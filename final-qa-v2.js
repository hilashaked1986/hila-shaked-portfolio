(()=>{
const header=document.querySelector('[data-header]');
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>35),{passive:true});
const fine=matchMedia('(hover:hover) and (pointer:fine)');if(!fine.matches)return;
let c=document.querySelector('.custom-cursor');
if(!c){c=document.createElement('div');c.className='custom-cursor';c.setAttribute('aria-hidden','true');c.innerHTML='<span class="custom-cursor__ring"><span class="custom-cursor__label">VIEW</span></span><span class="custom-cursor__dot"></span>';document.body.appendChild(c)}
let r=c.querySelector('.custom-cursor__ring'),d=c.querySelector('.custom-cursor__dot');
if(r&&!r.querySelector('.custom-cursor__label'))r.insertAdjacentHTML('beforeend','<span class="custom-cursor__label">VIEW</span>');
document.documentElement.classList.add('has-custom-cursor');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,vis=false;
(function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;r.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;d.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;requestAnimationFrame(loop)})();
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(!vis){vis=true;c.classList.add('is-visible')}const p=e.target.closest('.cp-more__card,.work-card-v5'),i=e.target.closest('a,button,[role="button"]');c.classList.toggle('is-project',!!p);c.classList.toggle('is-interactive',!!i&&!p)});
addEventListener('mouseleave',()=>{vis=false;c.classList.remove('is-visible','is-project','is-interactive')});
})();