/* lesceller.com: tiny vanilla JS for the fun parts. No frameworks ツ */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (n) => Math.floor(Math.random() * n);

  /* Rain: Konami code, or click the ツ in the footer */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  addEventListener('keydown', (e) => {
    pos = e.key === KONAMI[pos] ? pos + 1 : e.key === KONAMI[0] ? 1 : 0;
    if (pos === KONAMI.length) { pos = 0; rain(); }
  });
  const grin = document.getElementById('grin');
  if (grin) grin.addEventListener('click', rain);

  function rain() {
    if (reduced || document.getElementById('rain')) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'rain';
    canvas.style.cssText =
      'position:fixed;inset:0;z-index:99;pointer-events:none;opacity:0;transition:opacity .6s';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = innerWidth;
    const H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    const CHARS = 'アイウエオカキクケコサシスセソタチテトツツツ0123456789ABCDEF₿';
    const fs = 16;
    const cols = Math.ceil(W / fs);
    const drops = Array.from({ length: cols }, () => -rand(40));
    const styles = getComputedStyle(document.documentElement);
    const head = styles.getPropertyValue('--accent-2').trim();
    const tail = styles.getPropertyValue('--accent').trim();
    requestAnimationFrame(() => (canvas.style.opacity = '1'));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.font = fs + 'px monospace';
      for (let i = 0; i < cols; i++) {
        for (let k = 0; k < 12; k++) {
          const y = (drops[i] - k) * fs;
          if (y < -fs || y > H + fs) continue;
          ctx.globalAlpha = k === 0 ? 0.9 : (1 - k / 12) * 0.5;
          ctx.fillStyle = k === 0 ? head : tail;
          ctx.fillText(CHARS[rand(CHARS.length)], i * fs, y);
        }
        drops[i] += 0.35 + Math.random() * 0.4;
        if ((drops[i] - 12) * fs > H) drops[i] = -rand(25);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    setTimeout(() => {
      canvas.style.opacity = '0';
      setTimeout(() => { cancelAnimationFrame(raf); canvas.remove(); }, 700);
    }, 6000);
  }

  /* For the curious */
  console.log(
    '%c QL %c lesceller.com',
    'background:linear-gradient(100deg,#4f46e5,#0891b2);color:#fff;padding:2px 6px;border-radius:4px;font-weight:bold',
    'color:inherit'
  );
  console.log('PGP  FC02 6616 3E51 8225 8D07  3E53 DEA8 6EB7 0675 71D4');
  console.log('ツ    psst: ↑ ↑ ↓ ↓ ← → ← → b a');
  console.log('🪄   mimblewimble!');
})();
