(()=>{
  /* =========================================================
     DESKTOP — keep the already-approved Skyhawk fix only.
     ========================================================= */
  const skyGallery=document.querySelector('.sky-gallery');
  if(skyGallery && window.matchMedia('(min-width:901px)').matches){
    const hero=skyGallery.querySelector(':scope > .cp-frame--hero');
    const video=skyGallery.querySelector(':scope > .cp-video--opening');
    if(hero && video){
      if(video.parentElement!==skyGallery) skyGallery.prepend(video);
      skyGallery.prepend(hero);
      hero.after(video);

      const s=document.createElement('style');
      s.id='skyhawk-size-restore-final-style';
      s.textContent=`
        @media(min-width:901px){
          .sky-gallery{display:block!important}
          .sky-gallery>.cp-frame,.sky-gallery>.sky-pair{
            width:100%!important;margin-left:0!important;margin-right:0!important
          }
          .sky-gallery>.cp-frame+.cp-frame,
          .sky-gallery>.cp-frame+.sky-pair,
          .sky-gallery>.sky-pair+.cp-frame{margin-top:18px!important}
          .sky-gallery>.cp-frame img{
            display:block!important;width:100%!important;height:auto!important;
            max-height:none!important;object-fit:contain!important;object-position:center!important
          }
          .sky-gallery>.cp-video video{
            display:block!important;width:100%!important;height:auto!important;
            aspect-ratio:1920/950!important;object-fit:cover!important
          }
        }
      `;
      document.head.appendChild(s);
    }
  }

  /* =========================================================
     CTA — approved weight + same color on desktop and mobile.
     ========================================================= */
  const ctaStyle=document.createElement('style');
  ctaStyle.id='cta-approved-final-style';
  ctaStyle.textContent=`
    .site-cta,
    .site-cta .cta-label{
      font-weight:500!important;
      color:#b8a792!important;
    }
  `;
  document.head.appendChild(ctaStyle);

  /* =========================================================
     HARMONY / SHARED DESKTOP CURSOR
     ========================================================= */
  if(document.body.classList.contains('harmony-page')){
    const s=document.createElement('style');
    s.id='harmony-custom-cursor-final-style';
    s.textContent=`
      @media(hover:hover) and (pointer:fine){
        html.has-custom-cursor body.harmony-page,
        html.has-custom-cursor body.harmony-page a,
        html.has-custom-cursor body.harmony-page button{cursor:none!important}
        body.harmony-page .custom-cursor{
          display:block!important;visibility:visible!important;position:fixed!important;
          inset:0!important;z-index:2147483000!important;pointer-events:none!important;
          opacity:0!important;transition:opacity .12s ease!important
        }
        body.harmony-page .custom-cursor.is-visible{opacity:1!important}
        body.harmony-page .custom-cursor__ring,
        body.harmony-page .custom-cursor__dot{
          display:block!important;visibility:visible!important;position:fixed!important;
          left:0!important;top:0!important;pointer-events:none!important;border-radius:50%!important;
          will-change:transform!important
        }
        body.harmony-page .custom-cursor__ring{
          width:30px!important;height:30px!important;border:1px solid #b8a792!important;
          background:transparent!important;box-sizing:border-box!important
        }
        body.harmony-page .custom-cursor__dot{
          width:4px!important;height:4px!important;background:#b8a792!important;opacity:1!important
        }
        body.harmony-page .custom-cursor__label{
          display:block!important;position:absolute!important;inset:0!important;
          font:400 7px/1 Inter,Arial,sans-serif!important;letter-spacing:.14em!important;
          color:#f4f1eb!important;opacity:0!important
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__ring{
          width:64px!important;height:64px!important;background:rgba(15,16,18,.78)!important;
          backdrop-filter:blur(4px)!important
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__dot{opacity:0!important}
        body.harmony-page .custom-cursor.is-project .custom-cursor__label{
          display:grid!important;place-items:center!important;opacity:1!important
        }
      }
    `;
    document.head.appendChild(s);
  }

  const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
  if(fine.matches){
    const cursor=document.querySelector('.custom-cursor');
    const ring=cursor?.querySelector('.custom-cursor__ring');
    const dot=cursor?.querySelector('.custom-cursor__dot');

    if(cursor && ring && dot){
      document.documentElement.classList.add('has-custom-cursor');
      let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,visible=false;

      const clear=()=>cursor.classList.remove('is-project','is-interactive');
      const state=()=>{
        const el=document.elementFromPoint(mx,my);
        if(!el){clear();return}
        const project=el.closest('.work-card-v5,.cp-more__card');
        const interactive=el.closest('a,button,[role="button"]');
        cursor.classList.toggle('is-project',Boolean(project));
        cursor.classList.toggle('is-interactive',Boolean(interactive)&&!project);
      };
      const show=()=>{if(!visible){visible=true;cursor.classList.add('is-visible')}};
      const hide=()=>{visible=false;cursor.classList.remove('is-visible');clear()};

      const render=()=>{
        rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
        ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
        dot.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
        requestAnimationFrame(render);
      };
      render();

      addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;show();state()},{passive:true});
      addEventListener('scroll',state,{passive:true});
      addEventListener('blur',hide);
      document.addEventListener('mouseleave',hide);
      document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});
    }
  }

  /* =========================================================
     MOBILE ONLY
     ========================================================= */
  const mq=window.matchMedia('(max-width:900px)');
  if(!mq.matches) return;

  const isHome=Boolean(document.querySelector('.hero[data-hero]'));

  /* Slightly fewer-looking particles — only mobile. */
  if(isHome){
    document.querySelectorAll('.hero [data-ambient-air],.about-v14 [data-ambient-air]')
      .forEach(c=>c.style.opacity='0.84');
  }

  /* Normal homepage load always starts at Hero.
     Explicit #work / #about / #contact links are respected. */
  if(isHome && !location.hash){
    try{history.scrollRestoration='manual'}catch(e){}
    const toTop=()=>window.scrollTo(0,0);
    toTop();
    requestAnimationFrame(toTop);
    addEventListener('pageshow',()=>requestAnimationFrame(toTop),{once:true});
  }

  /* ---------------------------------------------------------
     HOME RAIL
     01 background ends immediately after the number.
     01 -> SELECTED WORK
     02 -> VIEW RESUME
     03 -> GET IN TOUCH
     --------------------------------------------------------- */
  if(isHome){
    const s=document.createElement('style');
    s.id='mobile-rail-final-style';
    s.textContent=`
      @media(max-width:900px){
        .page-rail__marker{
          background:transparent!important;
          padding:10px 8px!important;
        }
        .page-rail__index{
          position:relative!important;
          z-index:2!important;
        }
        .page-rail__index::before{
          content:""!important;
          position:absolute!important;
          z-index:-1!important;
          left:-8px!important;
          top:-10px!important;
          width:calc(100% + 13px)!important;
          height:calc(100% + 18px)!important;
          background:#0f1012!important;
        }
        .page-rail__label{
          position:relative!important;
          z-index:3!important;
          background:transparent!important;
        }
      }
    `;
    document.head.appendChild(s);

    const rail=document.querySelector('.page-rail');
    const marker=rail?.querySelector('.page-rail__marker');
    const index=rail?.querySelector('.page-rail__index');

    const getAnchor=(n)=>{
      if(n==='01') return document.querySelector('.hero .site-cta');
      if(n==='02') return document.querySelector('.about-v14__resume');
      if(n==='03') return document.querySelector('.contact-final__label');
      return null;
    };

    const alignRail=()=>{
      if(!rail||!marker||!index) return;
      const n=(index.textContent||'').trim();
      const anchor=getAnchor(n);
      if(!anchor) return;

      const rr=rail.getBoundingClientRect();
      const ar=anchor.getBoundingClientRect();

      /* Important: align the NUMBER, not the label below it. */
      const numberCenter=index.offsetTop+(index.offsetHeight/2);
      let top=(ar.top+(ar.height/2))-rr.top-numberCenter;

      const max=Math.max(0,rail.clientHeight-marker.offsetHeight);
      top=Math.max(0,Math.min(max,top));
      marker.style.top=`${top}px`;
    };

    const schedule=()=>requestAnimationFrame(()=>requestAnimationFrame(alignRail));
    addEventListener('scroll',schedule,{passive:true});
    addEventListener('resize',schedule,{passive:true});
    addEventListener('load',schedule,{once:true});
    if(index){
      new MutationObserver(schedule).observe(index,{childList:true,subtree:true,characterData:true});
    }
    schedule();
  }

  /* ---------------------------------------------------------
     INTERNAL PAGES — same hamburger geometry as homepage.
     42x42, 10px padding, same horizontal header padding,
     and transforms into X.
     --------------------------------------------------------- */
  if(!isHome){
    const header=document.querySelector('.site-header');
    if(header){
      let button=header.querySelector('[data-menu-button],.menu-button');

      if(!button){
        button=document.createElement('button');
        button.className='menu-button';
        button.setAttribute('data-menu-button','');
        button.setAttribute('aria-label','Open menu');
        button.innerHTML='<span></span><span></span>';
        header.appendChild(button);
      }
      button.classList.add('menu-button');
      button.setAttribute('data-menu-button','');
      button.setAttribute('aria-expanded','false');
      if(button.querySelectorAll('span').length<2) button.innerHTML='<span></span><span></span>';

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

      const s=document.createElement('style');
      s.id='internal-menu-home-match-style';
      s.textContent=`
        @media(max-width:900px){
          .site-header{
            padding-left:var(--pad,22px)!important;
            padding-right:var(--pad,22px)!important;
          }
          .site-header .desktop-nav,.site-header>nav{display:none!important}
          .site-header .menu-button{
            display:block!important;
            width:42px!important;height:42px!important;min-width:42px!important;
            padding:10px!important;margin:0!important;
            border:0!important;background:none!important;color:#fff!important;
            position:relative!important;z-index:10022!important;
          }
          .site-header .menu-button span{
            display:block!important;
            width:22px!important;height:1px!important;
            margin:7px 0!important;
            background:currentColor!important;
            transform-origin:center!important;
            transition:transform .22s ease,opacity .18s ease!important;
          }
          .site-header .menu-button[aria-expanded="true"] span:first-child{
            transform:translateY(4px) rotate(45deg)!important;
          }
          .site-header .menu-button[aria-expanded="true"] span:last-child{
            transform:translateY(-4px) rotate(-45deg)!important;
          }
          body>.mobile-menu[data-mobile-menu]{
            display:flex!important;position:fixed!important;inset:0!important;
            z-index:10018!important;background:#0f1012!important;
            padding:100px 24px 44px!important;
            flex-direction:column!important;align-items:center!important;justify-content:center!important;
            gap:30px!important;opacity:0!important;visibility:hidden!important;
            pointer-events:none!important;transition:opacity .22s ease,visibility .22s ease!important;
          }
          body>.mobile-menu[data-mobile-menu].open{
            opacity:1!important;visibility:visible!important;pointer-events:auto!important;
          }
          body>.mobile-menu[data-mobile-menu] a{
            color:#f4f1eb!important;text-decoration:none!important;
            font:400 13px/1.2 Inter,Arial,sans-serif!important;letter-spacing:.24em!important;
          }
        }
      `;
      document.head.appendChild(s);

      /* Remove any old page-specific click listeners. */
      const clean=button.cloneNode(true);
      button.replaceWith(clean);
      button=clean;

      const setOpen=(open)=>{
        menu.classList.toggle('open',open);
        button.setAttribute('aria-expanded',String(open));
        document.body.style.overflow=open?'hidden':'';
      };

      button.addEventListener('click',e=>{
        e.preventDefault();
        e.stopPropagation();
        setOpen(!menu.classList.contains('open'));
      });
      menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
    }
  }

  /* ---------------------------------------------------------
     IXDEN — ONLY original icon strip.
     Remove the accidental second generated row.
     Keep it centered and slightly smaller.
     --------------------------------------------------------- */
  const ix=document.querySelector('.ix-icons--single');
  if(ix){
    ix.querySelectorAll('.ix-mobile-icons-grid-final,.ix-mobile-icons-grid-final-v2')
      .forEach(el=>el.remove());

    const original=ix.querySelector('img');
    if(original){
      original.style.setProperty('display','block','important');
      original.style.setProperty('width','88%','important');
      original.style.setProperty('max-width','88%','important');
      original.style.setProperty('height','auto','important');
      original.style.setProperty('margin','0 auto','important');
      original.style.setProperty('transform','none','important');
    }

    const s=document.createElement('style');
    s.id='ixden-original-icons-mobile-style';
    s.textContent=`
      @media(max-width:900px){
        .ix-icons--single{
          display:flex!important;width:100%!important;
          justify-content:center!important;align-items:center!important;
        }
        .ix-icons--single>img{
          display:block!important;width:88%!important;max-width:88%!important;
          height:auto!important;margin:0 auto!important;transform:none!important;
        }
        .ix-mobile-icons-grid-final,.ix-mobile-icons-grid-final-v2{display:none!important}
      }
    `;
    document.head.appendChild(s);
  }
})();