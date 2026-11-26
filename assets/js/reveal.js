/* =========================================================
   reveal.js — 全站唯一的入场动效
   规则：上移 12px + 淡入，一次性，不重复触发
   无 IntersectionObserver 或用户要求减少动效 → 直接显示
   ========================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function showAll() {
    document.querySelectorAll('.rv').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  function init() {
    // 支持检测
    if (!('IntersectionObserver' in window) || reduce.matches) {
      showAll();
      return;
    }

    var targets = document.querySelectorAll('.rv');
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // 同批进入的元素依次错开，形成一条序列而不是一起弹出
        var group = entry.target.parentNode;
        var siblings = group
          ? Array.prototype.filter.call(group.children, function (c) {
              return c.classList.contains('rv');
            })
          : [];
        var i = Math.max(0, siblings.indexOf(entry.target));
        var delay = Math.min(i, 5) * 70;

        window.setTimeout(function () {
          entry.target.classList.add('is-in');
        }, delay);

        io.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.12
    });

    targets.forEach(function (el) { io.observe(el); });

    // 首屏已可见的元素立刻进入，不等滚动
    window.requestAnimationFrame(function () {
      targets.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
          el.classList.add('is-in');
        }
      });
    });

    // 运行中切换系统设置，立刻全部显示，不留半透明残留
    if (reduce.addEventListener) {
      reduce.addEventListener('change', function (e) {
        if (e.matches) showAll();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
