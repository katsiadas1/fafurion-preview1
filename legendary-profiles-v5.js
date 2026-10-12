/* COUNTER — Legendary Character Profiles V5.
 * Cosmetics only. Reads explicit hero/noble flags, existing public achievements
 * and displayed PvP totals. No server-side rewards or new status claims.
 * Loaded AFTER race-avatars-v4.js so portrait decorators remain intact.
 */
(() => {
  'use strict';
  const enabled=value=>value===true||value===1||/^(yes|true|1)$/i.test(String(value??'').trim());
  const classifyBadge=name=>{
    const s=String(name||'').toLowerCase();
    if(/hero|olympiad/.test(s))return 'hero';
    if(/siege|castle|dominion/.test(s))return 'siege';
    if(/pvp|hunter|assassin|sharpshooter/.test(s))return 'pvp';
    if(/support|healer|medic/.test(s))return 'support';
    return 'veteran';
  };
  const chip=(type,label)=>{
    const el=document.createElement('span');
    el.className='legendary-status-chip is-'+type;
    const symbol=document.createElement('span');
    symbol.className='legendary-symbol';
    symbol.textContent=type==='hero'?'✦':'◇';
    symbol.setAttribute('aria-hidden','true');
    el.append(symbol,document.createTextNode(label));
    return el;
  };
  const statuses=(container,record)=>{
    if(!container||!record)return;
    const activeHero=enabled(record.hero),activeNoble=enabled(record.noble);
    let row=container.querySelector('.legendary-status-line');
    if(!activeHero&&!activeNoble){if(row)row.remove();return;}
    if(!row){
      row=document.createElement('div');
      row.className='legendary-status-line';
      row.setAttribute('aria-label','Character titles');
      container.appendChild(row);
    }
    row.replaceChildren();
    if(activeHero)row.appendChild(chip('hero','HERO'));
    if(activeNoble)row.appendChild(chip('noble','NOBLESSE'));
  };
  const rankType=record=>String(record?.rank??'').replace(/[^0-9]/g,'');
  const setTitles=(card,record)=>{
    if(!card||!record)return;
    card.dataset.legendaryHero=enabled(record.hero)?'true':'false';
    card.dataset.legendaryNoble=enabled(record.noble)?'true':'false';
  };
  const highlightAchievements=scope=>{
    if(!scope)return;
    scope.querySelectorAll('.public-badge,.achievement-badge').forEach(badge=>{
      const heading=badge.querySelector('b:not(:first-child),strong')?.textContent||
         (badge.classList.contains('public-badge')?badge.querySelector('div b')?.textContent:'')||
         badge.textContent;
      badge.classList.remove('legendary-badge-hero','legendary-badge-siege','legendary-badge-pvp','legendary-badge-support','legendary-badge-veteran');
      badge.classList.add('legendary-badge-'+classifyBadge(heading));
    });
  };
  const decoratePublic=key=>{
    const data=typeof publicRankProfiles!=='undefined'?publicRankProfiles[key]:null;
    const card=document.getElementById('publicProfileCard');
    if(!data||!card)return;
    setTitles(card,data);
    statuses(card.querySelector('.public-profile-title'),data);
    highlightAchievements(card.querySelector('#publicBadgesList'));
  };
  // The existing renderer, class-icon decorators, male/female and race badges run first.
  if(typeof window.openPublicProfile==='function'){
    const current=window.openPublicProfile;
    window.openPublicProfile=function(key){
      const output=current.apply(this,arguments);
      decoratePublic(key);
      return output;
    };
  }
  const milestones=[
    {kills:100,label:'100+ PvP'},
    {kills:500,label:'500+ PvP'},
    {kills:1000,label:'1,000+ PvP'},
    {kills:2500,label:'2,500+ PvP'}
  ];
  const renderMilestones=(card,record)=>{
    if(!card||!record)return;
    const number=Number(String(record.pvp??'').replace(/,/g,'').trim());
    let region=card.querySelector('.legendary-kills');
    if(!Number.isFinite(number)||number<0){
      region?.remove();
      return;
    }
    const achieved=milestones.filter(m=>number>=m.kills);
    if(!achieved.length){region?.remove();return;}
    if(!region){
      region=document.createElement('section');
      region.className='legendary-kills';
      region.setAttribute('aria-label','PvP kill records');
      const grid=card.querySelector('.profile-stat-grid');
      if(grid)grid.insertAdjacentElement('afterend',region);
      else card.querySelector('.profile-content')?.prepend(region);
    }
    const title=document.createElement('h4');
    title.textContent='PVP KILL RECORDS';
    const items=document.createElement('div');
    items.className='legendary-kills-list';
    achieved.forEach((entry,index)=>{
      const badge=document.createElement('span');
      badge.className='legendary-kill-medal'+(index===achieved.length-1?' is-highest':'');
      const icon=document.createElement('span');
      icon.className='legendary-symbol';
      icon.setAttribute('aria-hidden','true');
      icon.textContent=index===achieved.length-1?'✦':'◆';
      badge.append(icon,document.createTextNode(entry.label));
      items.appendChild(badge);
    });
    region.replaceChildren(title,items);
  };
  if(typeof window.openCharacter==='function'){
    const current=window.openCharacter;
    window.openCharacter=function(key){
      const output=current.apply(this,arguments);
      const data=typeof demoCharacters!=='undefined'?demoCharacters[key]:null;
      const card=document.querySelector('#characterModal .character-profile');
      if(card&&data){
        setTitles(card,data);
        statuses(card.querySelector('.profile-title'),data);
        renderMilestones(card,data);
      }
      return output;
    };
  }
  function decorateCommunity(){
    document.querySelectorAll('body[data-profile-kind="player"] #public-profile .profile-shell, .community-dialog .profile-shell').forEach(shell=>{
      const heading=shell.querySelector('.profile-identity h1,.profile-identity h2');
      const record=window.FafurionCommunity?.player?.(heading?.textContent?.trim()||'');
      if(record){
        setTitles(shell,record);
        statuses(shell.querySelector('.profile-identity > div'),record);
      }
      highlightAchievements(shell);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorateCommunity,{once:true});
  else decorateCommunity();
  document.addEventListener('click',event=>{
    if(event.target.closest('a[data-player-card]'))decorateCommunity();
  });
  window.addEventListener('fafurion:language',decorateCommunity);
  window.addEventListener('fafurion:privacy',decorateCommunity);
  window.CounterLegendaryProfiles={decorateCommunity};
})();