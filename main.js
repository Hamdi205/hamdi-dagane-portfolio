(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Tema (lys/mørk)
  const root = document.documentElement;
  const storedTheme = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
  const saveTheme = (t) => { try { localStorage.setItem('theme', t); } catch (e) {} };
  root.dataset.theme = storedTheme() || 'light';
  $('#themeBtn').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    saveTheme(next);
  });

  $('#year').textContent = new Date().getFullYear();

  // Tellere
  const animateCount = (el) => {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1100, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Scroll-animasjon, tellere og studiefremdrift.
  // Elementer som er passert ved et hopp (f.eks. via menyen), skal også vises.
  const showEl = (el) => {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    $$('[data-count]', el).forEach(animateCount);
    if (el.id === 'edu') {
      const bar = $('#eduBar');
      if (bar) bar.style.width = bar.dataset.width + '%';
    }
  };
  const revealPass = () => {
    $$('.reveal:not(.in), .stats:not(.in)').forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight * 0.9) showEl(el);
    });
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) showEl(en.target); });
  }, { threshold: 0 });
  $$('.reveal, .stats').forEach(el => io.observe(el));
  addEventListener('scroll', revealPass, { passive: true });
  addEventListener('resize', revealPass);
  revealPass();
  addEventListener('load', revealPass);

  // Bildevisning (lightbox) for galleriet
  const lb = $('#lightbox');
  if (lb) {
    const lbImg = $('#lightboxImg');
    const closeLb = () => { lb.classList.remove('open'); lbImg.removeAttribute('src'); };
    $$('.shot, .pic').forEach(btn => btn.addEventListener('click', () => {
      lbImg.src = btn.dataset.src;
      lbImg.alt = btn.dataset.alt;
      lb.classList.add('open');
    }));
    lb.addEventListener('click', closeLb);
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeLb(); });
  }
  // Videoen i banneret loopes. Med redusert bevegelse vises bare posteret.
  const bannerVideo = $('.banner.collage video.bg');
  if (bannerVideo && reduceMotion) { bannerVideo.pause(); bannerVideo.removeAttribute('autoplay'); }

  // Broen i banneret: 3D-tilt mot musen, og et lite parallax-løft når man scroller.
  // Kun aktiv uten redusert bevegelse.
  const bannerEl = $('.banner.collage');
  const bridge = $('.banner.collage .bg');
  if (bannerEl && bridge && !reduceMotion) {
    let tiltX = 0, tiltY = 0, shift = 0;
    const paint = () => {
      bridge.style.transform = `perspective(1000px) translateY(${shift}px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) scale(1.12)`;
    };
    const onScroll = () => {
      const r = bannerEl.getBoundingClientRect();
      shift = Math.max(Math.min(-r.top * 0.1, 14), -14);
      paint();
    };
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      bannerEl.addEventListener('pointermove', (e) => {
        const r = bannerEl.getBoundingClientRect();
        tiltX = ((e.clientX - r.left) / r.width - 0.5) * 10;
        tiltY = -((e.clientY - r.top) / r.height - 0.5) * 7;
        paint();
      });
      bannerEl.addEventListener('pointerleave', () => { tiltX = 0; tiltY = 0; paint(); });
    }
    addEventListener('scroll', onScroll, { passive: true });
  }
})();
