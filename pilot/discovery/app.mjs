import {createState,recovery,persist,restoreHistory,historySnapshot,commitSelection,parseCheckpoint,STORAGE_KEY} from './state.mjs';
import {signs,titleCase,placementContent,applicationContent,COPY} from './content.mjs';
import {createAnalytics,observeReceipt} from './analytics.mjs';
import {styles} from './styles.mjs';
const SITE='https://ashley35031.wixsite.com/more-than-your-sun-4';
const node=(tag,text,props={})=>{const e=document.createElement(tag);if(text)e.textContent=text;Object.assign(e,props);return e;};
export function mountPilot(root,{storage,clock=()=>Date.now(),analyticsOptions={}}={}) {
  const safeStorage=()=>storage ?? window.sessionStorage;
  const checkpoint={getItem:k=>safeStorage().getItem(k),setItem:(k,v)=>safeStorage().setItem(k,v),removeItem:k=>safeStorage().removeItem(k)};
  const recovered=recovery(checkpoint,clock(),()=>createState(clock()));
  let state=recovered.state,storageOK=recovered.available,notice=recovered.restored?'Your temporary exploration has been recovered.':'',draft=null,cleanup=[],resetPending=false,expired=false;
  let personalState=null;const branches=new Map([[state.mode,{...state}]]);const events=[];
  try{const raw=checkpoint.getItem(STORAGE_KEY+':guest');personalState=parseCheckpoint(raw,clock());if(raw&&!personalState)checkpoint.removeItem(STORAGE_KEY+':guest');if(personalState)branches.set(personalState.mode,{...personalState});}catch{}
  const analytics=createAnalytics({...analyticsOptions,sink:e=>{events.push(e);if(events.length>50)events.shift();analyticsOptions.sink?.(e);}});
  root.classList.add('mtys-pilot');
  const style=node('style',styles);root.before(style);
  function save(){branches.set(state.mode,{...state});if(!persist(checkpoint,state,clock()))storageOK=false;}
  function remember(push=true){
    const snap=historySnapshot(state);
    if(window.MTYSPilotTransport?.commit){window.MTYSPilotTransport.commit(snap,push);return;}
    window.history[push?'pushState':'replaceState']({...window.history.state,mtysDiscovery:snap},'');
  }
  function emit(name,basis='none',reason='none'){return analytics.emit(name,state,basis,reason);}
  function view(next,{push=true}={}){state=next;save();remember(push);render();}
  function action(text,fn,secondary=false){const b=node('button',text,{type:'button',className:secondary?'secondary':''});b.addEventListener('click',fn);return b;}
  function paragraph(parent,text,cls){const p=node('p',text,{className:cls||''});parent.append(p);return p;}
  function receipt(which,basis){emit(which==='moon'?'moon_insight_received':which==='mercury'?'mercury_insight_received':'relationship_application_received',basis);}
  function watch(el,fn){if('IntersectionObserver' in window)cleanup.push(observeReceipt(el,fn));}
  function details(title,text){const d=node('details');d.append(node('summary',title),node('p',text));return d;}
  function title(text){const h=node('h2',text,{tabIndex:-1});root.append(h);return h;}
  function context(){const c=node('div','',{className:'context'});if(state.moon)paragraph(c,(state.mode==='example'?'Example Moon: ':'Moon: ')+titleCase(state.moon));if(state.mercury)paragraph(c,(state.mode==='example'?'Example Mercury: ':'Mercury: ')+titleCase(state.mercury));root.append(c);}
  function leaveExample(){const prior=personalState;personalState=null;analytics.reset();view(prior&&clock()<prior.expiresAt?prior:createState(clock()),{push:true});}
  function unknown(placement){return action("I don't know my "+(placement==='moon'?'Moon':'Mercury')+' sign',()=>view({...state,panel:'unknown-'+placement}),true);}
  function reviewPanel(){
    context();title('Review my choices');let choice=null;
    const field=node('fieldset');field.append(node('legend','Which choice would you like to review?'));
    const go=action('Continue',()=>view({...state,panel:'main',step:choice==='moon'?1:3}));go.disabled=true;
    for(const placement of state.step===2?['moon']:['moon','mercury']){const label=node('label','',{className:'sign-option'}),radio=node('input','',{type:'radio',name:'review-placement',value:placement});radio.addEventListener('change',()=>{choice=placement;go.disabled=false;});label.append(radio,document.createTextNode(placement==='moon'?'Moon':'Mercury'));field.append(label);}
    root.append(field,go,action('Keep result',()=>view({...state,panel:'main'}),true));
    root.append(details('Start again','Clear the temporary guest and example choices.'));
    const box=root.lastElementChild;
    if(box)box.append(action('Start again',()=>view({...state,panel:'reset'}),true));
    else root.append(action('Start again',()=>view({...state,panel:'reset'}),true));
  }
  function panelView(){
    if(state.panel==='review'){reviewPanel();return;}
    if(state.panel==='reset'){title('Clear your temporary choices?');paragraph(root,'This clears the guest and example exploration.');root.append(action('Clear choices',reset),action('Keep exploring',()=>view({...state,panel:'review'}),true));return;}
    const placement=state.panel==='unknown-moon'?'Moon':'Mercury';title("Don't know your "+placement+' sign?');
    paragraph(root,'Your '+placement+' sign can differ from your Sun sign. Please do not guess. No birth details are needed.');
    if(placement==='Mercury'&&state.moonConfirmed){const data=placementContent('moon',state.moon);context();root.append(node('h3','Your Moon insight'));for(let i=0;i<data.lines.length;i++){root.append(node('h3',data.labels[i]));paragraph(root,data.lines[i]);}}
    root.append(node('a','Back to Know Your Chart',{href:SITE+'/know-your-chart',className:'action',target:'_top'}),action('Explore the fictional example',startExample,true));
  }
  function selectView(placement){
    const moon=placement==='moon',name=moon?'Moon':'Mercury',example=state.mode==='example';
    if(!moon)context();title(moon?COPY.opening:'What is your Mercury sign?');
    if(moon)paragraph(root,COPY.intro);else paragraph(root,'Now explore how you put your needs into words.');
    const field=node('fieldset');field.append(node('legend',example?'Fictional '+name+' sign':'Your '+name+' sign'));
    draft=example?(moon?'cancer':'gemini'):state[placement];
    const go=action(example?'See the example '+name+' insight':'See my '+name+' insight',()=>{
      if(!draft)return;state=commitSelection(state,placement,draft);emit(moon?'moon_selection_confirmed':'mercury_selection_confirmed');view(state);
    });go.disabled=!draft;
    if(example)paragraph(field,name+' in '+titleCase(draft)+'. Fixed fictional placement.');
    else{const grid=node('div','',{className:'signs'});for(const sign of signs){const key=sign.toLowerCase(),label=node('label','',{className:'sign-option'}),input=node('input','',{type:'radio',name:placement,value:key,checked:draft===key});input.addEventListener('change',()=>{draft=key;go.disabled=false;});label.append(input,document.createTextNode(sign));grid.append(label);}field.append(grid);if(draft)paragraph(field,'Your previous selection. Confirm it or choose another sign.','basis');}
    root.append(field,go,example?action('Leave example',leaveExample,true):unknown(placement));
  }
  function resultView(placement){
    const moon=placement==='moon',name=moon?'Moon':'Mercury',data=placementContent(placement,state[placement]);context();
    const heading=title((state.mode==='example'?'Example ':'Your ')+name+' insight');
    if(!data){showUnavailable('This placement insight is not available. Your selection is still here.');return;}
    paragraph(root,state.mode==='example'?'Fictional example. This is not your placement.':'Based on the '+name+' sign you selected.','basis');
    const card=node('section','',{className:'result','aria-label':name+' insight'});card.setAttribute('aria-label',name+' insight');
    for(let i=0;i<data.lines.length;i++){card.append(node('h3',data.labels[i]));paragraph(card,data.lines[i]);}
    root.append(card,details('Why this insight','This explores one selected placement. Your full chart adds context.'));
    root.append(node('h3',moon?COPY.moonBridgeTitle:COPY.mercuryBridgeTitle));paragraph(root,moon?COPY.moonBridge:COPY.mercuryBridge);
    const next=action(state.mode==='example'?(moon?'Explore the example communication style':'See how the example connects in relationships'):(moon?'Explore my communication style':'See how these connect in relationships'),()=>{
      receipt(placement,'explicit_interaction');
      if(moon){emit('mercury_recommendation_shown','explicit_interaction');emit('mercury_exploration_started');view({...state,step:3});}
      else {emit('relationship_application_started');view({...state,step:5});}
    });root.append(next,state.mode==='example'?action('Leave example',leaveExample,true):action(moon?'Review my choice':'Review my choices',()=>view({...state,panel:'review'}),true));
    watch(card,basis=>receipt(placement,basis));if(moon)watch(next,basis=>emit('mercury_recommendation_shown',basis));heading.focus({preventScroll:true});
  }
  function showUnavailable(text){const error=node('div','',{className:'notice error'});error.setAttribute('role','status');paragraph(error,text);root.append(error);emit('pilot_error','none','content_unavailable');}
  function applicationView(){
    context();const heading=title(state.mode==='example'?'Example needs in conversation':'Your needs in conversation'),data=applicationContent(state);
    if(!data){showUnavailable('This combination is not available in this controlled prototype. Your Moon and Mercury insights remain available.');root.append(action('Return to Mercury insight',()=>view({...state,step:4})),action('Review my choices',()=>view({...state,panel:'review'}),true));heading.focus({preventScroll:true});return;}
    paragraph(root,'Fictional example. Based on an invented Cancer Moon and Gemini Mercury.','basis');
    const card=node('section','',{className:'result'});card.setAttribute('aria-label','Combined relationship application');card.append(node('h3',data.headline));paragraph(card,data.explanation);card.append(node('h3','In a relationship'));paragraph(card,data.everyday);card.append(node('h3','Something to try'));paragraph(card,data.option);paragraph(card,COPY.scope,'basis');root.append(card);
    root.append(node('h3',COPY.nextTitle));paragraph(root,COPY.nextReason);
    const link=node('a','Explore relationship patterns',{href:SITE+'/relationships',className:'action',target:'_top'});link.addEventListener('click',e=>{receipt('application','explicit_interaction');emit('recommendation_selected');if(window.MTYSPilotTransport?.navigate){e.preventDefault();window.MTYSPilotTransport.navigate();}});root.append(link);
    root.append(state.mode==='example'?action('Leave example',leaveExample,true):action('Review my choices',()=>view({...state,panel:'review'}),true));paragraph(root,COPY.return);
    watch(card,basis=>receipt('application',basis));heading.focus({preventScroll:true});
  }
  function startExample(){if(state.mode!=='example'){personalState={...state};try{checkpoint.setItem(STORAGE_KEY+':guest',JSON.stringify(personalState));}catch{storageOK=false;}}analytics.reset();state=createState(clock(),crypto.randomUUID(),'example');emit('example_mode_started');view(state);}
  function reset(){analytics.reset();personalState=null;branches.clear();try{checkpoint.removeItem(STORAGE_KEY+':guest');}catch{}resetPending=false;expired=false;notice='Your temporary exploration has been cleared.';view(createState(clock()),{push:false});}
  function render(){
    cleanup.forEach(f=>f());cleanup=[];root.replaceChildren();
    if(state.mode==='example')root.append(node('div','Example exploration',{className:'badge'}));
    const stages=node('ol','',{className:'stages'});stages.setAttribute('aria-label','Discovery stages');for(const [i,label]of ['Emotional needs','Communication','Together'].entries()){const li=node('li',label);if(i===(state.step<3?0:state.step<5?1:2))li.setAttribute('aria-current','step');stages.append(li);}root.append(stages);
    if(notice)paragraph(root,notice,'notice');
    if(!storageOK)paragraph(root,'This exploration works here, but refresh recovery is unavailable in this browser.','notice');
    if(state.panel!=='main')panelView();else if(state.step===1)selectView('moon');else if(state.step===2)resultView('moon');else if(state.step===3)selectView('mercury');else if(state.step===4)resultView('mercury');else applicationView();
    const inspect=details('Prototype measurement status','Measurement is disabled. No approved consent mapping or collector is connected. Test hooks are inspected through automated QA only.');root.append(inspect);
    window.MTYSPilotTransport?.resize(root.getBoundingClientRect().height);
    const focusTarget=root.querySelector?.('h2');focusTarget?.focus?.({preventScroll:true});focusTarget?.scrollIntoView?.({block:'start',behavior:'instant'});
  }
  function expireOnResume(){if(clock()>=state.expiresAt){try{checkpoint.removeItem(STORAGE_KEY);if(personalState&&clock()>=personalState.expiresAt){personalState=null;checkpoint.removeItem(STORAGE_KEY+':guest');}}catch{}expired=true;notice='Temporary recovery has expired. Your currently viewed result remains here until you leave or start again.';render();}}
  function pop(event){const incoming=event.state?.mtysDiscovery;const binding=branches.get(incoming?.state?.mode)||state;const candidate=restoreHistory(incoming,binding,clock());if(candidate){state=candidate;notice='';save();render();}else{emit('pilot_error','none','state_invalid');state=createState(clock());notice='That temporary exploration is no longer available. Please choose your Moon sign.';save();remember(false);render();}}
  function resume(){if(document.visibilityState==='visible')expireOnResume();}
  window.addEventListener('popstate',pop);document.addEventListener('visibilitychange',resume);window.addEventListener('pageshow',expireOnResume);
  const observer=new ResizeObserver(()=>window.MTYSPilotTransport?.resize(root.getBoundingClientRect().height));observer.observe(root);
  save();remember(false);render();
  return {destroy(){cleanup.forEach(f=>f());observer.disconnect();window.removeEventListener('popstate',pop);document.removeEventListener('visibilitychange',resume);window.removeEventListener('pageshow',expireOnResume);style.remove();},getState:()=>({...state})};
}
