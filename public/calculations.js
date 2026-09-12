export const CHECKED='2026-09-12';
export const SOURCES={housing:'https://housing.seoul.go.kr/site/main/content/sh01_060513',transport:'https://www.shinhancard.com/pconts/html/card/micro/k_pass_micro.html',kpass:'https://main.kotsa.or.kr/portal/contents.do?menuCode=01080300'};
const num=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v))?Number(v):null;
const won=n=>Math.round(n).toLocaleString('ko-KR')+'원';
export function transport(p={},a={}){
 const cost=num(p.transport),rides=num(p.rides),age=num(p.age);const missing=[];
 if(cost===null||cost<0)missing.push('월 교통비');if(rides===null||rides<0)missing.push('월 이용 횟수');if(age===null)missing.push('만 나이');if(!p.region)missing.push('거주 지역');
 const base={kind:'transport',checked:CHECKED,source:SOURCES.transport,monthly:null,title:'교통비 예상 환급',missing,assumptions:[],rows:[]};
 if(missing.length)return {...base,status:'unknown',message:missing.join(', ')+'를 알려주면 계산할 수 있어요.'};
 if(p.region!=='서울'||age<19||age>34)return {...base,status:'scope',message:'이번 계산은 서울에 거주하는 만 19~34세 일반 청년의 2026년 9월 이용분을 지원해요. 다른 지역·우대유형은 공식 안내에서 확인해주세요.'};
 if(p.mode==='택시·자가용'||p.mode==='자차'||p.mode==='도보·자전거')return {...base,status:'excluded',monthly:0,message:'입력한 이동 수단은 K-패스 환급 대상 대중교통이 아니에요.'};
 if(!p.mode)return {...base,status:'unknown',missing:['주요 교통수단'],message:'버스·지하철 등 이용 수단을 알려주세요.'};
 if(rides<15)return {...base,status:'below',monthly:0,message:'월 15회 미만이므로 이 계산에서는 환급액이 0원이에요. 가입 첫 달 예외는 계산하지 않아요.'};
 if(rides>60||cost>200000)return {...base,status:'scope',message:'60회 초과·20만원 초과는 실제 승차별 내역이 필요해요. 부정확한 평균 환급액을 만들지 않을게요.'};
 if(a.registered!=='yes'||a.daily!=='yes'||!['low','high'].includes(a.fare))return {...base,status:'unknown',missing:['카드·회원 등록','하루 2회 이내 이용','1회 운임 구분'],message:'회원·카드 등록 여부, 하루 이용 횟수와 1회 운임 조건을 먼저 확인해주세요.'};
 const off=num(a.offpeak);if(off===null||off<0||off>cost)return {...base,status:'unknown',missing:['시차 시간대 이용금액'],message:'시차 시간대 이용금액은 0원부터 월 교통비 사이로 입력해주세요.'};
 const basic=Math.floor((cost-off)*.3+off*.6),threshold=a.fare==='low'?25000:45000,flat=Math.max(0,cost-threshold),monthly=Math.max(basic,flat);
 return {...base,status:'estimated',monthly,message:`입력 조건이라면 2026년 9월 예상 환급은 ${won(monthly)}예요. ${basic>=flat?'기본형':'모두의 카드 '+(a.fare==='low'?'일반형':'플러스형')} 계산이 유리해요. 실제 지급은 등록 상태와 승인된 이용 내역에 따라 달라져요.`,rows:[{label:'K-패스 기본형',saving:basic,cost:cost-basic,formula:`(${cost} − ${off}) × 30% + ${off} × 60%`},{label:'모두의 카드 '+(a.fare==='low'?'일반형':'플러스형'),saving:flat,cost:cost-flat,formula:`max(0, ${cost} − ${threshold})`}],assumptions:['2026.04.01~09.30 한시 상향 기준, 9월분 시뮬레이션','서울 만 19~34세 일반 청년, 월 15~60회·20만원 이하, 하루 2회 이내','1회 운임이 전부 3천원 미만이면 일반형; 3천원 이상 포함은 플러스형만 비교하는 보수적 추정','시차 시간: 05:30~06:30 / 09~10시 / 16~17시 / 19~20시','혜택은 최댓값 한 개만 적용. 대체 혜택 중복 합산 없음']};
}
export function housing(p={},a={}){
 const rent=num(p.rent),deposit=num(a.deposit),income=num(a.income),household=num(a.household),birth=num(a.birthYear),assets=num(a.assets),car=num(a.car);
 const base={kind:'housing',title:'서울시 청년월세지원',checked:CHECKED,source:SOURCES.housing,monthly:null,conditionalMonthly:null,status:'unknown',missing:[],checks:[],assumptions:['2026년 공고 기준 자가진단. 실제 자격은 기관 심사 및 추첨으로 결정','2026년 접수는 5월 19일 종료. 현재 새로 신청해 받을 금액으로 합산하지 않음','월 최대 20만원, 최대 12개월. 관리비는 지원 금액에서 제외']};
 const tests=[['서울 월세 거주',p.region&&p.renting?p.region==='서울'&&p.renting==='월세 거주':null],['2026년 기본 출생연도 범위',birth===null?null:birth>=1986&&birth<=2007],['무주택',a.noHome? a.noHome==='yes':null],['주민등록 및 신청인 임대차계약',a.contract? a.contract==='yes':null],['지원 대상 가구 유형 확인',a.family? a.family==='yes':null],['보증금·월세',deposit===null||rent===null?null:deposit>=0&&deposit<=80000000&&rent>=0&&(rent<=600000||rent+deposit*.045/12<=900000)],['일반재산 1억3천만원 이하',assets===null?null:assets>=0&&assets<=130000000],['자동차 2천5백만원 미만',car===null?null:car>=0&&car<25000000],['중복지원·공공임대·부모 임대인 등 제외사유 없음',a.exclusions? a.exclusions==='yes':null]];
 const bounds={1:[1230834,3846357],2:[2015660,6298938],3:[2572337,8038554],4:[3117474,9742107],5:[3627225,11335079],6:[4106857,12833928]};
 tests.push(['건강보험 가구 기준 소득 48% 초과~150% 이하',income===null||!bounds[household]?null:income>bounds[household][0]&&income<=bounds[household][1]]);
 base.checks=tests.map(([label,ok])=>({label,ok}));base.missing=tests.filter(x=>x[1]===null).map(x=>x[0]);
 if(tests.some(x=>x[1]===false))return {...base,status:'mismatch',message:'입력한 조건 중 기본 기준과 맞지 않는 항목이 있어요. 군 복무에 따른 연령 예외 등은 공식 안내에서 별도로 확인해주세요.'};
 if(base.missing.length)return {...base,message:'아직 '+base.missing.length+'개 조건이 남았어요. 모르는 조건을 채우기 전에는 절약액을 확정하지 않을게요.'};
 const amount=Math.min(rent,200000);return {...base,status:'conditional',conditionalMonthly:amount,conditionalTotal:amount*12,message:`입력한 기본 조건은 기준 범위 안이에요. 선정된다는 가정에서는 월 ${won(amount)}, 최대 12개월 ${won(amount*12)}의 주거비 부담이 줄어요. 다만 2026년 접수는 종료됐고 기관 심사·선정이 필요하므로 현재 예상 절약액 합계에는 포함하지 않아요.`};
}
export function diagnose(s={}){const t=transport(s.profile,s.transportAnswers),h=housing(s.profile,s.housingAnswers);return {transport:t,housing:h,estimatedMonthly:t.monthly??null,checked:CHECKED}}
