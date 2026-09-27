/* One language preference for the public site and all account previews. */
(() => {
  const script = document.currentScript;
  const base = new URL('.', script.src);
  const languages = {
    en: {name: 'English', short: 'EN', flag: 'gb', locale: 'en-GB'},
    el: {name: 'Ελληνικά', short: 'EL', flag: 'gr', locale: 'el-GR'},
    pt: {name: 'Português (Brasil)', short: 'BR', flag: 'br', locale: 'pt-BR'},
    ru: {name: 'Русский', short: 'RU', flag: 'ru', locale: 'ru-RU'}
  };
  const valid = code => Object.hasOwn(languages, code);
  let saved;
  try { saved = localStorage.getItem('fafurion-language') || localStorage.getItem('fafurion_language'); } catch {}
  let language = new URL(location.href).searchParams.get('lang') || saved || 'en';
  if (!valid(language)) language = 'en';
  const textSources = new WeakMap(), attributeSources = new WeakMap();
  const dictionary = () => window.FAFURION_TRANSLATIONS?.[language] || {};
  const t = source => dictionary()[source] || source;
  const skip = node => node.parentElement?.closest('script,style,code,[data-no-i18n],.language-picker');
  function translate(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    for(const node of nodes) {
      if(skip(node)) continue;
      const current=node.nodeValue;
      let entry=textSources.get(node);
      if(!entry || current !== entry.rendered) entry={source:current, rendered:current};
      const trimmed=entry.source.trim();
      const translated=trimmed ? entry.source.replace(trimmed,t(trimmed)) : entry.source;
      entry.rendered=translated;textSources.set(node,entry);
      if(current!==translated) node.nodeValue=translated;
    }
    root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(node=>{
      if(node.closest('[data-no-i18n],.language-picker'))return;
      const attrs=attributeSources.get(node)||{};
      for(const name of ['placeholder','aria-label','title']) {
        const value=node.getAttribute(name);if(value===null)continue;
        if(!attrs[name] || attrs[name].rendered!==value)attrs[name]={source:value};
        attrs[name].rendered=t(attrs[name].source);
        if(value!==attrs[name].rendered)node.setAttribute(name,attrs[name].rendered);
      }
      attributeSources.set(node,attrs);
    });
    root.querySelectorAll('[data-demo-eur]').forEach(node=>{
      const amount=Number(node.dataset.demoEur);
      const formatted=new Intl.NumberFormat(languages[language].locale,{style:'currency',currency:language==='pt'?'BRL':'EUR'}).format(amount);
      if(node.textContent!==formatted)node.textContent=formatted;
    });
  }
  function makePicker(mount) {
    const details=document.createElement('details');details.className='language-picker';
    const summary=document.createElement('summary');summary.setAttribute('aria-label',t('Language'));
    const img=document.createElement('img');img.src=new URL(`assets/flags/${languages[language].flag}.svg`,base).href;img.alt='';img.width=24;img.height=16;
    const span=document.createElement('span');span.textContent=languages[language].short;
    summary.append(img,span);details.append(summary);
    const list=document.createElement('div');list.className='language-options';
    for(const [code,meta] of Object.entries(languages)) {
      const button=document.createElement('button');button.type='button';button.dataset.language=code;
      button.setAttribute('aria-pressed',String(code===language));button.lang=meta.locale;
      const flag=document.createElement('img');flag.src=new URL(`assets/flags/${meta.flag}.svg`,base).href;flag.alt='';flag.width=24;flag.height=16;
      const label=document.createElement('span');label.textContent=meta.name;
      button.append(flag,label);button.onclick=()=>{setLanguage(code);details.open=false;summary.focus();};
      list.append(button);
    }
    details.append(list);mount.append(details);
    details.addEventListener('keydown',e=>{if(e.key==='Escape'){details.open=false;summary.focus();}});
  }
  function setLanguage(code) {
    if(!valid(code))return;language=code;
    document.documentElement.lang=languages[code].locale;
    try{localStorage.setItem('fafurion-language',code);localStorage.setItem('fafurion_language',code);}catch{}
    const url=new URL(location.href);url.searchParams.set('lang',code);history.replaceState(history.state,'',url);
    document.querySelectorAll('.language-picker').forEach(picker=>{
      const summary=picker.querySelector('summary');summary.setAttribute('aria-label',t('Language'));
      summary.querySelector('img').src=new URL(`assets/flags/${languages[code].flag}.svg`,base).href;
      summary.querySelector('span').textContent=languages[code].short;
      picker.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===code)));
    });
    window.dispatchEvent(new CustomEvent('fafurion:language',{detail:{language:code}}));
    translate();
    if(document.body.dataset.pageTitle)document.title=t(document.body.dataset.pageTitle)+' — Fafurion';
  }
  window.FafurionI18n={t,translate,setLanguage,get language(){return language;},get locale(){return languages[language].locale;},base};
  function init() {
    document.querySelectorAll('.dropdown').forEach(node=>{
      const button=node.querySelector('.dropdown-toggle');
      if(button && ['English','Ελληνικά','Português (Brasil)','Русский'].includes(button.textContent.trim())) {
        node.replaceChildren();node.classList.add('language-mount');
      }
    });
    if(!document.querySelector('.language-mount')) {
      const mount=document.createElement('div');mount.className='language-mount';
      const header=document.querySelector('header');if(header)header.append(mount);else{mount.classList.add('standalone-language');document.body.prepend(mount);}
    }
    document.querySelectorAll('.language-mount').forEach(makePicker);
    const title=document.title;
    if(!document.body.dataset.pageTitle) {
      const pages={'Info — Fafurion':'Info','Rankings — Fafurion':'Rankings','Download — Fafurion':'Download','Fafurion • Player sanctuary':'Account','Login - Fafurion':'Login','Characters - Fafurion':'Characters','Donations - Fafurion':'Donations','Reset - Fafurion':'Reset password'};
      if(pages[title])document.body.dataset.pageTitle=pages[title];
    }
    setLanguage(language);
    document.addEventListener('click',e=>document.querySelectorAll('.language-picker[open]').forEach(picker=>{if(!picker.contains(e.target))picker.open=false;}));
    // Translate text inserted by the legacy preview's controls too.
    let queued=false;
    new MutationObserver(records=>{
      if(!records.some(r=>r.type==='childList'||r.type==='characterData'))return;
      if(queued)return;queued=true;queueMicrotask(()=>{queued=false;translate();});
    }).observe(document.body,{childList:true,characterData:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
