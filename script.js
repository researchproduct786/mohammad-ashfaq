/* Tribute for Mohammad Ashfaq — all behaviour. Images come from assets/manifest.js (add new ones there). */
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,MOB=innerWidth<820;
const M=Object.fromEntries((window.MANIFEST||[]).map(m=>[m.id,m]));
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};

/* ---------- images: <img data-img="id"> resolves through the manifest ---------- */
function fill(i){const m=M[i.dataset.img];if(!m){i.alt='Memory loading…';return}
  i.src=m.src;i.width=m.w;i.height=m.h;if(!i.alt)i.alt=m.alt;i.loading=i.closest('.hero')?'eager':'lazy';i.decoding='async'}
const mk=(id,lb)=>{const i=el('img');i.dataset.img=id;if(lb)i.dataset.lb=lb;fill(i);return i};
$$('img[data-img]').forEach(fill);

/* ---------- content ---------- */
const CHIPS=['Teacher','Explorer','Photographer','Poet','Philosophical mind','Experimenter','Organizer','Learner'];
$('#chips').append(...CHIPS.map(c=>el('li','',c)));

const NODES=[
['GALAXY','Galaxies made the world feel larger, and my questions larger with it.','Galaxy ke zikr ne soch ka dayra bara kar diya.'],
['MOON','Close enough to see, far enough to keep asking about.','Chaand — qareeb bhi, aur sawalon se bhara hua bhi.','moon'],
['SUN','The star we live by, and one more reason to ask how things work.','Sooraj ko dekh kar bhi sawal uthna seekha.','sun'],
['PLANETS','Worlds that follow rules, and rules can be understood.','Sayyaron ke peeche bhi qaanoon hain.'],
['SCIENCE','Why things behave the way they do.','Cheezein aisa kyun karti hain?'],
['QUESTIONS','You taught me that the universe is not just something to admire. It is something to question.','Aap ne mujhe sirf aasman dekhna nahi sikhaya — us ke peeche sawal dekhna sikhaya.']];
const ring=$('#ring'),ni=$('#nodeinfo');
NODES.forEach((n,i)=>{const a=(i/6)*6.283-1.57,b=el('button','',n[0]);b.style.left=50+41*Math.cos(a)+'%';b.style.top=50+41*Math.sin(a)+'%';
  b.onclick=()=>{$$('button',ring).forEach(x=>x.classList.remove('on'));b.classList.add('on');ni.innerHTML=`<p><b>${n[0]}</b></p><p>${n[1]}</p><p class="ru">${n[2]}</p>`;if(n[3]){const m=mk(n[3],'cur');m.style.cssText='width:100%;border-radius:14px;margin-top:.6em;max-height:240px;object-fit:cover';ni.append(m)}};
  ring.append(b)});

const LAB={'Voltage':'Voltage stopped being a word in a chapter. A power supply, wires and terminals made it something you could see at work.','Electricity':'Electricity was something you could wire up, switch on and watch.','Electrical engineering':'How circuits are planned, connected and controlled.','Mechanical engineering':'How parts are held, moved and mounted so a system stays together.','Chemical concepts':'How materials behave and interact — part of the same curiosity.','Experiments':'Try it, see what happens, change it.','Projects':'Models, circuits and a cooling system: built, not only read about.','Physical systems':'Things on a table that either work, or teach you why they don’t.'};
$('#labchips').append(...Object.keys(LAB).map(k=>{const li=el('li'),b=el('button','',k);b.onclick=()=>{$$('#labchips button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');$('#labinfo').textContent=LAB[k]};li.append(b);return li}));

