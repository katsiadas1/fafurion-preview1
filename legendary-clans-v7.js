/* COUNTER · Legendary Clan Rankings V7.
   Visual preview. Uses the 3 existing publicClanProfiles records and
   the matching live DOM crest icons. The original table remains intact.
 */
(() => {
  'use strict';
  const root=document.getElementById('ranking-clans-panel');
  if(!root||typeof publicClanProfiles==='undefined'||root.querySelector('.legendary-clans-v7-grid'))return;
  const table=root.querySelector('.clan-rank-table');
  if(!table)return;
  const copy={
    en:{title:'Legendary Clans',sub:'The strongest clans of the realm',demo:'Demo rankings',rank:'Rank',reputation:'Reputation',members:'Members',online:'Online',level:'Level',castle:'Castle',noCastle:'No castle',leader:'Clan Leader',view:'Open clan profile',leaderProfile:'Open leader profile'},
    el:{title:'Θρυλικά Clans',sub:'Τα κορυφαία clans του server',demo:'Demo κατάταξη',rank:'Θέση',reputation:'Φήμη Clan',members:'Μέλη',online:'Online',level:'Επίπεδο',castle:'Κάστρο',noCastle:'Χωρίς κάστρο',leader:'Αρχηγός Clan',view:'Άνοιγμα clan profile',leaderProfile:'Άνοιγμα προφίλ αρχηγού'},
    pt:{title:'Clãs Lendários',sub:'Os clãs mais fortes do reino',demo:'Ranking demo',rank:'Posição',reputation:'Reputação',members:'Membros',online:'Online',level:'Nível',castle:'Castelo',noCastle:'Sem castelo',leader:'Líder do clã',view:'Abrir perfil do clã',leaderProfile:'Abrir perfil do líder'},
    ru:{title:'Легендарные кланы',sub:'Сильнейшие кланы сервера',demo:'Демо-рейтинг',rank:'Место',reputation:'Репутация',members:'Участники',online:'Онлайн',level:'Уровень',castle:'Замок',noCastle:'Без замка',leader:'Лидер клана',view:'Открыть профиль клана',leaderProfile:'Открыть профиль лидера'}
  };
  const lang=()=>copy[document.documentElement.lang?.toLowerCase().slice(0,2)]||copy.en;
  const el=(tag,cls,value)=>{
    const node=document.createElement(tag);
    node.className=cls;
    if(value!==undefined)node.textContent=String(value);
    return node;
  };
  const clans=Object.entries(publicClanProfiles).map(([key,data])=>{
    const n=Number(String(data.rank??'').replace(/[^0-9]/g,''));
    return {key,data,place:n};
  }).filter(row=>Number.isInteger(row.place)&&row.place>=1&&row.place<=3).sort((a,b)=>a.place-b.place);
  if(clans.length!==3)return;
  const existingTableClans=new Map([...table.querySelectorAll('.clan-rank-name')].map(button=>{
    const key=button.querySelector('b')?.textContent?.trim().toLowerCase();
    return [key,button.querySelector('.clan-rank-crest')];
  }));
  const heading=el('div','legendary-clans-v7-head');
  const headingText=el('div','legendary-clans-v7-head-copy');
  const title=el('h3','legendary-clans-v7-heading');
  const subtitle=el('span','legendary-clans-v7-sub');
  const preview=el('span','legendary-clans-v7-demo');
  headingText.append(title,subtitle);
  heading.append(headingText,preview);
  const grid=el('div','legendary-clans-v7-grid');
  grid.setAttribute('aria-label','Top 3 clans');
  const decorated=[];
  for(const {key,data,place} of clans){
    const card=el('article','legendary-clan-v7-card');
    card.dataset.clanPlace=String(place);
    const main=el('button','legendary-clan-v7-main');
    main.type='button';
    const placeTag=el('span','legendary-clan-v7-rank','#'+place);
    const tableCrest=existingTableClans.get(String(data.name).trim().toLowerCase());
    const crest=tableCrest?.cloneNode(true)||el('span','clan-rank-crest',data.crest||'?');
    crest.classList.add('legendary-clan-v7-crest');
    crest.setAttribute('aria-hidden','true');
    const name=el('strong','legendary-clan-v7-name',data.name);
    const alliance=el('span','legendary-clan-v7-alliance',data.alliance);
    const reputation=el('strong','legendary-clan-v7-rep',data.reputation);
    const reputationLabel=el('span','legendary-clan-v7-rep-label');
    main.append(placeTag,crest,name,alliance,reputation,reputationLabel);
    main.addEventListener('click',()=>window.openPublicClan?.(key));
    const stats=el('div','legendary-clan-v7-stats');
    const metrics=[
      {value:data.members},
      {value:data.online},
      {value:data.level}
    ].map(item=>{
      const container=el('span','legendary-clan-v7-stat');
      const amount=el('b','legendary-clan-v7-amount',item.value);
      const label=el('small','legendary-clan-v7-stat-name');
      container.append(amount,label);
      stats.append(container);
      return label;
    });
    const castleName=String(data.castle||'—').trim();
    const noCastle=!castleName||castleName==='—';
    const castle=el('div','legendary-clan-v7-castle');
    castle.dataset.noCastle=String(noCastle);
    const castleLabel=el('span','legendary-clan-v7-castle-label');
    castle.append(castleLabel);
    const leader=el('button','legendary-clan-v7-leader');
    leader.type='button';
    const leaderDescription=el('small','legendary-clan-v7-leader-label');
    const leaderName=el('b','legendary-clan-v7-leader-name',data.leader);
    const leaderIcon=el('span','legendary-clan-v7-leader-icon','↗');
    leaderIcon.setAttribute('aria-hidden','true');
    const leaderCopy=el('span','legendary-clan-v7-leader-copy');
    leaderCopy.append(leaderDescription,document.createTextNode(' '),leaderName);
    leader.append(leaderCopy,leaderIcon);
    if(data.leaderKey && typeof window.openPublicProfile==='function')
      leader.addEventListener('click',()=>window.openPublicProfile?.(data.leaderKey));
    else leader.disabled=true;
    card.append(main,stats,castle,leader);
    grid.append(card);
    decorated.push({data,place,main,metrics,leader,leaderDescription,castle,castleLabel,reputationLabel,placeTag,noCastle});
  }
  table.before(heading,grid);
  function translate(){
    const locale=lang();
    title.textContent=locale.title;
    subtitle.textContent=locale.sub;
    preview.textContent=locale.demo;
    grid.setAttribute('aria-label',locale.title);
    for(const card of decorated){
      const c=card.data;
      card.main.setAttribute('aria-label',locale.view+': '+c.name+' #'+card.place);
      card.placeTag.title=locale.rank+' #'+card.place;
      card.reputationLabel.textContent=locale.reputation;
      card.metrics[0].textContent=locale.members;
      card.metrics[1].textContent=locale.online;
      card.metrics[2].textContent=locale.level;
      card.castleLabel.textContent=card.noCastle?locale.noCastle:(locale.castle+': '+c.castle);
      card.leaderDescription.textContent=locale.leader+' ·';
      card.leader.setAttribute('aria-label',locale.leaderProfile+': '+c.leader);
    }
  }
  translate();
  if(typeof MutationObserver==='function'){
    const observer=new MutationObserver(records=>{
      if(records.some(record=>record.attributeName==='lang'))translate();
    });
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  window.CounterLegendaryClanRankings={refresh:translate};
})();