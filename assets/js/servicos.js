/* ===== JAVASCRIPT DA SEÇÃO DE SERVIÇOS ===== */
(function () {
  'use strict';

  // ===== CONFIGURAÇÕES =====
  const CONFIG = {
    animationDelay: 100,
    observerThreshold: 0.2,
    cardHoverScale: 1.02,
  };

  // ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
  const initScrollAnimations = () => {
    if (!('IntersectionObserver' in window)) {
      console.warn('Intersection Observer não suportado. Animações de scroll desabilitadas.');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: CONFIG.observerThreshold,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('servicos__card--visible');
          }, index * CONFIG.animationDelay);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todos os cards de serviço (inclui os novos .servicos__card--profile)
    document.querySelectorAll('.servicos__card').forEach(card => observer.observe(card));

    // Observar o cabeçalho e CTA
    const header = document.querySelector('.servicos__header');
    if (header) observer.observe(header);
    const cta = document.querySelector('.servicos__cta');
    if (cta) observer.observe(cta);
  };

  // ===== EFEITOS DE HOVER NOS CARDS =====
  const initCardHoverEffects = () => {
    const cards = document.querySelectorAll('.servicos__card');

    cards.forEach(card => {
      // paralaxe leve na imagem (mantido para compat; ignora se não houver imagem)
      card.addEventListener('mouseenter', function () {
        const img = this.querySelector('.servicos__img');
        if (img) img.style.transform = 'scale(1.1)';
      });

      card.addEventListener('mouseleave', function () {
        const img = this.querySelector('.servicos__img');
        if (img) img.style.transform = 'scale(1)';
      });

      // efeito 3D (desktop)
      card.addEventListener('mousemove', function (e) {
        if (window.innerWidth < 768) return;
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * 5;
        const rotateY = ((x - cx) / cx) * -5;
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  };

  // ===== BOTÃO DE STATUS - micro interação =====
  const initStatusButton = () => {
    const statusBtns = document.querySelectorAll('.profile__status-btn');
    statusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // toggle visual leve (não altera texto, preserva "Waiting")
        btn.classList.toggle('is-pulse');
        // efeito ripple opcional
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // estilo inline mínimo para o ripple sem tocar no CSS global
    const style = document.createElement('style');
    style.textContent = `
      .profile__status-btn { position: relative; overflow: hidden; }
      .profile__status-btn .ripple{
        position:absolute; inset:auto;
        width:200px;height:200px; border-radius:50%;
        opacity:.2; transform:scale(0);
        background: #fff;
        left:50%; top:50%; translate:-50% -50%;
        animation:ripple .6s ease-out forwards;
        pointer-events:none;
      }
      @keyframes ripple { to { transform:scale(1); opacity:0; } }
      .profile__status-btn.is-pulse{ box-shadow:0 0 0 8px rgba(255,255,255,.06) inset }
    `;
    document.head.appendChild(style);
  };

  // ===== TRACKING DE CLIQUES (mantido) =====
  const initAnalyticsTracking = () => {
    const buttons = document.querySelectorAll('.servicos__card-btn, .servicos__cta-btn, .profile__status-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const serviceName =
          this.closest('.servicos__card')?.querySelector('.profile__name')?.textContent ||
          this.closest('.servicos__card')?.querySelector('.servicos__card-title')?.textContent ||
          'CTA Geral';

        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            'event_category': 'Serviços',
            'event_label': serviceName,
            'value': 1
          });
        }
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead', { content_name: serviceName, content_category: 'Serviços' });
        }
      });
    });
  };

  // ===== LAZY LOADING (mantido) =====
  const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('.servicos__img').forEach(img => img.loading = 'lazy');
    } else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            obs.unobserve(img);
          }
        });
      });
      document.querySelectorAll('.servicos__img').forEach(img => io.observe(img));
    }
  };

  // ===== ACESSIBILIDADE (mantido) =====
  const initKeyboardNavigation = () => {
    document.querySelectorAll('.servicos__card').forEach(card => {
      const button = card.querySelector('.profile__status-btn, .servicos__card-btn');
      if (button) {
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
          }
        });
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      }
    });
  };

  // ===== SMOOTH SCROLL (mantido) =====
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#servicos"]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        const headerOffset = document.querySelector('.header')?.offsetHeight || 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      });
    });
  };

  // ===== INICIALIZAÇÃO =====
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initCardHoverEffects();
        initStatusButton();
        initAnalyticsTracking();
        initLazyLoading();
        initKeyboardNavigation();
        initSmoothScroll();
      });
    } else {
      initScrollAnimations();
      initCardHoverEffects();
      initStatusButton();
      initAnalyticsTracking();
      initLazyLoading();
      initKeyboardNavigation();
      initSmoothScroll();
    }
  };
  init();

  // ===== PERFORMANCE MONITORING (mantido) =====
  if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      }
    });
    try { perfObserver.observe({ entryTypes: ['largest-contentful-paint'] }); } catch (e) {}
  }
})();
