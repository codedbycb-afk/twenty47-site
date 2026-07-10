/* Twenty47 shared site JS — menu drawer, lenis, reveals, scribbles, parallax, accordion */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- hero load-in ---- */
  window.addEventListener('load', function(){ document.documentElement.classList.add('loaded'); });
  setTimeout(function(){ document.documentElement.classList.add('loaded'); }, 900);

  /* ---- menu drawer (injected on every page) ---- */
  var page = location.pathname.split('/').pop() || 'index.html';
  var links = [
    ['index.html', 'Home'],
    ['services.html', 'Services'],
    ['work.html', 'Work'],
    ['about.html', 'About'],
    ['blog.html', 'Blog'],
    ['contact.html', 'Contact']
  ];
  var drawer = document.createElement('div');
  drawer.innerHTML =
    '<div class="drawer-backdrop"></div>' +
    '<aside class="drawer" aria-label="Menu">' +
      '<div class="d-top"><span class="d-mark">47</span></div>' +
      '<nav>' + links.map(function (l) {
        return '<a href="' + l[0] + '"' + (page === l[0] ? ' class="active"' : '') + '>' + l[1] + '</a>';
      }).join('') + '</nav>' +
      '<button class="d-close" aria-label="Close menu">✕</button>' +
      '<div class="d-socials"><a href="https://instagram.com/twenty47marketing" target="_blank" rel="noopener">Instagram</a> // <a href="#">TikTok</a> // <a href="#">Facebook</a></div>' +
    '</aside>';
  document.body.appendChild(drawer);

  function openMenu(){ document.body.classList.add('menu-open'); }
  function closeMenu(){ document.body.classList.remove('menu-open'); }
  document.querySelectorAll('.rail .burger').forEach(function (b) {
    b.style.cursor = 'pointer';
    b.addEventListener('click', function(){ document.body.classList.contains('menu-open') ? closeMenu() : openMenu(); });
  });
  drawer.querySelector('.d-close').addEventListener('click', closeMenu);
  drawer.querySelector('.drawer-backdrop').addEventListener('click', closeMenu);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });

  /* ---- Lenis smooth scroll ---- */
  var lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href');
        if (id.length > 1 && document.querySelector(id)) { e.preventDefault(); lenis.scrollTo(id); }
      });
    });
  }

  /* ---- scroll reveal ---- */
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(e){ e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(e){ io.observe(e); });
    setInterval(function(){
      els.forEach(function(e){
        if (!e.classList.contains('in') && e.getBoundingClientRect().top < window.innerHeight) e.classList.add('in');
      });
    }, 800);
  }

  /* ---- scribbles draw on scroll ---- */
  var svgs = document.querySelectorAll('.mini-scribble, footer .scribble, .draw-on-scroll');
  if (!('IntersectionObserver' in window) || reduced) {
    svgs.forEach(function(s){ s.classList.add('draw'); });
  } else {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('draw'); io2.unobserve(en.target); } });
    }, { threshold: 0.4 });
    svgs.forEach(function(s){ io2.observe(s); });
  }

  /* ---- hero collage parallax ---- */
  if (!reduced) {
    var tiles = Array.prototype.map.call(document.querySelectorAll('.tile'), function (el, i) {
      return { el: el, sp: 0.05 + (i % 4) * 0.045, rot: el.classList.contains('sticker') ? -7 : 0 };
    });
    if (tiles.length) {
      var ticking = false;
      var update = function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.6) {
          tiles.forEach(function (p) {
            p.el.style.transform = 'translateY(' + (y * p.sp) + 'px)' + (p.rot ? ' rotate(' + p.rot + 'deg)' : '');
          });
        }
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
    }
  }

  /* ---- accordion ---- */
  document.querySelectorAll('.acc-head').forEach(function (h) {
    h.addEventListener('click', function () {
      var item = h.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(function(i){ i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });
})();
