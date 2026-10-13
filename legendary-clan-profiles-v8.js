/* COUNTER Legendary Clan Profiles V8.
 * No data mutations. Reads existing preview castle/siege/member records
 * AFTER the original openPublicClan and realm-theme heraldry renderer.
 */
(() => {
  'use strict';
  const modal=document.getElementById('publicClanModal');
  const card=modal?.querySelector('.public-clan-card');
  if(!modal||!card||typeof window.openPublicClan!=='function'||typeof publicClanProfiles==='undefined')return;
  const dictionaries={
    en:{owner:'CASTLE OWNER',noCastle:'NO CASTLE',defender:'DEFENDER',attacker:'ATTACKER',siege:'SIEGE OPERATION',recruitment:'SIEGE PREPARATION',registered:'registered clans',readiness:'SIEGE READINESS',ready:'Members ready',level:'CLAN LEVEL'},
    el:{owner:'ΙΔΙΟΚΤΗΤΗΣ ΚΑΣΤΡΟΥ',noCastle:'ΧΩΡΙΣ ΚΑΣΤΡΟ',defender:'ΑΜΥΝΑ',attacker:'ΕΠΙΘΕΣΗ',siege:'ΕΠΙΧΕΙΡΗΣΗ ΠΟΛΙΟΡΚΙΑΣ',recruitment:'ΠΡΟΕΤΟΙΜΑΣΙΑ ΠΟΛΙΟΡΚΙΑΣ',registered:'εγγεγραμμένα clans',readiness:'ΕΤΟΙΜΟΤΗΤΑ ΠΟΛΙΟΡΚΙΑΣ',ready:'Έτοιμα μέλη',level:'ΕΠΙΠΕΔΟ CLAN'},
    pt:{owner:'DONO DO CASTELO',noCastle:'SEM CASTELO',defender:'DEFENSOR',attacker:'ATACANTE',siege:'OPERAÇÃO DE CERCO',recruitment:'PREPARAÇÃO DE CERCO',registered:'clãs registrados',readiness:'PREPARAÇÃO PARA CERCO',ready:'Membros prontos',level:'NÍVEL DO CLÃ'},
    ru:{owner:'ВЛАДЕЛЕЦ ЗАМКА',noCastle:'БЕЗ ЗАМКА',defender:'ЗАЩИТНИК',attacker:'АТАКУЮЩИЙ',siege:'ОСАДНАЯ ОПЕРАЦИЯ',recruitment:'ПОДГОТОВКА К ОСАДЕ',registered:'зарегистрировано кланов',readiness:'ГОТОВНОСТЬ К ОСАДЕ',ready:'Готовые участники',level:'УРОВЕНЬ КЛАНА'}
  };
  const translation=()=>dictionaries[document.documentElement.lang?.toLowerCase().slice(0,2)]||dictionaries.en;
  const node=(type,cls,value)=>{
    const n=document.createElement(type);
    n.className=cls;
    if(value!==undefined)n.textContent=String(value);
    return n;
  };
  const asPositiveInt=s=>{
    const value=Number(String(s??'').replace(/,/g,'').trim());
    return Number.isInteger(value)&&value>=0?value:null;
  };
  function parseReady(value){
    const match=String(value??'').match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
    if(!match)return null;
    const ready=Number(match[1]),total=Number(match[2]);
    if(total<=0||ready>total||!Number.isSafeInteger(ready)||!Number.isSafeInteger(total))return null;
    return {ready,total,pct:Math.round(ready/total*100)};
  }
  function createStatusRow(title){
    let row=title.querySelector('.v8-clan-status-row');
    if(!row){
      row=node('div','v8-clan-status-row');
      title.appendChild(row);
    }
    return row;
  }
  function render(key){
    const clan=publicClanProfiles[key];
    if(!clan)return;
    const copy=translation();
    const ownsCastle=String(clan.castleStatus||'').toLowerCase()==='owned'
      &&String(clan.castle||'').trim()!=='—'&&String(clan.castle||'').trim()!=='';
    const role=String(clan.siegeBadge||'').toUpperCase().trim();
    const ready=parseReady(clan.ready);
    card.classList.add('legendary-clan-v8');
    card.dataset.clanOwner=String(ownsCastle);
    card.dataset.siegeRole=role.toLowerCase();
    const title=card.querySelector('.public-clan-title');
    if(title){
      const status=createStatusRow(title);
      status.replaceChildren();
      const castleTag=node('span','v8-clan-status-chip'+(ownsCastle?' castle-owner':''),ownsCastle?copy.owner:copy.noCastle);
      status.append(castleTag);
      if(role==='DEFENDER'||role==='ATTACKER'){
        const translatedRole=role==='DEFENDER'?copy.defender:copy.attacker;
        status.append(node('span','v8-clan-status-chip '+role.toLowerCase(),translatedRole));
      }
      const level=node('span','v8-clan-status-chip',copy.level+' '+String(clan.level));
      status.append(level);
    }
    const body=card.querySelector('.public-clan-body');
    const stats=body?.querySelector('.public-clan-stats');
    if(body&&stats){
      let operation=body.querySelector('.v8-clan-operation');
      if(!operation){
        operation=node('section','v8-clan-operation');
        operation.setAttribute('aria-label','Siege overview');
        const left=node('div','v8-clan-operation-main');
        left.append(node('span','v8-clan-operation-caption'),
                    node('strong','v8-clan-operation-title'),
                    node('span','v8-clan-operation-note'));
        operation.append(left,node('span','v8-clan-operation-action'));
        stats.before(operation);
      }
      operation.querySelector('.v8-clan-operation-caption').textContent=ownsCastle?copy.siege:copy.recruitment;
      operation.querySelector('.v8-clan-operation-title').textContent=String(clan.siegeTitle||clan.castle||'—');
      operation.querySelector('.v8-clan-operation-note').textContent=String(clan.siegeCopy||'');
      const registered=asPositiveInt(clan.registered);
      operation.querySelector('.v8-clan-operation-action').textContent=registered===null?'':registered+' '+copy.registered;
    }
    const siegePanel=card.querySelector('.public-clan-grid .public-clan-panel:nth-child(2)');
    if(siegePanel){
      let box=siegePanel.querySelector('.v8-siege-readiness');
      if(!ready){box?.remove();}
      else {
        if(!box){
          box=node('div','v8-siege-readiness');
          const top=node('div','v8-siege-readiness-top');
          top.append(node('span','v8-siege-readiness-label'),node('strong','v8-siege-readiness-value'));
          const track=node('div','v8-siege-progress-track');
          track.append(node('div','v8-siege-progress-bar'));
          const foot=node('span','v8-siege-readiness-foot');
          box.append(top,track,foot);
          siegePanel.appendChild(box);
        }
        box.querySelector('.v8-siege-readiness-label').textContent=copy.readiness;
        box.querySelector('.v8-siege-readiness-value').textContent=ready.pct+'%';
        box.querySelector('.v8-siege-readiness-foot').textContent=copy.ready+': '+ready.ready+' / '+ready.total;
        const track=box.querySelector('.v8-siege-progress-track');
        track.setAttribute('role','progressbar');
        track.setAttribute('aria-label',copy.readiness);
        track.setAttribute('aria-valuemin','0');
        track.setAttribute('aria-valuemax','100');
        track.setAttribute('aria-valuenow',String(ready.pct));
        box.querySelector('.v8-siege-progress-bar').style.setProperty('--v8-readiness',ready.pct+'%');
      }
    }
  }
  const original=window.openPublicClan;
  window.openPublicClan=function(key){
    const result=original.apply(this,arguments);
    render(key);
    return result;
  };
  if(typeof MutationObserver==='function'){
    const observer=new MutationObserver(changes=>{
      if(!changes.some(change=>change.attributeName==='lang'))return;
      if(!modal.classList.contains('open'))return;
      if(typeof currentPublicClan!=='undefined'&&currentPublicClan)render(currentPublicClan);
    });
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  window.CounterLegendaryClanProfiles={refresh:()=>{
    if(typeof currentPublicClan!=='undefined'&&currentPublicClan)render(currentPublicClan);
  }};
})();