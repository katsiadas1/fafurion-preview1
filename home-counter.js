(() => {
  const home=document.getElementById('page-home');
  if(!home || !home.classList.contains('counter-home')) return;

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals=[...home.querySelectorAll('.counter-reveal')];

  if(reduced){
    reveals.forEach(el=>el.classList.add('is-visible'));
  }else{
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -45px'});
    reveals.forEach((el,index)=>{
      el.style.transitionDelay=`${Math.min(index*55,240)}ms`;
      io.observe(el);
    });

    const hero=home.querySelector('.counter-hero');
    const bg=home.querySelector('.counter-hero-bg');
    if(hero && bg && matchMedia('(pointer:fine)').matches){
      hero.addEventListener('pointermove',e=>{
        const r=hero.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        bg.style.setProperty('--px',x.toFixed(3));
        bg.style.setProperty('--py',y.toFixed(3));
        hero.style.setProperty('--mx',`${x*10}px`);
        hero.style.setProperty('--my',`${y*8}px`);
      });
    }
  }

  const tabs=[...home.querySelectorAll('[data-counter-rank-tab]')];
  tabs.forEach(btn=>btn.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.toggle('active',x===btn));
  }));
})();
