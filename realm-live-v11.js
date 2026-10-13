/* COUNTER V11A — same-origin read-only public data.
   NEVER marks DEMO numbers as live. No sensitive data, browser SQL or game writes.
   Source of truth is GET /api/public/realm from the separately deployed private API.
 */
(() => {
  'use strict';
  const API='/api/public/realm';
  const $=selector=>document.querySelector(selector);
  const create=(tag,cls,text)=>{
    const element=document.createElement(tag);
    if(cls)element.className=cls;
    if(text!==undefined&&text!==null)element.textContent=String(text);
    return element;
  };
  const attach=(parent,...children)=>{for(const child of children)if(child)parent.appendChild(child);return parent};
  const pretty=value=>Number(value).toLocaleString('en-US');
  const locales={
    en:{live:'LIVE · GameServer DB',demo:'DEMO · Preview only',stale:'DATA UNAVAILABLE · Last verified snapshot',player:'Player',clan:'Clan',pvp:'PvP',pk:'PK',level:'Level',online:'Online',offline:'Offline',deaths:'PvP deaths',kd:'K/D',members:'Members',leader:'Leader',reputation:'Reputation',castle:'Castle',nocastle:'No castle',class:'Class',public:'PUBLIC GAME STATS',clanStats:'PUBLIC CLAN STATS',view:'VIEW PUBLIC STATS',last:'From GameServer database · read-only',empty:'No public records yet',preview:'DB SNAPSHOT'},
    el:{live:'LIVE · Βάση GameServer',demo:'DEMO · Δοκιμαστικά στοιχεία',stale:'ΑΔΥΝΑΜΙΑ ΣΥΝΔΕΣΗΣ · Τελευταία επιβεβαιωμένα',player:'Παίκτης',clan:'Clan',pvp:'PvP',pk:'PK',level:'Level',online:'Online',offline:'Offline',deaths:'PvP θάνατοι',kd:'K/D',members:'Μέλη',leader:'Αρχηγός',reputation:'Φήμη',castle:'Κάστρο',nocastle:'Χωρίς κάστρο',class:'Class',public:'ΔΗΜΟΣΙΑ ΣΤΑΤΙΣΤΙΚΑ',clanStats:'ΔΗΜΟΣΙΑ CLAN STATS',view:'ΔΗΜΟΣΙΑ ΣΤΟΙΧΕΙΑ',last:'Από τη βάση GameServer · μόνο ανάγνωση',empty:'Δεν υπάρχουν ακόμη δημόσια στοιχεία',preview:'ΣΤΟΙΧΕΙΑ ΒΑΣΗΣ'},
    pt:{live:'LIVE · Banco do GameServer',demo:'DEMO · Dados de exemplo',stale:'DADOS INDISPONÍVEIS · Última atualização',player:'Jogador',clan:'Clã',pvp:'PvP',pk:'PK',level:'Nível',online:'Online',offline:'Offline',deaths:'Mortes PvP',kd:'K/D',members:'Membros',leader:'Líder',reputation:'Reputação',castle:'Castelo',nocastle:'Sem castelo',class:'Classe',public:'DADOS PÚBLICOS DO JOGO',clanStats:'DADOS PÚBLICOS DO CLÃ',view:'VER ESTATÍSTICAS',last:'Banco do GameServer · somente leitura',empty:'Nenhum registro público',preview:'BANCO DE DADOS'},
    ru:{live:'LIVE · База GameServer',demo:'ДЕМО · Пример данных',stale:'НЕТ СОЕДИНЕНИЯ · Последние данные',player:'Игрок',clan:'Клан',pvp:'PvP',pk:'PK',level:'Уровень',online:'Онлайн',offline:'Офлайн',deaths:'Смерти PvP',kd:'K/D',members:'Участники',leader:'Лидер',reputation:'Репутация',castle:'Замок',nocastle:'Без замка',class:'Класс',public:'ПУБЛИЧНАЯ СТАТИСТИКА',clanStats:'ДАННЫЕ КЛАНА',view:'ПОСМОТРЕТЬ СТАТИСТИКУ',last:'Из базы GameServer · только чтение',empty:'Нет публичных данных',preview:'ДАННЫЕ БАЗЫ'}
  };
  const words=()=>locales[document.documentElement.lang?.toLowerCase().slice(0,2)]||locales.en;
  const tag=place=>{
    if(!place)return null;
    const el=create('span','v11-source-tag','DEMO');
    el.dataset.source='demo';
    place.appendChild(el);
    return el;
  };
  const tags=[];
  const online=$("#realmOnlinePlayers");
  if(online)tags.push(tag(online.parentElement));
  const rankingStatus=$("#page-rankings .section-head .status");
  if(rankingStatus)tags.push(tag(rankingStatus));
  const ranks=$("#ranking-pvp-panel .rank-top.public-podium");
  const pvpTable=$("#ranking-pvp-panel .rank-table-wrap tbody");
  const clansGrid=$("#ranking-clans-panel .legendary-clans-v7-grid");
  const clanTable=$("#ranking-clans-panel .clan-rank-table tbody");
  const originalHint=$("#page-rankings .clan-ranking-note p");
  let data=null,active=false,stale=false,current=null,priorFocus=null;
  function setSource(){
    const source=!active?'demo':stale?'stale':'live';
    for(const label of tags.filter(Boolean)){
      label.dataset.source=source;
      label.textContent=words()[source];
    }
    const old=$("#page-rankings .section-head .status [data-i18n='updated']");
    if(old)old.hidden=active;
    const oldClan=$("#ranking-clans-panel .clan-rank-live");
    if(oldClan)oldClan.hidden=active;
    for(const el of document.querySelectorAll('.champions-v6-demo,.legendary-clans-v7-demo'))
      if(active)el.textContent=words().preview;
    if(online&&active&&data)online.textContent=pretty(data.online);
  }
  const avatar=(player,cls)=>{
    const a=create('span',cls,(player.name||'?').slice(0,2).toUpperCase());
    let race=player.race;
    if(!race && window.CounterRaceAvatars?.resolveRace)
      race=window.CounterRaceAvatars.resolveRace(player.class,null);
    if(['human','elf','darkelf','orc','dwarf','kamael'].includes(race)){
      a.classList.add('race-avatar');
      a.dataset.race=race;
      if(['male','female'].includes(player.gender))a.dataset.gender=player.gender;
    }
    return a;
  };
  function displayPublic(kind,item,trigger){
    current={kind,item};
    priorFocus=trigger||document.activeElement;
    const root=getModal();
    drawModal();
    root.classList.add('open');
    document.body.classList.add('v11-live-dialog-open');
    root.querySelector('.v11-detail-close')?.focus();
  }
  function closeModal(){
    const root=$("#v11PublicSnapshotModal");
    if(root)root.classList.remove('open');
    document.body.classList.remove('v11-live-dialog-open');
    if(priorFocus?.isConnected)priorFocus.focus();
    current=null;
  }
  function getModal(){
    let root=$("#v11PublicSnapshotModal");
    if(root)return root;
    root=create('div','v11-live-overlay');
    root.id='v11PublicSnapshotModal';
    root.setAttribute('role','presentation');
    root.addEventListener('click',e=>{if(e.target===root)closeModal()});
    const card=create('section','v11-live-detail');
    card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');
    card.setAttribute('aria-label','Public GameServer statistics');
    root.appendChild(card);
    document.body.appendChild(root);
    return root;
  }
  function drawModal(){
    if(!current)return;
    const {kind,item}=current;
    const root=getModal(),card=root.querySelector('.v11-live-detail'),w=words();
    card.replaceChildren();
    const close=create('button','v11-detail-close','×');
    close.type='button';close.setAttribute('aria-label','Close');close.onclick=closeModal;
    const title=create('h2','',item.name);
    const subtitle=create('span','v11-detail-sub',kind==='player'?item.class+' · '+w.level+' '+item.level:((item.castle||w.nocastle)+' · '+w.clan));
    const details=create('div','v11-detail-grid');
    const rows=kind==='player'?[
      [w.pvp,pretty(item.pvp)],[w.pk,pretty(item.pk)],[w.clan,item.clan||'—'],
      [w.online,item.online?w.online:w.offline],
      [w.deaths,item.deaths===null?'—':pretty(item.deaths)],
      [w.kd,item.deaths===null?'—':item.deaths===0?(item.pvp>0?'∞':'0.00'):(item.pvp/item.deaths).toFixed(2)]
    ]:[
      [w.leader,item.leader||'—'],[w.members,pretty(item.members)],
      [w.online,pretty(item.online)],[w.reputation,pretty(item.reputation)],
      [w.level,pretty(item.level)],[w.castle,item.castle||w.nocastle]
    ];
    for(const [label,value] of rows){
      const field=create('div');
      attach(field,create('small','',label),create('b','',value));
      details.appendChild(field);
    }
    attach(card,close,create('span','v11-detail-label',kind==='player'?w.public:w.clanStats),title,subtitle,details,create('p','v11-detail-foot',w.last));
  }
  function podiumCard(player,index){
    const button=create('button','podium rank-podium-button champion-v6-card v11-live-card');
    button.type='button';button.dataset.championPlace=String(index+1);
    const medal=create('span','podium-medal realm-rank-emblem');
    medal.appendChild(create('span','realm-rank-value','#'+(index+1)));
    const score=create('span','muted',pretty(player.pvp)+' PvP');
    const metrics=create('div','champion-v6-metrics');
    if(player.deaths!==null)metrics.appendChild(create('span','',words().kd+' '+(player.deaths===0?'∞':(player.pvp/player.deaths).toFixed(2))));
    metrics.appendChild(create('span',player.online?'champion-online':'champion-offline',player.online?words().online:words().offline));
    attach(button,medal,avatar(player,'rank-podium-portrait'),create('span','place','#'+(index+1)+' · PVP'),
      create('strong','',player.name),create('span','champion-v6-class',player.class),
      create('span','champion-v6-clan',player.clan||'—'),score,metrics,create('em','',words().view));
    button.onclick=()=>displayPublic('player',player,button);
    return button;
  }
  const td=value=>attach(create('td'),value);
  function drawPlayers(){
    if(!ranks||!pvpTable)return;
    ranks.replaceChildren();
    pvpTable.replaceChildren();
    const players=data.pvp;
    for(let i=0;i<Math.min(players.length,3);i++)ranks.appendChild(podiumCard(players[i],i));
    for(const [i,p] of players.entries()){
      const row=create('tr'),n=create('span','rank-number'+(i<3?' top':''),i+1);
      const button=create('button','rank-player-link');
      button.type='button';
      attach(button,avatar(p,'rank-avatar'),attach(create('span'),create('b','',p.name),create('small','',words().view)));
      button.onclick=()=>displayPublic('player',p,button);
      const rankStatus=create('span',p.online?'rank-online':'rank-offline');
      attach(rankStatus,create('i'),create('span','',p.online?words().online:words().offline));
      const kd=p.deaths===null?'—':p.deaths===0?(p.pvp>0?'∞':'0.00'):(p.pvp/p.deaths).toFixed(2);
      attach(row,td(n),td(button),td(p.class),td(create('strong','',pretty(p.pvp))),
        td(p.clan||'—'),td(kd),td(rankStatus));
      pvpTable.appendChild(row);
    }
    if(!players.length){const tr=create('tr'),cell=create('td','v11-empty-row',words().empty);cell.colSpan=7;tr.appendChild(cell);pvpTable.appendChild(tr)}
  }
  function clanCard(clan,i){
    const card=create('article','legendary-clan-v7-card');
    card.dataset.clanPlace=String(i+1);
    const main=create('button','legendary-clan-v7-main');
    main.type='button';
    const crest=create('span','clan-rank-crest legendary-clan-v7-crest v11-live-crest',clan.name.slice(0,2).toUpperCase());
    crest.setAttribute('aria-hidden','true');
    attach(main,create('span','legendary-clan-v7-rank','#'+(i+1)),crest,
      create('strong','legendary-clan-v7-name',clan.name),
      create('span','legendary-clan-v7-alliance',clan.leader||'—'),
      create('strong','legendary-clan-v7-rep',pretty(clan.reputation)),
      create('span','legendary-clan-v7-rep-label',words().reputation));
    main.onclick=()=>displayPublic('clan',clan,main);
    const stats=create('div','legendary-clan-v7-stats');
    for(const [value,label] of [[clan.members,words().members],[clan.online,words().online],[clan.level,words().level]]){
      attach(stats,attach(create('span'),create('b','',pretty(value)),create('small','',label)));
    }
    const castle=create('div','legendary-clan-v7-castle',clan.castle||words().nocastle);
    castle.dataset.noCastle=String(!clan.castle);
    const leader=create('div','legendary-clan-v7-leader v11-live-leader');
    attach(leader,attach(create('span'),create('small','',words().leader),create('b','',clan.leader||'—')));
    attach(card,main,stats,castle,leader);
    return card;
  }
  function drawClans(){
    if(!clansGrid||!clanTable)return;
    clansGrid.replaceChildren();
    clanTable.replaceChildren();
    if(originalHint){
      originalHint.removeAttribute('data-i18n');
      originalHint.textContent=words().last;
    }
    for(const [i,c] of data.clans.entries()){
      if(i<3)clansGrid.appendChild(clanCard(c,i));
      const row=create('tr');
      const name=create('button','clan-rank-name clan-rank-link');
      name.type='button';
      attach(name,create('span','clan-rank-crest',c.name.slice(0,2).toUpperCase()),
        attach(create('span'),create('b','',c.name),create('small','',words().view)));
      name.onclick=()=>displayPublic('clan',c,name);
      const castle=create('span',c.castle?'castle-owned':'castle-none',c.castle?'♜ '+c.castle:words().nocastle);
      attach(row,td(create('span','rank-number'+(i<3?' top':''),i+1)),
        td(name),td(create('span','rank-leader-static',c.leader||'—')),
        td(create('strong','',pretty(c.members))),td(create('span','clan-level-badge',pretty(c.level))),
        td(create('strong','reputation-value',pretty(c.reputation))),td(castle));
      clanTable.appendChild(row);
    }
    if(!data.clans.length){const tr=create('tr'),cell=create('td','v11-empty-row',words().empty);cell.colSpan=7;tr.appendChild(cell);clanTable.appendChild(tr)}
  }
  function valid(d){
    return d&&d.ok===true&&d.source==='gameserver-db'&&Number.isFinite(d.online)&&d.online>=0
      &&typeof d.asOf==='string'&&!Number.isNaN(Date.parse(d.asOf))
      &&Math.abs(Date.now()-Date.parse(d.asOf))<120000
      &&Array.isArray(d.pvp)&&d.pvp.length<=15&&Array.isArray(d.clans)&&d.clans.length<=10
      &&d.pvp.every(x=>typeof x.name==='string'&&x.name.length<=48&&Number.isFinite(x.pvp)&&Number.isFinite(x.pk))
      &&d.clans.every(x=>typeof x.name==='string'&&x.name.length<=64&&Number.isFinite(x.reputation));
  }
  async function refresh(){
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),4500);
    try{
      const response=await fetch(API,{signal:controller.signal,credentials:'omit',cache:'no-store',redirect:'error'});
      if(!response.ok)throw Error('API unavailable');
      const payload=await response.json();
      if(!valid(payload))throw Error('Invalid or stale API response');
      data=payload;active=true;stale=false;
      drawPlayers();drawClans();setSource();
      if(current){
        const newest=current.kind==='player'?data.pvp.find(p=>p.name===current.item.name):data.clans.find(c=>c.name===current.item.name);
        if(newest){current.item=newest;drawModal()}else closeModal();
      }
    }catch{
      if(active)stale=true;
      setSource();
    }finally{clearTimeout(timeout)}
  }
  setSource();
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&current)closeModal()});
  if(typeof MutationObserver==='function'){
    const observer=new MutationObserver(list=>{
      if(list.some(x=>x.attributeName==='lang')){
        if(active){drawPlayers();drawClans();if(current)drawModal()}
        setSource();
      }
    });
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  refresh();
  setInterval(refresh,60000);
  window.CounterRealmLiveV11={refresh,get live(){return active&&!stale},get lastSnapshot(){return data}};
})();