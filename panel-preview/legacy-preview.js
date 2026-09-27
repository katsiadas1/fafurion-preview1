(() => {
  const I=window.FafurionI18n,D=window.FafurionCommunity,U=window.FafurionUI;
  const message='Preview only. This form does not create accounts, send emails or process payments.';
  function feedback(form){let node=form.querySelector('.preview-feedback');if(!node){node=document.createElement('p');node.className='preview-feedback';node.setAttribute('role','status');form.append(node);}node.textContent=I.t(message);}
  document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();e.stopImmediatePropagation();feedback(form);},true));
  document.querySelectorAll('a[data-demo-action]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const scope=a.closest('.card-body')||document.body;feedback(scope);}));
  function render(){
    document.querySelectorAll('.preview-feedback').forEach(node=>node.textContent=I.t(message));
    const tbody=document.getElementById('legacy-character-rows');
    if(tbody)tbody.innerHTML=['Astra','Nyx','Ragnar'].map(D.player).filter(Boolean).map(p=>`<tr><td>${U.link('player',p.name)}</td><td>${U.esc(I.t(p.online?'Online':'Offline'))}</td><td data-no-i18n>${U.esc(p.class)}</td><td>${U.number(p.level)}</td><td>2026-09-19 06:40:00</td><td><button type="button" class="btn btn-secondary legacy-action">${U.esc(I.t('Unstuck'))}</button></td></tr>`).join('');
    tbody?.querySelectorAll('.legacy-action').forEach(b=>b.onclick=()=>feedback(tbody.closest('.card-body')||document.body));
    document.querySelectorAll('.input-group-text,.input-group-append,.input-group-prepend').forEach(node=>{if(['EUR','BRL'].includes(node.textContent.trim()))node.textContent=I.language==='pt'?'BRL':'EUR';});
    document.querySelectorAll('.ff-password-toggle').forEach(button=>{
      const input=button.parentElement.querySelector('input');const visible=input?.type==='text';
      button.textContent=I.t(visible?'Hide':'Show');button.setAttribute('aria-label',I.t(visible?'Hide password':'Show password'));
    });
  }
  document.addEventListener('DOMContentLoaded',render,{once:true});window.addEventListener('fafurion:language',render);
})();