/* ---------- water-cooling case study ---------- */
const STEPS=[['The problem','Hot June. No cold-water system.'],['The question','Can we build one ourselves?'],['The experiment','A pump, pipes and an aluminum block start to take shape.'],['The cooling core','Peltier modules, aluminum block, thermal paste, heatsinks and fans.'],['The control','A regulator for the pump, a pushbutton, and a temperature meter.'],['The system','A 12V supply — and everything connects.'],['The result','Water travels through the engineered cooling path. A prototype built from curiosity, components and experimentation.']];
const stepsEl=$('#steps');let stage=1;
function setStage(n){stage=n;$$('#sch .g').forEach(g=>g.classList.toggle('on',+g.dataset.s<=n));$$('.step',stepsEl).forEach(s=>s.classList.toggle('on',+s.dataset.s===n))}
STEPS.forEach((s,i)=>{const d=el('div','step',`<div class="glass"><h3>${s[0]}</h3><p>${s[1]}</p></div>`);d.dataset.s=i+1;stepsEl.append(d)});
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setStage(+e.target.dataset.s)}),{rootMargin:'-40% 0px -45% 0px'});
$$('.step',stepsEl).forEach(s=>so.observe(s));setStage(1);
const PARTS={
tank:['Two containers','Warm water goes in, cooled water comes out. No capacity is claimed.'],
pump:['12V DC pump','The pump moves water through the cooling path and is switched on with a pushbutton. From the parts information provided, it is a 12V 8W brushless pump.'],
block:['Aluminum cooling block (120 × 40 × 12 mm)','Water passes through the block while the thermoelectric modules draw heat out of it through their cold side.'],
tec:['3 × TEC1-12706 Peltier modules','When powered, a Peltier module gets cold on one face and hot on the other. The cold face removes heat from the water block; the hot face needs good heat removal. No final temperature or efficiency is claimed.'],
paste:['Thermal paste','Fills the tiny gaps between the modules and the block or heatsinks so heat crosses the surfaces more easily.'],
sink:['Heatsinks and fans','Heat leaving the hot side has to go somewhere. The heatsinks spread it and the fans push air across them to carry it away.'],
reg:['DC regulator','Controls the pump’s flow. Slower flow generally means longer contact with the cooling path; faster flow means less. No measured relationship is claimed.'],
btn:['Pushbutton','Switches the pump on.'],
meter:['Temperature meter','Used to observe the temperature around the cooling block. No readings are claimed here.'],
psu:['AC 220V → DC 12V, 10A, 120W supply','From the project description, it powers the Peltier modules, the fans and the temperature meter. The pump is controlled separately through the regulator and pushbutton.'],
frame:['Wooden frame','The parts are screwed onto a wooden frame, which keeps the experiment organized and supported.']};
const pl=$('#partlist'),pi=$('#partinfo');
function showPart(k){const p=PARTS[k];if(!p)return;pi.innerHTML=`<p><b>${p[0]}</b></p><p>${p[1]}</p>`;$$('button',pl).forEach(b=>b.classList.toggle('on',b.dataset.k===k))}
Object.entries(PARTS).forEach(([k,p])=>{const b=el('button','',p[0].split(' (')[0]);b.dataset.k=k;b.onclick=()=>showPart(k);pl.append(b)});
$('#sch').addEventListener('click',e=>{const g=e.target.closest('[data-part]');if(g)showPart(g.dataset.part)});

/* ---------- galleries ---------- */
const mason=$('#mason');
(window.MANIFEST||[]).filter(m=>m.dir==='teacher-photography').forEach(m=>{const f=el('figure','',`<figcaption>${m.alt}</figcaption>`);f.dataset.lb='ph';f.prepend(mk(m.id));mason.append(f)});
const CAL=[['muhammad','The name Muhammad, signed M. Ashfaq.'],['subhanallah','Subhan Allah.'],['alhamdulillah','Alhamdulillah.'],['ali-fatima','The names of Hazrat Ali and Hazrat Fatima.']];
$('#cal').append(...CAL.map(c=>{const f=el('figure','',`<figcaption>${c[1]}</figcaption>`);f.dataset.lb='cal';f.prepend(mk(c[0]));return f}));
$('#cls').append(...['group-wall','class-warm','row-drawing','thinking','colouring','drawing-sheet','trophy','medal','portrait-blue','gloves','portrait-boy','class-tall'].map(i=>mk(i,'cls')));

/* ---------- poetry (Urdu kept exactly as supplied) ---------- */
const P=[
{l:['زخم گھیرے ہوں تو تکلیف دیتے ہیں','لیکن یادیں گھیر بری ہوں تو جینے نہیں دیتے ہیں'],a:'محمد اشفاق'},
{l:['یہ اک اشارہ ہے آفات ناگہانی کا','کسی جگہ سے پرندوں کا کوچ کر جانا'],en:'Don’t trust the right thing done for the wrong reason.'},
{l:['یہاں زندہ زندہ کو بھول جاتا ہے','مرنے والوں کو کون یاد رکھتا ہے'],a:'اشفاق'},
{l:['چھیڑ کر جیسے گزر جاتی ہے دوشیزہ ہوا','🥀 دیر سے خاموش ہے گہرا سمندر اور میں']},
{l:['زمانہ کر نا سکا اُس کے قد کا اندازہ','وہ آسمان ہےاور سر جھکا کر ملتا ہے 🥀']}];
$('#poems').append(...P.map(p=>el('div','poem glass',`<div class="ur" lang="ur">${p.l.map(x=>`<span>${x}</span>`).join('')}${p.a?`<span style="font-size:.7em;color:#a9b2cf">${p.a}</span>`:''}</div>${p.en?`<p class="en">${p.en}</p>`:''}`)));

