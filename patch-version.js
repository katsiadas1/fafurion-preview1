(() => {
  const cfg=window.SERVER_CONFIG||{};
  const patch=cfg.patch||{};
  const set=(id,value)=>{const el=document.getElementById(id);if(el&&value)el.textContent=value;};
  set('patchCurrentVersion',patch.version?('v'+String(patch.version).replace(/^v/i,'')):null);
  set('patchUpdated',patch.updated);
  set('patchClientSize',patch.clientSize);
  set('patchFullSize',patch.fullPatchSize);
  set('patchUpdateSize',patch.updateSize);
  set('patchChecksum',patch.checksum);

  document.querySelectorAll('.patch-download-option[data-resource]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const key=btn.dataset.resource;
      const url=key==='client'?cfg.clientUrl:key==='patch'?cfg.patchUrl:cfg.updateUrl;
      if(url){window.location.href=url;return;}
      if(typeof window.l2Toast==='function'){
        window.l2Toast('Download not published yet','The real client / patch link will appear here before release.','warn',2800);
      }else{
        const original=btn.querySelector('.patch-option-meta span');
        if(original){
          const previous=original.textContent;
          original.textContent='Link not published yet';
          setTimeout(()=>original.textContent=previous,2200);
        }
      }
    });
  });

  const copy=document.getElementById('copyChecksumButton');
  if(copy)copy.addEventListener('click',async()=>{
    const text=document.getElementById('patchChecksum')?.textContent||'';
    try{
      await navigator.clipboard.writeText(text);
      copy.textContent='COPIED';
      if(typeof window.l2Toast==='function')window.l2Toast('Checksum copied','SHA-256 copied to clipboard.','success',1800);
      setTimeout(()=>copy.textContent='COPY',1600);
    }catch{
      copy.textContent='SELECT';
      const code=document.getElementById('patchChecksum');
      if(code){const range=document.createRange();range.selectNodeContents(code);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);}
    }
  });
})();