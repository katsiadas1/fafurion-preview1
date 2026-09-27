/* Role icons and clan heraldry reuse the Site's bundled Font Awesome Free font. */
(() => {
  const symbols = {
    duelist: '\uf6de', titan: '\uf6e3', healer: '\ue05d', archer: '\uf140',
    assassin: '\uf504', mage: '\uf6e8', guardian: '\uf3ed',
    crown: '\uf521', dragon: '\uf6d5', storm: '\uf0e7', frost: '\uf2dc', moon: '\uf186',
    trophy: '\uf091', medal: '\uf5a2', shield: '\uf3ed', castle: '\uf447', bell: '\uf0f3',
    dashboard: '\uf0db', characters: '\uf0c0', clan: '\uf024', events: '\uf073',
    wheel: '\uf522', rewards: '\uf06b', wallet: '\uf51e', security: '\uf3ed',
    support: '\uf3ff', settings: '\uf1de', content: '\uf518', moderation: '\uf505',
    economy: '\uf51e', staff: '\uf0c0', server: '\uf233', audit: '\uf70e',
    star: '\uf005', lock: '\uf023'
  };
  const clans = {
    immortals: {symbol: 'crown', name: 'Immortals'},
    leviathan: {symbol: 'dragon', name: 'Leviathan'},
    olympus: {symbol: 'storm', name: 'Olympus'},
    northwind: {symbol: 'frost', name: 'Northwind'},
    eclipse: {symbol: 'moon', name: 'Eclipse'}
  };
  function icon(symbol) {
    const node = document.createElement('span');
    node.className = 'realm-icon';
    node.setAttribute('aria-hidden', 'true');
    node.textContent = symbols[symbol] || symbols.guardian;
    return node;
  }
  function roleFor(className = '') {
    if (/cardinal|bishop|saint|healer/i.test(className)) return 'healer';
    if (/sagittarius|sentinel|archer/i.test(className)) return 'archer';
    if (/ghost hunter|adventurer|wind rider|assassin/i.test(className)) return 'assassin';
    if (/titan|destroyer|dreadnought/i.test(className)) return 'titan';
    if (/muse|screamer|soultaker|wizard|mage|sorcerer|summoner/i.test(className)) return 'mage';
    if (/duelist|gladiator|tyrant|grand khavatari/i.test(className)) return 'duelist';
    return 'guardian';
  }
  function paintRole(node, className) {
    if (!node) return;
    const role = roleFor(className);
    node.replaceChildren(icon(role));
    node.classList.add('realm-class-icon');
    node.dataset.role = role;
    node.setAttribute('aria-hidden', 'true');
    node.title = className;
  }
  function paintCrest(node, name) {
    if (!node) return;
    const key = name.toLowerCase().replace(/[^a-z]/g, '');
    const clan = clans[key];
    node.replaceChildren(icon(clan?.symbol || 'shield'));
    node.classList.add('realm-clan-crest');
    node.dataset.clan = key;
    node.setAttribute('aria-hidden', 'true');
    node.title = clan?.name || name;
  }
  function paintRank(node, rank) {
    if (!node) return;
    const number = Number(String(rank).replace(/[^0-9]/g, ''));
    node.classList.remove('realm-rank-emblem');
    delete node.dataset.rank;
    if (number < 1 || number > 3) return;
    const label = document.createElement('span');
    label.className = 'realm-rank-value';
    label.textContent = '#' + number;
    node.replaceChildren(icon('trophy'), label);
    node.classList.add('realm-rank-emblem');
    node.dataset.rank = String(number);
  }
  function decoratePublicPlayer(key) {
    const player = publicRankProfiles[key];
    if (!player) return;
    paintRole(document.getElementById('publicProfileAvatar'), player.className);
    paintRank(document.getElementById('publicProfileRank'), player.rank);
  }
  function decoratePublicClan(key) {
    const clan = publicClanProfiles[key];
    if (!clan) return;
    paintCrest(document.getElementById('publicClanCrest'), clan.name);
    paintRole(document.getElementById('publicClanLeaderAvatar'), clan.leaderClass);
    paintRank(document.getElementById('publicClanRankMain'), clan.rank);
    document.querySelectorAll('#publicClanMemberList .public-clan-member').forEach(row => {
      paintRole(row.querySelector('.public-clan-member-avatar'), row.querySelector('small')?.textContent);
    });
  }
  const openPlayer = openPublicProfile;
  openPublicProfile = function (key) { openPlayer(key); decoratePublicPlayer(key); };
  const openClan = openPublicClan;
  openPublicClan = function (key) { openClan(key); decoratePublicClan(key); };
  const openAccountCharacter = openCharacter;
  openCharacter = function (key) {
    openAccountCharacter(key);
    if (demoCharacters[key]) paintRole(document.getElementById('profileEmblem'), demoCharacters[key].className);
  };

  document.querySelectorAll('.character-card').forEach(card => {
    paintRole(card.querySelector('.class-emblem'), card.querySelector('.character-class')?.textContent);
    if (!card.querySelector('a,button')) {
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', card.querySelector('.character-name')?.textContent || 'Character');
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); }
      });
    }
  });
  document.querySelectorAll('.rank-player-link').forEach(button => {
    const row = button.closest('tr');
    paintRole(button.querySelector('.rank-avatar'), row?.children[2]?.textContent);
  });
  document.querySelectorAll('.clan-rank-link').forEach(button => paintCrest(button.querySelector('.clan-rank-crest'), button.querySelector('b')?.textContent || ''));
  document.querySelectorAll('.clan-member').forEach(row => paintRole(row.querySelector('.member-avatar'), row.querySelector('small')?.textContent));
  paintCrest(document.querySelector('.clan-crest-large'), 'Immortals');
  document.querySelectorAll('.war-clan').forEach(row => paintCrest(row.querySelector('.war-crest'), row.querySelector('b')?.textContent || ''));
  document.querySelectorAll('.rank-number.top').forEach(node => paintRank(node, node.textContent));
  document.querySelectorAll('.podium-medal').forEach((node, index) => paintRank(node, index + 1));
  document.querySelectorAll('.side-link[data-account-tab]').forEach(button => {
    const target = button.querySelector('.side-icon');
    if (target) target.replaceChildren(icon(button.dataset.accountTab));
  });
  document.querySelectorAll('.admin-side-link[data-admin-tab]').forEach(button => {
    const target = button.firstElementChild;
    const type = {overview: 'dashboard', players: 'characters', donations: 'wallet'}[button.dataset.adminTab] || button.dataset.adminTab;
    if (target && !target.hasAttribute('data-i18n')) target.replaceChildren(icon(type));
  });
  const badgeIcons = ['star', 'medal', 'duelist', 'castle', 'shield', 'lock', 'lock', 'lock'];
  document.querySelectorAll('.account-badge > span').forEach((node, index) => node.replaceChildren(icon(badgeIcons[index] || 'star')));
  document.querySelector('.record-crown')?.replaceChildren(icon('crown'));
  document.querySelector('.notification-btn .bell')?.replaceChildren(icon('bell'));

  /* Keep edited reward inputs understandable when the desktop column labels stack. */
  function labelWheelInputs() {
    const labels = {
      en: {id: 'Item ID', name: 'Reward name', amount: 'Amount', chance: 'Chance (%)', remove: 'Remove reward'},
      el: {id: 'ID αντικειμένου', name: 'Όνομα ανταμοιβής', amount: 'Ποσότητα', chance: 'Πιθανότητα (%)', remove: 'Αφαίρεση ανταμοιβής'},
      pt: {id: 'ID do item', name: 'Nome da recompensa', amount: 'Quantidade', chance: 'Chance (%)', remove: 'Remover recompensa'},
      ru: {id: 'ID предмета', name: 'Название награды', amount: 'Количество', chance: 'Шанс (%)', remove: 'Удалить награду'}
    }[lang] || {};
    document.querySelectorAll('#wheelAdminRows [data-field]').forEach(input => {
      const label = labels[input.dataset.field];
      if (label) { input.setAttribute('aria-label', label); input.title = label; }
    });
    document.querySelectorAll('#wheelAdminRows button').forEach(button => button.setAttribute('aria-label', labels.remove));
  }
  const renderRows = renderWheelAdminRows;
  renderWheelAdminRows = function () { renderRows(); labelWheelInputs(); };
  const translate = applyLang;
  applyLang = function (code) { translate(code); labelWheelInputs(); };
  labelWheelInputs();
})();
