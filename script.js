/* =============================================
   CEVIM - Centro Educacional Vidal Miguez
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---- MENU HAMBÚRGUER ---- */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    navMobile.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fecha o menu ao clicar em qualquer link dentro dele
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      navMobile.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach(el => revealObserver.observe(el));

  /* ---- CONTADOR ANIMADO ---- */
  function animateCounter(el, target, duration = 1400) {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, parseInt(entry.target.dataset.count, 10));
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(el => counterObserver.observe(el));

  /* ---- FORMULÁRIO ---- */
  const form = document.getElementById('form-matricula');
  const toast = document.getElementById('toast');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const nome = form.querySelector('#nome').value.trim();
      const telefone = form.querySelector('#telefone').value.trim();
      const aluno = form.querySelector('#aluno').value.trim();

      if (!nome || !telefone || !aluno) {
        showToast('Preencha todos os campos obrigatórios.', 'erro');
        return;
      }

      const btn = form.querySelector('.form-btn');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Mensagem enviada!';
        showToast('Recebemos seu contato! Falaremos em breve. ⭐');
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Quero garantir a vaga';
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  function showToast(msg, tipo = 'ok') {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.background = tipo === 'erro' ? '#A01C2A' : '#1B87C5';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    desktopLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? 'var(--amarelo)'
        : '';
    });
  }, { passive: true });

});
