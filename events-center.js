(() => {
  const clockEl = document.getElementById('eventServerClock');
  const mainCountdown = document.getElementById('eventMainCountdown');
  const badge = document.getElementById('eventStateBadge');
  const label = document.getElementById('eventCountdownLabel');

  const athensNow = () => new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Athens'}));

  const fmt = ms => {
    const total = Math.max(0, Math.floor(ms / 1000));
    const h = String(Math.floor(total / 3600)).padStart(2,'0');
    const m = String(Math.floor((total % 3600)/60)).padStart(2,'0');
    const s = String(total % 60).padStart(2,'0');
    return `${h}:${m}:${s}`;
  };

  const nextDaily = (hour, minute) => {
    const now = athensNow();
    const target = new Date(now);
    target.setHours(hour,minute,0,0);
    if(target <= now) target.setDate(target.getDate()+1);
    return {now,target};
  };

  const nextSunday = (hour,minute) => {
    const now = athensNow();
    const target = new Date(now);
    const day = now.getDay();
    let add = (7-day)%7;
    target.setDate(now.getDate()+add);
    target.setHours(hour,minute,0,0);
    if(target <= now) target.setDate(target.getDate()+7);
    return {now,target};
  };

  function updateMain(){
    const now = athensNow();
    const start = new Date(now);
    start.setHours(18,30,0,0);

    const end = new Date(start);
    end.setMinutes(end.getMinutes()+20);

    if(now < start){
      badge.className='event-state registration';
      badge.innerHTML='<i></i> REGISTRATION OPEN';
      label.textContent='EVENT STARTS IN';
      mainCountdown.textContent=fmt(start-now);
    }else if(now < end){
      badge.className='event-state running';
      badge.innerHTML='<i></i> EVENT RUNNING';
      label.textContent='MATCH ENDS IN';
      mainCountdown.textContent=fmt(end-now);
    }else{
      const next = new Date(start);
      next.setDate(next.getDate()+1);
      badge.className='event-state finished';
      badge.innerHTML='<i></i> EVENT FINISHED';
      label.textContent='NEXT REGISTRATION';
      mainCountdown.textContent=fmt(next-now);
    }
  }

  function updateCards(){
    document.querySelectorAll('[data-event-hour]').forEach(card=>{
      const h=Number(card.dataset.eventHour);
      const m=Number(card.dataset.eventMinute);
      const result=card.dataset.weekly==='sunday' ? nextSunday(h,m) : nextDaily(h,m);
      const el=card.querySelector('[data-card-countdown]');
      if(el) el.textContent=fmt(result.target-result.now);
    });
  }

  function tick(){
    const now = athensNow();
    if(clockEl) clockEl.textContent=now.toLocaleTimeString('en-GB',{hour12:false});
    updateMain();
    updateCards();
  }

  tick();
  setInterval(tick,1000);
})();