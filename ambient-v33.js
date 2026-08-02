(() => {
  const canvases = [...document.querySelectorAll("[data-v33-air]")];
  if (!canvases.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const configs = {
    hero: {
      density: 0.000052,
      opacityMin: 0.10,
      opacityMax: 0.34,
      radiusMin: 0.45,
      radiusMax: 1.55,
      accentChance: 0.10,
      accentRadiusMin: 1.7,
      accentRadiusMax: 3.1,
      speedMin: 0.018,
      speedMax: 0.050,
      drift: 0.016
    },
    about: {
      density: 0.000060,
      opacityMin: 0.09,
      opacityMax: 0.30,
      radiusMin: 0.42,
      radiusMax: 1.45,
      accentChance: 0.08,
      accentRadiusMin: 1.6,
      accentRadiusMax: 2.8,
      speedMin: 0.014,
      speedMax: 0.042,
      drift: 0.014
    }
  };

  const random = (min, max) => min + Math.random() * (max - min);

  canvases.forEach((canvas) => {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const type = canvas.dataset.density === "about" ? "about" : "hero";
    const config = configs[type];
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let lastTime = performance.now();

    const makeParticle = (initial = false) => {
      const accent = Math.random() < config.accentChance;
      const radius = accent
        ? random(config.accentRadiusMin, config.accentRadiusMax)
        : random(config.radiusMin, config.radiusMax);

      return {
        x: random(0, width),
        y: initial ? random(0, height) : height + radius * 3,
        radius,
        alpha: random(config.opacityMin, config.opacityMax) * (accent ? 1.05 : 1),
        vx: random(-config.drift, config.drift),
        vy: -random(config.speedMin, config.speedMax),
        phase: random(0, Math.PI * 2),
        phaseSpeed: random(0.00025, 0.00065)
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
        type === "hero" ? 72 : 88,
        Math.round(width * height * config.density)
      );

      particles = Array.from({ length: targetCount }, () => makeParticle(true));
    };

    const draw = (time) => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.phase += p.phaseSpeed * delta;
        p.x += (p.vx + Math.sin(p.phase) * 0.004) * delta;
        p.y += p.vy * delta;

        if (p.y < -p.radius * 4 || p.x < -20 || p.x > width + 20) {
          particles[i] = makeParticle(false);
          continue;
        }

        const glow = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * 3.2
        );
        glow.addColorStop(0, `rgba(213,198,174,${p.alpha})`);
        glow.addColorStop(0.38, `rgba(197,181,157,${p.alpha * 0.42})`);
        glow.addColorStop(1, "rgba(184,167,146,0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

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
