(()=>{
  /* =========================
     DESKTOP: Skyhawk order/size
     ========================= */
  const skyGallery=document.querySelector('.sky-gallery');
  if(skyGallery && window.matchMedia('(min-width:901px)').matches){
    const hero=skyGallery.querySelector(':scope > .cp-frame--hero');
    const video=skyGallery.querySelector(':scope > .cp-video--opening');
    if(hero && video){
      if(video.parentElement!==skyGallery) skyGallery.prepend(video);
      skyGallery.prepend(hero);
      hero.after(video);

      const s=document.createElement('style');
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

  /* =========================
     CTA + ABOUT separators
     ========================= */
  const globalStyle=document.createElement('style');
  globalStyle.id='portfolio-final-ui-style';
  globalStyle.textContent=`
    /* CTA: same weight and same hover behavior for BOTH homepage buttons */
    .site-cta,
    .site-cta .cta-label{
      font-weight:500!important;
      color:#b8a792!important;
    }
    .site-cta .arrow-mark{
      color:#b8a792!important;
      fill:currentColor!important;
    }
    .site-cta:hover,
    .site-cta:focus-visible,
    .site-cta:hover .cta-label,
    .site-cta:focus-visible .cta-label,
    .site-cta:hover .arrow-mark,
    .site-cta:focus-visible .arrow-mark{
      color:#f4f1eb!important;
    }
    .site-cta:hover .arrow-mark,
    .site-cta:focus-visible .arrow-mark{
      fill:currentColor!important;
    }

    /* ABOUT: exact two-line divider height */
    .about-v14__expertise{
      border-top:1px solid rgba(184,167,146,.58)!important;
    }
    .about-v14__expertise span{
      position:relative!important;
      border-left:0!important;
    }
    .about-v14__expertise span + span::before{
      content:""!important;
      position:absolute!important;
      left:0!important;
      top:0!important;
      bottom:auto!important;
      width:1px!important;
      height:2.76em!important; /* exactly 2 lines at line-height 1.38 */
      background:rgba(184,167,146,.58)!important;
      pointer-events:none!important;
    }

    @media(max-width:900px){
      .about-v14__expertise{
        border-top-color:rgba(184,167,146,.64)!important;
      }
      .about-v14__expertise span + span::before{
        height:2.70em!important; /* exactly 2 lines at mobile line-height 1.35 */
        background:rgba(184,167,146,.64)!important;
      }
    }
  `;
  document.head.appendChild(globalStyle);

  /* =========================
     Harmony cursor
     ========================= */
  if(document.body.classList.contains('harmony-page')){
    const s=document.createElement('style');
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
          left:0!important;top:0!important;pointer-events:none!important;border-radius:50%!important
        }
        body.harmony-page .custom-cursor__ring{
          width:30px!important;height:30px!important;border:1px solid #b8a792!important;
          background:transparent!important;box-sizing:border-box!important
        }
        body.harmony-page .custom-cursor__dot{
          width:4px!important;height:4px!important;background:#b8a792!important
        }
        body.harmony-page .custom-cursor__label{
          position:absolute!important;inset:0!important;
          font:400 7px/1 Inter,Arial,sans-serif!important;
          letter-spacing:.14em!important;color:#f4f1eb!important;opacity:0!important
        }
        body.harmony-page .custom-cursor.is-project .custom-cursor__ring{
          width:64px!important;height:64px!important;background:rgba(15,16,18,.78)!important
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
      const update=()=>{
        const el=document.elementFromPoint(mx,my);
        if(!el){clear();return}
        const project=el.closest('.work-card-v5,.cp-more__card');
        const interactive=el.closest('a,button,[role="button"]');
        cursor.classList.toggle('is-project',Boolean(project));
        cursor.classList.toggle('is-interactive',Boolean(interactive)&&!project);
      };
      const render=()=>{
        rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
        ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
        dot.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
        requestAnimationFrame(render);
      };
      render();

      addEventListener('pointermove',e=>{
        mx=e.clientX; my=e.clientY;
        if(!visible){visible=true;cursor.classList.add('is-visible')}
        update();
      },{passive:true});
      addEventListener('scroll',update,{passive:true});
      addEventListener('blur',()=>{visible=false;cursor.classList.remove('is-visible');clear()});
      document.addEventListener('mouseleave',()=>{visible=false;cursor.classList.remove('is-visible');clear()});
    }
  }

  /* =========================
     MOBILE ONLY
     ========================= */
  const mq=window.matchMedia('(max-width:900px)');
  if(!mq.matches) return;

  const isHome=Boolean(document.querySelector('.hero[data-hero]'));

  /* Home opens at Hero unless a section hash was explicitly requested */
  if(isHome && !location.hash){
    try{history.scrollRestoration='manual'}catch(e){}
    const toTop=()=>window.scrollTo(0,0);
    toTop();
    requestAnimationFrame(toTop);
    addEventListener('pageshow',()=>requestAnimationFrame(toTop),{once:true});
  }

  /* Slightly reduce particle presence */
  if(isHome){
    document.querySelectorAll('.hero [data-ambient-air],.about-v14 [data-ambient-air]')
      .forEach(c=>c.style.opacity='0.84');
  }

  /* =========================
     HOME RAIL — continuous movement on the line
     ========================= */
  if(isHome){
    const rail=document.querySelector('.page-rail');
    const marker=rail?.querySelector('.page-rail__marker');
    const index=rail?.querySelector('.page-rail__index');

    const s=document.createElement('style');
    s.id='mobile-rail-v6-style';
    s.textContent=`
      @media(max-width:900px){
        .page-rail__marker{
          background:transparent!important;
          padding:10px 8px!important;
          transition:none!important;
          will-change:top!important;
        }
        .page-rail.is-changing .page-rail__marker{
          opacity:1!important;
          transform:none!important;
        }
        .page-rail__index{
          position:relative!important;
          z-index:2!important;
          transition:color .2s ease!important;
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
          transition:background .2s ease!important;
        }
        .page-rail__label{
          position:relative!important;
          z-index:3!important;
          background:transparent!important;
        }
        .page-rail.is-contact .page-rail__index{
          color:#171719!important;
        }
        .page-rail.is-contact .page-rail__index::before{
          background:#f4f0eb!important;
        }
      }
    `;
    document.head.appendChild(s);

    let raf=0;

    const railSections=[
      document.querySelector('#work'),
      document.querySelector('#about'),
      document.querySelector('#contact')
    ].filter(Boolean);

    const setRailText=(section)=>{
      if(!section||!index) return;
      const value=section.dataset.railIndex || (
        section.id==='work'?'01':section.id==='about'?'02':'03'
      );
      index.textContent=value;
      rail.classList.toggle('is-contact',value==='03');
    };

    const moveRail=()=>{
      raf=0;
      if(!rail||!marker||!index||railSections.length<3) return;

      const railRect=rail.getBoundingClientRect();
      const markerH=marker.offsetHeight;
      const minTop=0;
      const maxTop=Math.max(0,rail.clientHeight-markerH);

      const work=railSections[0];
      const about=railSections[1];
      const contact=railSections[2];

      /* The marker follows scroll continuously, but the three headings are
         exact snap/reference points on that continuous path. */
      const workY=work.offsetTop;
      const aboutY=about.offsetTop;
      const contactY=contact.offsetTop;
      const endY=Math.max(contactY+contact.offsetHeight-window.innerHeight,contactY+1);

      const y=window.scrollY + window.innerHeight*0.42;

      let p;
      if(y<=aboutY){
        const d=Math.max(1,aboutY-workY);
        p=0.5*Math.max(0,Math.min(1,(y-workY)/d));
        setRailText(work);
      }else if(y<contactY){
        const d=Math.max(1,contactY-aboutY);
        p=0.5+0.5*Math.max(0,Math.min(1,(y-aboutY)/d));
        setRailText(about);
      }else{
        p=1;
        setRailText(contact);
      }

      marker.style.setProperty('top',`${minTop+p*(maxTop-minTop)}px`,'important');
    };

    const scheduleRail=()=>{
      if(!raf) raf=requestAnimationFrame(moveRail);
    };

    addEventListener('scroll',scheduleRail,{passive:true});
    addEventListener('resize',scheduleRail,{passive:true});
    addEventListener('load',scheduleRail,{once:true});
    scheduleRail();
  }

  /* =========================
     INTERNAL PAGES MENU
     same spacing as homepage + reliable X
     ========================= */
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
      if(button.querySelectorAll('span').length<2){
        button.innerHTML='<span></span><span></span>';
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

      /* A dedicated close control inside the overlay guarantees the X is
         visible above every project-specific header/menu implementation. */
      let closeButton=menu.querySelector('.mobile-menu__close-final');
      if(!closeButton){
        closeButton=document.createElement('button');
        closeButton.className='mobile-menu__close-final';
        closeButton.type='button';
        closeButton.setAttribute('aria-label','Close menu');
        menu.prepend(closeButton);
      }

      const s=document.createElement('style');
      s.id='internal-menu-v8-style';
      s.textContent=`
        @media(max-width:900px){
          .site-header{
            padding-left:var(--pad,22px)!important;
            padding-right:var(--pad,22px)!important;
          }
          .site-header .desktop-nav,.site-header>nav{display:none!important}

          /* CLOSED: exact homepage hamburger proportions */
          .site-header .menu-button{
            display:block!important;
            width:42px!important;height:42px!important;min-width:42px!important;
            padding:10px!important;margin:0!important;
            border:0!important;background:none!important;color:#fff!important;
            position:relative!important;z-index:10022!important;
          }
          .site-header .menu-button span{
            display:block!important;
            position:static!important;
            width:22px!important;height:1px!important;
            padding:0!important;
            margin:7px 0!important;
            background:currentColor!important;
            transform:none!important;
          }
          .site-header .menu-button::before,
          .site-header .menu-button::after{content:none!important}

          /* While overlay is open, its own X is used. */
          .site-header .menu-button[aria-expanded="true"]{
            visibility:hidden!important;
          }

          body>.mobile-menu[data-mobile-menu]{
            display:flex!important;position:fixed!important;inset:0!important;
            z-index:10030!important;background:#0f1012!important;
            padding:100px 24px 44px!important;box-sizing:border-box!important;
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

          .mobile-menu__close-final{
            display:block!important;
            position:fixed!important;
            top:29px!important;
            right:var(--pad,22px)!important;
            width:42px!important;height:42px!important;
            margin:0!important;padding:0!important;
            border:0!important;background:transparent!important;
            z-index:10040!important;
          }
          .mobile-menu__close-final::before,
          .mobile-menu__close-final::after{
            content:""!important;
            position:absolute!important;
            left:10px!important;top:20px!important;
            width:22px!important;height:1px!important;
            background:#fff!important;
            transform-origin:center!important;
          }
          .mobile-menu__close-final::before{transform:rotate(45deg)!important}
          .mobile-menu__close-final::after{transform:rotate(-45deg)!important}
        }
      `;
      document.head.appendChild(s);

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

      closeButton.addEventListener('click',e=>{
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
      });

      menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
    }
  }

  /* =========================
     IXDEN — keep only original row
     ========================= */
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
  }
})();