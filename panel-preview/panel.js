/* Browser-local demo only. The shared records also power the public rankings and cards. */
(() => {
  const data=window.FafurionCommunity,I=window.FafurionI18n,ui=window.FafurionUI;
  const $=id=>document.getElementById(id),t=s=>I.t(s),esc=ui.esc;
  const characters=['Astra','Nyx','Ragnar'].map(data.player).filter(Boolean);
  let active=characters[0],deliveryStage=0,joined=false,nextEvent;
  function store(k,v){try{sessionStorage.setItem('fafurion-demo-'+k,v);}catch{}}
  function read(k){try{return sessionStorage.getItem('fafurion-demo-'+k);}catch{return null;}}
  active=characters.find(p=>p.name===read('character'))||active;
  joined=read('joined')==='yes';deliveryStage=Math.min(2,Math.max(0,Number(read('delivery'))||0));
  function showDashboard(){ $('login').hidden=true;$('dashboard').hidden=false;$('logout').hidden=false;renderCharacter();}
  $('demo-login').addEventListener('submit',e=>{e.preventDefault();if($('username').value.trim()==='DemoAccount'&&$('password').value==='FafurionDemo123'){store('session','yes');$('login-error').textContent='';showDashboard();$('character').focus();}else{$('login-error').textContent=t('Use DemoAccount / FafurionDemo123.');}});
  function renderPassword(){const visible=$('password').type==='text';$('show').textContent=t(visible?'Hide':'Show');$('show').setAttribute('aria-label',t(visible?'Hide password':'Show password'));$('show').setAttribute('aria-pressed',String(visible));}
  $('show').onclick=()=>{$('password').type=$('password').type==='password'?'text':'password';renderPassword();};
  $('logout').onclick=()=>{store('session','no');$('login').hidden=false;$('dashboard').hidden=true;$('logout').hidden=true;$('username').focus();};
  function renderCharacter(){
    const c=active,clan=data.clan(c.clan);
    $('character').innerHTML=characters.map(p=>`<option value="${esc(p.name)}">${esc(p.name)} · ${esc(t('Level'))} ${ui.number(p.level)}</option>`).join('');$('character').value=c.name;
    $('char-name').textContent=c.name;$('char-name').dataset.noI18n='';$('char-class').textContent=c.class;$('char-class').dataset.noI18n='';
    $('char-clan').innerHTML=ui.link('clan',c.clan);$('char-level').textContent=t('Level')+' '+c.level;
    $('stats').innerHTML=[['PvP',ui.number(c.pvp)],['PK',ui.number(c.pk)],['Deaths',ui.number(c.deaths)],['K/D',data.kd(c)],['Demo rank','#'+(data.ranked().findIndex(p=>p.name===c.name)+1)],['Playtime',ui.number(c.playtime)+' '+t('hours')]].map(([label,value])=>`<div><strong>${esc(value)}</strong><span>${esc(t(label))}</span></div>`).join('');
    $('equipment').innerHTML=c.gear.map(g=>`<div class="item"><small>${esc(t(g.slot))}</small><span data-no-i18n>${esc(g.name)}</span></div>`).join('');
    $('history').innerHTML=c.activity.map((h,i)=>`<li>${esc(t(h))}<small>${esc(t(i?'Yesterday':'Today'))} · ${esc(t('Demo data'))}</small></li>`).join('');
    $('achievements').innerHTML=ui.achievements(c);
    $('my-profile').href=ui.pageUrl('player',c.name);
    $('equipment-visible').checked=data.gearVisible(c.name);
    $('clan-title').innerHTML=clan?ui.link('clan',clan.name):esc(t('No clan'));
    $('clan-details').innerHTML=clan?`${esc(t('Leader'))}: ${ui.link('player',clan.leader)} · ${esc(t('Clan level'))}: ${clan.level} · ${esc(t('Castle'))}: <span data-no-i18n>${esc(clan.castle)}</span>`:'';
    $('clan-roster').innerHTML=clan?ui.rosterHTML(clan):'';
    $('my-clan').hidden=!clan;if(clan)$('my-clan').href=ui.pageUrl('clan',clan.name);
  }
  $('character').onchange=()=>{active=characters.find(p=>p.name===$('character').value)||characters[0];store('character',active.name);renderCharacter();};
  $('equipment-visible').onchange=()=>data.setGearVisible(active.name,$('equipment-visible').checked);
  const tabs=[...document.querySelectorAll('[data-tab]')];
  function selectTab(tab){tabs.forEach(b=>{const on=b===tab;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;$(b.dataset.tab).hidden=!on;});}
  tabs.forEach((b,i)=>{b.onclick=()=>selectTab(b);b.onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();selectTab(tabs[n]);tabs[n].focus();};});
  function chooseEvent(){const d=new Date();d.setUTCHours(20,0,0,0);if(d<=new Date())d.setUTCDate(d.getUTCDate()+1);nextEvent=d;}
  function eventText(){$('event-name').textContent='Fafurion Expedition';$('event-name').dataset.noI18n='';$('event-description').textContent=t('Gather your clan for the next raid. Daily demo event.');$('event-time').textContent=nextEvent.toLocaleString(I.locale,{dateStyle:'medium',timeStyle:'short',timeZone:'UTC'})+' UTC';}
  function tick(){if(!nextEvent||nextEvent<=new Date()){chooseEvent();eventText();}const total=Math.max(0,Math.floor((nextEvent-Date.now())/1000));$('countdown').textContent=[Math.floor(total/3600),Math.floor(total/60)%60,total%60].map(v=>String(v).padStart(2,'0')).join(' : ');}
  function renderJoin(){$('event-join').textContent=t(joined?'Interested · Undo':'Interested');$('event-join').setAttribute('aria-pressed',String(joined));}
  $('event-join').onclick=()=>{joined=!joined;store('joined',joined?'yes':'no');renderJoin();$('event-feedback').dataset.message=joined?'Your demo event interest was saved.':'Your demo event selection was removed.';renderFeedback();};
  function renderFeedback(){for(const id of ['event-feedback','reward-feedback'])if($(id).dataset.message)$(id).textContent=t($(id).dataset.message);if($('login-error').textContent)$('login-error').textContent=t('Use DemoAccount / FafurionDemo123.');}
  function deliveries(){const rows=[['#DEMO-1042','Season cosmetic chest',deliveryStage],['#DEMO-1038','Clan banner token',2]];$('deliveries').innerHTML=rows.map(([id,title,stage])=>`<div class="delivery"><span class="eyebrow" data-no-i18n>${id}</span><h3 data-no-i18n>${title}</h3><div class="steps">${['Paid','Queued','Delivered'].map((v,i)=>`<span class="${i<=stage?'done':''}">${i<=stage?'✓ ':''}${esc(t(v))}</span>`).join('')}</div></div>`).join('');$('advance-reward').disabled=deliveryStage===2;$('advance-reward').textContent=t(deliveryStage===2?'Simulation complete':'Simulate next stage');}
  $('advance-reward').onclick=()=>{deliveryStage=Math.min(2,deliveryStage+1);store('delivery',String(deliveryStage));deliveries();$('reward-feedback').dataset.message=deliveryStage===2?'Demo reward delivered. No action on a real server.':'Demo reward queued.';renderFeedback();};
  $('reset-demo').onclick=()=>{active=characters[0];store('character',active.name);deliveryStage=0;store('delivery','0');joined=false;store('joined','no');characters.forEach(p=>data.setGearVisible(p.name,true));$('event-feedback').dataset.message='Your choice is saved in this tab only.';$('reward-feedback').dataset.message='Demo reset to its initial state.';render();};
  function render(){renderCharacter();renderPassword();renderJoin();deliveries();eventText();renderFeedback();}
  chooseEvent();render();tick();setInterval(tick,1000);
  window.addEventListener('fafurion:language',render);
  if(read('session')==='yes')showDashboard();
})();
