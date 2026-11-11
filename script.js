// ============================================
// THREE HARMONICS — shared runtime
// ============================================

// --- Theme toggle ---
(function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    syncIcon(next);
  });
  syncIcon(document.documentElement.dataset.theme);
  function syncIcon(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll('.icon-sun').forEach(el => el.style.display = isDark ? 'none' : '');
    document.querySelectorAll('.icon-moon').forEach(el => el.style.display = isDark ? '' : 'none');
  }
})();

// --- Reading progress bar ---
(function () {
  const bar = document.getElementById('progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.width = (scrolled * 100) + '%';
  }, { passive: true });
})();

// --- Hero waves: three harmonics + their composite ---
(function () {
  const host = document.getElementById('hero-waves');
  if (!host) return;
  const W = 1200, H = 320, mid = H / 2;
  const NS = 'http://www.w3.org/2000/svg';

  function makePath(cycles, amplitude, phase) {
    const steps = 240;
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const y = mid + amplitude * Math.sin((2 * Math.PI * cycles * i / steps) + phase);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
    }
    return d;
  }

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');

  [
    { cycles: 1, amp: 70, phase: 0,           w: 1.2, o: 0.9 },
    { cycles: 2, amp: 40, phase: Math.PI / 3, w: 1,   o: 0.5 },
    { cycles: 3, amp: 22, phase: Math.PI / 2, w: 0.9, o: 0.3 },
  ].forEach(s => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', makePath(s.cycles, s.amp, s.phase));
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'var(--accent)');
    p.setAttribute('stroke-width', s.w);
    p.setAttribute('stroke-opacity', s.o);
    p.setAttribute('vector-effect', 'non-scaling-stroke');
    p.setAttribute('stroke-linecap', 'round');
    svg.appendChild(p);
  });

  // Composite — the actual signal that reaches the boundary
  {
    const steps = 240;
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = t * W;
      const y = mid
        + 70 * Math.sin(2 * Math.PI * 1 * t + 0)
        + 40 * Math.sin(2 * Math.PI * 2 * t + Math.PI / 3)
        + 22 * Math.sin(2 * Math.PI * 3 * t + Math.PI / 2);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
    }
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'var(--ink)');
    p.setAttribute('stroke-width', '0.8');
    p.setAttribute('stroke-opacity', '0.2');
    p.setAttribute('vector-effect', 'non-scaling-stroke');
    p.setAttribute('stroke-linecap', 'round');
    svg.appendChild(p);
  }

  host.appendChild(svg);
})();

// --- Fade-in on scroll ---
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => obs.observe(el));
})();

// --- Year ---
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
