// Smooth scroll for internal links
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;
  const id = target.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Theme toggle
(function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggleBtn.textContent = next === 'dark' ? 'Thème clair' : 'Thème sombre';
  });
})();

// Copy promo code
(function initCopyCode() {
  const codeEl = document.getElementById('promoCode');
  const copyBtn = document.getElementById('copyCodeBtn');
  const statusEl = document.getElementById('copyStatus');

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeEl.textContent.trim());
      statusEl.textContent = 'Copié !';
      statusEl.style.opacity = '1';
      setTimeout(() => { statusEl.style.opacity = '0'; statusEl.textContent = ''; }, 1500);
    } catch {
      statusEl.textContent = 'Impossible de copier.';
    }
  });
})();

// Countdown (72h)
(function initCountdown() {
  const now = new Date();
  const deadline = new Date(now.getTime() + 72 * 60 * 60 * 1000);
  const $days = document.getElementById('days');
  const $hours = document.getElementById('hours');
  const $minutes = document.getElementById('minutes');
  const $seconds = document.getElementById('seconds');

  function update() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      $days.textContent = '00';
      $hours.textContent = '00';
      $minutes.textContent = '00';
      $seconds.textContent = '00';
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    $days.textContent = String(d).padStart(2, '0');
    $hours.textContent = String(h).padStart(2, '0');
    $minutes.textContent = String(m).padStart(2, '0');
    $seconds.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
})();

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question');
  const a = item.querySelector('.faq-answer');
  q.addEventListener('click', () => {
    const isOpen = a.style.display === 'block';
    a.style.display = isOpen ? 'none' : 'block';
  });
});

// Micro-interactions
document.addEventListener('DOMContentLoaded', () => {
  // Glow on app cards
  document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('mouseover', () => card.style.boxShadow = '0 16px 42px rgba(2,184,221,.25)');
    card.addEventListener('mouseout', () => card.style.boxShadow = 'none');
  });
});