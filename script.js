(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────── */
  var cfg = window.SENSIA_CONFIG || {};

  /* ── Buy button ──────────────────────────────────── */
  var buyBtn = document.getElementById('buy-button');
  var priceLabel = document.getElementById('price-label');

  if (buyBtn && cfg.checkoutUrl) {
    buyBtn.href = cfg.checkoutUrl;
  }
  if (priceLabel && cfg.priceLabel) {
    priceLabel.textContent = cfg.priceLabel;
  }

  /* ── Sticky header ───────────────────────────────── */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ───────────────────────────── */
  var toggle = document.querySelector('.menu-toggle');
  var nav    = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      });
    });
  }

  /* ── Scroll reveal ───────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Demo form (no MailerLite embed) ─────────────── */
  var form = document.getElementById('sample-form');
  if (form && !cfg.mailerLiteConfigured) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email    = form.querySelector('input[type="email"]');
      var consent  = form.querySelector('input[type="checkbox"]');
      var status   = form.querySelector('.form-status');

      if (!email || !email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        status.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
        status.className = 'form-status error';
        email && email.focus();
        return;
      }
      if (consent && !consent.checked) {
        status.textContent = 'Bitte bestätige, dass du E-Mails erhalten möchtest.';
        status.className = 'form-status error';
        return;
      }

      status.textContent = 'MailerLite noch nicht eingerichtet. Bitte trage den Embed-Code in #mailerlite-form ein.';
      status.className = 'form-status error';
    });
  }
})();
