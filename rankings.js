document.addEventListener('DOMContentLoaded',()=>{
  const data=window.FafurionCommunity,I=window.FafurionI18n,ui=window.FafurionUI;
  if(!data||!I||!ui)return;
  const cell=(text,cls='')=>`<td${cls?` class="${cls}"`:''}>${text}</td>`;
  function render() {
    const players=data.ranked().slice(0,15);
    const clans=data.clans.slice().sort((a,b)=>b.reputation-a.reputation||a.name.localeCompare(b.name)).slice(0,10);
    if(players.length)document.getElementById('pvp-rows').innerHTML=players.map((p,i)=>`<tr class="place-${i+1}">${cell(i+1)}${cell(ui.link('player',p.name))}${cell(ui.esc(p.class))}${cell(ui.number(p.level))}${cell(ui.link('clan',p.clan))}${cell(ui.number(p.pvp),'score')}${cell(ui.number(p.pk))}${cell(ui.number(p.deaths))}${cell(ui.esc(data.kd(p)))}</tr>`).join('');
    if(clans.length)document.getElementById('clan-rows').innerHTML=clans.map((c,i)=>`<tr class="place-${i+1}">${cell(i+1)}${cell(ui.link('clan',c.name))}${cell(ui.link('player',c.leader))}${cell(ui.number(data.roster(c.name).length))}${cell(ui.number(c.level))}${cell(ui.number(c.reputation),'score')}${cell(ui.esc(c.castle==='—'?I.t('No castle'):c.castle))}</tr>`).join('');
  }
  render();window.addEventListener('fafurion:language',render);
});
