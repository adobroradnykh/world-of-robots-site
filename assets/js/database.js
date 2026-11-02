/* World Of Robots — arsenal & pilots database page.
   Data: window.WOR_DATA from assets/data/arsenal.js (tools/build-data.ps1).
   Upgrade math mirrors SV/Common/WeaponRoleParams.cs and StaticData/Upgrades/*UpgradesInfo.cs. */
(function () {
  'use strict';
  var W = window.WOR, $ = W.$, $$ = W.$$, t = W.t, fmt = W.fmt;
  var DATA = window.WOR_DATA || { weapons: [], pilots: [], pilotUp: {}, labels: {} };

  W.addStrings({
    ru: {
      'ars.allClasses': 'Все классы', 'ars.found': 'Найдено: ',
      'c.machinegun': 'Пулемёт', 'c.rokets': 'Ракеты', 'c.cannon': 'Пушка', 'c.artillery': 'Артиллерия', 'c.repair': 'Ремонт',
      'c.shield': 'Щит', 'c.shotgun': 'Дробовик', 'c.electromagnetic': 'Электромагнитное', 'c.accelerator': 'Ускоритель',
      'c.plasma': 'Плазма', 'c.mine': 'Мины', 'c.module': 'Модуль', 'c.physic': 'Ближний бой', 'c.railgun': 'Рельсотрон',
      'c.flamethrower': 'Огнемёт', 'c.emitter': 'Излучатель', 'c.laser': 'Лазер', 'c.stealth': 'Маскировка',
      'c.device': 'Постройка', 'c.dron': 'Дрон', 'c.turret': 'Турель', 'c.other': 'Прочее',
      'dt.KINETIC': 'Кинетический', 'dt.THERMAL': 'Термический', 'dt.EXPLOSION': 'Взрывной', 'dt.ENERGY': 'Энергетический',
      'dt.DIRECT': 'Прямой', 'dt.FROST': 'Холод',
      'cat.weapon': 'Оружие', 'cat.module': 'Модуль', 'cat.drone': 'Дрон',
      'u.rate': 'выстр./мин', 'u.s': 'с', 'u.m': 'м',
      's.unlock': 'Доступно с уровня', 's.playerLvl': 'Уровень игрока', 's.upTime': 'Время улучшения',
      'up.level': 'Улучшение', 'up.base': 'базовый', 'up.none': 'Предмет не улучшается.',
      'up.mk2': 'Предметы MK2 не улучшаются: они уже выпущены в усиленной версии.',
      'up.all': 'Все уровни улучшения', 'up.lv': 'Ур.', 'up.max': 'макс.',
      'mk': 'MK2', 'elite': 'Элитный', 'upgrades': 'улучшений',
      'pilot_add_hp_percent': 'Прочность робота',
      'pil.level': 'Уровень пилота', 'pil.exp': 'Опыт для уровня', 'pil.all': 'Прокачка пилота',
      'pil.note': 'Нажми на пилота, чтобы посмотреть рост бонусов по уровням.',
      'time.m': 'мин', 'time.h': 'ч', 'time.d': 'д'
    },
    en: {
      'db.kicker': 'Database', 'db.title': 'Arsenal and pilots',
      'db.lead': 'Every weapon, module, drone and pilot in the game with stats for each upgrade level. The numbers come straight from the game data.',
      'db.toArs': 'Arsenal', 'db.toPil': 'Pilots',
      'ars.kicker': 'Arsenal', 'ars.title': 'Weapons, modules and drones',
      'ars.lead': 'Tap a card to see the stats and how they grow with every upgrade.',
      'ars.all': 'All', 'ars.weapon': 'Weapons', 'ars.module': 'Modules', 'ars.drone': 'Drones',
      'ars.search': 'Search by name', 'ars.faction': 'Faction', 'ars.class': 'Class', 'ars.sort': 'Sort',
      'ars.allFactions': 'All factions', 'ars.allClasses': 'All classes', 'ars.found': 'Found: ',
      'ars.empty': 'Nothing found. Try changing the filters.',
      'sort.level': 'By unlock level', 'sort.power': 'By damage and power', 'sort.upgrades': 'By upgrade count', 'sort.name': 'By name',
      'fac.1': 'USSR', 'fac.2': 'USA', 'fac.3': 'Japan',
      'c.machinegun': 'Machine gun', 'c.rokets': 'Rockets', 'c.cannon': 'Cannon', 'c.artillery': 'Artillery', 'c.repair': 'Repair',
      'c.shield': 'Shield', 'c.shotgun': 'Shotgun', 'c.electromagnetic': 'Electromagnetic', 'c.accelerator': 'Booster',
      'c.plasma': 'Plasma', 'c.mine': 'Mines', 'c.module': 'Module', 'c.physic': 'Melee', 'c.railgun': 'Railgun',
      'c.flamethrower': 'Flamethrower', 'c.emitter': 'Emitter', 'c.laser': 'Laser', 'c.stealth': 'Stealth',
      'c.device': 'Structure', 'c.dron': 'Drone', 'c.turret': 'Turret', 'c.other': 'Other',
      'dt.KINETIC': 'Kinetic', 'dt.THERMAL': 'Thermal', 'dt.EXPLOSION': 'Explosive', 'dt.ENERGY': 'Energy',
      'dt.DIRECT': 'Direct', 'dt.FROST': 'Frost',
      'cat.weapon': 'Weapon', 'cat.module': 'Module', 'cat.drone': 'Drone',
      'u.rate': 'shots/min', 'u.s': 's', 'u.m': 'm',
      's.unlock': 'Unlocks at level', 's.playerLvl': 'Player level', 's.upTime': 'Upgrade time',
      'up.level': 'Upgrade', 'up.base': 'base', 'up.none': 'This item cannot be upgraded.',
      'up.mk2': 'MK2 items cannot be upgraded: they already come in the enhanced version.',
      'up.all': 'All upgrade levels', 'up.lv': 'Lv', 'up.max': 'max',
      'mk': 'MK2', 'elite': 'Elite', 'upgrades': 'upgrades',
      'pilot_add_hp_percent': 'Robot durability',
      'pil.kicker': 'Pilots', 'pil.title': 'The crew decides the battle',
      'pil.lead': 'Every pilot boosts the robot’s durability and empowers one type of weapon. Bonuses grow as the pilot levels up.',
      'pil.level': 'Pilot level', 'pil.exp': 'XP for level', 'pil.all': 'Pilot progression',
      'pil.note': 'Tap a pilot to see how the bonuses grow with each level.',
      'time.m': 'min', 'time.h': 'h', 'time.d': 'd'
    }
  });

  var FLAG = { 1: 'ussr', 2: 'usa', 3: 'jp' };
  var UT = { POWER: 1, LIFE_TIME: 2, SECOND_BULLET: 3, PLACED_OBJ: 4 };

  function lang() { return W.lang(); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function r2(n) { return Math.round(n * 100) / 100; }
  function num(n) { return fmt(r2(n)); }
  function label(key) { var l = DATA.labels[key]; return (l && (l[lang()] || l.en)) || t(key); }
  function bonusLabel(key) { return t(key) !== key ? t(key) : label(key); }
  function duration(sec) {
    if (!sec) return '—';
    var d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.round(sec % 3600 / 60);
    var out = [];
    if (d) out.push(d + ' ' + t('time.d'));
    if (h) out.push(h + ' ' + t('time.h'));
    if (m && !d) out.push(m + ' ' + t('time.m'));
    return out.join(' ') || '< 1 ' + t('time.m');
  }

  /* ---------- weapon math per upgrade level ---------- */
  function maxLevel(w) { return w.up.length - 1; }
  function addPower(w, lv) { return (w.ut === UT.POWER || w.ut === UT.SECOND_BULLET || w.ut === UT.PLACED_OBJ) ? w.up[lv][0] : 0; }
  function powerValue(w, lv) { return (w.pw + addPower(w, lv)) * w.m; }
  function powerText(w, lv) {
    var v = powerValue(w, lv);
    var s = w.pct ? num(v) + '%' : num(v);
    var a2 = w.up[lv][1];
    if (w.ut === UT.POWER && a2 > 0) s += ' (+' + num(w.v.power2 + a2) + ')';
    return s;
  }
  function durationValue(w, lv) {
    if (w.dur == null) return null;
    return w.dur + (w.ut === UT.LIFE_TIME ? w.up[lv][0] : 0);
  }
  function descText(w, lv) {
    var s = w.d[lang()] || w.d.en || '';
    if (!s) return '';
    var u = w.up[lv], v = w.v;
    var p = v.power + (w.ut === UT.POWER ? u[0] : 0), p2 = v.power2 + (w.ut === UT.POWER ? u[1] : 0);
    var tm = v.time + (w.ut === UT.LIFE_TIME ? u[0] : 0), tm2 = v.time2 + (w.ut === UT.LIFE_TIME ? u[1] : 0);
    var sp = v.sp == null ? null : v.sp + (w.ut === UT.SECOND_BULLET ? u[0] : 0);
    var map = {
      'power': num(p), 'powerpc': num(p * 100) + '%', 'power2': num(p2), 'power2pc': num(p2 * 100) + '%',
      'time': num(tm), 'time2': num(tm2), 'radius': num(v.radius)
    };
    if (sp != null) {
      map['s.power'] = num(sp); map['s.powerpc'] = num(sp * 100) + '%';
      map['s.power2'] = num(v.sp2); map['s.power2pc'] = num(v.sp2 * 100) + '%';
      map['s.time'] = num(v.st); map['s.time2'] = num(v.st2);
    }
    return s.replace(/\{([\w.]+)\}/g, function (m, k) { return map[k] != null ? map[k] : m; });
  }
  function powerLabel(w) { return label(w.dmg ? 'Power2Damage' : 'Power'); }

  /* ---------- arsenal grid ---------- */
  var ars = { cat: 'all', faction: 0, cls: '', q: '', sort: 'level' };
  var grid = $('#arsGrid');

  function filtered() {
    var q = ars.q.trim().toLowerCase();
    var list = DATA.weapons.filter(function (w) {
      return (ars.cat === 'all' || w.cat === ars.cat)
        && (!ars.faction || w.f === ars.faction)
        && (!ars.cls || w.c === ars.cls)
        && (!q || w.n.toLowerCase().indexOf(q) >= 0);
    });
    var by = {
      level: function (a, b) { return a.l - b.l || a.id - b.id; },
      power: function (a, b) { return powerValue(b, maxLevel(b)) - powerValue(a, maxLevel(a)); },
      upgrades: function (a, b) { return maxLevel(b) - maxLevel(a) || a.l - b.l; },
      name: function (a, b) { return a.n.localeCompare(b.n); }
    }[ars.sort];
    return list.sort(by);
  }

  function fillClasses() {
    var seen = {};
    DATA.weapons.forEach(function (w) { if (ars.cat === 'all' || w.cat === ars.cat) seen[w.c] = 1; });
    var classes = Object.keys(seen).sort(function (a, b) { return t('c.' + a).localeCompare(t('c.' + b)); });
    if (ars.cls && !seen[ars.cls]) ars.cls = '';
    $('#arsClass').innerHTML = '<option value="">' + esc(t('ars.allClasses')) + '</option>' + classes.map(function (c) {
      return '<option value="' + c + '"' + (c === ars.cls ? ' selected' : '') + '>' + esc(t('c.' + c)) + '</option>';
    }).join('');
  }

  function renderArsenal(rebuildClasses) {
    if (rebuildClasses) fillClasses();
    var list = filtered();
    $('#arsCount').textContent = t('ars.found') + list.length;
    $('#arsEmpty').hidden = list.length > 0;
    grid.innerHTML = list.map(function (w) {
      var max = maxLevel(w);
      var stat = '';
      if (w.pw) {
        stat = '<span class="item__stat">' + esc(powerLabel(w)) + ' <b>' + powerText(w, 0) + '</b>' +
          (max > 0 && addPower(w, max) ? ' <i>→ ' + powerText(w, max) + '</i>' : '') + '</span>';
      }
      return '<button type="button" class="item" data-id="' + w.id + '">' +
        '<span class="item__pic"><img loading="lazy" src="assets/img/weapons/' + w.id + '.png" alt="">' +
          '<span class="item__lvl">' + w.l + '</span>' +
          '<i class="flag flag--sm flag--' + FLAG[w.f] + ' item__flag" title="' + esc(t('fac.' + w.f)) + '"></i>' +
          (w.g > 0 ? '<span class="item__mk">' + t('mk') + '</span>' : '') +
        '</span>' +
        '<span class="item__name">' + esc(w.n) + '</span>' +
        '<span class="item__cls">' + esc(t('c.' + w.c)) + '</span>' +
        '<span class="item__foot">' + (stat || '<span></span>') +
          (max > 0 ? '<span class="item__up" title="' + esc(max + ' ' + t('upgrades')) + '">▲ ' + max + '</span>' : '') +
        '</span>' +
      '</button>';
    }).join('');
  }

  $$('#arsCat button').forEach(function (b) {
    b.addEventListener('click', function () {
      ars.cat = b.dataset.cat;
      $$('#arsCat button').forEach(function (x) { x.classList.toggle('is-active', x === b); });
      renderArsenal(true);
    });
  });
  $('#arsSearch').addEventListener('input', function (e) { ars.q = e.target.value; renderArsenal(false); });
  $('#arsFaction').addEventListener('change', function (e) { ars.faction = +e.target.value; renderArsenal(false); });
  $('#arsClass').addEventListener('change', function (e) { ars.cls = e.target.value; renderArsenal(false); });
  $('#arsSort').addEventListener('change', function (e) { ars.sort = e.target.value; renderArsenal(false); });

  /* ---------- details modal (weapons and pilots) ---------- */
  var modal = $('#itemModal'), lastFocus = null, current = null;

  function spec(lbl, value, diff) {
    return '<div><dt>' + esc(lbl) + '</dt><dd>' + value + (diff ? ' <em>' + diff + '</em>' : '') + '</dd></div>';
  }
  function openModal() {
    if (!modal.hidden) return; // re-rendered after a language switch
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#imClose').focus();
  }
  function closeModal() {
    modal.hidden = true;
    current = null;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $('#imClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  function setupSlider(max, value, onChange) {
    var box = $('#imUp'), range = $('#imRange');
    box.hidden = max <= 0;
    range.max = max;
    range.value = value;
    range.oninput = function () { onChange(+range.value); };
  }
  function setLevelLabel(lv, max, base) {
    $('#imLevel').textContent = lv === 0 && base ? lv + ' · ' + base : String(lv);
    $('#imLevelMax').textContent = '/ ' + max;
  }
  function markRow(lv) {
    $$('#imTable tbody tr').forEach(function (tr, i) { tr.classList.toggle('is-current', i === lv); });
  }

  // weapon
  function showWeaponLevel(w, lv) {
    var max = maxLevel(w);
    setLevelLabel(lv, max, t('up.base'));
    $('#imDesc').textContent = descText(w, lv);
    var s = '';
    if (w.pw) {
      var diff = lv > 0 && addPower(w, lv) ? '+' + num(powerValue(w, lv) - powerValue(w, 0)) + (w.pct ? '%' : '') : '';
      s += spec(powerLabel(w), powerText(w, lv), diff);
    }
    var dur = durationValue(w, lv);
    if (dur != null) s += spec(label('Duration'), num(dur) + ' ' + t('u.s'), lv > 0 && w.ut === UT.LIFE_TIME ? '+' + num(dur - w.dur) : '');
    if (w.rate) s += spec(label('Fire rate'), num(w.rate) + ' ' + t('u.rate'));
    if (w.cap > 0) s += spec(label('Capacity'), fmt(w.cap));
    if (w.rl > 0) s += spec(label('Reload time'), num(w.rl) + ' ' + t('u.s'));
    if (w.rng > 0) s += spec(label('Range'), fmt(w.rng) + ' ' + t('u.m'));
    if (w.dmg && w.dt) s += spec(label('Damage type'), esc(t('dt.' + w.dt)));
    s += spec(t('s.unlock'), w.l);
    if (lv > 0) {
      s += spec(t('s.playerLvl'), w.up[lv][2]);
      s += spec(t('s.upTime'), duration(w.up[lv][3]));
    }
    $('#imSpecs').innerHTML = s;
    markRow(lv);
  }

  function openWeapon(w) {
    current = { kind: 'w', item: w, lv: 0 };
    var max = maxLevel(w);
    $('#imIcon').src = 'assets/img/weapons/' + w.id + '.png';
    $('#imIcon').parentNode.className = 'modal__icon';
    $('#imMeta').textContent = t('fac.' + w.f) + ' · ' + t('cat.' + w.cat);
    $('#imName').textContent = w.n;
    $('#imBadges').innerHTML = '<span class="badge">' + esc(t('c.' + w.c)) + '</span>' +
      (w.g > 0 ? '<span class="badge badge--accent">' + t('mk') + '</span>' : '');
    $('#imUpTitle').textContent = t('up.level');
    $('#imNote').textContent = max > 0 ? '' : (w.g > 0 ? t('up.mk2') : t('up.none'));

    // all levels table
    var showDur = w.ut === UT.LIFE_TIME && w.dur != null;
    var head = '<tr><th>' + t('up.lv') + '</th>' + (w.pw ? '<th>' + esc(powerLabel(w)) + '</th>' : '') +
      (showDur ? '<th>' + esc(label('Duration')) + '</th>' : '') +
      '<th>' + t('s.playerLvl') + '</th><th>' + t('s.upTime') + '</th></tr>';
    var rows = w.up.map(function (u, lv) {
      return '<tr data-lv="' + lv + '"><td>' + lv + '</td>' + (w.pw ? '<td>' + powerText(w, lv) + '</td>' : '') +
        (showDur ? '<td>' + num(durationValue(w, lv)) + ' ' + t('u.s') + '</td>' : '') +
        '<td>' + (lv ? u[2] : '—') + '</td><td>' + (lv ? duration(u[3]) : '—') + '</td></tr>';
    }).join('');
    $('#imTableTitle').textContent = t('up.all');
    $('#imTable').innerHTML = '<thead>' + head + '</thead><tbody>' + rows + '</tbody>';
    $('#imTableWrap').hidden = max <= 0;

    setupSlider(max, 0, function (lv) { current.lv = lv; showWeaponLevel(w, lv); });
    showWeaponLevel(w, 0);
    openModal();
  }

  // pilot
  function pilotCurve(p) { return DATA.pilotUp[p.g] || DATA.pilotUp[0] || [[0, 0, 0, 0]]; }
  function showPilotLevel(p, lv) {
    var curve = pilotCurve(p), row = curve[lv], max = curve.length - 1;
    setLevelLabel(lv, max, '');
    var s = '';
    if (p.b1.k) s += spec(bonusLabel(p.b1.k), '+' + num(p.b1.v + row[1]) + '%', lv > 0 && row[1] ? '+' + num(row[1]) : '');
    if (p.b2.k) s += spec(bonusLabel(p.b2.k), '+' + num(p.b2.v + row[2]) + '%', lv > 0 && row[2] ? '+' + num(row[2]) : '');
    if (lv > 0) s += spec(t('pil.exp'), fmt(row[3]));
    $('#imSpecs').innerHTML = s;
    markRow(lv);
  }
  function openPilot(p) {
    current = { kind: 'p', item: p, lv: 0 };
    var curve = pilotCurve(p), max = curve.length - 1;
    $('#imIcon').src = 'assets/img/pilots/' + p.id + '.png';
    $('#imIcon').parentNode.className = 'modal__icon modal__icon--pilot';
    $('#imMeta').textContent = t('fac.' + p.f);
    $('#imName').textContent = p.n;
    $('#imBadges').innerHTML = p.g > 0 ? '<span class="badge badge--accent">' + t('elite') + '</span>' : '';
    $('#imDesc').textContent = '';
    $('#imNote').textContent = '';
    $('#imUpTitle').textContent = t('pil.level');

    var head = '<tr><th>' + t('up.lv') + '</th>' +
      (p.b1.k ? '<th>' + esc(bonusLabel(p.b1.k)) + '</th>' : '') +
      (p.b2.k ? '<th>' + esc(bonusLabel(p.b2.k)) + '</th>' : '') +
      '<th>' + t('pil.exp') + '</th></tr>';
    var rows = curve.map(function (r, lv) {
      return '<tr data-lv="' + lv + '"><td>' + lv + '</td>' +
        (p.b1.k ? '<td>+' + num(p.b1.v + r[1]) + '%</td>' : '') +
        (p.b2.k ? '<td>+' + num(p.b2.v + r[2]) + '%</td>' : '') +
        '<td>' + (lv ? fmt(r[3]) : '—') + '</td></tr>';
    }).join('');
    $('#imTableTitle').textContent = t('pil.all');
    $('#imTable').innerHTML = '<thead>' + head + '</thead><tbody>' + rows + '</tbody>';
    $('#imTableWrap').hidden = max <= 0;

    setupSlider(max, 0, function (lv) { current.lv = lv; showPilotLevel(p, lv); });
    showPilotLevel(p, 0);
    openModal();
  }

  // clicking a table row jumps the slider to that level
  $('#imTable').addEventListener('click', function (e) {
    var tr = e.target.closest('tr[data-lv]');
    if (!tr || !current) return;
    var lv = +tr.dataset.lv;
    $('#imRange').value = lv;
    $('#imRange').oninput();
  });

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.item');
    if (!card) return;
    var w = DATA.weapons.filter(function (x) { return x.id === +card.dataset.id; })[0];
    if (w) openWeapon(w);
  });

  /* ---------- pilots grid ---------- */
  var pilFaction = 1;
  function renderPilots() {
    $('#pilGrid').innerHTML = DATA.pilots.filter(function (p) { return p.f === pilFaction; }).map(function (p) {
      var curve = pilotCurve(p), top = curve[curve.length - 1];
      function line(b, add) {
        if (!b.k) return '';
        return '<span class="bonus__row"><span>' + esc(bonusLabel(b.k)) + '</span><b>+' + num(b.v) + '%<i> → +' + num(b.v + add) + '%</i></b></span>';
      }
      return '<button type="button" class="pilot' + (p.g > 0 ? ' pilot--elite' : '') + '" data-id="' + p.id + '">' +
        '<span class="pilot__pic"><img loading="lazy" src="assets/img/pilots/' + p.id + '.png" alt="">' +
          (p.g > 0 ? '<span class="pilot__tag">' + t('elite') + '</span>' : '') + '</span>' +
        '<span class="pilot__body">' +
          '<span class="pilot__name">' + esc(p.n) + '</span>' +
          '<span class="bonus">' + line(p.b1, top[1]) + line(p.b2, top[2]) + '</span>' +
        '</span>' +
      '</button>';
    }).join('');
    $('#pilNote').textContent = t('pil.note');
  }
  $$('#pilFaction button').forEach(function (b) {
    b.addEventListener('click', function () {
      pilFaction = +b.dataset.faction;
      $$('#pilFaction button').forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', String(x === b)); });
      renderPilots();
    });
  });
  $('#pilGrid').addEventListener('click', function (e) {
    var card = e.target.closest('.pilot');
    if (!card) return;
    var p = DATA.pilots.filter(function (x) { return x.id === +card.dataset.id; })[0];
    if (p) openPilot(p);
  });

  /* ---------- language ---------- */
  W.onLang(function () {
    renderArsenal(true);
    renderPilots();
    if (current) {
      var c = current;
      if (c.kind === 'w') { openWeapon(c.item); } else { openPilot(c.item); }
      $('#imRange').value = c.lv;
      $('#imRange').oninput();
    }
  });
})();
