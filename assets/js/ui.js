/* =========================================================
   ui.js — 活动筛选 / 图片放大 / 目录高亮
   全部原生实现，无依赖，禁用 JS 时页面内容仍完整可读
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. 活动筛选 ---------- */
  var filterBar = document.querySelector('.filters');
  var gallery = document.getElementById('gallery');

  if (filterBar && gallery) {
    var tiles = Array.prototype.slice.call(gallery.querySelectorAll('.tile'));

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;

      var cat = btn.dataset.filter;

      filterBar.querySelectorAll('.filter').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });

      tiles.forEach(function (tile) {
        var show = cat === 'all' || tile.dataset.cat === cat;
        tile.hidden = !show;
      });
    });
  }

  /* ---------- 2. 图片放大 ---------- */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  var lastFocus = null;

  function openLb(tile) {
    var img = tile.querySelector('img');
    if (!img || !lb) return;

    lastFocus = document.activeElement;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = tile.dataset.cap || '';
    lb.hidden = false;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLb() {
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  if (gallery) {
    gallery.addEventListener('click', function (e) {
      var tile = e.target.closest('.tile');
      if (tile) openLb(tile);
    });
  }

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb && lb.classList.contains('is-open')) closeLb();
  });

  /* ---------- 3. 目录滚动高亮 ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute('href');
      return id && id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.style.color = on ? 'var(--ink)' : '';
          a.style.borderBottomColor = on ? 'var(--accent)' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
