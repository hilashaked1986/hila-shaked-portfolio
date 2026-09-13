(()=>{
  /* SKYHAWK desktop only:
     Keep intro first. Inside the gallery the order is HERO -> VIDEO -> rest. */
  const skyGallery=document.querySelector('.sky-gallery');
  if(skyGallery && window.matchMedia('(min-width:901px)').matches){
    const hero=skyGallery.querySelector(':scope > .cp-frame--hero');
    const video=skyGallery.querySelector(':scope > .cp-video--opening');
    if(hero && video){
      /* If an earlier fix moved the video outside the gallery, bring it back. */
      if(video.parentElement !== skyGallery) skyGallery.prepend(video);

      /* Force the approved sequence: hero first, video second. */
      skyGallery.prepend(hero);
      hero.after(video);

      /* Remove any old temporary class/style from the previous fix. */
      video.classList.remove('sky-opening-video-final');
      document.getElementById('sky-opening-video-final-style')?.remove();

    const skySizeStyle=document.createElement('style');
    skySizeStyle.id='skyhawk-size-restore-final-style';
    skySizeStyle.textContent=`
      @media (min-width:901px){
        .sky-gallery{display:block!important}
        .sky-gallery > .cp-frame,
        .sky-gallery > .sky-pair{
          width:100%!important;
          margin-left:0!important;
          margin-right:0!important;
        }
        .sky-gallery > .cp-frame + .cp-frame,
        .sky-gallery > .cp-frame + .sky-pair,
        .sky-gallery > .sky-pair + .cp-frame{
          margin-top:18px!important;
        }
        .sky-gallery > .cp-frame img{
          display:block!important;
          width:100%!important;
          height:auto!important;
          max-height:none!important;
          object-fit:contain!important;
          object-position:center!important;
        }
        .sky-gallery > .cp-video video{
          display:block!important;
          width:100%!important;
          height:auto!important;
          aspect-ratio:1920/950!important;
          object-fit:cover!important;
        }
      }
    `;
    document.head.appendChild(skySizeStyle);
    }
  }

  /* HARMONY ONLY — keep the scoped cursor protection. */
  if(document.body.classList.contains('harmony-page')){
    const harmonyCursorStyle=document.createElement('style');
    harmonyCursorStyle.id='harmony-custom-cursor-final-style';
    harmonyCursorStyle.textContent=`
      @media (hover:hover) and (pointer:fine){
        html.has-custom-cursor body.harmony-page,
        html.has-custom-cursor body.harmony-page a,
        html.has-custom-cursor body.harmony-page button{cursor:none!important}

        body.harmony-page .custom-cursor{
          display:block!important;visibility:visible!important;position:fixed!important;
          inset:0!important;z-index:2147483000!important;pointer-events:none!important;
          opacity:0!important;transition:opacity .12s ease!important;
        }
        body.harmony-page .custom-cursor.is-visible{opacity:1!important}
        body.harmony-page .custom-cursor__ring,
        body.harmony-page .custom-cursor__dot{
          display:block!important;visibility:visible!important;position:fixed!important;
          left:0!important;top:0!important;pointer-events:none!important;border-radius:50%!important;
          will-change:transform!important;
        }
        body.harmony-page .custom-cursor__ring{
          width:30px!important;height:30px!important;border:1px solid #b8a792!important;
          background:transparent!important;box-sizing:border-box!important;
        }
        body.harmony-page .custom-cursor__dot{
          width:4px!important;height:4px!important;background:#b8a792!important;opacity:1!important;
        }
        body.harmony-page .custom-cursor__label{
          display:block!important;position:absolute!important;inset:0!important;
          font:400 7px/1 Inter,Arial,sans-serif!important;letter-spacing:.14em!important;
          color:#f4f1eb!important;opacity:0!important;
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__ring{
          width:64px!important;height:64px!important;background:rgba(15,16,18,.78)!important;
          backdrop-filter:blur(4px)!important;
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__dot{opacity:0!important}
        body.harmony-page .custom-cursor.is-project .custom-cursor__label{
          display:grid!important;place-items:center!important;opacity:1!important;
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

  const clearState=()=>cursor.classList.remove('is-project','is-interactive');
  const updateState=()=>{
    const el=document.elementFromPoint(mouseX,mouseY);
    if(!el){clearState();return}
    const project=el.closest('.work-card-v5,.cp-more__card');
    const interactive=el.closest('a,button,[role="button"]');
    cursor.classList.toggle('is-project',Boolean(project));
    cursor.classList.toggle('is-interactive',Boolean(interactive)&&!project);
  };
  const show=()=>{if(!visible){visible=true;cursor.classList.add('is-visible')}};
  const hide=()=>{visible=false;cursor.classList.remove('is-visible');clearState()};

  const render=()=>{
    ringX+=(mouseX-ringX)*.18; ringY+=(mouseY-ringY)*.18;
    ring.style.transform=`translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
    dot.style.transform=`translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(render);
  };
  render();

  window.addEventListener('pointermove',e=>{
    mouseX=e.clientX;mouseY=e.clientY;show();updateState();
  },{passive:true});
  window.addEventListener('scroll',updateState,{passive:true});
  window.addEventListener('blur',hide);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});
  document.addEventListener('mouseleave',hide);
  window.addEventListener('pointerdown',updateState,{passive:true});
  window.addEventListener('pointerup',updateState,{passive:true});
})();

/* ===== MOBILE-ONLY FINAL PATCH ===== */
(()=>{
  if(!window.matchMedia('(max-width:900px)').matches) return;

  /* Slightly reduce the visual density of the ambient particles on mobile only.
     Desktop is untouched. */
  document.querySelectorAll('.hero [data-ambient-air], .about-v14 [data-ambient-air]').forEach((canvas)=>{
    canvas.style.opacity='0.84';
  });

  /* The homepage already has its own menu controller in script.js.
     Do NOT bind a second click handler there, otherwise one handler opens
     while the other immediately closes the menu. */
  const isHome=Boolean(document.querySelector('.hero[data-hero]'));
  if(isHome) return;

  let header=document.querySelector('.site-header');
  if(!header) return;

  let button=header.querySelector('[data-menu-button], .menu-button');
  if(!button){
    button=document.createElement('button');
    button.className='menu-button';
    button.setAttribute('data-menu-button','');
    button.setAttribute('aria-label','Open menu');
    button.setAttribute('aria-expanded','false');
    button.innerHTML='<span></span><span></span>';
    header.appendChild(button);
  }else if(!button.hasAttribute('data-menu-button')){
    button.setAttribute('data-menu-button','');
  }

  let menu=document.querySelector('[data-mobile-menu]');
  if(!menu){
    menu=document.createElement('div');
    menu.className='mobile-menu';
    menu.setAttribute('data-mobile-menu','');
    menu.innerHTML=
      '<a href="home-preview-v36-mobile-final.html#work">WORK</a>'+
      '<a href="home-preview-v36-mobile-final.html#about">ABOUT</a>'+
      '<a href="assets/Hila-Shaked-Resume.pdf" target="_blank" rel="noopener">RESUME</a>'+
      '<a href="#contact">CONTACT</a>';
    document.body.appendChild(menu);
  }

  /* Self-contained mobile menu styling so it works consistently on every
     internal project page, including Harmony where the hamburger was missing. */
  if(!document.getElementById('mobile-menu-final-fix-style')){
    const style=document.createElement('style');
    style.id='mobile-menu-final-fix-style';
    style.textContent=`
      @media (max-width:900px){
        .site-header .menu-button{
          display:flex!important;
          position:relative!important;
          z-index:10002!important;
          width:34px!important;
          height:34px!important;
          padding:0!important;
          margin:0!important;
          border:0!important;
          background:transparent!important;
          align-items:center!important;
          justify-content:center!important;
          flex-direction:column!important;
          gap:6px!important;
          cursor:pointer!important;
        }
        .site-header .menu-button span{
          display:block!important;
          width:22px!important;
          height:1px!important;
          background:#f4f1eb!important;
          transform-origin:center!important;
          transition:transform .25s ease,opacity .2s ease!important;
        }
        .site-header .menu-button[aria-expanded="true"] span:first-child{
          transform:translateY(3.5px) rotate(45deg)!important;
        }
        .site-header .menu-button[aria-expanded="true"] span:last-child{
          transform:translateY(-3.5px) rotate(-45deg)!important;
        }
        .mobile-menu{
          display:flex!important;
          position:fixed!important;
          inset:0!important;
          z-index:10000!important;
          padding:110px 24px 42px!important;
          background:#0f1012!important;
          flex-direction:column!important;
          align-items:center!important;
          justify-content:center!important;
          gap:30px!important;
          opacity:0!important;
          visibility:hidden!important;
          pointer-events:none!important;
          transform:translateY(-8px)!important;
          transition:opacity .25s ease,transform .25s ease,visibility .25s ease!important;
        }
        .mobile-menu.open{
          opacity:1!important;
          visibility:visible!important;
          pointer-events:auto!important;
          transform:none!important;
        }
        .mobile-menu a{
          color:#f4f1eb!important;
          text-decoration:none!important;
          font-family:Inter,Arial,sans-serif!important;
          font-size:13px!important;
          font-weight:400!important;
          letter-spacing:.24em!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const setOpen=(open)=>{
    menu.classList.toggle('open',open);
    button.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
  };

  /* Clone the button to remove any stale listeners from earlier page-specific code. */
  const cleanButton=button.cloneNode(true);
  button.replaceWith(cleanButton);
  button=cleanButton;

  button.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>setOpen(false));
  });
})();
