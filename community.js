(() => {
  const data=window.FafurionCommunity, I=window.FafurionI18n;
  if(!data||!I)return;
  const t=s=>I.t(s);
  const esc=value=>String(value??'—').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number=n=>Number.isFinite(Number(n))?Number(n).toLocaleString(I.locale):'—';
  const pageUrl=(kind,name)=>{const url=new URL(kind+'.html',I.base);url.searchParams.set('name',name);url.searchParams.set('lang',I.language);return url.pathname+url.search;};
  const absoluteProfileUrl=(kind,name)=>new URL(pageUrl(kind,name),location.origin).href;
  const initials=name=>String(name||'?').split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
  const link=(kind,name)=>{
    if(!(kind==='player'?data.player(name):data.clan(name)))return esc(name==='—'?t(kind==='clan'?'No clan':'Player'):name);
    return `<a class="profile-link" href="${esc(pageUrl(kind,name))}" data-${kind}-card="${esc(name)}" data-no-i18n>${esc(name)}</a>`;
  };
  const stat=(label,value)=>`<div class="profile-stat"><strong>${esc(value)}</strong><span>${esc(t(label))}</span></div>`;
  const status=p=>`<span class="profile-status ${p.online?'online':''}">${esc(t(p.online?'Online':'Offline'))}</span>`;
  const facts=rows=>`<dl class="profile-facts">${rows.map(([label,value])=>`<div><dt>${esc(t(label))}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
  const achievements=p=>{
    const rank=data.ranked().findIndex(row=>row.name===p.name)+1;
    const c=data.clan(p.clan);
    const badges=[
      ['⚔','First Blood',p.pvp>0,'First PvP victory'],
      ['Ⅰ','Top 10 PvP',rank>0&&rank<=10,rank>0?`Server PvP rank #${rank}`:'Unranked'],
      ['✦','1,000 PvP Kills',p.pvp>=1000,`${number(p.pvp)} PvP kills`],
      ['♜','Castle Champion',Boolean(c&&c.castle&&c.castle!=='—'),c&&c.castle!=='—'?`${c.castle} Castle`:'No castle ownership'],
      ['◇','Event Winner',p.pvp>=1500,'Demo event achievement'],
      ['Ω','Olympiad Hero',Number(p.streak)>=25,'Demo seasonal achievement']
    ];
    return `<div class="profile-badges achievement-grid">${badges.map(([icon,title,unlocked,description])=>`<div class="profile-badge achievement-badge ${unlocked?'unlocked':'locked'}"><b aria-hidden="true">${icon}</b><div><strong>${esc(title)}</strong><span>${esc(description)} · ${esc(unlocked?'Unlocked':'Locked')}</span></div></div>`).join('')}</div>`;
  };
  function playerHTML(p,full=false) {
    const c=data.clan(p.clan);const rank=data.ranked().findIndex(row=>row.name===p.name)+1;
    const roster=c?data.roster(c.name):[];
    const role=c?.leader===p.name?'Leader':'Member';
    return `<article class="profile-shell"><div class="profile-top"><div class="profile-identity"><span class="profile-avatar-large">${esc(initials(p.name))}</span><div><span class="profile-kicker">${esc(t(full?'Public profile':'Player card'))} · ${esc(t('Demo data'))}</span><${full?'h1':'h2'} data-no-i18n>${esc(p.name)}</${full?'h1':'h2'}><p><span data-no-i18n>${esc(p.class)}</span> · ${esc(t('Level'))} ${number(p.level)} · PvP Rank #${rank}</p><p>${link('clan',p.clan)}</p></div></div>${status(p)}</div><div class="profile-content"><div class="profile-stats">${stat('PvP',number(p.pvp))}${stat('PK',number(p.pk))}${stat('Deaths',number(p.deaths))}${stat('K/D',data.kd(p))}</div><p class="community-hint">${esc(t('K/D = PvP kills ÷ PvP deaths. PK kills are excluded.'))}</p><div class="profile-grid"><section class="profile-section"><h3>${esc(t('Combat'))}</h3>${facts([['Demo rank','#'+rank],['Playtime',number(p.playtime)+' '+esc(t('hours'))],['Best streak',number(p.streak)]])}</section><section class="profile-section"><h3>${esc(t('Clan'))}</h3>${facts([['Clan',c?link('clan',c.name):esc(t('No clan'))],['Leader',c?link('player',c.leader):'—'],['Alliance',esc(c?.alliance||t('No alliance'))],['Members',c?number(roster.length):'—'],['Role',c?esc(t(role)):'—']])}</section>${full?`<section class="profile-section"><h2>${esc(t('Equipment'))}</h2>${data.gearVisible(p.name)?`<div class="profile-gear">${(p.gear||[]).map(g=>`<div class="gear-slot"><small>${esc(t(g.slot))}</small><span data-no-i18n>${esc(g.name)}</span></div>`).join('')}</div>`:`<p>${esc(t('Equipment hidden by the player.'))}</p>`}</section><section class="profile-section"><h2>${esc(t('Achievements'))}</h2>${achievements(p)}</section><section class="profile-section profile-fullwidth"><h2>${esc(t('Activity'))}</h2><ul>${(p.activity||[]).map((a,i)=>`<li>${esc(t(a))} · ${esc(t(i?'Yesterday':'Today'))}</li>`).join('')}</ul></section>`:''}</div>${full?`<div class="profile-share-bar"><span>Share this public character profile</span><button type="button" class="profile-button profile-copy-link" data-profile-url="${esc(absoluteProfileUrl('player',p.name))}">COPY PROFILE LINK</button></div>`:`<div class="profile-footer"><a class="profile-button" href="${esc(pageUrl('player',p.name))}">${esc(t('Full profile →'))}</a></div>`}</div></article>`;
  }
  function rosterHTML(c) {
    const rows=data.roster(c.name).slice().sort((a,b)=>Number(b.name===c.leader)-Number(a.name===c.leader)||b.pvp-a.pvp);
    return `<div class="profile-table-wrap" tabindex="0" role="region" aria-label="${esc(t('Clan roster'))}"><table class="profile-table"><thead><tr>${['Player','Class','Level','PvP','Deaths','K/D','Role','Status'].map(h=>`<th scope="col">${esc(t(h))}</th>`).join('')}</tr></thead><tbody>${rows.map(p=>`<tr><td>${link('player',p.name)}</td><td data-no-i18n>${esc(p.class)}</td><td>${number(p.level)}</td><td>${number(p.pvp)}</td><td>${number(p.deaths)}</td><td>${esc(data.kd(p))}</td><td>${esc(t(p.name===c.leader?'Leader':'Member'))}</td><td>${esc(t(p.online?'Online':'Offline'))}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function clanHTML(c,full=false) {
    const members=data.roster(c.name),online=members.filter(p=>p.online).length;
    const featured=members.slice().sort((a,b)=>b.pvp-a.pvp).slice(0,3);
    const clanPvp=members.reduce((sum,p)=>sum+(Number(p.pvp)||0),0);
    const clanRanking=data.clans.slice().sort((a,b)=>data.roster(b.name).reduce((s,p)=>s+(Number(p.pvp)||0),0)-data.roster(a.name).reduce((s,p)=>s+(Number(p.pvp)||0),0)).findIndex(x=>x.name===c.name)+1;
    return `<article class="profile-shell"><div class="profile-top"><div><span class="profile-kicker">${esc(t(full?'Public profile':'Clan card'))} · ${esc(t('Demo data'))}</span><${full?'h1':'h2'} data-no-i18n>${esc(c.name)}</${full?'h1':'h2'}><p>${esc(t('Leader'))}: ${link('player',c.leader)}</p><p>${esc(t('Alliance'))}: <span data-no-i18n>${esc(c.alliance||t('No alliance'))}</span></p></div><span class="profile-status">${esc(t('Level'))} ${number(c.level)}</span></div><div class="profile-content"><div class="profile-stats">${stat('Members',number(members.length))}${stat('Online members',number(online))}${stat('Clan PvP',number(clanPvp))}${stat('PvP Rank',clanRanking>0?'#'+clanRanking:'—')}${stat('Reputation',number(c.reputation))}${stat('Castle',c.castle==='—'?t('No castle'):c.castle)}</div><div class="profile-grid"><section class="profile-section"><h3>${esc(t('Castle siege'))}</h3>${facts([['Next siege',esc(t(c.siege||'Coming soon'))],['Active wars',(c.wars||[]).length?c.wars.map(name=>link('clan',name)).join(', '):esc(t('No active wars'))]])}</section><section class="profile-section"><h3>${esc(t('Featured members'))}</h3><div class="featured-members">${featured.map(p=>link('player',p.name)).join('')}</div></section>${full?`<section class="profile-section profile-fullwidth"><h2>${esc(t('Clan roster'))}</h2>${rosterHTML(c)}</section><section class="profile-section profile-fullwidth"><h2>${esc(t('Activity'))}</h2><ul>${(c.activity||[]).map((a,i)=>`<li>${esc(t(a))} · ${esc(t(i?'Yesterday':'Today'))}</li>`).join('')}</ul></section>`:''}</div>${full?`<div class="profile-share-bar"><span>Share this public clan profile</span><button type="button" class="profile-button profile-copy-link" data-profile-url="${esc(absoluteProfileUrl('clan',c.name))}">COPY PROFILE LINK</button></div>`:`<div class="profile-footer"><a class="profile-button" href="${esc(pageUrl('clan',c.name))}">${esc(t('Full profile →'))}</a></div>`}</div></article>`;
  }
  let dialog,dialogRecord,returnFocus;
  function showCard(kind,name,trigger) {
    const record=kind==='player'?data.player(name):data.clan(name);if(!record)return;
    if(!dialog){dialog=document.createElement('dialog');dialog.className='community-dialog';document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{dialogRecord=null;if(returnFocus?.isConnected)returnFocus.focus();});}
    dialogRecord={kind,name};if(!dialog.open)returnFocus=trigger;
    dialog.setAttribute('aria-label',`${t(kind==='player'?'Player card':'Clan card')}: ${name}`);
    dialog.innerHTML=`<button type="button" class="community-dialog-close" aria-label="${esc(t('Close dialog'))}">×</button>`+(kind==='player'?playerHTML(record):clanHTML(record));
    dialog.querySelector('.community-dialog-close').onclick=()=>dialog.close();
    if(!dialog.open){if(typeof dialog.showModal==='function')dialog.showModal();else{location.href=pageUrl(kind,name);return;}}
    dialog.querySelector('button').focus();
  }
  function renderPage() {
    const target=document.getElementById('public-profile');if(!target)return;
    const kind=document.body.dataset.profileKind,name=new URL(location.href).searchParams.get('name');
    const record=kind==='player'?data.player(name):data.clan(name);
    if(!record){target.innerHTML=`<section class="profile-shell"><div class="profile-content"><h1>${esc(t('Profile unavailable'))}</h1><p>${esc(t(kind==='player'?'This character could not be found.':'This clan could not be found.'))}</p><a class="profile-button" href="rankings.html">${esc(t('Back to rankings'))}</a></div></section>`;return;}
    target.innerHTML=kind==='player'?playerHTML(record,true):clanHTML(record,true);
    document.title=`${record.name} · ${t('Public profile')} — Fafurion`;
  }
  document.addEventListener('click',async e=>{
    const copy=e.target.closest('.profile-copy-link');
    if(copy){
      e.preventDefault();
      const url=copy.dataset.profileUrl||location.href;
      try{await navigator.clipboard.writeText(url);copy.textContent='COPIED';setTimeout(()=>copy.textContent='COPY PROFILE LINK',1500);}
      catch{window.prompt('Copy profile link:',url);}
      return;
    }
    const anchor=e.target.closest('a[data-player-card],a[data-clan-card]');
    if(!anchor||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;
    const kind=anchor.hasAttribute('data-player-card')?'player':'clan';e.preventDefault();showCard(kind,anchor.dataset[kind+'Card'],anchor);
  });
  window.addEventListener('fafurion:language',()=>{renderPage();if(dialogRecord)showCard(dialogRecord.kind,dialogRecord.name,returnFocus);});
  window.addEventListener('fafurion:privacy',renderPage);
  window.FafurionUI={esc,number,link,pageUrl,stat,status,playerHTML,clanHTML,rosterHTML,achievements};
  renderPage();
})();
