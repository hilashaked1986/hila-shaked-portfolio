(() => {
  const canvases = [...document.querySelectorAll('[data-ambient-air]')];
  if (!canvases.length) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const random = (min, max) => min + Math.random() * (max - min);

  canvases.forEach((canvas) => {
    const section = canvas.parentElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!section || !ctx) return;

    const count = Math.max(1, Number(canvas.dataset.count || 64));
    const baseOpacity = clamp(Number(canvas.dataset.opacity || 0.28), 0.05, 0.55);
    const speed = clamp(Number(canvas.dataset.speed || 0.01), 0.002, 0.03);

    let width = 1;
    let height = 1;
    let dpr = 1;
    let animationFrame = 0;
    let lastTime = performance.now();
    let isVisible = true;

    const particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      radius: index % 17 === 0 ? random(0.72, 1.05) : random(0.28, 0.68),
      alpha: baseOpacity * random(0.62, 1),
      vx: random(-speed, speed),
      vy: random(-speed * 0.8, speed * 0.8),
      phaseX: random(0, Math.PI * 2),
      phaseY: random(0, Math.PI * 2),
      phaseSpeedX: random(0.00012, 0.0003),
      phaseSpeedY: random(0.0001, 0.00026),
      fibre: index % 19 === 0,
      length: random(1.8, 3.6),
      angle: random(-0.45, 0.45),
      soft: index % 6 === 0
    }));

    const resize = () => {
      const rect = section.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      const delta = Math.min(40, time - lastTime);
      lastTime = time;

      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((particle) => {
          particle.phaseX += delta * particle.phaseSpeedX;
          particle.phaseY += delta * particle.phaseSpeedY;
          particle.x += ((particle.vx * delta) / width) + Math.sin(particle.phaseX) * 0.000006;
          particle.y += ((particle.vy * delta) / height) + Math.cos(particle.phaseY) * 0.000006;

          if (particle.x < -0.025) particle.x = 1.025;
          if (particle.x > 1.025) particle.x = -0.025;
          if (particle.y < -0.025) particle.y = 1.025;
          if (particle.y > 1.025) particle.y = -0.025;

          const x = particle.x * width;
          const y = particle.y * height;
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = '#f3eee6';
          ctx.strokeStyle = '#f3eee6';
          ctx.shadowColor = '#f3eee6';
          ctx.shadowBlur = particle.soft ? 1.8 : 0;

          if (particle.fibre) {
            ctx.translate(x, y);
            ctx.rotate(particle.angle);
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(-particle.length / 2, 0);
            ctx.lineTo(particle.length / 2, 0.25);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        });
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { rootMargin: '180px 0px' });

    observer.observe(section);
    resize();
    window.addEventListener('resize', resize, { passive: true });
    animationFrame = requestAnimationFrame(draw);

    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    }, { once: true });
  });
})();
