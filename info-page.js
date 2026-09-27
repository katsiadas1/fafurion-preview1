(() => {
  const page=document.body;
  if(!page.classList.contains('info-experience')) return;

  const cards=[...document.querySelectorAll('.info-card')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduced){
    cards.forEach(card=>card.classList.add('is-visible'));
  }else{
    const reveal=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -40px'});
    cards.forEach((card,index)=>{
      card.style.transitionDelay=`${Math.min(index*70,280)}ms`;
      reveal.observe(card);
    });
  }

  const links=[...document.querySelectorAll('.info-shortcuts a[href^="#"]')];
  const sections=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const setActive=id=>{
    links.forEach(link=>link.classList.toggle('is-active',link.getAttribute('href')===`#${id}`));
  };

  if(sections.length){
    const spy=new IntersectionObserver(entries=>{
      const visible=entries
        .filter(entry=>entry.isIntersecting)
        .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible) setActive(visible.target.id);
    },{rootMargin:'-25% 0px -58% 0px',threshold:[0,.15,.35,.6]});
    sections.forEach(section=>spy.observe(section));
    setActive(sections[0].id);
  }

  links.forEach(link=>link.addEventListener('click',()=>{
    const id=link.getAttribute('href').slice(1);
    if(id) setActive(id);
  }));

  document.querySelectorAll('.chance-grid>div').forEach(item=>{
    const value=item.querySelector('strong')?.textContent?.trim();
    if(value && /^\d+%$/.test(value)) item.style.setProperty('--chance',value);
  });
})();
