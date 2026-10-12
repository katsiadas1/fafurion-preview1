/* COUNTER Race Avatars V3 — Account roster.
 * Reuse V1 mapping and preloaded official race sheet; do not touch
 * class icon graphics or change account logic. */
(() => {
  'use strict';
  const avatarAPI=window.CounterRaceAvatars;
  if(!avatarAPI || typeof avatarAPI.resolveRace!=='function')return;
  const readable=avatarAPI.races;
  function decorateIcon(node,className,explicitRace){
    if(!node)return null;
    const race=avatarAPI.resolveRace(className,explicitRace);
    if(!race){
      node.classList.remove('account-race-portrait');
      node.removeAttribute('data-race');
      return null;
    }
    node.dataset.race=race;
    node.classList.add('account-race-portrait');
    node.title=readable[race]+' · '+className;
    return race;
  }
  function roster(){
    const view=document.getElementById('account-characters-view');
    if(!view)return;
    view.querySelectorAll('.character-grid .character-card').forEach(card=>{
      const className=card.querySelector('.character-class')?.textContent?.trim()||'';
      const emblem=card.querySelector('.character-art .class-emblem');
      const race=decorateIcon(emblem,className,card.dataset.race);
      const art=card.querySelector('.character-art');
      if(!art)return;
      let badge=art.querySelector('.account-race-name');
      if(!race){
        if(badge)badge.remove();
        return;
      }
      if(!badge){
        badge=document.createElement('span');
        badge.className='account-race-name';
        badge.setAttribute('aria-hidden','true');
        art.appendChild(badge);
      }
      badge.textContent=readable[race];
    });
  }
  // Wrap after realm-theme.js has replaced the class-icon in this modal.
  const oldOpen=window.openCharacter;
  if(typeof oldOpen==='function'){
    window.openCharacter=function(key){
      const result=oldOpen.apply(this,arguments);
      const source=(typeof demoCharacters!=='undefined')?demoCharacters[key]:null;
      const className=source?.className||document.getElementById('profileClass')?.textContent?.trim()||'';
      const emblem=document.getElementById('profileEmblem');
      const race=decorateIcon(emblem,className,source?.race);
      const parent=document.querySelector('#characterModal .profile-title');
      const anchor=parent?.querySelector('p');
      if(parent&&anchor){
        let badge=parent.querySelector('.public-race-tag');
        if(!race){
          if(badge)badge.remove();
        }else{
          if(!badge){
            badge=document.createElement('span');
            badge.className='public-race-tag';
            badge.setAttribute('aria-label','Character race');
            anchor.insertAdjacentElement('afterend',badge);
          }
          badge.textContent=readable[race];
        }
      }
      return result;
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',roster,{once:true});
  else roster();
  // Expose a re-apply hook when future backend account data updates the card list.
  window.CounterAccountRaceAvatars={apply:roster};
})();
