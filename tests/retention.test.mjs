import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { selectedCandidates, mergeCompany } from '../scripts/retention.mjs';
const oldF = {acc:'0000000999-25-000001',form:'10-K',filed:'2025-02-01',period:'2024-12-31',accepted:'2025-02-01T12:00:00.000Z',items:'',doc:'old/report.htm',desc:'Annual report'};
const newF = {...oldF,acc:'0000000999-26-000002',form:'8-K',filed:'2026-10-16',period:'2026-10-15',accepted:'2026-10-16T12:00:00.000Z',doc:'new.htm'};
const prior = () => ({cik:'0000000001',ticker:'ONE',tickers:['ONE'],rank:2,name:'One',fetchedAt:'2026-10-15T12:00:00.000Z',counts45:{'10-K':1},filings:[structuredClone(oldF)]});
const fresh = () => ({...prior(),rank:99,fetchedAt:'2026-10-16T12:01:00.000Z',counts45:{'8-K':1},filings:[structuredClone(newF)]});
test('selected universe survives reordered/absent/new ticker rows',()=>{
 const before={companies:[prior()]};
 assert.deepEqual(selectedCandidates(before,[{cik_str:7,ticker:'NEW'}]),[{cik_str:'0000000001',ticker:'ONE',selectedRank:2}]);
 assert.deepEqual(selectedCandidates(before,[]),selectedCandidates(before,null));
});
test('bootstrap deduplicates CIKs without changing ticker source order',()=>{
 assert.deepEqual(selectedCandidates(null,[{cik_str:1,ticker:'A'},{cik_str:1,ticker:'B'},{cik_str:2,ticker:'C'}],1),[{cik_str:1,ticker:'A'}]);
});
test('empty/malformed prior selection does not silently reselect',()=>assert.throws(()=>selectedCandidates({companies:[]},[]),/prior/));
test('expired historical accession/document remains alongside genuine new records',()=>{
 const out=mergeCompany(prior(),fresh());
 assert.deepEqual(out.filings,[newF,oldF]);assert.equal(out.rank,2);assert.equal(out.fetchedAt,fresh().fetchedAt);assert.deepEqual(out.counts45,{'8-K':1});
});
test('historical same-accession correction cannot erase old URL/period/source timestamp',()=>{
 const fetched=fresh();fetched.filings.push({...oldF,doc:'replacement.htm',period:'2025-01-01',accepted:'2026-10-16T01:00:00.000Z'});
 assert.deepEqual(mergeCompany(prior(),fetched).filings.find(f=>f.acc===oldF.acc),oldF);
});
test('empty recent block preserves complete archive, no fake filings',()=>{
 const fetched=fresh();fetched.filings=[];assert.deepEqual(mergeCompany(prior(),fetched).filings,[oldF]);
});
test('missing ticker identity is review failure, not inferred delisting or stale status',()=>{
 const fetched=fresh();fetched.tickers=[];
 assert.throws(()=>mergeCompany(prior(),fetched),e=>e.retention===true && /review/.test(e.message));
});
test('CIK and selected ticker migrations fail closed',()=>{
 assert.throws(()=>mergeCompany(prior(),{...fresh(),cik:'0000000002'}),/review/);
 assert.throws(()=>mergeCompany(prior(),{...fresh(),ticker:'TWO'}),/review/);
});
test('new aliases do not rewrite the previously selected ticker universe',()=>{
 assert.deepEqual(mergeCompany(prior(),{...fresh(),tickers:['ONE','ONE-B']}).tickers,['ONE']);
});
test('merge is pure, detached, deterministic and idempotent',()=>{
 const old=prior(),next=fresh(),copy=structuredClone({old,next});const out=mergeCompany(old,next);
 assert.deepEqual({old,next},copy);assert.deepEqual(mergeCompany(out,next),out);
 out.filings[0].doc='mutation';out.tickers.push('MUTATED');assert.deepEqual({old,next},copy);
});
test('duplicates are rejected rather than silently replacing provenance',()=>{
 assert.throws(()=>mergeCompany(prior(),{...fresh(),filings:[newF,newF]}),/Duplicate/);
});
test('real snapshot retains every accession URL and selected identity without data writes',async()=>{
 const raw=JSON.parse(await readFile(new URL('../src/data/companies.json',import.meta.url),'utf8'));
 const selection=selectedCandidates(raw,[]);assert.equal(selection.length,raw.companies.length);
 for(const c of raw.companies){const out=mergeCompany(c,{...c,filings:c.filings.slice(0,1)});assert.equal(out.filings.length,c.filings.length);for(const f of c.filings)assert.deepEqual(out.filings.find(x=>x.acc===f.acc),f);assert.equal(out.cik,c.cik);assert.equal(out.ticker,c.ticker);}
});