/* ---------- radial diagrams ---------- */
function radial(box,items,mid,spiral,onpick){
  let L='';const pts=items.map((_,i)=>{const a=spiral?i*2.4:(i/items.length)*6.283-1.57,r=spiral?16+i*1.9:41;return[50+r*Math.cos(a),50+r*Math.sin(a)]});
  pts.forEach(p=>L+=`<line x1="50" y1="50" x2="${p[0]}" y2="${p[1]}" pathLength="1"/>`);
  box.innerHTML=`<svg viewBox="0 0 100 100" aria-hidden="true">${L}</svg>`;
  const m=el('span','n mid',mid);m.style.cssText='left:50%;top:50%';box.append(m);
  items.forEach((it,i)=>{const b=el(onpick?'button':'span','n',it[0]);b.style.left=pts[i][0]+'%';b.style.top=pts[i][1]+'%';if(onpick)b.onclick=()=>{$$('.n',box).forEach(x=>x.classList.remove('on'));b.classList.add('on');onpick(it)};box.append(b)})}
radial($('#worlds'),['Science','Engineering','Biology','Psychology','Technology','AI','Photography','Philosophy','Poetry','Islam','Calligraphy','Exploration'].map(x=>[x]),'MOHAMMAD<br>ASHFAQ',false);
const ST=[['✨ Curiosity','Asking was never weakness. It was where everything began.','Sawal poochna kamzori nahi, shuruaat thi.'],['⚡ Electricity','Electricity was wires, a supply and something you could switch on.','Electricity sirf diagram nahi thi.'],['🔧 Engineering','Building something to see why it works.','Banane se samajh aata hai.'],['🧪 Chemistry','Materials behave, react and change — another thing to wonder about.','Cheezein andar se bhi badalti hain.'],['🧬 Biology','The human body is a system too.','Insaan ka jism bhi ek system hai.'],['🧠 Psychology','Behavior has reasons worth asking about.','Rawaiye ke peeche bhi wajah hoti hai.'],['🌌 Astronomy','Not only looking up, but asking why.','Aasman ko dekha bhi, us se sawal bhi kiye.'],['💻 Computers','A device that slowly turned into a possibility.','Computer ek possibility ban gaya.'],['🤖 AI','From asking how a cooling system works to asking how an AI system could work.','Cooling system se AI system tak ka sawal.'],['📷 Photography','Seeing is not the same as looking.','Dekhna aur nazar rakhna alag hain.'],['🕌 Faith','Knowledge also brings a person back to remembering their Lord.','Ilm Rab ki yaad se bhi jorta hai.'],['🖋️ Calligraphy','Beauty and knowledge in one stroke.','Husn aur ilm ek hi lakeer mein.'],['📖 Philosophy','A better question travels further than an answer.','Behtar sawal door tak le jaata hai.'],['🥀 Poetry','Reading between the lines.','Lafzon ke darmiyan parhna.'],['🌍 Exploration','A curious mind does not stay in one room.','Curious zehan ek kamray mein nahi rehta.'],['🚀 Experimentation','Try, break, rebuild.','Try karo, toot-ne do, phir banao.']];
radial($('#const'),ST,'A WAY OF<br>THINKING',true,it=>{$('#constmsg').innerHTML=`<p><b>${it[0]}</b></p><p>${it[1]}</p><p class="ru">${it[2]}</p>`});

/* ---------- lightbox (grouped by data-lb) ---------- */
const lb=$('#lb'),lbi=$('#lbi'),lbc=$('#lbc');let grp=[],gi=0,last=null;
const imgOf=n=>n.tagName==='IMG'?n:$('img',n);
function show(){const i=imgOf(grp[gi]);lbi.src=i.currentSrc||i.src;lbi.alt=i.alt;const f=grp[gi].tagName==='IMG'?grp[gi].closest('figure'):grp[gi];const c=f&&$('figcaption',f);lbc.textContent=c?c.textContent:i.alt}
function open(n){last=n;grp=$$(`[data-lb="${n.dataset.lb}"]`);gi=grp.indexOf(n);show();lb.hidden=false;document.body.classList.add('lock');$('#lbx').focus()}
function shut(){lb.hidden=true;document.body.classList.remove('lock');last&&imgOf(last).focus&&imgOf(last).focus()}
const go=d=>{gi=(gi+d+grp.length)%grp.length;show()};
document.addEventListener('click',e=>{const t=e.target.closest('[data-lb]');if(t&&!t.closest('#lb'))open(t)});
$('#lbx').onclick=shut;$('#lbp').onclick=()=>go(-1);$('#lbn').onclick=()=>go(1);lb.onclick=e=>{if(e.target===lb)shut()};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')shut();if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)go(d<0?1:-1)});

