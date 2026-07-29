const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const menu=document.querySelector('[data-mobile-menu]');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>35),{passive:true});
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');document.body.style.overflow=''}));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
