/* Bytes Eletrônicos · landing de vendas.
   Sem GSAP (CDN fora) ou com movimento reduzido: tudo legível e clicável, sem preloader. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const ANIM = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!ANIM) document.documentElement.classList.add('rm');

  // WhatsApp: vendas por padrão, suporte quando o elemento tem [data-sup]
  const WA = { v: '5569992928687', s: '5569993827505' };
  const setWa = (a, msg, sup = a.hasAttribute('data-sup')) => { a.href = `https://wa.me/${sup ? WA.s : WA.v}?text=${encodeURIComponent(msg)}`; a.target = '_blank'; a.rel = 'noopener'; };
  const bindWa = (root = document) => $$('[data-wa]', root).forEach((a) => setWa(a, a.dataset.wa));
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- 2 · Vitrine (preços do byteseletronicos.com.br) ---------- */
  const P = {
    ip17p: { n: 'iPhone 17 Pro', s: '256 GB', img: 'iphone-17-pro', cash: '7.897', inst: '753,39' },
    x17u: { n: 'Xiaomi 17 Ultra', s: '16 GB RAM · 512 GB', img: 'xiaomi-17-ultra', cash: '8.077', inst: '748,09', pix: 1 },
    x17t: { n: 'Xiaomi 17T Pro', s: '12 GB RAM · 512 GB', img: 'xiaomi-17t-pro', cash: '5.657', inst: '523,92', pix: 1 },
    f8: { n: 'POCO F8 Pro', s: '12 GB RAM · 256 GB', img: 'poco-f8-pro', cash: '3.897', inst: '361,42', pix: 1 },
    x8: { n: 'POCO X8 Pro Max', s: '12 GB RAM · 256 GB', img: 'poco-x8-pro-max', cash: '3.447', inst: '319,75', pix: 1 },
    rn15: { n: 'Redmi Note 15 Pro+', s: '8 GB RAM · 256 GB', img: 'redmi-note-15-pro', cash: '2.667', inst: '247,25', pix: 1 },
    ip14p: { n: 'iPhone 14 Pro', s: '128 GB', img: 'iphone-14-pro', cash: '3.497', inst: '333,62', used: 1 },
    ip14pm: { n: 'iPhone 14 Pro Max', s: '128 GB', img: 'iphone-14-pro-max', cash: '3.300', inst: '314,83', used: 1 },
  };
  const LIST = { novo: ['ip17p', 'x17u', 'x17t', 'f8', 'x8', 'rn15'], usado: ['ip14p', 'ip14pm'] };
  const card = (p) => `<article class="pc">
      <span class="pc__tag${p.used ? ' pc__tag--used' : ''}">${p.used ? 'Seminovo' : 'Novo'}</span>
      <div class="pc__img"><img src="assets/img/p/${p.img}.webp" alt="${p.n}" loading="lazy" decoding="async"></div>
      <h3>${p.n}</h3><p class="pc__spec">${p.s} · 1 ano de garantia${p.used ? ' · conferido' : ''}</p>
      <p class="pc__price"><small>12x de</small><b>R$ ${p.inst}</b><span>ou R$ ${p.cash} ${p.pix ? 'no Pix' : 'à vista'}</span></p>
      <a class="btn btn--block" href="#" data-wa="Olá! Vim pelo site e tenho interesse no ${p.n} ${p.s}${p.used ? ' (seminovo)' : ''}. Está disponível?"><span class="btn__t"><span>Comprar no WhatsApp</span></span></a>
    </article>`;
  const box = $('[data-cards]'), tg = $('[data-toggle]'), pill = $('i', tg);
  const fill = (k) => { box.innerHTML = LIST[k].map((id) => card(P[id])).join(''); bindWa(box); };
  const movePill = () => { const b = $('[aria-pressed="true"]', tg); pill.style.width = `${b.offsetWidth}px`; pill.style.transform = `translateX(${b.offsetLeft - 5}px)`; };
  fill('novo');
  $$('button', tg).forEach((b) => b.addEventListener('click', () => {
    if (b.getAttribute('aria-pressed') === 'true') return;
    $$('button', tg).forEach((x) => x.setAttribute('aria-pressed', x === b)); movePill();
    if (!ANIM) return fill(b.dataset.k);
    gsap.to(box.children, { autoAlpha: 0, y: -12, duration: 0.25, stagger: 0.03, ease: 'power2.in', overwrite: true, onComplete: () => {
      fill(b.dataset.k);
      ScrollTrigger.refresh();
      gsap.fromTo(box.children, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' });
    } });
  }));
  addEventListener('resize', movePill);
  document.fonts.ready.then(movePill);
  bindWa();

  /* ---------- Navbar: fica sólida depois do topo e some ao descer ---------- */
  const nav = $('[data-nav]');
  let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle('is-solid', y > 40);
    nav.classList.toggle('is-hidden', y > 600 && y > lastY);
    lastY = y;
  };
  if (!ANIM) { addEventListener('scroll', () => onScroll(scrollY), { passive: true }); return; }

  /* =================== Animação =================== */
  // Regras: só transform/opacity/clip-path (nada de filter em scroll). O Lenis faz a suavização e os
  // scrubs ficam colados nele (scrub: true) pra não "arrastar" duas vezes. No hero a intro usa y (px)
  // e o scroll usa yPercent: são componentes separados do transform, então não brigam.
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'expo.out', duration: 1.1 });
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const t = a.getAttribute('href');
    if (t.length > 1 && $(t)) { e.preventDefault(); lenis.scrollTo(t, { offset: t === '#topo' ? 0 : -20, duration: 1.4 }); }
  }));
  const mm = gsap.matchMedia();

  // Reveal em lote: um ScrollTrigger.batch por grupo em vez de um gatilho por elemento
  const reveal = (sel, from, start = 'top 90%') => {
    const els = typeof sel === 'string' ? $$(sel) : sel;
    if (!els.length) return;
    gsap.set(els, { autoAlpha: 0, ...from });
    ScrollTrigger.batch(els, { start, once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, x: 0, y: 0, stagger: 0.08, overwrite: true }) });
  };

  /* ---------- Preloader → intro do hero (espera fontes e o iPhone) ---------- */
  lenis.stop();
  const heroImg = $('.hero__phone');
  const ready = Promise.all([document.fonts.ready, heroImg.complete ? 1 : new Promise((r) => { heroImg.onload = heroImg.onerror = r; })]);
  const num = $('.loader__n'), bar = $('.loader__bar i');
  const count = { v: 0 };
  const paint = () => { num.textContent = Math.round(count.v); bar.style.transform = `scaleX(${count.v / 100})`; };
  const load = gsap.to(count, { v: 90, duration: 1.3, ease: 'power2.out', onUpdate: paint });
  gsap.set(['.hero__word', heroImg, '[data-hero-in]', '.hero .glass', nav], { autoAlpha: 0 });
  ready.then(() => {
    const title = SplitText.create('[data-hero-title]', { type: 'lines', mask: 'lines' });
    gsap.set(title.lines, { yPercent: 110 });
    gsap.timeline({ delay: Math.max(0, 1.3 - load.time()) })
      .to(count, { v: 100, duration: 0.25, ease: 'none', onUpdate: paint })
      .to('.loader', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' })
      .set('.loader', { display: 'none' })
      .add(() => lenis.start())
      .fromTo('.hero__word', { autoAlpha: 0, scale: 0.9, y: 40 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.8 }, '-=0.5')
      .fromTo(heroImg, { autoAlpha: 0, y: 160, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.6 }, '<0.1')
      .to(title.lines, { yPercent: 0, stagger: 0.1 }, '<0.35')
      .fromTo('[data-hero-in]', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, '<0.25')
      .fromTo('.hero .glass', { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, stagger: 0.12, ease: 'back.out(1.4)' }, '<0.1')
      .fromTo(nav, { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, clearProps: 'transform' }, '<');
  });

  /* ---------- Hero: parallax em camadas + inclinação leve pelo mouse (desktop) ---------- */
  const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: heroST })
    .to('.hero__word', { yPercent: -22 }, 0)
    .to(heroImg, { yPercent: -6 }, 0)
    .to('.hero__in', { yPercent: 18 }, 0);
  $$('[data-float]').forEach((el) => gsap.to(el, { y: +el.dataset.float * 120, ease: 'none', scrollTrigger: heroST }));
  mm.add('(min-width: 861px) and (pointer: fine)', () => {
    gsap.set(heroImg, { transformPerspective: 1000 });
    const rx = gsap.quickTo(heroImg, 'rotationX', { duration: 1.2, ease: 'power3.out' });
    const ry = gsap.quickTo(heroImg, 'rotationY', { duration: 1.2, ease: 'power3.out' });
    const wx = gsap.quickTo('.hero__word', 'x', { duration: 1.6, ease: 'power3.out' });
    const hero = $('.hero');
    const move = (e) => {
      const px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5;
      ry(px * 10); rx(-py * 8); wx(px * -40);
    };
    hero.addEventListener('pointermove', move);
    return () => hero.removeEventListener('pointermove', move);
  });

  /* ---------- Títulos ---------- */
  document.fonts.ready.then(() => {
    $$('[data-lines]').forEach((el) => SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (s) =>
      gsap.from(s.lines, { yPercent: 110, duration: 1.2, stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }) }));
    $$('[data-chars]').forEach((el) => SplitText.create(el, { type: 'lines,chars', mask: 'lines', charsClass: 'ch', autoSplit: true, onSplit: (s) =>
      gsap.from(s.chars, { yPercent: 105, duration: 1.2, stagger: 0.025, scrollTrigger: { trigger: el, start: 'top 82%', once: true } }) }));
    ScrollTrigger.refresh();
  });

  /* ---------- Reveals ---------- */
  reveal('.shop .label, .toggle', { y: 20 });
  reveal([...box.children], { y: 50 }, 'top 92%');
  reveal('.shop__more, .why .label, .lab__logo', { y: 20 });
  reveal('.svc li', { y: 24 });
  reveal('.lab .btn--orange, .close .row > *, .close__meta', { y: 24 });
  reveal('.foot__top > *, .foot__bottom > *', { y: 30 }, 'top 96%');

  /* BytesLab: cortina no mockup e parallax por dentro */
  $$('[data-curtain]').forEach((el) => gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));
  $$('[data-par]').forEach((el) => gsap.fromTo(el, { yPercent: -+el.dataset.par }, { yPercent: +el.dataset.par, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } }));

  /* ---------- Vantagens: pilha pinada. Cada card fica parado um trecho (leitura) antes do próximo subir;
     o de baixo recua e escurece por overlay (sem filter) e a borda de cima continua aparecendo ---------- */
  const stackEl = $('.stack'), stack = $$('.stack__c');
  stack.forEach((c) => c.append(Object.assign(document.createElement('i'), { className: 'stack__dim' })));
  mm.add({ desk: '(min-width: 761px)', mob: '(max-width: 760px)' }, (ctx) => {
    const { desk } = ctx.conditions;
    stackEl.classList.add('stack--pin');
    const READ = 1; // trecho parado por card, do mesmo tamanho da subida do próximo
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      trigger: stackEl, start: () => `top ${Math.max(desk ? 100 : 84, (innerHeight - stackEl.offsetHeight) / 2 + 30)}px`, // centraliza a pilha abaixo da nav
      end: () => `+=${tl.duration() * innerHeight * 0.6}`, // 60% da tela de scroll por unidade da timeline
      pin: true, scrub: true, invalidateOnRefresh: true } });
    tl.to({}, { duration: READ });
    stack.slice(1).forEach((c, i) => {
      const prev = stack[i];
      // entra de fora da tela (y = altura da janela): nenhum card espia por baixo da pilha antes da vez dele
      tl.fromTo(c, { y: () => innerHeight }, { y: 0, duration: 1, ease: 'power2.inOut' })
        // o de baixo só recua quando o novo já cobre metade: dá pra terminar de ler enquanto ele sobe
        .to(prev, { scale: 0.92, yPercent: -5, duration: 0.6, ease: 'power2.inOut' }, '<0.4')
        .to($('.stack__dim', prev), { opacity: 0.6, duration: 0.6 }, '<')
        .to({}, { duration: READ });
    });
    return () => stackEl.classList.remove('stack--pin');
  });

  /* ---------- Rodapé: sobe por baixo da última seção (padrão KeyCode) ---------- */
  gsap.fromTo('[data-foot] > .wrap', { yPercent: -20 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '[data-foot]', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
