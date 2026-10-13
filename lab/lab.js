/* Laboratório Bytes Eletrônicos · rodada 1.
   Sem GSAP (ou com movimento reduzido) tudo continua legível e clicável. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ANIM = hasGSAP && !RM;
  if (!ANIM) document.documentElement.classList.add('no-anim');

  // WhatsApp: vendas por padrão, suporte quando o elemento tem [data-sup]
  const WA = { v: '5569992928687', s: '5569993827505' };
  const wa = (msg, sup) => `https://wa.me/${sup ? WA.s : WA.v}?text=${encodeURIComponent(msg)}`;
  const setWa = (a, msg, sup = a.hasAttribute('data-sup')) => { a.href = wa(msg, sup); a.target = '_blank'; a.rel = 'noopener'; };
  const bindWa = (root = document) => $$('[data-wa]', root).forEach((a) => setWa(a, a.dataset.wa));
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Produtos e preços reais do byteseletronicos.com.br
  const IMG = (n) => `../assets/img/p/${n}.webp`;
  const P = {
    ip17p: { n: 'iPhone 17 Pro', s: '256 GB', img: 'iphone-17-pro', cash: '7.897', inst: '753,39', cond: 'Novo' },
    ip14p: { n: 'iPhone 14 Pro', s: '128 GB', img: 'iphone-14-pro', cash: '3.497', inst: '333,62', cond: 'Seminovo' },
    ip14pm: { n: 'iPhone 14 Pro Max', s: '128 GB', img: 'iphone-14-pro-max', cash: '3.300', inst: '314,83', cond: 'Seminovo' },
    x17u: { n: 'Xiaomi 17 Ultra', s: '16 GB RAM · 512 GB', img: 'xiaomi-17-ultra', cash: '8.077', inst: '748,09', pix: 1, cond: 'Novo' },
    x17t: { n: 'Xiaomi 17T Pro', s: '12 GB RAM · 512 GB', img: 'xiaomi-17t-pro', cash: '5.657', inst: '523,92', pix: 1, cond: 'Novo' },
    f8: { n: 'POCO F8 Pro', s: '12 GB RAM · 256 GB', img: 'poco-f8-pro', cash: '3.897', inst: '361,42', pix: 1, cond: 'Novo' },
    x8: { n: 'POCO X8 Pro Max', s: '12 GB RAM · 256 GB', img: 'poco-x8-pro-max', cash: '3.447', inst: '319,75', pix: 1, cond: 'Novo' },
    rn15: { n: 'Redmi Note 15 Pro+', s: '8 GB RAM · 256 GB', img: 'redmi-note-15-pro', cash: '2.667', inst: '247,25', pix: 1, cond: 'Novo' },
    boom: { n: 'JBL Boombox 4', s: 'Caixa de som Bluetooth', img: 'jbl-boombox-4', cash: '2.897', inst: '276,38', cond: 'Novo' },
    tune: { n: 'JBL Tune 780NC', s: 'Fone com cancelamento de ruído', img: 'jbl-tune-780nc', cash: '693', inst: '66,11', cond: 'Novo' },
    watch: { n: 'Redmi Watch 5', s: 'Smartwatch', img: 'redmi-watch-5', cash: '867', inst: '82,71', cond: 'Novo' },
    buds: { n: 'Redmi Buds 8 Lite', s: 'Fone Bluetooth', img: 'redmi-buds', cash: '287', inst: '27,38', cond: 'Novo' },
  };
  const cashTxt = (p) => `ou R$ ${p.cash} ${p.pix ? 'no Pix' : 'à vista'}`;
  const msg = (p) => `Olá! Vim pelo site e tenho interesse no ${p.n} ${p.s}. Está disponível?`;
  const card = (p) => `<article class="pc">
      <span class="pc__tag${p.cond === 'Seminovo' ? ' pc__tag--used' : ''}">${p.cond}</span>
      <div class="pc__img"><img src="${IMG(p.img)}" alt="${p.n}" loading="lazy" decoding="async"></div>
      <h3>${p.n}</h3><p class="pc__spec">${p.s} · 1 ano de garantia</p>
      <p class="pc__price"><small>12x de</small><b>R$ ${p.inst}</b><span>${cashTxt(p)}</span></p>
      <a class="btn btn--block" href="#" data-wa="${msg(p)}"><span class="btn__t"><span>Comprar no WhatsApp</span></span></a>
    </article>`;
  const fill = (box, keys) => { box.innerHTML = keys.map((k) => card(P[k])).join(''); bindWa(box); };

  /* ---------- 2A · abas ---------- */
  const TABS = { ios: ['ip17p', 'ip14p', 'ip14pm'], and: ['x17u', 'x17t', 'f8', 'x8', 'rn15'], aud: ['boom', 'tune', 'watch', 'buds'] };
  const box2a = $('[data-2a]');
  if (box2a) {
    fill(box2a, TABS.ios);
    $$('[data-tabs] button').forEach((b) => b.addEventListener('click', () => {
      $$('[data-tabs] button').forEach((x) => x.setAttribute('aria-selected', x === b));
      if (!ANIM) return fill(box2a, TABS[b.dataset.k]);
      gsap.to(box2a.children, { y: 16, opacity: 0, duration: 0.2, stagger: 0.03, ease: 'power2.in', onComplete: () => {
        fill(box2a, TABS[b.dataset.k]);
        gsap.from(box2a.children, { y: 30, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'expo.out' });
      } });
    }));
  }

  /* ---------- 2C · bento ---------- */
  const box2c = $('[data-2c]');
  if (box2c) {
    const B = [['ip17p', 'bc--big', 'Destaque'], ['f8', '', 'Android'], ['tune', '', 'Áudio'], ['boom', 'bc--wide', 'Som pra festa'], ['x17t', '', 'Câmera Leica'], ['watch', '', 'No pulso'], ['ip14p', 'bc--wide', 'Seminovo conferido']];
    box2c.innerHTML = B.map(([k, cls, tag]) => { const p = P[k]; return `<a class="bc ${cls}" href="#" data-wa="${msg(p)}">
      <img src="${IMG(p.img)}" alt="" loading="lazy" decoding="async"><div><small>${tag}</small><h3>${p.n}</h3></div>
      <p><b>12x R$ ${p.inst}</b><span>${cashTxt(p)}</span></p></a>`; }).join('');
    bindWa(box2c);
    $$('.bc', box2c).forEach((c) => c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
  }

  /* ---------- 2D · trilho ---------- */
  const box2d = $('[data-2d]');
  if (box2d) fill(box2d, ['ip17p', 'x17u', 'x17t', 'f8', 'x8', 'rn15', 'ip14p', 'boom', 'tune', 'watch']);

  /* ---------- 2E · novo x seminovo ---------- */
  const box2e = $('[data-2e]');
  if (box2e) {
    // ponytail: o site só lista 2 seminovos com foto hoje; entra o 3º quando chegar no estoque
    const E = { novo: ['ip17p', 'x17t', 'f8'], usado: ['ip14p', 'ip14pm'] };
    const tg = $('[data-2e-toggle]'), pill = $('i', tg);
    const movePill = (b) => { pill.style.width = `${b.offsetWidth}px`; pill.style.transform = `translateX(${b.offsetLeft - 5}px)`; };
    fill(box2e, E.novo);
    requestAnimationFrame(() => movePill($('[aria-pressed="true"]', tg)));
    $$('button', tg).forEach((b) => b.addEventListener('click', () => {
      $$('button', tg).forEach((x) => x.setAttribute('aria-pressed', x === b)); movePill(b);
      if (!ANIM) return fill(box2e, E[b.dataset.k]);
      gsap.to(box2e.children, { scale: 0.96, opacity: 0, duration: 0.2, stagger: 0.03, onComplete: () => {
        fill(box2e, E[b.dataset.k]);
        gsap.from(box2e.children, { y: 40, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'expo.out' });
      } });
    }));
    addEventListener('resize', () => movePill($('[aria-pressed="true"]', tg)));
  }

  /* ---------- 3E · simulador ---------- */
  const sel = $('[data-3e-sel]');
  if (sel) {
    const K = ['f8', 'ip17p', 'x17t', 'x8', 'rn15', 'ip14p', 'boom'];
    sel.innerHTML = K.map((k) => `<option value="${k}">${P[k].n} · ${P[k].s}</option>`).join('');
    const upd = (animate) => {
      const p = P[sel.value];
      $('[data-3e-img]').src = IMG(p.img); $('[data-3e-img]').alt = p.n;
      $('[data-3e-pix]').textContent = `R$ ${p.cash}`;
      $('[data-3e-card]').textContent = `12x R$ ${p.inst}`;
      setWa($('[data-3e-cta]'), `Olá! Vim pelo site e quero simular o pagamento do ${p.n} ${p.s} (Pix, cartão ou boleto).`);
      if (animate && ANIM) gsap.fromTo('[data-3e-img]', { y: 20, opacity: 0, rotate: -4 }, { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: 'expo.out' });
    };
    sel.addEventListener('change', () => upd(true)); upd(false);
  }

  /* ---------- 4C · painéis ---------- */
  const panels = $$('.acc4__p');
  const openP = (p) => panels.forEach((x) => x.classList.toggle('is-on', x === p));
  panels.forEach((p) => ['pointerenter', 'focus', 'click'].forEach((ev) => p.addEventListener(ev, () => openP(p))));

  /* ---------- 5C · atendimento guiado ---------- */
  const f5 = $('[data-5c]');
  if (f5) f5.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = f5.n.value.trim(), opt = $('input[name="o"]:checked', f5), err = $('.err', f5);
    err.hidden = !!name;
    if (!name) return f5.n.focus();
    open(wa(`Olá! Meu nome é ${name}. Vim pelo site e quero ${opt.value}.`, opt.hasAttribute('data-sup')), '_blank', 'noopener');
  });

  bindWa();

  // 2B dados (usados com e sem animação)
  const SW = [['ip17p', '#0B3AA8', 'iPhone · Novo'], ['f8', '#2A1466', 'Android · Novo'], ['x17t', '#14283A', 'Câmera Leica · Novo'], ['boom', '#C2410C', 'Áudio · Novo']];
  const sw = $('[data-2b]');
  const setSw = (i, animate) => {
    const [k, bg, tag] = SW[i], p = P[k];
    const apply = () => {
      $('[data-2b-tag]').textContent = tag; $('[data-2b-name]').textContent = p.n; $('[data-2b-spec]').textContent = `${p.s} · 1 ano de garantia`;
      $('[data-2b-inst]').textContent = `R$ ${p.inst}`; $('[data-2b-cash]').textContent = cashTxt(p);
      const img = $('[data-2b-img]'); img.src = IMG(p.img); img.alt = p.n;
      setWa($('[data-2b-cta]'), msg(p));
    };
    sw.style.setProperty('--sw', bg);
    $$('li', $('[data-2b-idx]')).forEach((li, k) => li.classList.toggle('is-on', k === i));
    if (!animate) return apply();
    gsap.timeline()
      .to(['.v2b__copy > *', '[data-2b-img]'], { y: -30, opacity: 0, duration: 0.25, stagger: 0.02, ease: 'power2.in' })
      .add(apply)
      .fromTo('.v2b__copy > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: 'expo.out' })
      .fromTo('[data-2b-img]', { y: 80, opacity: 0, rotate: 8, scale: 0.9 }, { y: 0, opacity: 1, rotate: 0, scale: 1, duration: 1, ease: 'expo.out' }, '<');
  };
  if (sw) { $('[data-2b-idx]').innerHTML = SW.map(() => '<li></li>').join(''); setSw(0, false); }

  if (!ANIM) {
    $$('[data-count]').forEach((el) => { el.textContent = fmt(+el.dataset.count, el); });
    return;
  }

  /* =================== Animação =================== */
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  gsap.defaults({ ease: 'expo.out' });
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const t = a.getAttribute('href'); if (t.length > 1 && $(t)) { e.preventDefault(); lenis.scrollTo(t, { offset: -20 }); } }));
  const SCRUB = 1.1;
  const mm = gsap.matchMedia();

  // Títulos por linha, fades, parallax, flutuantes e cortinas
  document.fonts.ready.then(() => {
    $$('[data-lines]').forEach((el) => SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (s) =>
      gsap.from(s.lines, { yPercent: 115, duration: 1.2, stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }) }));
    $$('[data-chars]').forEach((el) => SplitText.create(el, { type: 'chars', charsClass: 'ch', onSplit: (s) =>
      gsap.from(s.chars, { yPercent: 120, rotate: 8, opacity: 0, duration: 1.1, stagger: 0.03, scrollTrigger: { trigger: el, start: 'top 80%', once: true } }) }));
    ScrollTrigger.refresh();
  });
  $$('[data-fade]').forEach((el) => gsap.from(el, { y: 28, opacity: 0, duration: 1, scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  $$('[data-par]').forEach((el) => gsap.fromTo(el, { yPercent: -+el.dataset.par }, { yPercent: +el.dataset.par, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: SCRUB } }));
  $$('[data-float]').forEach((el) => gsap.to(el, { y: +el.dataset.float * 200, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: SCRUB } }));
  $$('[data-curtain]').forEach((el) => gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0 round 24px)' }, { clipPath: 'inset(0% 0 0 0 round 24px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));
  $$('[data-glow]').forEach((el) => {
    // ponytail: quebra por palavra no próprio DOM (inclui o <em>); SplitText não é necessário aqui
    const wrap = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach((t) => f.append(/\S/.test(t) ? Object.assign(document.createElement('span'), { className: 'w', textContent: t }) : t)); n.replaceWith(f); }
      else wrap(n);
    });
    wrap(el);
    gsap.to($$('.w', el), { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: SCRUB } });
  });

  /* 1A · entrada */
  gsap.from('.h1a__bg', { scale: 1.15, duration: 2.4, ease: 'power3.out' });

  /* 1B · camadas */
  gsap.from('.h1b__phone', { y: 160, opacity: 0, duration: 1.8, scrollTrigger: { trigger: '#v1b', start: 'top 70%', once: true } });
  gsap.from('.h1b__word', { opacity: 0, scale: 0.85, filter: 'blur(14px)', duration: 2, scrollTrigger: { trigger: '#v1b', start: 'top 70%', once: true } });
  gsap.from('#v1b .glass', { scale: 0.6, opacity: 0, duration: 1, stagger: 0.2, delay: 0.6, ease: 'back.out(1.7)', scrollTrigger: { trigger: '#v1b', start: 'top 70%', once: true } });

  /* 1C · PRO entrar na loja (desktop pina; mobile fica só a 1ª legenda) */
  mm.add({ d: '(min-width: 861px)', m: '(max-width: 860px)' }, (ctx) => {
    const caps = $$('.h1c__cap');
    if (ctx.conditions.m) { gsap.set(caps.slice(1), { autoAlpha: 0 }); return; }
    gsap.set(caps, { autoAlpha: 0 });
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.h1c__stage', start: 'top top', end: '+=420%', pin: true, scrub: 1 } });
    tl.to('.h1c__img:first-child', { scale: 1.9, duration: 0.5 }, 0)
      .to('.h1c__img:first-child', { opacity: 0, duration: 0.12 }, 0.38)
      .fromTo('.h1c__img--2', { opacity: 0, scale: 1.35 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.38)
      .to('.h1c__img--2', { scale: 1.25, opacity: 0, duration: 0.15 }, 0.7)
      .fromTo('.h1c__img--3', { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1.05, duration: 0.3 }, 0.7)
      .to('.h1c__bar i', { scaleX: 1, duration: 1 }, 0);
    caps.forEach((el, k) => {
      const at = +el.dataset.at, next = caps[k + 1];
      if (k) tl.fromTo(el, { autoAlpha: 0, y: 40, filter: 'blur(14px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.05 }, at);
      else gsap.set(el, { autoAlpha: 1 }); // a 1ª legenda já abre visível, sem tela vazia antes do scroll
      if (next) tl.to(el, { autoAlpha: 0, y: -40, filter: 'blur(14px)', duration: 0.05 }, +next.dataset.at - 0.06);
    });
  });

  /* 1E · leque abre */
  gsap.from('.h1e__fan img', { '--x': '0%', '--r': '0deg', y: 220, opacity: 0, duration: 1.6, stagger: { each: 0.08, from: 'center' }, scrollTrigger: { trigger: '.h1e__fan', start: 'top 85%', once: true } });

  /* 2A, 2C, 2E · cards sobem */
  ['[data-2a]', '[data-2c]', '[data-2e]', '.v3a__grid', '.v3e__card'].forEach((s) => $(s) && gsap.from($(s).children, { y: 60, opacity: 0, duration: 1.1, stagger: 0.08, scrollTrigger: { trigger: s, start: 'top 85%', once: true } }));

  mm.add('(min-width: 861px)', () => {
    /* 2B · switcher pinado */
    if (sw) {
      let cur = 0;
      ScrollTrigger.create({ trigger: sw, start: 'top top', end: `+=${SW.length * 80}%`, pin: true, onUpdate: (st) => {
        const i = Math.min(SW.length - 1, Math.floor(st.progress * SW.length));
        if (i !== cur) { cur = i; setSw(i, true); }
      } });
    }
    /* 2D · trilho horizontal */
    const track = $('[data-2d]');
    if (track) gsap.to(track, { x: () => -(track.scrollWidth - innerWidth + 40), ease: 'none', scrollTrigger: { trigger: '.v2d__pin', start: 'top top', end: () => `+=${track.scrollWidth - innerWidth}`, pin: true, scrub: SCRUB, invalidateOnRefresh: true } });
  });

  /* 3C · cards empilhados */
  const stack = $$('.stack__c');
  stack.slice(0, -1).forEach((c, k) => gsap.to(c, { scale: 0.88, rotate: k % 2 ? 1.5 : -1.5, filter: 'brightness(.55)', ease: 'none', scrollTrigger: { trigger: stack[k + 1], start: 'top bottom', end: 'top 90px', scrub: SCRUB } }));

  /* 3D · contadores e faixas */
  function fmt(v, el) { const d = +(el.dataset.dec || 0); return v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }) + (el.dataset.suf || ''); }
  $$('[data-count]').forEach((el) => { const o = { v: 0 }; gsap.to(o, { v: +el.dataset.count, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(o.v, el); }, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }); });
  gsap.fromTo('.band--l span', { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.v3d', start: 'top bottom', end: 'bottom top', scrub: SCRUB } });
  gsap.fromTo('.band--r span', { xPercent: -30 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.v3d', start: 'top bottom', end: 'bottom top', scrub: SCRUB } });

  /* 4A · lista */
  gsap.from('.v4a__logo', { opacity: 0, filter: 'blur(10px)', y: 20, duration: 1.4, scrollTrigger: { trigger: '.v4a', start: 'top 70%', once: true } });

  /* 4B · linha do reparo */
  const t4 = $('[data-4b]');
  if (t4) {
    const steps = $$('li', t4);
    const lit = (p) => steps.forEach((li, k) => li.classList.toggle('is-lit', p >= (k + 0.15) / steps.length));
    mm.add({ d: '(min-width: 761px)', m: '(max-width: 760px)' }, (ctx) => {
      gsap.fromTo('.v4b__line i', ctx.conditions.d ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none', scrollTrigger: { trigger: t4, start: 'top 70%', end: 'bottom 50%', scrub: SCRUB, onUpdate: (st) => lit(st.progress) } });
    });
  }

  /* 4D · foto fixa troca com o serviço */
  const imgs4d = $$('.v4d__fig img');
  $$('.v4d__list article').forEach((a, k) => ScrollTrigger.create({ trigger: a, start: 'top 60%', end: 'bottom 60%', onToggle: (st) => {
    if (!st.isActive) return;
    $$('.v4d__list article').forEach((x) => x.classList.toggle('is-on', x === a));
    imgs4d.forEach((im, j) => im.classList.toggle('is-on', j === k));
  } }));

  /* 5D · zoom lento na fachada */
  gsap.fromTo('.v5d__bg', { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.v5d', start: 'top bottom', end: 'bottom top', scrub: SCRUB } });
  gsap.from('.v5d__card', { y: 80, opacity: 0, duration: 1.3, scrollTrigger: { trigger: '.v5d', start: 'top 60%', once: true } });

  /* Rodapé */
  gsap.from('.foot__in > *', { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, scrollTrigger: { trigger: '.foot', start: 'top 95%', once: true } });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
