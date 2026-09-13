(()=>{
  /* SKYHAWK ONLY:
     The opening video must be the first content in the page, before the intro.
     Move the existing video node itself — no duplicate video and no changes to other projects. */
  const skyGallery=document.querySelector('.sky-gallery');
  const skyIntro=document.querySelector('main#top > .cp-intro');
  const skyVideo=skyGallery?.querySelector(':scope > .cp-video--opening');
  if(skyGallery && skyIntro && skyVideo && window.matchMedia('(min-width:901px)').matches){
    skyVideo.classList.add('sky-opening-video-final');
    skyIntro.before(skyVideo);

    const skyStyle=document.createElement('style');
    skyStyle.id='sky-opening-video-final-style';
    skyStyle.textContent=`
      @media (min-width:901px){
        .sky-opening-video-final{
          display:block !important;
          width:calc(100% - (2 * var(--pad))) !important;
          max-width:2048px !important;
          margin:72px auto 18px !important;
          border-radius:14px !important;
          overflow:hidden !important;
          background:#0f1012 !important;
          line-height:0 !important;
        }
        .sky-opening-video-final video{
          display:block !important;
          width:100% !important;
          height:auto !important;
          max-width:none !important;
          margin:0 !important;
          aspect-ratio:1920/950 !important;
          object-fit:cover !important;
        }
        .sky-gallery{
          margin-top:0 !important;
        }
      }
    `;
    document.head.appendChild(skyStyle);
  }

  /* HARMONY ONLY:
     Harmony still contains legacy .cursor/.ring/.dot CSS while the current markup
     uses .custom-cursor. Give the current cursor its own scoped definitions so the
     legacy rules cannot make the pointer disappear. */
  if(document.body.classList.contains('harmony-page')){
    const harmonyCursorStyle=document.createElement('style');
    harmonyCursorStyle.id='harmony-custom-cursor-final-style';
    harmonyCursorStyle.textContent=`
      @media (hover:hover) and (pointer:fine){
        html.has-custom-cursor body.harmony-page,
        html.has-custom-cursor body.harmony-page a,
        html.has-custom-cursor body.harmony-page button{
          cursor:none !important;
        }

        body.harmony-page .custom-cursor{
          display:block !important;
          visibility:visible !important;
          position:fixed !important;
          inset:0 !important;
          z-index:2147483000 !important;
          pointer-events:none !important;
          opacity:0 !important;
          transition:opacity .12s ease !important;
        }
        body.harmony-page .custom-cursor.is-visible{
          opacity:1 !important;
        }
        body.harmony-page .custom-cursor__ring,
        body.harmony-page .custom-cursor__dot{
          display:block !important;
          visibility:visible !important;
          position:fixed !important;
          left:0 !important;
          top:0 !important;
          pointer-events:none !important;
          border-radius:50% !important;
          will-change:transform !important;
        }
        body.harmony-page .custom-cursor__ring{
          width:30px !important;
          height:30px !important;
          border:1px solid #b8a792 !important;
          background:transparent !important;
          box-sizing:border-box !important;
          transition:width .22s ease,height .22s ease,background .22s ease,border-color .22s ease !important;
        }
        body.harmony-page .custom-cursor__dot{
          width:4px !important;
          height:4px !important;
          margin:0 !important;
          background:#b8a792 !important;
          opacity:1 !important;
        }
        body.harmony-page .custom-cursor__label{
          display:block !important;
          position:absolute !important;
          inset:0 !important;
          place-items:center !important;
          align-items:center !important;
          justify-content:center !important;
          font:400 7px/1 Inter,Arial,sans-serif !important;
          letter-spacing:.14em !important;
          color:#f4f1eb !important;
          opacity:0 !important;
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__ring{
          width:64px !important;
          height:64px !important;
          background:rgba(15,16,18,.78) !important;
          backdrop-filter:blur(4px) !important;
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__dot{
          opacity:0 !important;
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__label{
          display:grid !important;
          opacity:1 !important;
        }
        body.harmony-page .custom-cursor.is-interactive .custom-cursor__ring{
          width:40px !important;
          height:40px !important;
        }
      }
    `;
    document.head.appendChild(harmonyCursorStyle);
  }

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

/* FINAL MOBILE MENU — shared across internal project pages */
(()=>{
  const button=document.querySelector('[data-menu-button], .menu-button');
  if(!button) return;
  if(!button.hasAttribute('data-menu-button')) button.setAttribute('data-menu-button','');

  let menu=document.querySelector('[data-mobile-menu]');
  if(!menu){
    menu=document.createElement('div');
    menu.className='mobile-menu';
    menu.setAttribute('data-mobile-menu','');
    menu.innerHTML='<a href="home-preview-v36-mobile-final.html#work">WORK</a><a href="home-preview-v36-mobile-final.html#about">ABOUT</a><a href="assets/Hila-Shaked-Resume.pdf" target="_blank" rel="noopener">RESUME</a><a href="#contact">CONTACT</a>';
    document.body.appendChild(menu);
  }

  const setOpen=(open)=>{
    menu.classList.toggle('open',open);
    button.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
  };
  button.addEventListener('click',()=>setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
})();
