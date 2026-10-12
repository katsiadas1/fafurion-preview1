/* COUNTER Race Avatars V4 — Gender selector for existing NCSOFT 6x6 race art
 * Gender comes only from explicit character data (not name or class).
 * Accepts gender:'male'/'female', sex:0/1 and isFemale:true/false.
 * Unknown gender keeps the same race portrait used in V1-V3.
 */
(() => {
  'use strict';
  const api=window.CounterRaceAvatars;
  if(!api || typeof api.resolveRace!=='function')return;
  const genderName={male:'Male',female:'Female'};
  const own=(object,key)=>!!object&&Object.prototype.hasOwnProperty.call(object,key);
  function normalizeGender(value){
    if(value===0||value===false)return 'male';
    if(value===1||value===true)return 'female';
    const str=String(value??'').trim().toLowerCase();
    if(['male','m','man','0'].includes(str))return 'male';
    if(['female','f','woman','1'].includes(str))return 'female';
    return null;
  }
  function extractGender(record,override){
    if(override!==undefined&&override!==null&&String(override).trim()!==''){
      const choice=normalizeGender(override);
      if(choice)return choice;
    }
    if(own(record,'gender'))return normalizeGender(record.gender);
    if(own(record,'sex'))return normalizeGender(record.sex);
    if(own(record,'isFemale'))return normalizeGender(record.isFemale);
    return null;
  }
  function setPortraitGender(node,gender,className){
    if(!node)return;
    if(gender && (node.classList.contains('race-avatar')||node.classList.contains('account-race-portrait'))){
      node.dataset.gender=gender;
      const race=node.dataset.race;
      node.title=(api.races[race]||race||'Character')+' · '+genderName[gender]+(className?' · '+className:'');
    }else node.removeAttribute('data-gender');
  }
  function showGenderBadge(wrapper,gender){
    const badge=wrapper?.querySelector('.public-race-tag');
    if(!badge)return;
    // V2 / V3 creates the race badge and uses its original race name.
    const race=wrapper.querySelector('.race-avatar[data-race],.account-race-portrait[data-race]')?.dataset.race;
    if(!race)return;
    badge.textContent=api.races[race]+(gender?' · '+genderName[gender]:'');
  }
  function publicProfiles(){
    if(typeof publicRankProfiles==='undefined')return;
    const records=Object.values(publicRankProfiles);
    const byName=new Map(records.map(p=>[String(p.name||'').trim().toLowerCase(),p]));
    const gendersByName=new Map();
    document.querySelectorAll('#ranking-pvp-panel .rank-player-link').forEach(button=>{
      const row=button.closest('tr');
      const avatar=button.querySelector('.rank-avatar');
      const name=button.querySelector('b')?.textContent?.trim().toLowerCase()||'';
      const p=byName.get(name);
      const gender=extractGender(p,row?.dataset.gender);
      setPortraitGender(avatar,gender,row?.cells?.[2]?.textContent?.trim());
      gendersByName.set(name,gender);
    });
    document.querySelectorAll('#ranking-pvp-panel .rank-podium-button').forEach(button=>{
      const name=button.querySelector('strong')?.textContent?.trim().toLowerCase()||'';
      const p=byName.get(name);
      const gender=extractGender(p,button.dataset.gender)||gendersByName.get(name)||null;
      setPortraitGender(button.querySelector('.rank-podium-portrait'),gender,p?.className);
    });
  }
  // Wrap AFTER V2 has painted the race icon in the Rankings public-profile popup.
  if(typeof window.openPublicProfile==='function'){
    const open=window.openPublicProfile;
    window.openPublicProfile=function(key){
      const result=open.apply(this,arguments);
      const profile=typeof publicRankProfiles!=='undefined'?publicRankProfiles[key]:null;
      if(profile){
        const card=document.getElementById('publicProfileCard');
        const gender=extractGender(profile);
        setPortraitGender(card?.querySelector('#publicProfileAvatar'),gender,profile.className);
        showGenderBadge(card,gender);
      }
      return result;
    };
  }
  // Account demo roster. Real server data may use data-gender on a character card.
  function accountRoster(){
    document.querySelectorAll('#account-characters-view .character-grid .character-card').forEach(card=>{
      const name=card.querySelector('.character-name')?.textContent?.trim()||'';
      const model=typeof demoCharacters!=='undefined'
        ?Object.values(demoCharacters).find(p=>p.name===name):null;
      const gender=extractGender(model,card.dataset.gender);
      const cls=card.querySelector('.character-class')?.textContent?.trim()||'';
      const emblem=card.querySelector('.character-art .class-emblem');
      setPortraitGender(emblem,gender,cls);
    });
  }
  // Wrap AFTER V3 has painted the race icon in the Account character modal.
  if(typeof window.openCharacter==='function'){
    const open=window.openCharacter;
    window.openCharacter=function(key){
      const result=open.apply(this,arguments);
      const model=typeof demoCharacters!=='undefined'?demoCharacters[key]:null;
      const card=document.getElementById('characterModal');
      const gender=extractGender(model);
      setPortraitGender(card?.querySelector('#profileEmblem'),gender,model?.className);
      showGenderBadge(card,gender);
      return result;
    };
  }
  // Standalone player.html + public player cards opened from clan.html.
  function communityProfiles(){
    document.querySelectorAll('body[data-profile-kind="player"] #public-profile .profile-avatar-large, .community-dialog .profile-avatar-large').forEach(avatar=>{
      const identity=avatar.closest('.profile-identity');
      const name=identity?.querySelector('h1,h2')?.textContent?.trim()||'';
      const record=window.FafurionCommunity?.player?.(name);
      const gender=extractGender(record,identity?.dataset.gender);
      setPortraitGender(avatar,gender,record?.class);
      showGenderBadge(identity,gender);
    });
  }
  function applyAll(){publicProfiles();accountRoster();communityProfiles();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyAll,{once:true});
  else applyAll();
  document.addEventListener('click',event=>{
    if(event.target.closest('a[data-player-card]'))communityProfiles();
  });
  window.addEventListener('fafurion:language',communityProfiles);
  window.addEventListener('fafurion:privacy',communityProfiles);
  window.CounterRaceGender={normalizeGender,apply:applyAll};
})();
