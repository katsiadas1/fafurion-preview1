(() => {
  const el=document.getElementById('siegeCountdown');
  if(!el)return;
  const athensNow=()=>new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Athens'}));
  const fmt=ms=>{
    const t=Math.max(0,Math.floor(ms/1000));
    const d=Math.floor(t/86400),h=Math.floor((t%86400)/3600),m=Math.floor((t%3600)/60),s=t%60;
    return `${d}D ${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`;
  };
  const next=()=>{
    const now=athensNow(),target=new Date(now);
    let add=(7-now.getDay())%7;
    target.setDate(now.getDate()+add);target.setHours(20,0,0,0);
    if(target<=now)target.setDate(target.getDate()+7);
    return target-now;
  };
  const tick=()=>el.textContent=fmt(next());
  tick();setInterval(tick,1000);
})();