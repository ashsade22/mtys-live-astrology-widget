const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const source = fs.readFileSync('mtys-live-astrology.js','utf8');
const dates = source.slice(source.indexOf('function k('), source.indexOf('function l('));
const methods = source.slice(source.indexOf('bestWeekly(){'), source.indexOf('todayPanel(){')) + source.slice(source.indexOf('weekPanel(){'), source.indexOf('skyPanel(){'));
function harness(now) {
  const RealDate = Date;
  class ClockDate extends RealDate { constructor(...args){super(...(args.length ? args : [now]));} }
  return vm.runInNewContext(`const x='America/Los_Angeles'; ${dates}
    const l=v=>String(v||'').slice(0,10), s=v=>String(v), g=l;
    class Widget { ${methods} card(){return ''} emptyState(s){return s} }
    ({Widget,P})`, {Date:ClockDate,Intl});
}
for (const [at,start,end] of [
 ['2026-10-19T06:59:59Z','2026-10-12','2026-10-18'],
 ['2026-10-19T07:00:00Z','2026-10-19','2026-10-25'],
 ['2026-11-02T07:59:59Z','2026-10-26','2026-11-01'],
 ['2026-11-02T08:00:00Z','2026-11-02','2026-11-08']
]) test(`Pacific Monday rollover ${at}`,()=>{
 const {P}=harness(at); const value=P(); assert.equal(value.start,start); assert.equal(value.end,end);
});
test('stale week remains dated and explicitly unavailable as current',()=>{
 const {Widget}=harness('2026-10-20T03:00:00Z');const w=new Widget();w.signKey='aries';
 w.data={weekly:[{signKey:'aries',status:'active',weekStart:'2026-10-05',weekEnd:'2026-10-11',weeklyTheme:'Archive'}]};
 const html=w.weekPanel();assert.match(html,/current week is not available/);assert.match(html,/Latest available reading/);assert.doesNotMatch(html,/>This week</);assert.match(html,/2026-10-05/);
});
test('all 12 signs select the eligible current week instead of stale fallback',()=>{
 const {Widget}=harness('2026-10-20T03:00:00Z'); const w=new Widget();
 const signs=['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
 w.data={weekly:signs.flatMap(signKey=>[
 {signKey,status:'active',weekStart:'2026-10-05',weekEnd:'2026-10-11'},
 {signKey,status:'active',weekStart:'2026-10-19',weekEnd:'2026-10-25'}])};
 for(const sign of signs){w.signKey=sign;assert.equal(w.bestWeekly().weekStart,'2026-10-19');assert.match(w.weekPanel(),/>This week</);assert.doesNotMatch(w.weekPanel(),/not available/);}
});
test('missing week keeps the existing preparation message',()=>{
 const {Widget}=harness('2026-10-20T03:00:00Z');const w=new Widget();w.signKey='aries';w.data={weekly:[]};assert.match(w.weekPanel(),/being prepared/);
});
test('archived current rows are not treated as eligible',()=>{
 const {Widget}=harness('2026-10-20T03:00:00Z');const w=new Widget();w.signKey='aries';w.data={weekly:[{signKey:'aries',status:'archived',weekStart:'2026-10-19',weekEnd:'2026-10-25'}]};assert.equal(w.bestWeekly(),undefined);
});
