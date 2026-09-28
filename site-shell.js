(() => {
  const menu=document.querySelector('.menu');
  const nav=document.querySelector('header nav');
  if(!menu||!nav)return;
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close menu':'Open menu');
    menu.textContent=open?'×':'☰';
  });
  nav.addEventListener('click',e=>{
    if(!e.target.closest('a'))return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','Open menu');
    menu.textContent='☰';
  });
})();