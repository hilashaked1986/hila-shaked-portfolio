(()=>{
if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
const c=document.querySelector('.custom-cursor'); if(!c)return;
function reset(){c.classList.remove('is-project','is-interactive')}
function state(x,y){const e=document.elementFromPoint(x,y);if(!e){reset();return}const p=e.closest('.cp-more__card,.work-card-v5');const i=e.closest('a,button,[role="button"]');c.classList.toggle('is-project',!!p);c.classList.toggle('is-interactive',!!i&&!p)}
let x=0,y=0;
addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;state(x,y)},{passive:true});
addEventListener('scroll',()=>state(x,y),{passive:true});
addEventListener('blur',reset);
document.addEventListener('visibilitychange',()=>{if(document.hidden)reset()});
addEventListener('pointerout',e=>{if(!e.relatedTarget)reset()},{passive:true});
})();