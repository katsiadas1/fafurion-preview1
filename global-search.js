(() => {
  const players=["Hydra","FafurionKnight","Astra","Dracarys","Noctis","Valkyria","Kaizen","Nyx","Ragnar","Selene","Ares","Zephyr","Raven","Orion","Frostbite","Nexus","Lunara","Vex","Mira","Lucian","Sable","Ember","Kael","Thalor","Azure","Atlas","Nova","Echo","Iris","Shade","Specter","Kira","Onyx","Artemis","Lyra","Auron","Cerys","Dante","Lilith","Morgana","Kain","Bjorn","Astrid","Torin","Skadi","Eos","Solace","Seraph","Aster","Draven","Freya","Luna","Dorian","Zenith","Elara","Caelum","Vesper"];
  const clans=["Leviathan","Eclipse","BlueDragons","Immortals","NightWatch","Avalon","ChaosLegion","Stormborn","Nemesis","LastHope","Aether"];
  const pages=[
    ['Server Info','Page','/info.html','INFO'],
    ['Rankings','Page','/index.html#rankings/pvp','R'],
    ['Live Event Center','Page','/events.html','EV'],
    ['Siege Center','Page','/siege.html','SG'],
    ['Download Center','Page','/download.html','DL'],
    ['Server Timeline','Page','/timeline.html','TL']
  ];

  const t=value=>window.FafurionI18n?.t?.(value)||value;
  const mount=document.querySelector('.topbar .right,.inner-page .inner-header-actions,.inner-page .header-actions');
  if(!mount)return;

  const trigger=document.createElement('button');
  trigger.type='button';
  trigger.className='global-search-trigger';
  trigger.setAttribute('aria-label',t('Search players and clans'));
  trigger.title='Search (Ctrl+K)';
  trigger.textContent='⌕';

  const before=mount.querySelector('.lang,.language-mount,.inner-start-button,.cta');
  mount.insertBefore(trigger,before||mount.firstChild);

  const overlay=document.createElement('div');
  overlay.className='global-search-overlay';
  overlay.innerHTML=`
    <div class="global-search-box" role="dialog" aria-modal="true" aria-label="Search">
      <div class="global-search-head">
        <input id="globalSearchInput" type="search" placeholder="${t('Search player, clan or page…')}" autocomplete="off">
        <button class="global-search-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="global-search-meta">PLAYER / CLAN SEARCH · DEMO DATA UNTIL DATABASE CONNECTION</div>
      <div class="global-search-results" id="globalSearchResults"></div>
    </div>`;
  document.body.appendChild(overlay);

  const input=overlay.querySelector('#globalSearchInput');
  const results=overlay.querySelector('#globalSearchResults');
  const close=()=>{overlay.classList.remove('open');trigger.focus()};
  const open=()=>{overlay.classList.add('open');input.value='';render('');setTimeout(()=>input.focus(),0)};

  const entries=[
    ...players.map(name=>({name,type:'Player',url:'/player/'+encodeURIComponent(name)+'/',icon:name.slice(0,2).toUpperCase()})),
    ...clans.map(name=>({name,type:'Clan',url:'/clan/'+encodeURIComponent(name)+'/',icon:'♜'})),
    ...pages.map(([name,type,url,icon])=>({name,type,url,icon}))
  ];

  function render(query){
    const q=query.trim().toLowerCase();
    let found=entries.filter(x=>!q||x.name.toLowerCase().includes(q)||x.type.toLowerCase().includes(q));
    found=found.slice(0,12);
    if(!found.length){results.innerHTML='<div class="global-search-empty">'+t('No matching player, clan or page found.')+'</div>';return}
    results.innerHTML=found.map((x,i)=>`<a class="global-search-result ${i===0?'active':''}" href="${x.url}">
      <span class="global-search-icon">${x.icon}</span>
      <span><strong>${x.name}</strong><small>${t(x.type)}</small></span>
      <em>${t('Open')} ↗</em>
    </a>`).join('');
  }

  trigger.addEventListener('click',open);
  overlay.querySelector('.global-search-close').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  input.addEventListener('input',()=>render(input.value));
  window.addEventListener('fafurion:language',()=>{
    input.placeholder=t('Search player, clan or page…');
    trigger.setAttribute('aria-label',t('Search players and clans'));
    if(overlay.classList.contains('open'))render(input.value);
  });

  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();overlay.classList.contains('open')?close():open()}
    if(e.key==='Escape'&&overlay.classList.contains('open'))close();
    if(e.key==='/'&&!overlay.classList.contains('open')&&document.activeElement?.tagName!=='INPUT'&&document.activeElement?.tagName!=='TEXTAREA'){e.preventDefault();open()}
  });
})();