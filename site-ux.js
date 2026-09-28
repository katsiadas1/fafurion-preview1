(() => {
  let stack;
  const ensure=()=>{
    if(stack)return stack;
    stack=document.createElement('div');
    stack.className='l2-toast-stack';
    stack.setAttribute('aria-live','polite');
    document.body.appendChild(stack);
    return stack;
  };
  window.l2Toast=(title,message='',type='info',duration=2600)=>{
    const host=ensure();
    const item=document.createElement('div');
    item.className='l2-toast '+type;
    item.innerHTML='<i></i><div><b></b><span></span></div><button type="button" aria-label="Dismiss">×</button>';
    item.querySelector('b').textContent=title;
    item.querySelector('span').textContent=message;
    const remove=()=>{if(!item.isConnected)return;item.classList.add('out');setTimeout(()=>item.remove(),180)};
    item.querySelector('button').addEventListener('click',remove);
    host.appendChild(item);
    setTimeout(remove,duration);
  };
})();