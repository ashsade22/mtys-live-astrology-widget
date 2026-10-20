export const SIGNS = Object.freeze('aries taurus gemini cancer leo virgo libra scorpio sagittarius capricorn aquarius pisces'.split(' '));
export const VERSION = '20261019-controlled-2';
export const TTL = 86400000;
export const STORAGE_KEY = 'mtys:d1719827-2c26-4bba-979a-b4cd4793d609:discovery:v2';
const FIELDS = ['version','id','createdAt','expiresAt','revision','moonRevision','mercuryRevision','mode','step','panel','moon','mercury','moonConfirmed','mercuryConfirmed'];
export function createState(now = Date.now(), id = crypto.randomUUID(), mode = 'personal') {
  return {version:VERSION,id,createdAt:now,expiresAt:now+TTL,revision:0,moonRevision:0,mercuryRevision:0,mode,step:1,panel:'main',moon:null,mercury:null,moonConfirmed:false,mercuryConfirmed:false};
}
export function validState(s, now = Date.now(), allowExpired = false) {
  if (!s || typeof s !== 'object' || Array.isArray(s) || Object.keys(s).length !== FIELDS.length || Object.keys(s).some(k=>!FIELDS.includes(k))) return false;
  if (s.version!==VERSION || typeof s.id!=='string' || !/^[a-zA-Z0-9-]{16,64}$/.test(s.id) || !['personal','example'].includes(s.mode)) return false;
  if (![s.createdAt,s.expiresAt,s.revision,s.moonRevision,s.mercuryRevision,s.step].every(Number.isSafeInteger) || s.createdAt<0 || s.createdAt>now || s.expiresAt!==s.createdAt+TTL) return false;
  if(![s.moonRevision,s.mercuryRevision].every(n=>n>=0&&n<=10000)||!['main','review','reset','unknown-moon','unknown-mercury'].includes(s.panel))return false;
  if ((!allowExpired && now>=s.expiresAt) || s.revision<0 || s.revision>10000 || s.step<1 || s.step>5) return false;
  if (![s.moon,s.mercury].every(v=>v===null || SIGNS.includes(v)) || typeof s.moonConfirmed!=='boolean' || typeof s.mercuryConfirmed!=='boolean') return false;
  if ((s.moonConfirmed&&!s.moon) || (s.mercuryConfirmed&&!s.mercury) || (s.step>1&&!s.moonConfirmed) || (s.step>3&&!s.mercuryConfirmed)) return false;
  if (s.mode==='example' && ((s.moon && s.moon!=='cancer') || (s.mercury && s.mercury!=='gemini'))) return false;
  return true;
}
export function commitSelection(s, placement, sign) {
  if (!validState(s,Math.max(Date.now(),s?.createdAt||0),true) || (placement==='mercury'&&!s.moonConfirmed)) throw new Error('invalid_state');
  if (!['moon','mercury'].includes(placement) || !SIGNS.includes(sign)) throw new Error('invalid_selection');
  if (s.mode==='example' && sign!==(placement==='moon'?'cancer':'gemini')) throw new Error('invalid_selection');
  const changed=s[placement]!==sign;
  const counter=placement+'Revision';
  const next={...s,[placement]:sign,[placement+'Confirmed']:true,revision:s.revision+(changed||!s[placement+'Confirmed']?1:0),[counter]:s[counter]+(changed||s[counter]===0?1:0),panel:'main',step:placement==='moon'?2:4};
  if (placement==='moon' && changed){next.mercuryConfirmed=false;if(s.mercury)next.mercuryRevision++;}
  return next;
}
export function parseCheckpoint(raw, now) {
  if (typeof raw!=='string' || new TextEncoder().encode(raw).length>4096) return null;
  try {const s=JSON.parse(raw);return validState(s,now)?s:null;} catch {return null;}
}
export function recovery(storage, now, fresh) {
  let available=true, restored=false, reason='new'; let state=fresh();
  try {const raw=storage.getItem(STORAGE_KEY);if(raw!==null){const parsed=parseCheckpoint(raw,now);if(parsed){state=parsed;restored=true;reason='restored';}else {storage.removeItem(STORAGE_KEY);reason='invalid_checkpoint';}}}
  catch {available=false;reason='storage_unavailable';}
  return {state,available,restored,reason};
}
export function persist(storage,s,now=Date.now()) {
  try {if(now>=s.expiresAt)storage.removeItem(STORAGE_KEY);else storage.setItem(STORAGE_KEY,JSON.stringify(s));return true;} catch {return false;}
}
export function historySnapshot(s) {return {version:1,state:{...s}};}
export function restoreHistory(snapshot,current,now=Date.now()) {
  if (!snapshot || Object.keys(snapshot).sort().join(',')!=='state,version' || snapshot.version!==1 || !validState(snapshot.state,now) || snapshot.state.id!==current.id) return null;
  return {...snapshot.state};
}
