import test from 'node:test';import assert from 'node:assert/strict';import {transport,housing} from '../calculations.mjs';
const p={age:'23',region:'서울',mode:'버스·지하철',transport:'80000',rides:'40',renting:'월세 거주',rent:'500000'};
const a={registered:'yes',daily:'yes',fare:'low',offpeak:'0'};
test('교통 대체 혜택은 최댓값만 적용',()=>{const r=transport(p,a);assert.equal(r.monthly,55000);assert.equal(r.rows[0].saving,24000);assert.equal(transport({...p,transport:'100000'},a).monthly,75000)});
test('횟수 경계 및 미확인/범위 밖',()=>{assert.equal(transport({...p,rides:'14'},a).monthly,0);assert.equal(transport({...p,rides:'15'},a).monthly,55000);assert.equal(transport({...p,rides:'61'},a).monthly,null);assert.equal(transport(p,{}).monthly,null);assert.equal(transport({...p,region:'경기'},a).monthly,null)});
const h={birthYear:'2003',deposit:'10000000',income:'2500000',household:'1',assets:'30000000',car:'0',noHome:'yes',contract:'yes',family:'yes',exclusions:'yes'};
test('월세 선정 가정 금액과 실제 예상 합계 분리',()=>{const r=housing(p,h);assert.equal(r.conditionalMonthly,200000);assert.equal(r.monthly,null);assert.equal(housing({...p,rent:'150000'},h).conditionalMonthly,150000)});
test('월세 소득/자동차 경계 및 누락',()=>{assert.equal(housing(p,{...h,car:'25000000'}).status,'mismatch');assert.equal(housing(p,{...h,income:'1230834'}).status,'mismatch');assert.equal(housing(p,{...h,income:''}).status,'unknown')});

import {readFileSync}from'node:fs';
test('서버와 샘플 계산식 일치',()=>assert.equal(readFileSync('calculations.mjs','utf8'),readFileSync('public/calculations.js','utf8')));
