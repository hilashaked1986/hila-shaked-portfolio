(()=>{
if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
const c=document.querySelector('.custom-cursor'); if(!c)return;
let x=innerWidth/2,y=innerHeight/2;
const clear=()=>c.classList.remove('is-project','is-interactive');
const update=()=>{
 const e=document.elementFromPoint(x,y);
 if(!e){clear();return}
 const project=e.closest('.work-card-v5,.cp-more__card');
 const interactive=e.closest('a,button,[role="button"]');
 c.classList.toggle('is-project',!!project);
 c.classList.toggle('is-interactive',!!interactive&&!project);
};
addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;c.classList.add('is-visible');update()},{passive:true});
addEventListener('scroll',update,{passive:true});
addEventListener('pointerleave',()=>{c.classList.remove('is-visible');clear()},{passive:true});
addEventListener('blur',()=>{c.classList.remove('is-visible');clear()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){c.classList.remove('is-visible');clear()}});
document.addEventListener('pointerover',update,{passive:true});
})();