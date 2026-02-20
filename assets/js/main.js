// ─── Nav scroll fade ───────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--visible', window.scrollY > 80);
}, { passive: true });

// ─── Scroll reveal ─────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Counter animation ─────────────────────────────────────────────────────
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function countUp(card) {
  const target = parseInt(card.dataset.target, 10);
  const counterEl = card.querySelector('.counter');
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    counterEl.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => counterObserver.observe(card));

// ─── Claude banner typing animation ────────────────────────────────────────
(function () {
  const el = document.getElementById('claude-typed');
  if (!el) return;
  const text = '4 minutes and 37 seconds';
  let i = 0;

  function typeNext() {
    if (i < text.length) {
      el.textContent = text.slice(0, ++i);
      setTimeout(typeNext, 55 + Math.random() * 45);
    } else {
      el.classList.add('is-done');
    }
  }

  const bannerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bannerObserver.unobserve(entry.target);
        setTimeout(typeNext, 400);
      }
    });
  }, { threshold: 0.3 });

  bannerObserver.observe(el.closest('.claude-banner'));
})();

// ─── Smooth scroll for anchor links ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
