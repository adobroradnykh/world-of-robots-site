/* World Of Robots — landing scripts */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- i18n ---------------- */
  var I18N = {
    en: {
      'nav.about': 'About', 'nav.hangar': 'Hangar', 'nav.gallery': 'Screenshots', 'nav.community': 'Community',
      'cta.play': 'Play for free',
      'hero.eyebrow': 'Free online game · Android · iOS',
      'hero.slogan1': 'Giant robots.', 'hero.slogan2': 'Massive firepower.',
      'hero.lead': 'Build your war machine, pick your weapons and lead your team to victory in fast-paced real-time PvP battles.',
      'store.gp.small': 'Get it on', 'store.as.small': 'Download on the',
      'stats.robots': 'combat robots', 'stats.factions': 'factions: USSR, USA, Japan',
      'stats.weapons': 'weapons and modules', 'stats.pvp': 'real-time online battles',
      'about.kicker': 'About', 'about.title': 'Your robot. Your style. Your victory.',
      'about.lead': 'World Of Robots is a mobile shooter about multi-ton war machines. Choose a faction, upgrade your gear and fight players from all over the world.',
      'f1.t': 'Online PvP battles', 'f1.d': 'Team battles against real players in real time. Every fight is a new story.',
      'f2.t': 'Tactics & capture points', 'f2.d': 'Hold key points A, B and C, use cover and coordinate attacks — the smartest wins, not the strongest.',
      'f3.t': 'Tech tree', 'f3.d': 'Unlock new robots and weapons of three factions, upgrade stats and find your perfect build.',
      'f4.t': 'Customization', 'f4.d': 'Unique skins and paint jobs, dozens of weapon combos. Your robot should look as fierce as it shoots.',
      'f5.t': 'Pilots & implants', 'f5.d': 'Hire pilots, install implants and modules: shields, drones, teleports and repair systems turn the tide.',
      'f6.t': 'Clans & friends', 'f6.d': 'Join a clan, chat, squad up with friends and climb the ranks together.',
      'hangar.kicker': 'Hangar', 'hangar.title': 'Choose your war machine',
      'hangar.lead': 'Fast scouts, versatile brawlers and heavy fortresses. Stats are taken straight from the game.',
      'fac.1': 'USSR', 'fac.2': 'USA', 'fac.3': 'Japan',
      'stat.hp': 'Durability', 'stat.speed': 'Speed', 'stat.load': 'Load capacity',
      'cls.light': 'Light', 'cls.medium': 'Medium', 'cls.heavy': 'Heavy',
      'cls.light.d': 'Light robot: speed and maneuverability', 'cls.medium.d': 'Medium robot: balance of armor and mobility', 'cls.heavy.d': 'Heavy robot: maximum armor and firepower',
      'tier': 'Tier',
      'band.1': 'Get ready', 'band.2': 'for battle!',
      'band.lead': 'Machine guns, rockets, lasers, railguns, plasma and flamethrowers — combine weapons to fit your fighting style.',
      'gallery.kicker': 'Screenshots', 'gallery.title': 'See the game in action',
      'dl.kicker': 'Download', 'dl.title': 'Join the battle for free',
      'dl.lead': 'World Of Robots is available on phones and tablets. Install the game, get your starter robot and hit the arena in a minute.',
      'dl.c1': 'Free to download', 'dl.c2': 'Battles against real players', 'dl.c3': 'Regular updates: new robots, weapons and maps',
      'com.kicker': 'Community', 'com.title': 'Join the pilots',
      'com.lead': 'Update news, tournaments, guides and chats with the developers.',
      'com.discord': 'Chat with players and developers', 'com.yt': 'Trailers and gameplay', 'com.vk': 'News and giveaways',
      'footer.games': 'More games by the studio', 'footer.rights': 'All rights reserved.'
    },
    ru: {
      'cls.light': 'Лёгкий', 'cls.medium': 'Средний', 'cls.heavy': 'Тяжёлый',
      'cls.light.d': 'Лёгкий робот: скорость и манёвренность', 'cls.medium.d': 'Средний робот: баланс брони и мобильности', 'cls.heavy.d': 'Тяжёлый робот: максимум брони и огневой мощи',
      'tier': 'Уровень'
    }
  };
  var TITLES = {
    ru: 'World Of Robots — онлайн-битвы боевых роботов',
    en: 'World Of Robots — online battles of giant robots'
  };
  var DB_TITLES = {
    ru: 'База данных — World Of Robots',
    en: 'Database — World Of Robots'
  };

  // Strings shared by both pages; database.js adds its own via WOR.addStrings().
  var SHARED = {
    ru: {
      'store.st.small': 'Играйте на ПК в'
    },
    en: {
      'nav.db': 'Database',
      'hero.eyebrow': 'Free online game · Android · iOS · PC',
      'dl.lead': 'World Of Robots is available on phones, tablets and PC via Steam. Install the game, get your starter robot and hit the arena in a minute.',
      'store.st.small': 'Play on PC via',
      'dbt.kicker': 'Database', 'dbt.title': 'Arsenal and pilots',
      'dbt.lead': 'Every weapon, module, drone and pilot in the game with stats for each upgrade level. The numbers come straight from the game data.',
      'dbt.w': 'weapons, modules and drones', 'dbt.p': 'pilots with upgrade levels', 'dbt.u': 'upgrade levels per weapon',
      'dbt.cta': 'Open the database'
    }
  };
  function addStrings(dict) { ['ru', 'en'].forEach(function (l) { for (var k in dict[l] || {}) I18N[l][k] = dict[l][k]; }); }
  addStrings(SHARED);

  // Russian strings live in the markup; remember them so we can switch back.
  $$('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in I18N.ru)) I18N.ru[k] = el.textContent;
  });
  $$('[data-i18n-ph]').forEach(function (el) {
    var k = el.getAttribute('data-i18n-ph');
    if (!(k in I18N.ru)) I18N.ru[k] = el.placeholder;
  });

  var lang = 'ru';
  function t(k) { return (I18N[lang] && I18N[lang][k]) || I18N.ru[k] || k; }

  function setLang(l) {
    lang = I18N[l] ? l : 'ru';
    document.documentElement.lang = lang;
    document.title = (document.body.dataset.page === 'db' ? DB_TITLES : TITLES)[lang];
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
    $$('.lang button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    $('#burger').setAttribute('aria-label', lang === 'ru' ? 'Меню' : 'Menu');
    try { localStorage.setItem('wor-lang', lang); } catch (e) { /* storage unavailable */ }
    renderers.forEach(function (fn) { fn(); });
  }
  var renderers = [];
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* ---------------- header / nav ---------------- */
  var header = $('#header');
  var burger = $('#burger');
  var nav = $('#nav');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  $$('a', nav).forEach(function (a) {
    a.addEventListener('click', function () {
      burger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });

  // highlight current section in nav
  if ('IntersectionObserver' in window) {
    var links = $$('.nav a[href^="#"]:not(.btn)');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) spy.observe(s); });
  }

  /* ---------------- reveal + counters ---------------- */
  function countUp(el) {
    var target = +el.dataset.count, suffix = el.dataset.suffix || '', start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  // Content stays visible at rest; blocks below the first screen play a rise-in
  // just before they scroll into view.
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 6) * 80;
        el.style.animationDelay = delay + 'ms';
        el.classList.add('is-in');
        var c = $('[data-count]', el);
        if (c) countUp(c);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px 10% 0px' });
    $$('.reveal').forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight) return;
      io.observe(el);
    });
  }

  /* ---------------- hangar ---------------- */
  // [name, faction, tier, durability, speed, load capacity] — from server StaticData (vehicle table)
  var ROBOTS = [
    ['SHR-34', 1, 1, 15200, 138, 30], ['SHR-42', 1, 4, 18900, 127, 35], ['SHR-34ML', 1, 4, 16100, 198, 30],
    ['SHR-53', 1, 7, 23184, 116, 40], ['SHR-53H', 1, 7, 24370, 110, 40], ['SHR-106L', 1, 8, 18300, 195, 40],
    ['SHR-53D', 1, 9, 24370, 116, 40], ['SHR-77', 1, 9, 28410, 99, 40], ['SHR-60 Bastion', 1, 9, 62120, 120, 40],
    ['SHR-42M2 Heavy', 1, 9, 20300, 110, 35], ['SHR-77 MK2', 1, 10, 41123, 105, 50], ['SHR-81MD', 1, 10, 45000, 122, 55],
    ['SHR-81', 1, 12, 49000, 115, 55],
    ['M21A: Scout', 2, 1, 12700, 171, 28], ['WS10: Jaeger', 2, 4, 17300, 143, 34], ['MF2: Vulture', 2, 6, 18200, 165, 40],
    ['M30: Rock', 2, 7, 21230, 127, 40], ['M35H', 2, 7, 22100, 121, 43], ['WS22: Hunter', 2, 8, 8300, 210, 40],
    ['M35', 2, 9, 22100, 127, 43], ['M35 MK2', 2, 10, 38033, 135, 55], ['WS26: Stealth', 2, 10, 15200, 190, 40],
    ['M44: Hyperion', 2, 10, 42200, 140, 40], ['M40', 2, 12, 45500, 154, 55],
    ['Type R1', 3, 6, 18100, 140, 40], ['Type R3', 3, 8, 20700, 124, 40], ['Chronos', 3, 8, 22600, 178, 40],
    ['Type R4', 3, 10, 29380, 145, 40]
  ];
  var MAX = { hp: 0, speed: 0, load: 0 };
  ROBOTS.forEach(function (r) {
    MAX.hp = Math.max(MAX.hp, r[3]); MAX.speed = Math.max(MAX.speed, r[4]); MAX.load = Math.max(MAX.load, r[5]);
  });
  function robotClass(r) { return r[3] < 17000 ? 'light' : r[3] < 30000 ? 'medium' : 'heavy'; }

  var faction = 1, current = 0;
  var list = $('#robotList'), card = $('#robotCard');

  function fmt(n) { return n.toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US'); }

  function renderHangar() {
    if (!list) return;
    var items = ROBOTS.filter(function (r) { return r[1] === faction; });
    list.innerHTML = '';
    items.forEach(function (r, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rbtn' + (i === current ? ' is-active' : '');
      b.innerHTML = '<span class="rbtn__tier">' + r[2] + '</span><span><span class="rbtn__name"></span><span class="rbtn__cls"></span></span>';
      $('.rbtn__name', b).textContent = r[0];
      $('.rbtn__cls', b).textContent = t('cls.' + robotClass(r));
      b.addEventListener('click', function () { selectRobot(i); });
      list.appendChild(b);
    });
    showRobot(items[current], false);
  }

  function showRobot(r, animate) {
    var apply = function () {
      $('#rFaction').textContent = t('fac.' + r[1]);
      $('#rName').textContent = r[0];
      $('#rClass').textContent = t('cls.' + robotClass(r) + '.d');
      $('#rTier').textContent = t('tier') + ' ' + r[2];
      $('#rHp').textContent = fmt(r[3]);
      $('#rSpeed').textContent = r[4];
      $('#rLoad').textContent = r[5];
      $('#rHpBar').style.width = (r[3] / MAX.hp * 100) + '%';
      $('#rSpeedBar').style.width = (r[4] / MAX.speed * 100) + '%';
      $('#rLoadBar').style.width = (r[5] / MAX.load * 100) + '%';
      card.classList.remove('is-swapping');
    };
    if (animate) { card.classList.add('is-swapping'); setTimeout(apply, 180); } else apply();
  }

  function selectRobot(i) {
    current = i;
    $$('.rbtn', list).forEach(function (b, j) { b.classList.toggle('is-active', j === i); });
    showRobot(ROBOTS.filter(function (r) { return r[1] === faction; })[i], true);
  }

  $$('#hangar .hangar__tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      faction = +b.dataset.faction; current = 0;
      $$('#hangar .hangar__tabs button').forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', String(x === b)); });
      list.scrollTo && list.scrollTo({ top: 0, left: 0 });
      renderHangar();
    });
  });

  /* ---------------- gallery ---------------- */
  var SHOTS = 5, slide = 0;
  var img = $('#sliderImg'), thumbs = $('#thumbs');
  function shot(i, small) { return 'assets/img/shot-' + lang + '-' + (i + 1) + (small ? '-s' : '') + '.jpg'; }

  function renderGallery(keep) {
    if (!thumbs) return;
    thumbs.innerHTML = '';
    for (var i = 0; i < SHOTS; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'thumb' + (i === slide ? ' is-active' : '');
      b.setAttribute('aria-label', String(i + 1));
      b.innerHTML = '<img loading="lazy" alt="" src="' + shot(i, true) + '">';
      b.addEventListener('click', goTo.bind(null, i));
      thumbs.appendChild(b);
    }
    if (keep) img.src = shot(slide);
  }
  function goTo(i) {
    slide = (i + SHOTS) % SHOTS;
    img.classList.add('is-fading');
    setTimeout(function () {
      img.src = shot(slide);
      img.onload = function () { img.classList.remove('is-fading'); };
    }, 200);
    $$('.thumb', thumbs).forEach(function (b, j) { b.classList.toggle('is-active', j === slide); });
  }
  if (img) {
  $('#prev').addEventListener('click', function () { goTo(slide - 1); });
  $('#next').addEventListener('click', function () { goTo(slide + 1); });

  // swipe
  var sx = null;
  $('#sliderView').addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  $('#sliderView').addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) goTo(slide + (dx < 0 ? 1 : -1));
  });

  // lightbox
  var lb = $('#lightbox');
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  $('#sliderView').addEventListener('click', function () {
    $('#lbImg').src = shot(slide);
    lb.hidden = false; document.body.style.overflow = 'hidden';
  });
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lb.hidden) closeLb();
    if (!lb.hidden) return;
    var g = $('#gallery').getBoundingClientRect();
    if (g.top < innerHeight && g.bottom > 0) {
      if (e.key === 'ArrowRight') goTo(slide + 1);
      if (e.key === 'ArrowLeft') goTo(slide - 1);
    }
  });
  }

  /* ---------------- parallax band ---------------- */
  var band = $('.band'), bandBg = $('.band__bg');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && band) {
    window.addEventListener('scroll', function () {
      var r = band.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      var p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      bandBg.style.transform = 'translate3d(0,' + (p * -12) + '%,0)';
    }, { passive: true });
  }

  /* ---------------- hero sparks ---------------- */
  var cv = $('#sparks');
  if (cv && cv.getContext && !reduce) {
    var ctx = cv.getContext('2d'), parts = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(init) {
      return {
        x: Math.random() * W, y: init ? Math.random() * H : H + 10,
        r: Math.random() * 1.8 + .4, vy: -(Math.random() * .6 + .2), vx: (Math.random() - .5) * .4,
        a: Math.random() * .6 + .2, hue: Math.random() < .7 ? 38 : 195
      };
    }
    size();
    window.addEventListener('resize', size);
    var N = W < 700 ? 35 : 70;
    for (var i = 0; i < N; i++) parts.push(spawn(true));
    var visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(cv);
    }
    (function tick() {
      if (visible) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          p.x += p.vx; p.y += p.vy;
          if (p.y < -10) parts[i] = p = spawn(false);
          ctx.beginPath();
          ctx.fillStyle = 'hsla(' + p.hue + ',100%,62%,' + p.a + ')';
          ctx.shadowColor = 'hsla(' + p.hue + ',100%,60%,1)';
          ctx.shadowBlur = 8;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------------- shared API + init ---------------- */
  renderers.push(renderHangar, function () { renderGallery(true); });

  // Used by database.js; it registers its strings and renderer before DOMContentLoaded.
  window.WOR = {
    $: $, $$: $$, t: t, fmt: fmt, addStrings: addStrings,
    lang: function () { return lang; },
    onLang: function (fn) { renderers.push(fn); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    $('#year').textContent = new Date().getFullYear();
    var saved = null;
    try { saved = localStorage.getItem('wor-lang'); } catch (e) { /* storage unavailable */ }
    if (!saved) saved = (navigator.language || 'ru').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en';
    setLang(saved);
  });
})();
