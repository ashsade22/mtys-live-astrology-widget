const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');
function env(href) {
 const listeners = {};
 const win = {location:new URL(href),addEventListener(n,f){(listeners[n]??=[]).push(f)},removeEventListener(){},dispatchEvent(e){for(const f of listeners[e.type]??[])f(e)},setTimeout(){},requestAnimationFrame(f){f()}};
 const history=[href]; let index=0;
 function set(u){win.location=new URL(u)}
 win.history={pushState(_,__,u){history.splice(++index);history.push(String(u));set(u)},replaceState(_,__,u){history[index]=String(u);set(u)},back(){if(index){set(history[--index]);win.dispatchEvent({type:'popstate'})}},forward(){if(index<history.length-1){set(history[++index]);win.dispatchEvent({type:'popstate'})}}};
 win.parent=win;
 const classes={};const frames=[];
 const context={window:win,document:{currentScript:null,querySelectorAll:()=>frames},URL,URLSearchParams,Set,Map,Array,console,HTMLElement:class{},customElements:{get:n=>classes[n],define:(n,c)=>classes[n]=c},CustomEvent:class{constructor(type){this.type=type}}};
 const ctx=vm.createContext(context);
 return {win,ctx,classes,frames,load(file){vm.runInContext(fs.readFileSync(file,'utf8'),ctx)},message(data,origin,source){win.dispatchEvent({type:'message',data,origin,source})}};
}
const signs='aries taurus gemini cancer leo virgo libra scorpio sagittarius capricorn aquarius pisces'.split(' ');
function know(e){e.load('mtys-know-your-chart.js');return {proto:e.classes['mtys-know-your-chart'].prototype,self:{content:{placements:Object.fromEntries('sun moon rising mercury venus mars'.split(' ').map(s=>[s,{}])),signs:signs.map(s=>s[0].toUpperCase()+s.slice(1))},routeState:{placement:'moon',sign:'cancer'},render(){},scrollIntoView(){}}};}
function compat(e){e.load('mtys-compatibility-v3.js');return {proto:e.classes['mtys-compatibility'].prototype,self:{content:{signs:signs.map(key=>({key}))},validSign:e.classes['mtys-compatibility'].prototype.validSign}};}
function pair(path,query='') {
 const parent=env('https://ashley35031.wixsite.com/more-than-your-sun-4'+path+query);
 const file=path==='/compatibility'?'compatibility-preview-v3.html':'know-your-chart-preview.html';
 const child=env('https://ashsade22.github.io/mtys-live-astrology-widget/'+file);
 const parentHandle={postMessage(data){parent.message(data,'https://ashsade22.github.io',childHandle)}};
 const childHandle={postMessage(data){child.message(data,'https://ashley35031.wixsite.com',parentHandle)}};
 child.win.parent=parentHandle;parent.frames.push({src:child.win.location.href,contentWindow:childHandle});
 parent.load('operations/host-bridge.js');child.load('mtys-host-bridge.js');
 return {parent,child};
}
test('Know Your Chart later selection wins over original route state',()=>{const e=env('https://example.com/?placement=moon&sign=leo');const {proto,self}=know(e);assert.equal(proto.getState.call(self).sign,'Leo')});
test('Compatibility repeated reads retain initial pair',()=>{const {child}=pair('/compatibility','?you=cancer&them=pisces');const {proto,self}=compat(child);for(let i=0;i<5;i++){assert.equal(proto.getState.call(self).yours.key,'cancer');assert.equal(proto.getState.call(self).theirs.key,'pisces')}});
for(const path of ['/know-your-chart','/compatibility'])test(path+' changes Back Forward refresh and repeated reads',()=>{
 const query=path==='/compatibility'?'?you=cancer&them=pisces':'?placement=moon&sign=cancer';
 const {parent,child}=pair(path,query);
 const next=path==='/compatibility'?{you:'leo',them:'virgo'}:{placement:'mercury',sign:'leo'};
 child.win.MTYSBridge.setRouteState(next);
 for(const [k,v]of Object.entries(next)){assert.equal(parent.win.location.searchParams.get(k),v);assert.equal(child.win.location.searchParams.get(k),v)}
 parent.win.history.back();assert.equal(child.win.location.searchParams.get(path==='/compatibility'?'you':'sign'),'cancer');
 parent.win.history.forward();assert.equal(child.win.location.searchParams.get(path==='/compatibility'?'you':'sign'),'leo');
 const refreshed=pair(path,parent.win.location.search);assert.equal(refreshed.child.win.location.searchParams.get(path==='/compatibility'?'you':'sign'),'leo');
});
test('Compatibility has no silent default for empty or invalid inputs',()=>{for(const q of ['','?you=invalid&them=pisces','?you=aries&them=bogus']){const e=env('https://example.com/'+q);const {proto,self}=compat(e);const s=proto.getState.call(self);assert.ok(!s.yours||!s.theirs);assert.equal(proto.renderReading.call(self,s.yours,s.theirs),'')}});
test('Know reset clears initial deep link and survives Back',()=>{const {parent,child}=pair('/know-your-chart','?placement=moon&sign=cancer');child.win.MTYSBridge.setRouteState({});assert.equal(parent.win.location.search,'');assert.equal(child.win.location.search,'');parent.win.history.back();assert.equal(child.win.location.searchParams.get('sign'),'cancer')});
test('Share links use current pair and strip unrelated values',()=>{const {child}=pair('/compatibility','?you=cancer&them=pisces');child.win.MTYSBridge.setRouteState({you:'leo',them:'virgo',birth:'private'});const u=new URL(child.win.MTYSBridge.brandedUrl('/compatibility',{...child.win.MTYSBridge.getRouteState(),email:'private'}));assert.equal(u.search,'?you=leo&them=virgo')});
test('Incoming and outgoing query allowlist validates signs and placements',()=>{const {parent,child}=pair('/know-your-chart','?placement=moon&sign=cancer&email=private&token=secret');assert.equal(child.win.location.search,'?placement=moon&sign=cancer');child.win.MTYSBridge.setRouteState({placement:'invalid',sign:'LEO',email:'private'});assert.equal(parent.win.location.search,'?sign=leo')});
test('Unrecognized frames and origins cannot change host state',()=>{const {parent}=pair('/compatibility','?you=cancer&them=pisces');const before=parent.win.location.href;parent.message({source:'mtys-widget',type:'set-state',query:{you:'leo'}},'https://evil.example',{});parent.message({source:'mtys-widget',type:'set-state',query:{you:'leo'}},'https://ashsade22.github.io',{});assert.equal(parent.win.location.href,before)});
test('Cross-page navigation preserves valid routes and strips private parameters',()=>{const {parent,child}=pair('/compatibility','?you=cancer&them=pisces');let assigned;parent.win.location.assign=u=>assigned=u;let prevented=false;assert.equal(child.win.MTYSBridge.navigate({preventDefault(){prevented=true}},'https://ashley35031.wixsite.com/more-than-your-sun-4/know-your-chart?placement=moon&sign=leo&birth=private'),true);assert.ok(prevented);assert.equal(new URL(assigned).search,'?placement=moon&sign=leo')});
test('Standalone Back and Forward preserve explicit selections',()=>{const e=env('https://ashsade22.github.io/mtys-live-astrology-widget/know-your-chart-preview.html?placement=moon&sign=cancer');e.load('mtys-host-bridge.js');e.win.MTYSBridge.setRouteState({placement:'mercury',sign:'leo'});e.win.history.back();assert.equal(e.win.location.searchParams.get('sign'),'cancer');e.win.history.forward();assert.equal(e.win.location.searchParams.get('sign'),'leo')});
test('All permanent sign keys remain valid',()=>{const e=env('https://example.com/');const {proto,self}=compat(e);for(const s of signs)assert.equal(proto.validSign.call(self,s).key,s)});
