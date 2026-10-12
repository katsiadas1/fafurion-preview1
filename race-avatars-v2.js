/* COUNTER Race Avatars V2 — Public Profiles
 * Reuses V1 mapping / CDN preflight. Does not change character stats, login or routes.
 * Source/credits: assets/RACE-AVATAR-SOURCES.md
 */
(() => {
  'use strict';
  const api=window.CounterRaceAvatars;
  if(!api || typeof api.resolveRace!=='function') return;
  const properNames=api.races;
  function applyPortrait(node,className,explicitRace) {
    if(!node) return null;
    const race=api.resolveRace(className,explicitRace);
    if(!race) {
      node.classList.remove('race-avatar');
      node.removeAttribute('data-race');
      return null;
    }
    if(node.dataset.race!==race) node.dataset.race=race;
    if(!node.classList.contains('race-avatar')) node.classList.add('race-avatar');
    node.title=properNames[race]+' · '+className;
    return race;
  }
  function raceBadge(root,anchor,race) {
    if(!root || !anchor) return;
    let badge=root.querySelector('.public-race-tag');
    if(!race){if(badge)badge.remove();return;}
    if(!badge){
      badge=document.createElement('span');
      badge.className='public-race-tag';
      badge.setAttribute('aria-label','Character race');
      anchor.insertAdjacentElement('afterend',badge);
    }
    badge.textContent=properNames[race];
  }
  // Index Rankings public-profile modal: run after the existing class-icon decorator.
  if(typeof window.openPublicProfile==='function') {
    const open=window.openPublicProfile;
    window.openPublicProfile=function(key) {
      const result=open.apply(this,arguments);
      const profile=typeof publicRankProfiles!=='undefined' ? publicRankProfiles[key] : null;
      const avatar=document.getElementById('publicProfileAvatar');
      const card=document.getElementById('publicProfileCard');
      if(!profile || !avatar || !card)return result;
      const race=applyPortrait(avatar,profile.className,profile.race);
      const match=String(profile.rank||'').match(/[1-3]/);
      if(match)card.dataset.raceRank=match[0];
      else delete card.dataset.raceRank;
      const title=card.querySelector('.public-profile-title');
      raceBadge(title,title?.querySelector('p'),race);
      return result;
    };
  }
  // Standalone player pages and the player cards opened from clan rosters.
  function paintCommunityProfiles() {
    document.querySelectorAll('body[data-profile-kind="player"] #public-profile .profile-avatar-large, .community-dialog .profile-avatar-large').forEach(avatar=>{
      const identity=avatar.closest('.profile-identity');
      if(!identity)return;
      const className=identity.querySelector('p [data-no-i18n]')?.textContent?.trim()||'';
      const name=identity.querySelector('h1,h2')?.textContent?.trim()||'';
      const record=window.FafurionCommunity?.player?.(name);
      const race=applyPortrait(avatar,className,record?.race);
      const title=identity.querySelector('div');
      raceBadge(title,title?.querySelector('p'),race);
    });
  }
  if(document.readyState==='loading')
    document.addEventListener('DOMContentLoaded',paintCommunityProfiles,{once:true});
  else
    paintCommunityProfiles();
  // The community renderer uses synchronous updates for dialogs and translations.
  document.addEventListener('click',event=>{
    if(event.target.closest('a[data-player-card]'))paintCommunityProfiles();
  });
  window.addEventListener('fafurion:language',paintCommunityProfiles);
  window.addEventListener('fafurion:privacy',paintCommunityProfiles);
  window.CounterRaceProfiles={apply:paintCommunityProfiles};
})();
