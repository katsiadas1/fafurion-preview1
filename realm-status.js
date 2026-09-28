(() => {
  const clock = document.getElementById('realmServerClock');
  if (!clock) return;

  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Athens',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const tick = () => {
    clock.textContent = formatter.format(new Date());
  };

  tick();
  setInterval(tick, 1000);
})();