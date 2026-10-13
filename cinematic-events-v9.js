/* COUNTER Cinematic Events V9
 * All website event signup controls were removed. Informational copy is
 * translated across site languages; participation is ONLY in game.
 * Never creates or claims an event registration.
 */
(() => {
  'use strict';
  const messages = {
    en:{
      ingameTitle:'JOIN IN-GAME ONLY',
      ingameShort:'JOIN IN-GAME ONLY',
      ingameNote:'Be online in Lineage II and follow the event announcement to participate.',
      ingameRuleTitle:'In-game participation',
      ingameRuleBody:'Log into the server and follow the event announcement. The website cannot register you.',
      whereTitle:'WHERE TO JOIN',
      ingamePanelTitle:'Participate in Lineage II',
      ingameAccountNote:'Log into the game before the event and follow its in-game announcement. Event registration is not available on the website.',
      viewSchedule:'VIEW EVENT SCHEDULE ↗',
      demoAccount:'Demo event schedule and rewards. Participation and registration take place exclusively inside the game.'
    },
    el:{
      ingameTitle:'ΣΥΜΜΕΤΟΧΗ ΜΟΝΟ IN-GAME',
      ingameShort:'ΜΟΝΟ ΜΕΣΑ ΣΤΟ ΠΑΙΧΝΙΔΙ',
      ingameNote:'Μπες online στο Lineage II και ακολούθησε την ανακοίνωση του event για να συμμετάσχεις.',
      ingameRuleTitle:'Συμμετοχή μέσα στο παιχνίδι',
      ingameRuleBody:'Συνδέσου στον server και ακολούθησε την in-game ανακοίνωση. Δεν γίνεται εγγραφή από το website.',
      whereTitle:'ΠΟΥ ΣΥΜΜΕΤΕΧΕΙΣ',
      ingamePanelTitle:'Συμμετοχή στο Lineage II',
      ingameAccountNote:'Μπες online πριν ξεκινήσει το event και ακολούθησε την ανακοίνωση μέσα στο παιχνίδι. Δεν υπάρχει εγγραφή από το website.',
      viewSchedule:'ΠΡΟΓΡΑΜΜΑ EVENTS ↗',
      demoAccount:'Το πρόγραμμα και τα rewards είναι demo. Η εγγραφή και η συμμετοχή γίνονται αποκλειστικά μέσα στο παιχνίδι.'
    },
    pt:{
      ingameTitle:'PARTICIPE APENAS NO JOGO',
      ingameShort:'SOMENTE NO JOGO',
      ingameNote:'Entre no Lineage II e siga o anúncio do evento dentro do jogo para participar.',
      ingameRuleTitle:'Participação no jogo',
      ingameRuleBody:'Entre no servidor e siga o anúncio do evento. Não é possível se inscrever pelo site.',
      whereTitle:'ONDE PARTICIPAR',
      ingamePanelTitle:'Participe no Lineage II',
      ingameAccountNote:'Entre no jogo antes do evento e siga o anúncio dentro do jogo. Não há inscrição pelo site.',
      viewSchedule:'VER CALENDÁRIO DE EVENTOS ↗',
      demoAccount:'Calendário e recompensas de demonstração. Inscrição e participação acontecem somente dentro do jogo.'
    },
    ru:{
      ingameTitle:'УЧАСТИЕ ТОЛЬКО В ИГРЕ',
      ingameShort:'ТОЛЬКО В ИГРЕ',
      ingameNote:'Войдите в Lineage II и следуйте внутриигровому объявлению события.',
      ingameRuleTitle:'Участие внутри игры',
      ingameRuleBody:'Войдите на сервер и следуйте объявлению события. Регистрация через сайт недоступна.',
      whereTitle:'ГДЕ УЧАСТВОВАТЬ',
      ingamePanelTitle:'Участие в Lineage II',
      ingameAccountNote:'Зайдите в игру до начала события и следуйте внутриигровому объявлению. На сайте регистрация недоступна.',
      viewSchedule:'РАСПИСАНИЕ СОБЫТИЙ ↗',
      demoAccount:'Демонстрационные расписание и награды. Запись и участие доступны только внутри игры.'
    }
  };
  function apply(){
    const language=String(document.documentElement.lang||'en').toLowerCase().slice(0,2);
    const current=messages[language]||messages.en;
    document.querySelectorAll('[data-v9-text]').forEach(element=>{
      const key=element.dataset.v9Text;
      if(Object.prototype.hasOwnProperty.call(current,key))element.textContent=current[key];
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  if(typeof MutationObserver==='function'){
    const observer=new MutationObserver(changes=>{
      if(changes.some(change=>change.attributeName==='lang'))apply();
    });
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  window.CounterEventsV9={refresh:apply};
})();