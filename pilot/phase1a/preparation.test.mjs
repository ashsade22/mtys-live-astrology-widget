import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const source=readFileSync(new URL('../../know-your-chart-content.js',import.meta.url));
const {placements,signs}=await import('data:text/javascript;base64,'+source.toString('base64'));
const contract=JSON.parse(readFileSync(new URL('./journey-state.proposed.json',import.meta.url)));
const fixtures=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url)));
for(const placement of ['moon','mercury']) test(placement+' existing content contains all twelve complete readings',()=>{
 assert.equal(Object.keys(placements[placement].signs).length,12);
 assert.equal(placements[placement].labels.length,3);
 for(const sign of signs){const rows=placements[placement].signs[sign]; assert.equal(rows.length,3); assert.ok(rows.every(x=>typeof x==='string'&&x.trim().length>0));}
});
test('All 144 input pairs have both source readings; paired synthesis is not asserted',()=>{
 let pairs=0;for(const a of signs)for(const b of signs){assert.ok(placements.moon.signs[a]);assert.ok(placements.mercury.signs[b]);pairs++;}assert.equal(pairs,144);
});
test('Content file remains identical to verified production baseline',()=>{
 const hash=createHash('sha1').update(Buffer.concat([Buffer.from('blob '+source.length+'\0'),source])).digest('hex');
 assert.equal(hash,'a9bb553b59e4b8a9e6abcb7c947b1437c622dc26');
});
test('Preparation fixtures have unique cases and explicit expected behavior',()=>{
 assert.equal(new Set(fixtures.cases.map(x=>x.id)).size,20);
 for(const c of fixtures.cases){assert.ok(c.input&&typeof c.expected==='string'&&c.expected.length>0);}
});
test('Proposed scope excludes calculated charts and new public query keys',()=>{
 assert.deepEqual(contract.selection.basis,['selected_sign']);assert.deepEqual(contract.transport.newQueryKeys,[]);
 assert.equal(contract.transport.currentBridgeSupportsCombinedJourney,false);
});
