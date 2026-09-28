(() => {
  const clock = document.getElementById('realmServerClock');
  const siege = document.getElementById('realmSiegeCountdown');
  if (!clock && !siege) return;

  const clockFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Athens',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const athensNow = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' }));

  const siegeRemaining = () => {
    const now = athensNow();
    const target = new Date(now);
    let add = (7 - now.getDay()) % 7;
    target.setDate(now.getDate() + add);
    target.setHours(20, 0, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 7);

    const total = Math.max(0, Math.floor((target - now) / 1000));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    return `${days}D ${String(hours).padStart(2,'0')}H ${String(minutes).padStart(2,'0')}M`;
  };

  const tick = () => {
    if (clock) clock.textContent = clockFormatter.format(new Date());
    if (siege) siege.textContent = siegeRemaining();
  };

  tick();
  setInterval(tick, 1000);
})();