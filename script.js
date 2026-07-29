const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const menu=document.querySelector('[data-mobile-menu]');
const hero=document.querySelector('[data-hero]');
const heroImage=document.querySelector('.hero-image');
const heroLight=document.querySelector('.hero-light');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>35),{passive:true});

menuButton.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  document.body.style.overflow=open?'hidden':'';
});

menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

if(hero && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches){
  hero.addEventListener('pointermove',e=>{
    const x=(e.clientX/window.innerWidth-.5);
    const y=(e.clientY/window.innerHeight-.5);
    heroImage.style.transform=`scale(1.045) translate3d(${x*-8}px,${y*-6}px,0)`;
    heroLight.style.transform=`translate3d(${x*12}px,${y*9}px,0)`;
  });
  hero.addEventListener('pointerleave',()=>{
    heroImage.style.transform='scale(1.045)';
    heroLight.style.transform='translate3d(0,0,0)';
  });
}

document.getElementById('year').textContent=new Date().getFullYear();
