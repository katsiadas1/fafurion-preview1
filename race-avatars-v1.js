/* COUNTER Race Avatars V1
 * One official in-game race portrait per race, Rankings only.
 * Other locations (account/profile) intentionally unchanged for phase B.
 * Source/credits: assets/RACE-AVATAR-SOURCES.md
 */
(() => {
  'use strict';
  const ART = "https://wstatic-cdn.plaync.com/promo/lineage2/history/2012/lindvior/content4_img2.jpg";
  const raceNames = {human:"Human",elf:"Elf",darkelf:"Dark Elf",orc:"Orc",dwarf:"Dwarf",kamael:"Kamael"};
  const classesByRace = {
    human:[
      "Human Fighter","Human Mystic","Duelist","Gladiator","Dreadnought","Warlord",
      "Phoenix Knight","Paladin","Hell Knight","Dark Avenger","Sagittarius","Hawkeye",
      "Adventurer","Treasure Hunter","Archmage","Sorcerer","Soultaker","Necromancer",
      "Arcana Lord","Warlock","Cardinal","Bishop","Hierophant","Prophet"
    ],
    elf:[
      "Elven Fighter","Elven Mystic","Eva's Templar","Eva Templar","Temple Knight",
      "Sword Muse","Swordsinger","Wind Rider","Plains Walker","Moonlight Sentinel",
      "Silver Ranger","Mystic Muse","Spellsinger","Elemental Master","Elemental Summoner",
      "Eva's Saint","Eva Saint","Elven Elder"
    ],
    darkelf:[
      "Dark Fighter","Dark Mystic","Shillien Templar","Shillien Knight",
      "Spectral Dancer","Bladedancer","Ghost Hunter","Abyss Walker",
      "Ghost Sentinel","Phantom Ranger","Storm Screamer","Spellhowler",
      "Spectral Master","Phantom Summoner","Shillien Saint","Shillien Elder"
    ],
    orc:[
      "Orc Fighter","Orc Mystic","Titan","Destroyer","Grand Khavatari","Tyrant",
      "Dominator","Overlord","Doomcryer","Warcryer"
    ],
    dwarf:[
      "Dwarven Fighter","Fortune Seeker","Bounty Hunter","Maestro","Warsmith"
    ],
    kamael:[
      "Kamael Soldier","Doombringer","Berserker","Soul Hound","Soulhound",
      "Trickster","Arbalester","Judicator","Inspector"
    ]
  };
  const normalize = value => String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g,"");
  const racesByClass = new Map();
  Object.entries(classesByRace).forEach(([race,classes]) => classes.forEach(cls => racesByClass.set(normalize(cls),race)));
  const raceIds = ["human","elf","darkelf","orc","dwarf","kamael"];
  function resolveRace(className,explicitRace) {
    if (explicitRace !== undefined && explicitRace !== null && explicitRace !== "") {
      const asNumber = Number(explicitRace);
      if (Number.isInteger(asNumber) && String(explicitRace).trim() !== "" && asNumber>=0 && asNumber<6) return raceIds[asNumber];
      const key=normalize(explicitRace);
      if (key in raceNames) return key;
    }
    return racesByClass.get(normalize(className)) || null;
  }
  function apply(){
    const byName=new Map();
    document.querySelectorAll("#ranking-pvp-panel .rank-player-link").forEach(button=>{
      const row=button.closest("tr");
      const avatar=button.querySelector(".rank-avatar");
      if(!row || !avatar) return;
      const className=row.cells[2]?.textContent?.trim()||"";
      const race=resolveRace(className,row.dataset.race || avatar.dataset.race);
      if(!race) return; // Unknown class stays as the original icon.
      avatar.dataset.race=race;
      avatar.classList.add("race-avatar");
      avatar.title=raceNames[race]+" · "+className;
      const playerName=button.querySelector("b")?.textContent?.trim();
      if(playerName) byName.set(normalize(playerName),{race,avatar});
    });
    document.querySelectorAll("#ranking-pvp-panel .rank-podium-button").forEach(button=>{
      const name=button.querySelector("strong")?.textContent?.trim();
      const record=byName.get(normalize(name));
      if(!record) return;
      let art=button.querySelector(".rank-podium-portrait");
      if(!art){
        art=document.createElement("span");
        art.className="rank-podium-portrait race-avatar";
        art.setAttribute("aria-hidden","true");
        const title=button.querySelector(".place");
        if(title) title.before(art);
        else button.prepend(art);
      }
      art.dataset.race=record.race;
      art.textContent=name?.slice(0,2).toUpperCase()||"";
      art.title=raceNames[record.race];
    });
  }
  // A single verified image load enables all six CSS sprite crops.
  // If the official CDN is unreachable, our class-icon fallbacks remain visible.
  const picture=new Image();
  picture.onload=()=>{
    if(picture.naturalWidth<240 || picture.naturalHeight<240) return;
    document.documentElement.classList.add("race-portrait-ready");
  };
  picture.onerror=()=>document.documentElement.classList.remove("race-portrait-ready");
  picture.src=ART;
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});
  else apply();
  window.CounterRaceAvatars={apply,resolveRace,races:raceNames};
})();
