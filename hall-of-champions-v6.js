/* COUNTER V6 — Hall of Champions, visual-only PvP podium.
 * Reuses existing race/gender avatars, data, click handlers and translations.
 */
(() => {
  'use strict';
  const root=document.getElementById('ranking-pvp-panel');
  const podium=root?.querySelector('.rank-top.public-podium');
  if(!podium || typeof publicRankProfiles==='undefined')return;
  const copy={
    en:{title:'Hall of Champions',sub:'Top PvP warriors of the realm',preview:'Demo rankings',hero:'HERO',online:'Online',offline:'Offline'},
    el:{title:'Αίθουσα Πρωταθλητών',sub:'Οι κορυφαίοι PvP παίκτες του server',preview:'Demo κατάταξη',hero:'HERO',online:'Online',offline:'Offline'},
    pt:{title:'Hall dos Campeões',sub:'Os melhores guerreiros PvP do reino',preview:'Ranking demo',hero:'HERÓI',online:'Online',offline:'Offline'},
    ru:{title:'Зал чемпионов',sub:'Лучшие PvP бойцы сервера',preview:'Демо-рейтинг',hero:'ГЕРОЙ',online:'Онлайн',offline:'Офлайн'}
  };
  const i18n=()=>copy[document.documentElement.lang?.toLowerCase().slice(0,2)]||copy.en;
  const create=(tag,cls,content)=>{
    const el=document.createElement(tag);
    el.className=cls;
    if(content!==undefined)el.textContent=content;
    return el;
  };
  const header=create('div','champions-v6-head');
  const left=create('div','champions-v6-heading');
  const title=create('h3','champions-v6-title');
  const sub=create('span','champions-v6-sub');
  const demo=create('span','champions-v6-demo');
  left.append(title,sub);
  header.append(left,demo);
  podium.before(header);
  const players=new Map(Object.values(publicRankProfiles).map(p=>[String(p.name||'').toLowerCase(),p]));
  const enhanced=[];
  for(const button of podium.querySelectorAll('.rank-podium-button')){
    const name=button.querySelector('strong')?.textContent?.trim().toLowerCase();
    const p=players.get(name);
    if(!p)continue;
    const place=String(p.rank||'').replace(/[^0-9]/g,'');
    if(!['1','2','3'].includes(place))continue;
    button.classList.add('champion-v6-card');
    button.dataset.championPlace=place;
    button.setAttribute('aria-label',p.name+', #'+place+', '+p.className+', '+p.pvp+' PvP');
    const nameNode=button.querySelector('strong');
    const cl=create('span','champion-v6-class',p.className);
    const clan=create('span','champion-v6-clan',p.clan);
    nameNode.after(cl,clan);
    const stats=create('div','champion-v6-metrics');
    const kd=create('span','champion-v6-kd','K/D '+String(p.kd));
    const status=create('span',String(p.status).toLowerCase()==='online'?'champion-online':'champion-offline');
    const hero=String(p.hero).toLowerCase()==='yes'?create('span','champion-hero'):null;
    kd.title='Kills / deaths';
    stats.append(kd,status);
    if(hero)stats.append(hero);
    const action=button.querySelector('em');
    if(action)action.before(stats);
    else button.append(stats);
    enhanced.push({p,status,hero});
  }
  if(!enhanced.length){header.remove();return;}
  function translate(){
    const lang=i18n();
    title.textContent=lang.title;
    sub.textContent=lang.sub;
    demo.textContent=lang.preview;
    enhanced.forEach(({p,status,hero})=>{
      status.textContent=String(p.status).toLowerCase()==='online'?lang.online:lang.offline;
      if(hero)hero.textContent=lang.hero;
    });
  }
  translate();
  if(typeof MutationObserver==='function'){
    const observer=new MutationObserver(changes=>{
      if(changes.some(change=>change.attributeName==='lang'))translate();
    });
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  window.CounterHallOfChampions={refresh:translate};
})();