/* ---------- starfield ---------- */
const cv=$('#stars'),cx=cv.getContext('2d');let W,H,D,S=[];
function size(){D=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*D;H=cv.height=innerHeight*D;S=Array.from({length:MOB?90:220},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.3+.3)*D,p:Math.random()*6.28,s:.4+Math.random()*1.6,z:Math.random()}));draw(0)}
function draw(t){cx.clearRect(0,0,W,H);for(const s of S){const y=((s.y-scrollY*.1*(s.z+.2)*D)%H+H)%H,a=.35+.65*Math.abs(Math.sin(t/1000*s.s+s.p));cx.fillStyle=`rgba(215,226,255,${a})`;cx.beginPath();cx.arc(s.x,y,s.r,0,6.283);cx.fill();if(s.r>1.5*D){cx.fillStyle=`rgba(140,170,255,${a*.1})`;cx.beginPath();cx.arc(s.x,y,s.r*4,0,6.283);cx.fill()}}}
let raf;function loop(t){draw(t);raf=requestAnimationFrame(loop)}
function start(){cancelAnimationFrame(raf);if(!RM&&!document.hidden)raf=requestAnimationFrame(loop)}
addEventListener('resize',()=>{size();});document.addEventListener('visibilitychange',start);size();start();
addEventListener('scroll',()=>{if(RM)draw(0)},{passive:true});

/* ---------- small network canvases (run only while visible) ---------- */
function net(c){const x=c.getContext('2d');let w,h,N,run=false,vis=false;
  const sz=()=>{w=c.width=c.clientWidth||300;h=c.height=c.clientHeight||200;N=Array.from({length:MOB?20:36},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}))};
  const f=()=>{if(!vis){run=false;return}x.clearRect(0,0,w,h);N.forEach(n=>{n.x=(n.x+n.vx+w)%w;n.y=(n.y+n.vy+h)%h});
    N.forEach((a,i)=>{N.slice(i+1).forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<h*.6){x.strokeStyle=`rgba(127,227,255,${.35*(1-d/(h*.6))})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}});x.fillStyle='#bfe9ff';x.beginPath();x.arc(a.x,a.y,2,0,6.283);x.fill()});
    if(!RM)requestAnimationFrame(f);else run=false};
  new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis&&!run){run=true;f()}}).observe(c);addEventListener('resize',sz);sz()}
$$('#net,#net2').forEach(net);

/* ---------- reveal, nav, mood, progress ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
$$('.rv,.lab,.dna,.radial,.poem,.bridge,.circ').forEach(x=>io.observe(x));
const nl=$('#navlist'),secs=$$('section[data-nav]');
secs.forEach(s=>{const li=el('li','',`<a href="#${s.id}">${s.dataset.nav}</a>`);nl.append(li)});
const so2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.body.dataset.mood=e.target.dataset.mood||'astro';$$('a',nl).forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));const a=$('a.on',nl);a&&a.scrollIntoView({inline:'center',block:'nearest'})}}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>so2.observe(s));
$('#menu').onclick=()=>{const n=$('#nav'),o=n.classList.toggle('open');$('#menu').setAttribute('aria-expanded',o)};
nl.addEventListener('click',e=>{if(e.target.closest('a'))$('#nav').classList.remove('open')});
let tick=false;addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{$('#bar').style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`;tick=false})},{passive:true});

/* ---------- intro ---------- */
const intro=$('#intro'),il=$('#il'),enter=$('#enter');let tm=[],done=false;const k=RM?.4:1;
const sleep=ms=>new Promise(r=>tm.push(setTimeout(r,ms*k)));
const L=['Some teachers teach subjects.<br>Some teachers teach you how to see the world.','This is for the one who taught me to explore.','Mohammad Ashfaq','Happy Teacher’s Day, Sir. ✨'];
async function play(){done=false;tm=[];document.body.classList.add('lock');enter.hidden=true;intro.classList.remove('planet');await sleep(500);intro.classList.add('planet');
  for(let i=0;i<L.length&&!done;i++){il.className='il'+(i==2?' name':'');il.innerHTML=L[i];await sleep(80);il.classList.add('on');await sleep(i==3?1600:2800);if(i<3){il.classList.remove('on');await sleep(900)}}
  if(!done)enter.hidden=false}
function close(){done=true;tm.forEach(clearTimeout);intro.classList.add('out');document.body.classList.remove('lock');setTimeout(()=>{if(done)intro.style.display='none'},1300)}
$('#skip').onclick=close;enter.onclick=close;intro.addEventListener('wheel',()=>{if(!enter.hidden)close()},{passive:true});
$('#replay').onclick=()=>{scrollTo(0,0);intro.style.display='grid';intro.classList.remove('out');play()};
$('#share').onclick=async e=>{const d={title:document.title,text:'A Teacher’s Day tribute for Mohammad Ashfaq, by Bilal.',url:location.href};
  try{if(navigator.share)await navigator.share(d);else{await navigator.clipboard.writeText(d.url);e.target.textContent='Link copied ✓'}}catch(_){}};
if(location.hash&&location.hash!=='#top'){intro.style.display='none';document.body.classList.remove('lock')}else play();
})();
