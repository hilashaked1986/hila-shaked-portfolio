(() => {
  const canvases = [...document.querySelectorAll("[data-v35-air]")];
  if (!canvases.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const configs = {
    hero: {
      density: 0.000038,
      minCount: 54,
      opacityMin: 0.07,
      opacityMax: 0.22,
      radiusMin: 0.35,
      radiusMax: 1.15,
      speedMin: 0.004,
      speedMax: 0.014,
      driftMin: 0.004,
      driftMax: 0.018
    },
    about: {
      density: 0.000044,
      minCount: 68,
      opacityMin: 0.06,
      opacityMax: 0.20,
      radiusMin: 0.32,
      radiusMax: 1.05,
      speedMin: 0.003,
      speedMax: 0.012,
      driftMin: 0.004,
      driftMax: 0.016
    }
  };

  const random = (min, max) => min + Math.random() * (max - min);

  canvases.forEach((canvas) => {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const type = canvas.dataset.density === "about" ? "about" : "hero";
    const config = configs[type];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let frameId = 0;
    let lastTime = performance.now();

    const makeParticle = () => {
      const angle = random(0, Math.PI * 2);
      const speed = random(config.speedMin, config.speedMax);

      return {
        x: random(0, width),
        y: random(0, height),
        radius: random(config.radiusMin, config.radiusMax),
        alpha: random(config.opacityMin, config.opacityMax),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        phaseX: random(0, Math.PI * 2),
        phaseY: random(0, Math.PI * 2),
        driftX: random(config.driftMin, config.driftMax),
        driftY: random(config.driftMin, config.driftMax),
        phaseSpeedX: random(0.00015, 0.00042),
        phaseSpeedY: random(0.00012, 0.00038)
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.max(
        config.minCount,
        Math.round(width * height * config.density)
      );

      particles = Array.from({ length: targetCount }, makeParticle);
    };

    const draw = (time) => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.phaseX += p.phaseSpeedX * delta;
        p.phaseY += p.phaseSpeedY * delta;

        p.x += (p.vx + Math.sin(p.phaseX) * p.driftX) * delta;
        p.y += (p.vy + Math.cos(p.phaseY) * p.driftY) * delta;

        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;

        const glowRadius = p.radius * 2.6;
        const glow = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        );

        glow.addColorStop(0, `rgba(213,198,174,${p.alpha})`);
        glow.addColorStop(0.45, `rgba(197,181,157,${p.alpha * 0.34})`);
        glow.addColorStop(1, "rgba(184,167,146,0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frameId = requestAnimationFrame(draw);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        lastTime = performance.now();
        frameId = requestAnimationFrame(draw);
      }
    });
  });
})();
