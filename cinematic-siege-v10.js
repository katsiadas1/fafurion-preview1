/* COUNTER — Cinematic Siege Center V10
 * The current Aden lineup, castle owner, result and countdown are existing
 * site PREVIEW data. No registration action exists in this page.
 * All new informational labels follow the selected language.
 */
(() => {
  'use strict';
  if(!document.body.classList.contains('siege-center-page'))return;
  const phrases={
    en:{
      battleEyebrow:'NEXT BATTLE · PREVIEW',battleTitle:'Defender vs Attackers',demoBadge:'DEMO LINEUP',
      defender:'DEFENDER',attackers:'ATTACKERS',holdAden:'Defending Aden Castle',
      sixAttackers:'6 attacking clans',battleForAden:'Challenging for Aden control',rosterBelow:'See the preview battle roster below',
      inGameTitle:'SIEGE PARTICIPATION IS IN-GAME ONLY',
      inGameBody:'Join the server and follow in-game siege instructions. The website does not accept registrations.',
      rosterEyebrow:'BATTLE ROSTER · DEMO',rosterTitle:'Featured clans',
      historyEyebrow:'SIEGE HISTORY · DEMO',historyTitle:'Last Battle'
    },
    el:{
      battleEyebrow:'ΕΠΟΜΕΝΗ ΜΑΧΗ · DEMO',battleTitle:'Αμυνόμενοι vs Επιτιθέμενοι',demoBadge:'DEMO ΣΥΝΘΕΣΗ',
      defender:'ΑΜΥΝΑ',attackers:'ΕΠΙΘΕΣΗ',holdAden:'Υπερασπίζεται το Aden Castle',
      sixAttackers:'6 clans στην επίθεση',battleForAden:'Μάχονται για τον έλεγχο του Aden',rosterBelow:'Δες παρακάτω τα demo clans της μάχης',
      inGameTitle:'ΣΥΜΜΕΤΟΧΗ ΣΤΟ SIEGE ΜΟΝΟ IN-GAME',
      inGameBody:'Συνδέσου στον server και ακολούθησε τις οδηγίες της πολιορκίας μέσα στο παιχνίδι. Δεν υπάρχει εγγραφή από το website.',
      rosterEyebrow:'CLAN ROSTER · DEMO',rosterTitle:'Clans της μάχης',
      historyEyebrow:'ΙΣΤΟΡΙΚΟ SIEGE · DEMO',historyTitle:'Προηγούμενη μάχη'
    },
    pt:{
      battleEyebrow:'PRÓXIMA BATALHA · DEMO',battleTitle:'Defensores vs Atacantes',demoBadge:'EQUIPES DEMO',
      defender:'DEFENSORES',attackers:'ATACANTES',holdAden:'Defendendo o Castelo de Aden',
      sixAttackers:'6 clãs atacantes',battleForAden:'Disputam o controle de Aden',rosterBelow:'Confira abaixo os clãs da prévia',
      inGameTitle:'PARTICIPAÇÃO NO CERCO APENAS NO JOGO',
      inGameBody:'Entre no servidor e siga as instruções de cerco dentro do jogo. Não há registro pelo site.',
      rosterEyebrow:'CLÃS DA BATALHA · DEMO',rosterTitle:'Clãs em destaque',
      historyEyebrow:'HISTÓRICO DO CERCO · DEMO',historyTitle:'Última batalha'
    },
    ru:{
      battleEyebrow:'СЛЕДУЮЩАЯ БИТВА · ДЕМО',battleTitle:'Защитники против атакующих',demoBadge:'ДЕМО-СОСТАВ',
      defender:'ЗАЩИТНИКИ',attackers:'АТАКУЮЩИЕ',holdAden:'Защита замка Аден',
      sixAttackers:'6 атакующих кланов',battleForAden:'Борьба за контроль над Аденом',rosterBelow:'Список демо-кланов ниже',
      inGameTitle:'УЧАСТИЕ В ОСАДЕ ТОЛЬКО В ИГРЕ',
      inGameBody:'Войдите на сервер и следуйте внутриигровым инструкциям осады. Регистрация через сайт недоступна.',
      rosterEyebrow:'СПИСОК КЛАНОВ · ДЕМО',rosterTitle:'Участники битвы',
      historyEyebrow:'ИСТОРИЯ ОСАД · ДЕМО',historyTitle:'Последняя битва'
    }
  };
  function translate(){
    const locale=document.documentElement.lang?.toLowerCase().slice(0,2)||'en';
    const dictionary=phrases[locale]||phrases.en;
    document.querySelectorAll('[data-v10-text]').forEach(element=>{
      const value=dictionary[element.dataset.v10Text];
      if(typeof value==='string')element.textContent=value;
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',translate,{once:true});
  else translate();
  if(typeof MutationObserver==='function'){
    const observer=new MutationObserver(changes=>{
      if(changes.some(change=>change.attributeName==='lang'))translate();
    });
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  window.CounterSiegeV10={refresh:translate};
})();