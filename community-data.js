/* Public demonstration records only. Never include account names, email, IPs or payment data. */
(() => {
  const source=window.RANKINGS_DATA||{players:[],clans:[]};
  const sample=source.demo===true;
  const players=(source.players||[]).map(p=>({...p}));
  const clans=(source.clans||[]).map(c=>({...c}));
  const extraNames=[['Vex','Mira','Lucian','Sable'],['Ember','Kael','Thalor','Azure'],['Atlas','Nova','Echo','Iris'],['Shade','Specter','Kira','Onyx'],['Artemis','Lyra','Auron','Cerys'],['Dante','Lilith','Morgana','Kain'],['Bjorn','Astrid','Torin','Skadi'],['Eos','Solace','Seraph','Aster'],['Draven','Freya','Luna','Dorian'],['Zenith','Elara','Caelum','Vesper']];
  const classes=['Duelist','Cardinal','Ghost Sentinel','Sword Muse'];
  if(sample) {
    clans.forEach((c,i)=>{
      c.alliance=['Lunar Pact','Oceanborn','Valiant','Nightfall','Dawn Council'][i%5];
      c.wars=i<4?[clans[(i+5)%clans.length].name]:[];
      c.siege='Sunday · 18:00 UTC · Demo';
      c.activity=['Castle defended','Clan expedition completed'];
      extraNames[i]?.forEach((name,j)=>players.push({name,class:classes[j],level:80+(i+j)%5,clan:c.name,pvp:60+i*17+j*63,pk:(i+j)%5}));
    });
    players.forEach((p,i)=>{
      p.online=i%3!==1;p.deaths=72+(i*47)%430;p.playtime=128+i*23;p.streak=4+(i*3)%38;
      const caster=/Screamer|Muse|Cardinal|Archmage|Soultaker/.test(p.class);
      p.gear=[{slot:'Weapon',name:caster?'+12 Arcana Mace':'+12 Icarus Weapon'},{slot:'Armor',name:caster?'+8 Dynasty Robe Set':'+8 Dynasty Armor Set'},{slot:'Jewelry',name:'Blessed Antharas Earring'},{slot:'Accessory',name:'Ruler’s Ring'}];
      p.activity=['Olympiad victory','Clan expedition completed'];
    });
  }
  const player=name=>players.find(p=>p.name===name);
  const clan=name=>clans.find(c=>c.name===name);
  const roster=name=>players.filter(p=>p.clan===name);
  const ranked=()=>players.slice().sort((a,b)=>(Number(b.pvp)||0)-(Number(a.pvp)||0)||a.name.localeCompare(b.name));
  function gearVisible(name) {
    if(!sample)return player(name)?.showEquipment!==false;
    try{return localStorage.getItem('fafurion-demo-hide-gear:'+name)!=='yes';}catch{return true;}
  }
  function setGearVisible(name,visible) {
    if(!sample)return;
    try{localStorage.setItem('fafurion-demo-hide-gear:'+name,visible?'no':'yes');}catch{}
    window.dispatchEvent(new CustomEvent('fafurion:privacy',{detail:{name}}));
  }
  const kd=p=>Number(p.deaths)===0?(Number(p.pvp)>0?'∞':'0.00'):Number.isFinite(Number(p.deaths))?(Number(p.pvp)/Number(p.deaths)).toFixed(2):'—';
  window.FafurionCommunity={demo:sample,players,clans,player,clan,roster,ranked,gearVisible,setGearVisible,kd};
})();
