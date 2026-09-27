/* Stable Sites links and navigation for the complete Fafurion preview. */
(() => {
  const accountTabs = ['dashboard', 'characters', 'clan', 'events', 'wheel', 'rewards', 'wallet', 'security', 'support', 'settings'];
  const adminTitles = {
    overview: 'adminOverview', players: 'adminPlayers', donations: 'adminDonations',
    support: 'adminSupport', content: 'adminContent', wheel: 'wheelManager',
    moderation: 'adminModeration', economy: 'adminEconomy', staff: 'adminStaff',
    server: 'adminServer', audit: 'adminAudit'
  };
  const pageNames = ['home', 'account', 'rankings', 'donate', 'admin'];
  const original = { showPage, showAccountTab, showAdminTab, showRankingMode, applyLang };
  const infoLabels = { en: 'Info', el: 'Πληροφορίες', pt: 'Informações', ru: 'Информация' };
  for (const [code, text] of Object.entries(infoLabels)) langs[code].t.navInfo = text;

  const homeCopy = {
  "en": {
    "homeChapter": "A NEW CHAPTER BEGINS",
    "homeAwakens": "The ocean awakens.",
    "homeLegend": "Beyond the storm, your legend awaits.",
    "homeBegin": "Begin your journey",
    "homeExplore": "Explore the realm",
    "homeDiscover": "SCROLL TO DISCOVER",
    "homeDragon": "THE WATER DRAGON",
    "homePower": "Ancient power. Awakened."
  },
  "el": {
    "homeChapter": "ΕΝΑ ΝΕΟ ΚΕΦΑΛΑΙΟ ΞΕΚΙΝΑ",
    "homeAwakens": "Ο ωκεανός ξυπνά.",
    "homeLegend": "Πέρα από την καταιγίδα, σε περιμένει ο θρύλος σου.",
    "homeBegin": "Ξεκίνα το ταξίδι σου",
    "homeExplore": "Εξερεύνησε τον κόσμο",
    "homeDiscover": "ΑΝΑΚΑΛΥΨΕ ΤΟΝ ΚΟΣΜΟ",
    "homeDragon": "Ο ΔΡΑΚΟΣ ΤΟΥ ΝΕΡΟΥ",
    "homePower": "Μια αρχαία δύναμη ξυπνά."
  },
  "pt": {
    "homeChapter": "UM NOVO CAPÍTULO COMEÇA",
    "homeAwakens": "O oceano desperta.",
    "homeLegend": "Além da tempestade, sua lenda espera.",
    "homeBegin": "Comece sua jornada",
    "homeExplore": "Explore o reino",
    "homeDiscover": "DESCUBRA MAIS",
    "homeDragon": "O DRAGÃO DAS ÁGUAS",
    "homePower": "Um poder ancestral desperta."
  },
  "ru": {
    "homeChapter": "НАЧИНАЕТСЯ НОВАЯ ГЛАВА",
    "homeAwakens": "Океан пробуждается.",
    "homeLegend": "За бурей вас ждёт ваша легенда.",
    "homeBegin": "Начните свой путь",
    "homeExplore": "Исследуйте мир",
    "homeDiscover": "ОТКРОЙТЕ ДЛЯ СЕБЯ",
    "homeDragon": "ВОДЯНОЙ ДРАКОН",
    "homePower": "Древняя сила пробудилась."
  }
};
  for (const [code, text] of Object.entries(homeCopy)) Object.assign(langs[code].t, text);

  function activeTab(prefix, fallback) {
    const view = document.querySelector(`.${prefix}-view.active`);
    return view ? view.id.replace(`${prefix}-`, '').replace(/-view$/, '') : fallback;
  }

  function currentRoute() {
    const page = document.querySelector('.page.active')?.id.replace('page-', '') || 'home';
    if (page === 'account') return `account/${activeTab('account', 'dashboard')}`;
    if (page === 'admin') return `admin/${activeTab('admin', 'overview')}`;
    if (page === 'rankings') {
      const mode = document.querySelector('.ranking-panel.active')?.id === 'ranking-clans-panel' ? 'clans' : 'pvp';
      return `rankings/${mode}`;
    }
    return page;
  }

  function syncControls() {
    document.body.dataset.currentPage = document.querySelector('.page.active')?.id.replace('page-', '') || 'home';
    document.querySelectorAll('[data-page], [data-account-tab], [data-account-tab-mobile], [data-admin-tab], [data-admin-tab-mobile], [data-ranking-mode]').forEach(button => {
      if (button.classList.contains('active')) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-ranking-mode]').forEach(button => {
      const selected = button.classList.contains('active');
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      button.removeAttribute('aria-current');
    });
    const title = document.getElementById('adminPageTitle');
    if (title) title.textContent = langs[lang].t[adminTitles[activeTab('admin', 'overview')]];
  }

  function writeRoute(replace = false) {
    const url = new URL(location.href);
    url.hash = currentRoute();
    url.searchParams.set('lang', lang);
    if (url.href !== location.href) history[replace ? 'replaceState' : 'pushState'](null, '', url);
    syncControls();
  }

  showPage = function (page) {
    original.showPage(pageNames.includes(page) ? page : 'home');
    writeRoute();
  };
  showAccountTab = function (tab) {
    original.showPage('account');
    original.showAccountTab(accountTabs.includes(tab) ? tab : 'dashboard');
    writeRoute();
  };
  showAdminTab = function (tab) {
    original.showPage('admin');
    original.showAdminTab(Object.hasOwn(adminTitles, tab) ? tab : 'overview');
    writeRoute();
  };
  showRankingMode = function (mode) {
    original.showPage('rankings');
    original.showRankingMode(mode === 'clans' ? 'clans' : 'pvp');
    writeRoute();
  };
  applyLang = function (code) {
    original.applyLang(code);
    writeRoute(true);
  };

  function readRoute() {
    const [requestedPage, tab] = location.hash.slice(1).split('/');
    const page = pageNames.includes(requestedPage) ? requestedPage : 'home';
    const requestedLanguage = new URL(location.href).searchParams.get('lang');
    if (requestedLanguage && Object.hasOwn(langs, requestedLanguage)) original.applyLang(requestedLanguage);
    original.showPage(page);
    if (page === 'account') original.showAccountTab(accountTabs.includes(tab) ? tab : 'dashboard');
    if (page === 'admin') original.showAdminTab(Object.hasOwn(adminTitles, tab) ? tab : 'overview');
    if (page === 'rankings') original.showRankingMode(tab === 'clans' ? 'clans' : 'pvp');
    writeRoute(true);
  }

  window.addEventListener('hashchange', readRoute);
  window.addEventListener('popstate', readRoute);
  document.querySelector('.ranking-mode-tabs').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...document.querySelectorAll('[data-ranking-mode]')];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    showRankingMode(tabs[next].dataset.rankingMode);
    tabs[next].focus();
  });
  original.applyLang(lang);
  readRoute();
})();
