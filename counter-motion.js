/* Visual-only enhancement. No account, payment or routing logic is changed. */
(() => {
 if(typeof langs!=='undefined'){
  const copy={en:['Enter the Realm','Server Info'],el:['Μπες στον κόσμο','Πληροφορίες'],pt:['Entrar no reino','Informações'],ru:['Войти в мир','О сервере']};
  Object.entries(copy).forEach(([code,labels])=>{langs[code].t.enterRealm=labels[0];langs[code].t.serverInfo=labels[1]});
  if(typeof applyLang==='function')applyLang(document.documentElement.lang);
 }
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const selectors='.info-card,.download-card,.page-heading,.rank-podium-card,.stat-card,.char-card';
 let observer;
 function setup(){
  observer?.disconnect();
  document.querySelectorAll('.counter-revealing').forEach(el=>el.classList.remove('counter-revealing'));
  if(reduce.matches||!('IntersectionObserver' in window))return;
  observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('counter-revealing');observer.unobserve(entry.target)});
  },{threshold:.08});
  document.querySelectorAll(selectors).forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${Math.min(i%4*55,165)}ms`);observer.observe(el)});
 }
 setup();reduce.addEventListener('change',setup);
})();
