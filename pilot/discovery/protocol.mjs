import {validState} from './state.mjs';
export const PARENT_ORIGINS=Object.freeze(['https://ashley35031.wixsite.com','https://ashley35031-more-than-your-sun-4.editor.wix.com']);
export const CHILD_ORIGIN='https://ashsade22.github.io';
export const CHILD_PATH='/mtys-live-astrology-widget/pilot/discovery/preview.html';
export function validMessage(m,now=Date.now()){
  if(!m||typeof m!=='object'||Array.isArray(m))return false;
  try{if(new TextEncoder().encode(JSON.stringify(m)).length>8192)return false;}catch{return false;}
  if(m.source!=='mtys-discovery'||m.v!==1)return false;
  const fields={ready:['source','v','type'],commit:['source','v','type','snapshot','push'],restore:['source','v','type','snapshot'],resize:['source','v','type','height'],navigate:['source','v','type'],ack:['source','v','type']};
  if(!fields[m.type]||Object.keys(m).length!==fields[m.type].length||Object.keys(m).some(k=>!fields[m.type].includes(k)))return false;
  if(m.type==='commit'||m.type==='restore'){
    if(!m.snapshot||Object.keys(m.snapshot).sort().join(',')!=='state,version'||m.snapshot.version!==1||!validState(m.snapshot.state,now))return false;
    if(m.type==='commit'&&typeof m.push!=='boolean')return false;
  }
  return m.type!=='resize'||(Number.isSafeInteger(m.height)&&m.height>=300&&m.height<=12000);
}
export function acceptedFrame(frame,source){
  try{const u=new URL(frame.src);return frame.contentWindow===source&&u.origin===CHILD_ORIGIN&&u.pathname===CHILD_PATH&&!u.search&&!u.hash;}catch{return false;}
}
export function installChildTransport(win=window){
  if(win.parent===win)return null;
  let parentOrigin=null,ready=false,pending=null,lastHeight=null,timer=null,attempts=0;
  const send=message=>{if(parentOrigin)win.parent.postMessage({source:'mtys-discovery',v:1,...message},parentOrigin);};
  const onMessage=e=>{
    if(e.source!==win.parent||!PARENT_ORIGINS.includes(e.origin)||!validMessage(e.data))return;
    parentOrigin=e.origin;
    if(e.data.type==='ack'){ready=true;if(timer!==null)win.clearTimeout(timer);if(pending){send({...pending,push:false});pending=null;}if(lastHeight!==null)send({type:'resize',height:lastHeight});}
    if(e.data.type==='restore')win.dispatchEvent(new PopStateEvent('popstate',{state:{mtysDiscovery:e.data.snapshot}}));
  };
  win.addEventListener('message',onMessage);
  // Send only a no-data handshake to the two specifically approved origins.
  function hello(){if(ready||attempts++>=20)return;for(const origin of PARENT_ORIGINS)win.parent.postMessage({source:'mtys-discovery',v:1,type:'ready'},origin);timer=win.setTimeout(hello,250);}
  hello();
  return {commit(snapshot,push){const m={type:'commit',snapshot,push};if(ready)send(m);else{pending=m;win.history[push?'pushState':'replaceState']({...win.history.state,mtysDiscovery:snapshot},'');}},resize(height){lastHeight=Math.min(12000,Math.max(300,Math.ceil(height)));if(ready)send({type:'resize',height:lastHeight});},navigate(){if(ready)send({type:'navigate'});else win.location.assign('https://ashley35031.wixsite.com/more-than-your-sun-4/relationships');},destroy(){if(timer!==null)win.clearTimeout(timer);win.removeEventListener('message',onMessage);}};
}
export function installHostBridge(win=window,doc=document){
  const hostURL=new URL(win.location.href);
  if(!PARENT_ORIGINS.includes(hostURL.origin)||!hostURL.pathname.endsWith('/know-your-chart'))return ()=>{};
  const peers=new Set(),retiredIds=new Set();let latest=null;
  const send=(source,m)=>source.postMessage({source:'mtys-discovery',v:1,...m},CHILD_ORIGIN);
  const onMessage=e=>{
    if(e.origin!==CHILD_ORIGIN||!validMessage(e.data))return;
    const frame=Array.from(doc.querySelectorAll('iframe')).find(f=>acceptedFrame(f,e.source));if(!frame)return;
    const m=e.data;
    if(m.type==='ready'){peers.add(e.source);send(e.source,{type:'ack'});return;}
    if(!peers.has(e.source))return;
    if(m.type==='commit'){
      const current=win.history.state?.mtysDiscovery?.state;
      if(retiredIds.has(m.snapshot.state.id))return;
      if(current&&current.id!==m.snapshot.state.id&&current.mode===m.snapshot.state.mode)retiredIds.add(current.id);
      if(current&&current.id===m.snapshot.state.id&&m.snapshot.state.revision<current.revision)return;
      latest=m.snapshot;
      const state={...win.history.state,mtysDiscovery:m.snapshot};
      const url=new URL(win.location.href);for(const key of ['sign','placement','you','them'])url.searchParams.delete(key);
      win.history[m.push?'pushState':'replaceState'](state,'',url);
    }
    if(m.type==='resize'){frame.style.height=m.height+'px';frame.style.width='100%';frame.setAttribute('scrolling','no');}
    if(m.type==='navigate')win.location.assign('https://ashley35031.wixsite.com/more-than-your-sun-4/relationships');
  };
  const back=()=>{let snap=win.history.state?.mtysDiscovery;if(snap?.state&&retiredIds.has(snap.state.id)){snap=latest;win.history.replaceState({...win.history.state,mtysDiscovery:snap},'');}if(validMessage({source:'mtys-discovery',v:1,type:'restore',snapshot:snap}))for(const peer of peers)if(Array.from(doc.querySelectorAll('iframe')).some(f=>acceptedFrame(f,peer)))send(peer,{type:'restore',snapshot:snap});};
  win.addEventListener('message',onMessage);win.addEventListener('popstate',back);
  return ()=>{win.removeEventListener('message',onMessage);win.removeEventListener('popstate',back);peers.clear();};
}
