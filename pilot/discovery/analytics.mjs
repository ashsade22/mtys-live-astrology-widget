import {VERSION,TTL} from './state.mjs';
export const EVENTS=Object.freeze(['pilot_entered','moon_selection_confirmed','moon_insight_received','mercury_recommendation_shown','mercury_exploration_started','mercury_selection_confirmed','mercury_insight_received','relationship_application_started','relationship_application_received','recommendation_selected','example_mode_started','pilot_error','pilot_recovery_started','pilot_recovery_succeeded']);
const STAGES=['moon_select','moon_insight','mercury_select','mercury_insight','relationship_application'];
const EXTRA={pilot_entered:[],moon_selection_confirmed:['action_id'],moon_insight_received:['receipt_method'],mercury_recommendation_shown:['exposure_method'],mercury_exploration_started:['action_id'],mercury_selection_confirmed:['action_id'],mercury_insight_received:['receipt_method'],relationship_application_started:['action_id'],relationship_application_received:['receipt_method'],recommendation_selected:['action_id','destination_key'],example_mode_started:['action_id','start_stage'],pilot_error:['operation_id','reason_code','outcome','timing_bucket'],pilot_recovery_started:['operation_id','recovery_kind','trigger'],pilot_recovery_succeeded:['operation_id','recovery_kind','restored_stage','timing_bucket']};
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const REASONS=['load_timeout','content_load_failed','content_unavailable','embed_handshake_failed','bridge_message_rejected','state_invalid','stale_result_rejected','checkpoint_invalid','checkpoint_expired','storage_unavailable','recovery_failed'];
const BASE={schema_version:'1.0',pilot_version:'1',build_version:VERSION,content_release:'controlled-example-v1',consent_state:'granted',policy_version:'prototype-qa-only',environment:'controlled_prototype',cohort_kind:'qa',storage_mode:'memory_only',device_class:'unknown',entry_source:'unknown'};
const COMMON=['event_name','event_id','measurement_id','run_id','sequence_no','occurred_at','state_revision','moon_revision','mercury_revision','stage','mode','entry_mode',...Object.keys(BASE)];
export function validEvent(e){
 if(!e||!EVENTS.includes(e.event_name)||Object.keys(e).length!==COMMON.length+EXTRA[e.event_name].length||Object.keys(e).some(k=>!COMMON.includes(k)&&!EXTRA[e.event_name].includes(k)))return false;
 if(Object.entries(BASE).some(([k,v])=>e[k]!==v)||![e.event_id,e.measurement_id,e.run_id].every(v=>typeof v==='string'&&UUID.test(v)))return false;
 if(![e.sequence_no,e.state_revision,e.moon_revision,e.mercury_revision].every(n=>Number.isSafeInteger(n)&&n>=0&&n<=100000)||e.sequence_no<1)return false;
 if(![...STAGES,'entry','recommendation'].includes(e.stage)||![e.mode,e.entry_mode].every(m=>['live','example'].includes(m))||typeof e.occurred_at!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(e.occurred_at)||!Number.isFinite(Date.parse(e.occurred_at)))return false;
 for(const k of ['action_id','operation_id'])if(k in e&&!UUID.test(e[k]))return false;
 for(const k of ['receipt_method','exposure_method'])if(k in e&&!['visible_1s','deliberate_action'].includes(e[k]))return false;
 if('destination_key'in e&&e.destination_key!=='relationships')return false;
 if('reason_code'in e&&!REASONS.includes(e.reason_code))return false;
 if('outcome'in e&&!['retryable','unavailable','rejected','degraded'].includes(e.outcome))return false;
 if('timing_bucket'in e&&!['under_1s','1_to_under_3s','3_to_under_10s','10_to_under_30s','30s_plus','not_applicable'].includes(e.timing_bucket))return false;
 if('recovery_kind'in e&&!['retry_content','reconnect_embed','restore_same_tab'].includes(e.recovery_kind))return false;
 if('trigger'in e&&!['user','bounded_auto'].includes(e.trigger))return false;
 for(const k of ['start_stage','restored_stage'])if(k in e&&![...STAGES,'entry','recommendation'].includes(e[k]))return false;
 return true;
}
export function createAnalytics({sink=()=>{},uuid=()=>crypto.randomUUID(),clock=()=>Date.now(),permission='unavailable'}={}){
 let allowed=permission==='granted',entered=false,measurement=null,run=null,entryMode=null,expires=0,seq=0;const seen=new Set();
 return {
  setConsent(value){if(value!==true){allowed=false;measurement=null;run=null;seen.clear();}return false;},
  reset(){if(allowed&&measurement){run=uuid();seq=0;}},
  emit(event,s,method='none',reason='none'){
   if(!allowed||!EVENTS.includes(event)||(!entered&&event!=='pilot_entered'))return false;
   if(!measurement){measurement=uuid();run=uuid();entryMode=s.mode==='example'?'example':'live';expires=clock()+TTL;}
   if(clock()>=expires){allowed=false;measurement=null;run=null;seen.clear();return false;}
   if(event==='pilot_entered'&&entered)return false;
   const mode=s.mode==='example'?'example':'live';
   const dependencies=event==='pilot_entered'?'entry':event==='example_mode_started'?'example':event.startsWith('moon_')||event.startsWith('mercury_recommendation')||event==='mercury_exploration_started'?s.moonRevision:s.moonRevision+':'+s.mercuryRevision;
   const key=[run,event,mode,dependencies,reason].join('|');if(seen.has(key))return false;
   const extra={};
   if(EXTRA[event].includes('action_id'))extra.action_id=uuid();
   if(EXTRA[event].includes('receipt_method'))extra.receipt_method=method==='view_threshold'?'visible_1s':'deliberate_action';
   if(EXTRA[event].includes('exposure_method'))extra.exposure_method=method==='view_threshold'?'visible_1s':'deliberate_action';
   if(event==='recommendation_selected')extra.destination_key='relationships';
   if(event==='example_mode_started')extra.start_stage=STAGES[s.step-1];
   if(event==='pilot_error')Object.assign(extra,{operation_id:uuid(),reason_code:reason,outcome:reason==='content_unavailable'?'unavailable':'rejected',timing_bucket:'not_applicable'});
   if(event.startsWith('pilot_recovery'))return false; // Paired operation ownership awaits actual nonpublic mount.
   const e={...BASE,event_name:event,event_id:uuid(),measurement_id:measurement,run_id:run,sequence_no:++seq,occurred_at:new Date(clock()).toISOString(),state_revision:s.revision,moon_revision:s.moonRevision,mercury_revision:s.mercuryRevision,stage:event==='pilot_entered'?'entry':STAGES[s.step-1],mode,entry_mode:entryMode,...extra};
   if(!validEvent(e))return false;seen.add(key);if(event==='pilot_entered')entered=true;
   try{sink(Object.freeze(e));return true;}catch{return false;}
  }
 };
}
// Foreground and intersection are both required. Explicit action is a separate receipt path.
export function observeReceipt(element,callback,{win=window,doc=document}={}) {
  let timer=null,visible=false,done=false;
  const clear=()=>{if(timer!==null)win.clearTimeout(timer);timer=null;};
  const changed=()=>{clear();if(!done&&visible&&doc.visibilityState==='visible')timer=win.setTimeout(()=>{done=true;callback('view_threshold');},1000);};
  const observer=new win.IntersectionObserver(entries=>{visible=entries.some(e=>e.target===element&&e.intersectionRatio>=.5);changed();},{threshold:[0,.5,1]});
  observer.observe(element);doc.addEventListener('visibilitychange',changed);
  return ()=>{clear();observer.disconnect();doc.removeEventListener('visibilitychange',changed);};
}
