(() => {
  const cfg=window.SERVER_CONFIG||{};
  const parse=v=>v?new Date(v):null;
  const dates={
    beta:parse(cfg.betaDate),
    predownload:parse(cfg.preDownloadDate),
    creation:parse(cfg.characterCreationDate),
    opening:parse(cfg.openingDate)
  };
  const map={
    beta:'timelineBetaDate',
    predownload:'timelinePreDownloadDate',
    creation:'timelineCreationDate',
    opening:'timelineOpeningDate'
  };
  const fmtDate=d=>new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Athens'}).format(d);
  Object.entries(dates).forEach(([k,d])=>{
    if(!d||Number.isNaN(d.getTime()))return;
    const el=document.getElementById(map[k]);
    if(el){el.textContent=fmtDate(d);el.classList.add('active');}
  });

  const out=document.getElementById('timelineCountdown');
  const label=document.getElementById('timelineCountdownLabel');
  const date=document.getElementById('timelineCountdownDate');
  if(!out)return;

  const opening=dates.opening;
  if(!opening||Number.isNaN(opening.getTime()))return;

  date.textContent=fmtDate(opening);

  const tick=()=>{
    const now=Date.now(),diff=opening.getTime()-now;
    if(diff<=0){
      label.textContent='SERVER UPTIME';
      const up=Math.abs(diff);
      const d=Math.floor(up/86400000),h=Math.floor((up%86400000)/3600000),m=Math.floor((up%3600000)/60000),s=Math.floor((up%60000)/1000);
      out.textContent=`${d}D ${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`;
      return;
    }
    const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
    out.textContent=`${d}D ${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`;
  };
  tick();setInterval(tick,1000);
})();