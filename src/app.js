/* ---------- HELPERS ---------- */
const NS='http://www.w3.org/2000/svg';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* Japanese quoted inside Indonesian text is set in the textbook face and marked lang="ja" */
const JA=/[ぁ-ゖァ-ヺー一-鿿]+/g;
const jp=s=>esc(s).replace(JA,m=>`<b class="ki" lang="ja">${m}</b>`);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,n)=>shuffle(a).slice(0,n);
const fmt=s=>{s=Math.max(0,Math.round(s));const h=s/3600|0,m=(s%3600)/60|0,x=s%60;return(h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')};
const dur=s=>{s=Math.max(0,Math.round(s));const m=s/60|0,x=s%60;return m?`${m} menit ${x} detik`:`${x} detik`};
const hhmm=min=>(min/60|0)+':'+String(min%60).padStart(2,'0');
const at=ts=>'pukul '+new Date(ts).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});

/* ---------- ITEMS ---------- */
const BASE=[];ROWS.forEach(r=>r.items.forEach(([k,ro,col,m])=>BASE.push({k,r:ro,type:'base',row:r.id,col,m})));
const ROW_OF={};BASE.forEach(b=>ROW_OF[b.k]=b.row);
const rowOf=ch=>{let c=[...ch][0];c=SMALL[c]||c;c=c.normalize('NFD')[0];return ROW_OF[c]||null};
const col=row=>row?`var(--r-${row})`:'var(--primary)';
/* each kana of a word takes the colour of its own row */
const ck=k=>[...k].map(ch=>{const r=rowOf(ch);return r?`<span class="cink" style="--c:var(--r-${r})">${ch}</span>`:ch}).join('');
const DAKU=DAKU_LIST.map(k=>({k,type:'daku',row:rowOf(k),m:DAKU_NOTE}));
const COMBO=COMBO_LIST.map(k=>({k,type:'combo',row:rowOf(k),m:comboNote(k)}));
const FOREIGN=FOREIGN_LIST.map(([k,rare])=>({k,type:'foreign',row:rowOf(k),rare:!!rare,m:foreignNote(k)}));
const WORDS=WORD_LIST.map(([k,g,core])=>({k,type:'word',row:null,g,core:!!core}));
const BY={};[...BASE,...DAKU,...COMBO,...FOREIGN,...WORDS].forEach(it=>{if(!BY[it.k])BY[it.k]=it});
const GRID=[];ROWS.forEach(r=>{const row=[null,null,null,null,null];r.items.forEach(i=>{if(i[2]!=null)row[i[2]]=i[0]});GRID.push(row);const tail=r.items.filter(i=>i[2]==null).map(i=>i[0]);if(tail.length)GRID.push([tail[0],null,null,null,null])});
const ORDER=GRID.flat().filter(Boolean);
const isWide=it=>[...it.k].length>1;

/* ---------- ROMAJI (Hepburn, generated from the kana so every item follows one convention) ---------- */
const K1={},DG={};
('ア a イ i ウ u エ e オ o カ ka キ ki ク ku ケ ke コ ko サ sa シ shi ス su セ se ソ so タ ta チ chi ツ tsu テ te ト to '+
 'ナ na ニ ni ヌ nu ネ ne ノ no ハ ha ヒ hi フ fu ヘ he ホ ho マ ma ミ mi ム mu メ me モ mo ヤ ya ユ yu ヨ yo ラ ra リ ri ル ru レ re ロ ro '+
 'ワ wa ヲ wo ン n ガ ga ギ gi グ gu ゲ ge ゴ go ザ za ジ ji ズ zu ゼ ze ゾ zo ダ da ヂ ji ヅ zu デ de ド do バ ba ビ bi ブ bu ベ be ボ bo '+
 'パ pa ピ pi プ pu ペ pe ポ po ヴ vu ァ a ィ i ゥ u ェ e ォ o ャ ya ュ yu ョ yo').split(' ').forEach((v,i,a)=>{if(i%2===0)K1[v]=a[i+1]});
[['キ','k'],['シ','sh'],['チ','ch'],['ニ','n'],['ヒ','h'],['ミ','m'],['リ','r'],['ギ','g'],['ジ','j'],['ビ','b'],['ピ','p']].forEach(([k,c])=>{
  const y=(c==='sh'||c==='ch'||c==='j')?'':'y';DG[k+'ャ']=c+y+'a';DG[k+'ュ']=c+y+'u';DG[k+'ョ']=c+y+'o'});
('ティ ti ディ di トゥ tu ドゥ du デュ dyu テュ tyu ファ fa フィ fi フェ fe フォ fo フュ fyu ウィ wi ウェ we ウォ wo '+
 'シェ she ジェ je チェ che ヴァ va ヴィ vi ヴェ ve ヴォ vo ツァ tsa ツェ tse ツォ tso イェ ye クァ kwa クォ kwo').split(' ').forEach((v,i,a)=>{if(i%2===0)DG[v]=a[i+1]});
const MAC={a:'ā',i:'ī',u:'ū',e:'ē',o:'ō'};
const toKata=s=>[...s].map(c=>{const n=c.codePointAt(0);return n>=0x3041&&n<=0x3096?String.fromCodePoint(n+0x60):c}).join('');
function k2r(s,mac){const c=[...s];let o='';
  const syl=i=>{if(i>=c.length)return null;const two=c[i]+(c[i+1]||'');if(DG[two])return{r:DG[two],n:2};if(K1[c[i]]!=null)return{r:K1[c[i]],n:1};return null};
  for(let i=0;i<c.length;){const ch=c[i];
    if(ch==='ッ'){const nx=syl(i+1);if(nx)o+=nx.r.startsWith('ch')?'t':nx.r[0];i++;continue}
    if(ch==='ー'){const v=o.slice(-1);if(MAC[v])o=mac?o.slice(0,-1)+MAC[v]:o+v;i++;continue}
    if(ch==='ン'){const nx=syl(i+1);o+=(nx&&/^[aiueoy]/.test(nx.r))?"n'":'n';i++;continue}
    const sy=syl(i);if(sy){o+=sy.r;i+=sy.n}else{o+=ch;i++}}
  return o}
const plainRom=k=>k2r(toKata(k),false);
function romaji(k,style){style=style||S.rom;
  if(APP.id==='kata')return k2r(k,style==='macron');
  const r=plainRom(k);
  if(style==='macron')return r.replace(/ou|oo/g,'ō').replace(/uu/g,'ū').replace(/aa/g,'ā').replace(/ee/g,'ē');
  if(style==='oo')return r.replace(/ou/g,'oo').replace(/ei/g,'ee');
  return r}
const romOf=it=>it.type==='base'?it.r:romaji(it.k);
const qual=it=>QUAL[it.k]||'';
/* the rule a word exercises, so the note under a word is about that word */
function wordNote(it){const k=it.k,r=plainRom(k),n=[],kata=APP.id==='kata',sm=kata?'ッ':'っ',nn=kata?'ン':'ん';
  if(/nn/.test(r))n.push(`Romaji nn ditulis ${nn} lalu huruf baris n, tanpa ${sm}.`);
  if(k.includes(sm))n.push(`Konsonan ganda ditulis dengan ${sm} kecil.`);
  if(kata){if(k.includes('ー'))n.push('Vokal panjang ditulis dengan ー.')}
  else{if(/oo/.test(r))n.push('Pengecualian: o panjang di kata ini ditulis おお.');
    else if(/ee/.test(r))n.push('Pengecualian: e panjang di kata ini ditulis ええ.');
    if(/ou/.test(r))n.push('Bunyi o panjang ditulis dengan う.');
    if(/ei/.test(r))n.push('Bunyi e panjang ditulis dengan い.');
    if(/aa|ii|uu/.test(r))n.push('Vokal panjang ditulis dengan menambah huruf vokalnya.')}
  const sms=[...new Set([...k].filter(c=>SMALL[c]&&c!==sm))];if(sms.length)n.push(`${sms.join(' ')} ditulis kecil.`);
  if(/ng/.test(r))n.push(`Romaji ng ditulis ${nn} lalu huruf baris g.`);
  if(/n[bpm]/.test(r))n.push(`Sebagian buku menulis m sebelum b, p, m. Hurufnya tetap ${nn}.`);
  return n.slice(0,2).join(' ')}
const noteOf=it=>it.type==='word'?wordNote(it):it.m;

/* ---------- STATE ---------- */
const KEY=APP.key;
const fresh=()=>({cards:{},learned:{},tables:[],tests:[],start:null,streak:0,rom:APP.romDefault,paper:false});
let S=fresh();
try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(raw&&typeof raw==='object'&&!Array.isArray(raw))S=Object.assign(S,raw)}catch(e){}
/* stored data is never trusted: wrong types would break rendering, and values reach innerHTML */
(function sanitize(){const o=x=>x&&typeof x==='object'&&!Array.isArray(x),n=x=>Number.isFinite(+x)?+x:0;
  if(!o(S.cards))S.cards={};if(!o(S.learned))S.learned={};
  S.tables=(Array.isArray(S.tables)?S.tables:[]).filter(o).map(t=>({at:n(t.at),score:n(t.score),time:n(t.time)}));
  S.tests=(Array.isArray(S.tests)?S.tests:[]).filter(o).map(t=>({at:n(t.at),score:n(t.score),total:n(t.total)||20,time:n(t.time)}));
  S.streak=n(S.streak);S.start=S.start?n(S.start):null;S.paper=!!S.paper;
  if(S.macron===true)S.rom='macron';delete S.macron;
  if(!APP.romStyles.some(r=>r[0]===S.rom))S.rom=APP.romDefault;
  for(const k in S.cards){const c=S.cards[k];if(!o(c)||!BY[k]){delete S.cards[k];continue}c.b=Math.max(0,Math.min(5,n(c.b)|0));c.c=n(c.c);c.w=n(c.w)}
  for(const k in S.learned)if(!ROWS.some(r=>r.id===k))delete S.learned[k]})();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function card(k){return S.cards[k]||(S.cards[k]={b:0,c:0,w:0})}
function grade(k,ok){const c=card(k);if(ok){c.b=Math.min(c.b+1,5);c.c++}else{c.b=0;c.w++}save()}
const weakOf=k=>{const c=S.cards[k];return!!c&&c.w>0&&c.b<2};
/* a table or test in progress survives a reload or the app being closed */
const RUN={save(kind,o){try{localStorage.setItem(KEY+'.run.'+kind,JSON.stringify(o))}catch(e){}},
  load(kind){try{return JSON.parse(localStorage.getItem(KEY+'.run.'+kind)||'null')}catch(e){return null}},
  clear(kind){try{localStorage.removeItem(KEY+'.run.'+kind)}catch(e){}}};

/* ---------- KAKIJUN (stroke order) ---------- */
const CELL=109;
/* opts: anim (draw strokes in order), nums (numbered start points), upto/hl (cumulative frame for a strip) */
function kanaSVG(str,o={}){
  const chars=[...str];let total=0;chars.forEach(ch=>{if(KVG[ch])total+=KVG[ch].p.length});
  const step=Math.min(0.45,3/Math.max(1,total));let x=0,k=0,body='';
  for(const ch of chars){const d=KVG[ch];if(!d){x+=CELL;continue}
    d.p.forEach((p,j)=>{if(o.upto!=null&&j>o.upto)return;const cls=o.hl!=null?(j===o.hl?'':'done'):'';
      body+=`<path d="${p}" pathLength="1"${x?` transform="translate(${x} 0)"`:''}${cls?` class="${cls}"`:''}${o.anim?` style="animation-delay:${(k*step).toFixed(2)}s"`:''}/>`;k++});
    if(o.nums)d.n.forEach((n,j)=>{body+=`<g class="num" transform="translate(${x+n[0]+2.6} ${n[1]-2.6})"><circle r="5"/><text>${j+1}</text></g>`});
    x+=CELL}
  return`<svg class="kvg${o.anim?' anim':''}" viewBox="0 0 ${x||CELL} ${CELL}" aria-hidden="true">${body}</svg>`;
}
function kakijunStrip(ch){const d=KVG[ch];if(!d)return'';return`<div class="strip" role="img" aria-label="Urutan goresan, ${d.p.length} langkah">${d.p.map((_,j)=>`<div class="bx"><b>${j+1}</b>${kanaSVG(ch,{upto:j,hl:j})}</div>`).join('')}</div>`}
/* hanamaru: the spiral flower a Japanese teacher draws on a correct answer */
const HANAMARU=(()=>{const P=[],cx=50,cy=50;
  for(let t=0;t<=1.0001;t+=0.012){const a=-1.2+t*2.3*2*Math.PI,r=7+23*t;P.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}
  const a0=-1.2+2.3*2*Math.PI;for(let t=0;t<=1.0001;t+=0.004){const a=a0+t*2*Math.PI*1.04,r=35+9*Math.abs(Math.sin(t*Math.PI*8));P.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}
  return'M'+P.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')})();
/* the learner's own strokes as a small theme-aware drawing */
function inkSVG(ink){if(!ink)return'';const sw=Math.max(3,Math.min(ink.w,ink.h)/24).toFixed(1);
  const d=ink.ink.map(s=>{let p='M'+s[0][0]+' '+s[1][0];if(s[0].length===1)p+='l0.01 0';for(let i=1;i<s[0].length;i++)p+='L'+s[0][i]+' '+s[1][i];return p}).join('');
  return`<svg class="thumb" viewBox="0 0 ${ink.w} ${ink.h}" aria-hidden="true"><path d="${d}" stroke-width="${sw}"/></svg>`}

/* ---------- GEOMETRY: what the recognizer cannot see ----------
   Google's recognizer reads きつて as きって and ignores stroke direction, so the size of small kana
   and the stroke order are checked here against the stroke data. */
const GEO={};let geoSvg=null;
function geo(ch){if(GEO[ch])return GEO[ch];const d=KVG[ch];if(!d)return null;
  if(!geoSvg){geoSvg=document.createElementNS(NS,'svg');geoSvg.setAttribute('style','position:absolute;width:0;height:0;visibility:hidden');geoSvg.setAttribute('aria-hidden','true');document.body.appendChild(geoSvg)}
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const st=[];
  for(const p of d.p){const el=document.createElementNS(NS,'path');el.setAttribute('d',p);geoSvg.appendChild(el);const L=el.getTotalLength(),pts=[];
    for(let i=0;i<=16;i++){const q=el.getPointAtLength(L*i/16);pts.push([q.x,q.y]);x0=Math.min(x0,q.x);y0=Math.min(y0,q.y);x1=Math.max(x1,q.x);y1=Math.max(y1,q.y)}
    st.push({a:pts[0],b:pts[16]});el.remove()}
  return GEO[ch]={x0,y0,x1,y1,size:Math.max(x1-x0,y1-y0)||1,st}}
const strokeInfo=ink=>ink.ink.map(s=>{const xs=s[0],ys=s[1];return{a:[xs[0],ys[0]],b:[xs[xs.length-1],ys[ys.length-1]],x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}});
const boxOf=l=>({x0:Math.min(...l.map(s=>s.x0)),x1:Math.max(...l.map(s=>s.x1)),y0:Math.min(...l.map(s=>s.y0)),y1:Math.max(...l.map(s=>s.y1))});
/* 'none' (no small kana), 'unknown' (cannot segment), 'ok', or the small kana that was written too large */
function sizeCheck(target,ink){const chars=[...target];if(!chars.some(c=>SMALL[c]))return'none';
  const need=chars.map(c=>KVG[c]?KVG[c].p.length:0);if(!ink||need.some(n=>!n))return'unknown';
  const st=strokeInfo(ink);if(st.length!==need.reduce((a,b)=>a+b,0))return'unknown';
  let i=0,lastX=-1e9,ordered=true;
  const sz=chars.map((c,j)=>{const b=boxOf(st.slice(i,i+need[j]));i+=need[j];const cx=(b.x0+b.x1)/2;if(cx<lastX)ordered=false;lastX=cx;return Math.max(b.x1-b.x0,b.y1-b.y0)});
  if(!ordered)return'unknown';
  const ref=chars.map((c,j)=>SMALL[c]?null:sz[j]/geo(c).size).filter(v=>v!=null).sort((a,b)=>a-b);
  if(!ref.length)return'unknown';
  const f=ref[ref.length>>1];let res='ok';
  chars.forEach((c,j)=>{if(SMALL[c]&&sz[j]/(f*geo(SMALL[c]).size)>0.88)res=c});
  return res}
/* a remark on stroke count, order or direction for a single kana; empty when it matches the model */
function strokeNote(k,ink){if(!ink||[...k].length!==1||!KVG[k])return'';
  const g=geo(k),st=strokeInfo(ink),n=g.st.length;
  if(st.length!==n)return`Anda menulis ${st.length} goresan. Huruf ini ditulis dalam ${n} goresan.`;
  const b=boxOf(st),sz=Math.max(b.x1-b.x0,b.y1-b.y0)||1,cx=(b.x0+b.x1)/2,cy=(b.y0+b.y1)/2,gx=(g.x0+g.x1)/2,gy=(g.y0+g.y1)/2;
  const nm=(p,ox,oy,s)=>[(p[0]-ox)/s,(p[1]-oy)/s],dist=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1]);
  for(let i=0;i<n;i++){const ma=nm(g.st[i].a,gx,gy,g.size),mb=nm(g.st[i].b,gx,gy,g.size),ua=nm(st[i].a,cx,cy,sz),ub=nm(st[i].b,cx,cy,sz);
    if(dist(ma,mb)>0.3){const dot=(mb[0]-ma[0])*(ub[0]-ua[0])+(mb[1]-ma[1])*(ub[1]-ua[1]);
      if(dot<0&&dist(ua,mb)<dist(ua,ma))return n>1?`Goresan ke-${i+1} ditarik dari arah sebaliknya.`:'Goresan ditarik dari arah sebaliknya.'}
    if(n>1&&dist(ua,ma)>0.33)return`Urutan goresan berbeda dari contoh. Periksa goresan ke-${i+1}.`}
  return''}

/* ---------- PAD ---------- */
function Pad(el,opt={}){
  el.className='pad'+(opt.wide?' wide':'');
  el.style.setProperty('--c',col(opt.row));
  el.innerHTML='<div class="ghost" aria-hidden="true"></div><canvas role="img" aria-label="Area menulis"></canvas>';
  const cv=$('canvas',el),gh=$('.ghost',el),ctx=cv.getContext('2d');
  let strokes=[],cur=null,pid=null,w=0,h=0,dpr=1,t0=0;
  const ink=()=>getComputedStyle(document.documentElement).getPropertyValue('--ink').trim()||'#111';
  function style(){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=ctx.fillStyle=ink();ctx.lineWidth=Math.max(3,Math.min(w,h)/24)}
  function seg(s,i){ctx.beginPath();ctx.moveTo(s[i-1][0]*w,s[i-1][1]*h);ctx.lineTo(s[i][0]*w,s[i][1]*h);ctx.stroke()}
  function dot(p){ctx.beginPath();ctx.arc(p[0]*w,p[1]*h,ctx.lineWidth/2,0,Math.PI*2);ctx.fill()}
  function redraw(){style();ctx.clearRect(0,0,w,h);for(const s of strokes){dot(s[0]);for(let i=1;i<s.length;i++)seg(s,i)}}
  function size(){const r=el.getBoundingClientRect();if(!r.width)return;dpr=window.devicePixelRatio||1;w=r.width;h=r.height;cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);redraw()}
  const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height,Math.round(performance.now()-t0)]};
  const changed=()=>opt.onChange&&opt.onChange();
  /* one pointer owns the pad at a time, so a resting palm or thumb cannot tangle the stroke */
  cv.addEventListener('pointerdown',e=>{if(pid!==null||e.button>0||(opt.locked&&opt.locked()))return;e.preventDefault();pid=e.pointerId;try{cv.setPointerCapture(pid)}catch(_){}
    const ae=document.activeElement;if(ae&&ae!==document.body&&ae.blur)ae.blur();
    style();if(!strokes.length)t0=performance.now();cur=[pt(e)];strokes.push(cur);dot(cur[0])});
  cv.addEventListener('pointermove',e=>{if(!cur||e.pointerId!==pid)return;e.preventDefault();const evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];
    for(const ev of(evs.length?evs:[e])){const p=pt(ev),q=cur[cur.length-1];if(Math.hypot((p[0]-q[0])*w,(p[1]-q[1])*h)<1.2)continue;cur.push(p);seg(cur,cur.length-1)}});
  const end=e=>{if(e.pointerId!==pid)return;cur=null;pid=null;changed()};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);cv.addEventListener('lostpointercapture',end);
  const ro=new ResizeObserver(size);ro.observe(el);
  const mq=matchMedia('(prefers-color-scheme: dark)');mq.addEventListener('change',redraw);
  return{
    clear(){strokes=[];cur=null;pid=null;redraw();this.hideGhost();el.classList.remove('correct','wrong');const m=$('.hm',el);if(m)m.remove();changed()},
    undo(){strokes.pop();redraw();changed()},
    empty(){return strokes.length===0},
    showGhost(t,o={}){gh.innerHTML=kanaSVG(t,o);gh.classList.add('show')},
    hideGhost(){gh.classList.remove('show')},
    mark(ok){el.classList.remove('correct','wrong');if(ok!=null)el.classList.add(ok?'correct':'wrong');const m=$('.hm',el);if(ok&&!m)el.insertAdjacentHTML('beforeend',`<svg class="hm" viewBox="0 0 100 100" aria-hidden="true"><path d="${HANAMARU}" pathLength="1"/></svg>`);if(!ok&&m)m.remove()},
    ink(){if(!strokes.length||!w)return null;return{w:Math.round(w),h:Math.round(h),ink:strokes.map(s=>[s.map(p=>Math.round(p[0]*w)),s.map(p=>Math.round(p[1]*h)),s.map(p=>p[2])])}},
    destroy(){ro.disconnect();mq.removeEventListener('change',redraw)}
  };
}

/* ---------- AUTO GRADING ----------
   Shape is read by Google's handwriting recognizer (the one behind Google Translate's draw input).
   If it cannot be reached, the learner grades the card. */
const REC_URL='https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8';
const AUTO={fails:0,offUntil:0};
const autoReady=()=>navigator.onLine!==false&&Date.now()>=AUTO.offUntil;
async function recognize(ink){
  if(!ink||!autoReady())return null;
  const ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),5000);
  try{
    const r=await fetch(REC_URL,{method:'POST',headers:{'Content-Type':'application/json'},signal:ctl.signal,
      body:JSON.stringify({options:'enable_pre_space',requests:[{writing_guide:{writing_area_width:ink.w,writing_area_height:ink.h},ink:ink.ink,language:'ja',max_num_results:10,max_completions:0}]})});
    const j=await r.json();if(j[0]!=='SUCCESS')throw new Error('rec');AUTO.fails=0;return j[1][0][1]||[];
  }catch(e){if(++AUTO.fails>=2)AUTO.offUntil=Date.now()+30000;return null}finally{clearTimeout(tm)}
}
const norm=s=>[...s].map(c=>NORM[c]||c).join('');
const big=s=>[...s].map(c=>SMALL[c]||c).join('');
/* ok: the best reading in this script has the right shape. A best reading in the other script means the wrong script was written. */
function verdict(target,cands){
  const cs=cands.map(norm),top=cs.find(c=>MINE.test(c))||'';
  const alien=cs[0]&&!MINE.test(cs[0])&&OTHER.test(cs[0])?cs[0]:'';
  if(top&&big(top)===big(target))return alien?{v:'bad',why:'script',read:alien}:{v:'ok',read:top};
  return{v:'bad',why:alien?'script':'',read:alien||top}}
/* v: ok | bad | check (shape right, small-kana size undecided) | manual (recognizer unreachable) */
async function assess(it,ink){
  if(!ink)return{v:'bad',why:'empty',notes:[]};
  const notes=[],sn=strokeNote(it.k,ink);if(sn)notes.push(sn);
  let c=await recognize(ink);if(!c&&autoReady())c=await recognize(ink);
  const sz=sizeCheck(it.k,ink);
  if(!c){if(sz!=='none'&&sz!=='ok'&&sz!=='unknown')notes.push(`${sz} tampak terlalu besar.`);return{v:'manual',notes}}
  const a=verdict(it.k,c);
  if(a.v==='bad')return{v:'bad',why:a.why,read:a.read,notes};
  if(sz==='none'||sz==='ok')return{v:'ok',read:a.read,notes};
  if(sz==='unknown')return{v:'check',read:a.read,notes};
  return{v:'bad',why:'size',which:sz,read:a.read,notes}}
function whyText(a){
  if(a.why==='empty')return'Belum ditulis.';
  if(a.why==='size')return`${jp(a.which)} ditulis terlalu besar. Tulis kira-kira setengah ukuran huruf di sebelahnya.`;
  if(a.why==='script')return`Terbaca sebagai ${jp(a.read)}. Itu ${APP.other}, bukan ${APP.script}.`;
  return a.read?`Terbaca sebagai ${jp(a.read)}.`:'Tulisan tidak terbaca.'}
async function judgeMany(list,onEach){let i=0;const run=async()=>{while(i<list.length){const x=list[i++];onEach(x,await assess(BY[x.k],x.ink))}};await Promise.all([run(),run(),run(),run()])}
function answerHTML(it){const rom=romOf(it),g=it.g&&it.g.toLowerCase()!==rom.toLowerCase()?`<span>${APP.glossLabel}: ${esc(it.g)}</span>`:'';
  return`<div class="ans" lang="ja">${ck(it.k)}</div><div class="romsub">${esc(rom)}${qual(it)?` (${qual(it)})`:''}${g}</div>`}
/* Shared check flow for Belajar and Latih: draws the model stroke order over the learner's writing,
   grades it, and lets the learner continue or overrule. */
async function judge(P,pad,it,extra,finish,keys){
  let done=false;const end=ok=>{if(done)return;done=true;finish(ok)};
  pad.showGhost(it.k,{anim:true});$('#tl',P).hidden=true;
  const rv=$('#rv',P),ac=$('#ac',P),info=answerHTML(it)+(extra||'');
  rv.innerHTML='<div class="verdict">Menilai tulisan Anda</div>'+info;ac.innerHTML='<button class="btn" disabled>Menilai</button>';
  const a=await assess(it,pad.ink());
  if(!rv.isConnected||done)return;
  const notes=a.notes.map(n=>`<div class="knote">${jp(n)}</div>`).join('');
  if(a.v==='manual'||a.v==='check'){
    const man=a.v==='manual';
    rv.innerHTML=(man?'<div class="verdict"><span class="pill warn">Nilai sendiri</span>Penilaian otomatis tidak tersedia. Bandingkan tulisan Anda dengan contoh.</div>'
      :'<div class="verdict"><span class="pill warn">Cek ukuran</span>Bentuk sudah benar. Apakah huruf kecilnya Anda tulis lebih kecil?</div>')+notes+info;
    ac.innerHTML=`<button class="btn bad" id="no">${man?'Salah':'Belum'}</button><button class="btn ok" id="yes">${man?'Benar':'Sudah'}</button>`;
    $('#no',P).onclick=()=>end(false);$('#yes',P).onclick=()=>end(true);
    keys.check=null;keys.yes=()=>end(true);keys.no=()=>end(false);ac.scrollIntoView({block:'nearest'});return}
  let ok=a.v==='ok';
  const paint=()=>{pad.mark(ok);
    rv.innerHTML=`<div class="verdict" role="status">${ok?'<span class="pill ok">Benar</span>':`<span class="pill bad">Salah</span><span>${whyText(a)}</span>`}</div>`+notes+info;
    ac.innerHTML=`<button class="btn ghost" id="ov">${ok?'Anggap salah':'Anggap benar'}</button><button class="btn pri" id="nx">Lanjut</button>`;
    $('#ov',P).onclick=()=>{ok=!ok;paint()};$('#nx',P).onclick=()=>end(ok);$('#nx',P).focus({preventScroll:true});ac.scrollIntoView({block:'nearest'})};
  paint();keys.check=()=>end(ok);keys.yes=()=>end(true);keys.no=()=>end(false);
}

/* ---------- INSTALL (PWA) ---------- */
let installEvt=null;
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const framed=(()=>{try{return window.self!==window.top}catch(e){return true}})();
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;if(TAB==='plan')renderPlan()});
addEventListener('appinstalled',()=>{installEvt=null;if(TAB==='plan')renderPlan()});
function installCard(){
  if(framed||standalone())return'';
  const box=(body,btn)=>`<div class="card row" style="justify-content:space-between;margin-bottom:10px"><span class="small" style="flex:1 1 200px"><b>Pasang sebagai aplikasi</b><br><span class="muted">${body}</span></span>${btn||''}</div>`;
  if(installEvt)return box('Terbuka layar penuh. Tanpa internet tetap bisa dipakai, tetapi tulisan Anda nilai sendiri.','<button class="btn pri sm" id="inst">Pasang</button>');
  if(/iphone|ipad|ipod/i.test(navigator.userAgent))return box('Di Safari, ketuk tombol Bagikan, lalu pilih Tambahkan ke Layar Utama.');
  if(/android/i.test(navigator.userAgent))return box('Buka menu browser, lalu pilih Instal aplikasi atau Tambahkan ke layar utama.');
  return'';
}

/* ---------- TABS ---------- */
const TABS=[['plan','時','Rencana'],['learn',APP.tabGlyph,'Belajar'],['drill','練','Latih'],['table','表','Tabel'],['test','試','Tes']];
let TAB='plan';const pads={};
function killPads(scope){(pads[scope]||[]).forEach(p=>p.destroy());pads[scope]=[]}
function addPad(scope,el,opt){const p=Pad(el,opt);(pads[scope]=pads[scope]||[]).push(p);return p}
const RENDER={plan:renderPlan,learn:renderLearn,drill:renderDrill,table:renderTable,test:renderTest};
function show(tab){TAB=tab;$$('nav.tabs button').forEach(b=>{if(b.dataset.tab===tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  $$('.panel').forEach(p=>p.hidden=p.id!=='p-'+tab);RENDER[tab]();spectrum();window.scrollTo(0,0)}
function spectrum(){$('#spectrum').innerHTML=ROWS.map(r=>`<b lang="ja" class="${S.learned[r.id]?'on':''}" style="--c:var(--r-${r.id})">${r.items[0][0]}</b>`).join('')}

/* ---------- CLOCK ---------- */
function tick(){const c=$('#clock');if(!S.start){c.innerHTML='Sesi belum dimulai';return}
  const el=(Date.now()-S.start)/1000,rem=4*3600-el;c.innerHTML=rem>0?'Sisa <b>'+fmt(rem)+'</b>':'<b>Waktu habis</b>';
  if(TAB==='plan'){const m=el/60;$$('.blk').forEach((b,i)=>{b.classList.toggle('now',m>=PLAN[i].s&&m<PLAN[i].e);b.classList.toggle('past',m>=PLAN[i].e)})}}
setInterval(tick,1000);

/* ---------- PLAN ---------- */
const pct=t=>Math.round(100*t.score/t.total);
const lastTest=()=>S.tests.length?S.tests[S.tests.length-1]:null;
const testOK=()=>{const t=lastTest();return!!t&&pct(t)>=90};
function nextStep(){const r=ROWS.find(r=>!S.learned[r.id]);
  if(r)return{label:`Pelajari ${r.name}`,kana:r.items.map(i=>i[0]).join(' '),go:()=>{L={row:r,step:'intro'};show('learn')}};
  if(S.streak<2)return{label:'Kerjakan Tabel Kosong',go:()=>show('table')};
  if(!testOK())return{label:'Kerjakan simulasi tes',go:()=>show('test')};
  return{label:'Latih yang masih lemah',go:()=>{setMode(weakKeys().length?'weak':REC_DEFAULT);show('drill')}}}
let ask=null;
function renderPlan(){const P=$('#p-plan');
  const rowsDone=ROWS.filter(r=>S.learned[r.id]).length,lt=lastTest();
  const c1=rowsDone===ROWS.length,c2=S.streak>=2,c3=testOK(),ready=c1&&c2&&c3,nx=nextStep();
  const mix=b=>[6,14,22,30,38,45][b];
  const coreN=WORDS.filter(w=>w.core).length,target=coreN?WORDS.filter(w=>w.core):WORDS,strong=target.filter(w=>card(w.k).b>=2).length;
  const how=[...APP.howto,
    ['Tulis dulu, baru periksa.','Melihat jawaban sebelum menulis hanya melatih mengenali huruf. Tes meminta Anda menulis.'],
    ['Ingat warnanya.','Tiap baris punya satu warna: merah untuk Baris A, cokelat untuk Baris W. Saat lupa, ingat warnanya dulu, lalu urutkan a, i, u, e, o sampai hurufnya ketemu.'],
    ['Penilaian bisa Anda ubah.','Goresan Anda dikirim ke pengenal tulisan tangan Google untuk dinilai. Ukuran huruf kecil dan urutan goresan diperiksa di perangkat ini. Kalau nilainya keliru, ketuk Anggap benar atau Anggap salah. Huruf yang salah muncul lagi tiga kartu kemudian.'],
    ['Latihan terakhir di kertas.','Tes Anda memakai pena dan kertas. Sebelum tes, kerjakan Tabel Kosong sekali di kertas.']];
  P.innerHTML=installCard()+`
  <div class="card hero stack">
    <div>${ready?'<div class="hanko" role="img" aria-label="Lulus"><span lang="ja">合格</span><small>LULUS</small></div>':''}
      <h3>${APP.title}</h3><p class="muted small" style="margin:0">Anda siap tes jika tiga hal ini tercapai.</p></div>
    <ul class="conds">
      <li class="${c1?'ok':''}"><i></i><span>Semua baris dipelajari. <b>${rowsDone}</b> dari ${ROWS.length}.</span></li>
      <li class="${c2?'ok':''}"><i></i><span>Tabel Kosong sempurna dua kali berturut-turut. <b>${Math.min(S.streak,2)}</b> dari 2.</span></li>
      <li class="${c3?'ok':''}"><i></i><span>Simulasi tes terakhir 90% atau lebih.${lt?` Terakhir <b>${pct(lt)}%</b>.`:''}</span></li>
      <li class="${S.paper?'ok':''}"><button id="paper" role="checkbox" aria-checked="${!!S.paper}"><i></i><span>Besok: tulis 46 huruf di kertas tanpa melihat. Ketuk jika sudah.</span></button></li>
    </ul>
    <div class="row">${S.start?`<button class="btn pri grow" id="next">${nx.label}${nx.kana?`&nbsp;<span class="kana" lang="ja">${nx.kana}</span>`:''}</button>`:'<button class="btn pri grow" id="startS">Mulai sesi 4 jam</button>'}</div>
  </div>
  <h2>Peta ingatan</h2>
  <div class="card">
    <div class="map" lang="ja">${GRID.flat().map(k=>k?`<div data-b="${card(k).b}" style="--c:var(--r-${ROW_OF[k]});background:color-mix(in oklab,var(--c) ${mix(card(k).b)}%,var(--card))">${k}</div>`:'<div class="void"></div>').join('')}</div>
    <div class="legend"><span>Lemah</span>${[6,22,38,45].map(p=>`<i style="--p:${p}%"></i>`).join('')}<span>Kuat</span><span style="margin-left:auto">${coreN?'Kata inti':'Kata'} dikuasai: <b>${strong}</b> dari ${target.length}</span></div>
  </div>
  <h2>Jadwal 4 jam</h2>
  <div class="blocks">${PLAN.map((b,i)=>`<div class="blk"><div class="t">${hhmm(b.s)}<small>${b.e-b.s} menit</small></div><div class="d"><b>${esc(b.t)}</b><span class="muted">${jp(b.d)}</span></div>${b.go?`<button class="btn sm" data-go="${i}">Buka</button>`:'<span></span>'}</div>`).join('')}</div>
  <h2>Cara berlatih</h2>
  <div class="card howto small">${how.map(([t,d])=>`<div><b>${esc(t)}</b>${jp(d)}</div>`).join('')}</div>
  <h2>Pengaturan</h2>
  <div class="card stack small">
    <div><b>Penulisan vokal panjang pada romaji</b><br><span class="muted">Ikuti cara yang dipakai di tes Anda.</span></div>
    <div class="chips" role="group" aria-label="Penulisan vokal panjang">${APP.romStyles.map(([id,l])=>`<button class="chip" aria-pressed="${S.rom===id}" data-rom="${id}">${l}</button>`).join('')}</div>
    <p class="muted" style="margin:0">Progres tersimpan di perangkat ini saja. Menghapus data browser ikut menghapusnya.</p>
    ${ask==='clock'?'<div class="confirm stack"><b>Mulai lagi dari 4:00:00? Progres huruf tidak terhapus.</b><div class="row"><button class="btn bad" id="ckYes">Mulai lagi</button><button class="btn" id="askNo">Batal</button></div></div>'
     :ask==='reset'?'<div class="confirm stack"><b>Hapus semua progres?</b><div class="row"><button class="btn bad" id="rsYes">Hapus</button><button class="btn" id="askNo">Batal</button></div></div>'
     :`<div class="row">${S.start?'<button class="btn sm" id="restart">Mulai ulang waktu</button>':''}<button class="btn sm" id="rs">Reset progres</button></div>`}
  </div>
  <p class="credit">Dikembangkan oleh <b>@noeroelama</b>.<br>Data urutan goresan dari KanjiVG oleh Ulrich Apel, lisensi CC BY-SA 3.0.</p>`;
  const on=(id,f)=>{const e=$('#'+id,P);if(e)e.onclick=f};
  $$('[data-go]',P).forEach(b=>b.onclick=()=>{const p=PLAN[+b.dataset.go];if(p.go==='drill'&&p.set)setMode(p.set==='weak'&&!weakKeys().length?'pairs':p.set);if(p.go==='learn')L=null;show(p.go)});
  $$('[data-rom]',P).forEach(b=>b.onclick=()=>{S.rom=b.dataset.rom;save();renderPlan()});
  on('inst',async()=>{const e=installEvt;installEvt=null;try{await e.prompt()}catch(_){}renderPlan()});
  on('startS',()=>{S.start=Date.now();save();renderPlan();tick()});
  on('next',()=>nx.go());
  on('paper',()=>{S.paper=!S.paper;save();renderPlan()});
  on('restart',()=>{ask='clock';renderPlan()});on('rs',()=>{ask='reset';renderPlan()});on('askNo',()=>{ask=null;renderPlan()});
  on('ckYes',()=>{S.start=Date.now();save();ask=null;renderPlan();tick()});
  on('rsYes',()=>{const rom=S.rom;S=fresh();S.rom=rom;save();ask=null;L=null;DR.q=null;DR.only=null;DR.mode='base';
    if(TB)clearInterval(TB.iv);if(TS)clearInterval(TS.iv);TB=null;TS=null;RUN.clear('table');RUN.clear('test');renderPlan();spectrum();tick()});
  tick();
}

/* ---------- LEARN ---------- */
let L=null;
function renderLearn(){killPads('learn');const P=$('#p-learn');
  if(!L){
    const next=ROWS.find(r=>!S.learned[r.id]);
    P.innerHTML=`
    <p class="muted small">${jp(APP.learnIntro)}</p>
    ${next?`<button class="btn pri" style="width:100%;margin-bottom:12px" data-row="${next.id}">Pelajari ${next.name}&nbsp;<span class="kana" lang="ja">${next.items.map(i=>i[0]).join(' ')}</span></button>`:'<div class="card small" style="margin-bottom:12px"><b>Semua baris sudah selesai.</b> Lanjutkan dengan Tabel Kosong, lalu aturan di bawah.</div>'}
    <div class="rowlist">${ROWS.map(r=>`<button class="rowbtn tint" style="--c:var(--r-${r.id})" data-row="${r.id}"><span class="k cink" lang="ja">${r.items.map(i=>i[0]).join('')}</span><span class="s">${jp(r.name)}</span>${S.learned[r.id]?'<span class="done">selesai</span>':''}</button>`).join('')}</div>
    <h2>Aturan ${APP.id==='kata'?'katakana':'tambahan'}</h2>
    <p class="muted small">${esc(APP.rulesIntro)}</p>
    <div class="stack">${RULES.map(r=>`<div class="card rule"><h3>${jp(r.t)}</h3>${r.cmp?`<div class="cmp" lang="ja">${r.cmp[0]}<small lang="id">besar</small>${r.cmp[1]}<small lang="id">kecil</small></div>`:''}<p>${jp(r.d)}</p><div class="ex">${r.ex.map(k=>`<span><b lang="ja">${ck(k)}</b>${esc(BY[k]?romOf(BY[k]):romaji(k))}</span>`).join('')}</div><div><button class="btn sm" data-set="${r.set}">Latih set ini</button></div></div>`).join('')}</div>`;
    $$('[data-row]',P).forEach(b=>b.onclick=()=>{L={row:ROWS.find(r=>r.id===b.dataset.row),step:'intro'};renderLearn();window.scrollTo(0,0)});
    $$('[data-set]',P).forEach(b=>b.onclick=()=>{setMode(b.dataset.set);show('drill')});
    return;
  }
  const Rw=L.row,items=Rw.items.map(i=>BY[i[0]]),C=`var(--r-${Rw.id})`;
  const stepIx={intro:0,trace:1,recall:2,done:3}[L.step];
  const head=`<div class="row" style="justify-content:space-between"><button class="btn sm ghost" id="back">Semua baris</button><span class="pill row-pill" style="--c:${C}">${jp(Rw.name)}</span></div><div class="steps" style="--c:${C}">${[0,1,2].map(i=>`<span class="${i<=stepIx?'on':''}"></span>`).join('')}</div>`;
  if(L.step==='intro'){
    const twin=k=>APP.id==='kata'?`<span class="twin">hiragana <b class="ki" lang="ja">${String.fromCharCode(k.charCodeAt(0)-0x60)}</b></span>`:'';
    P.innerHTML=head+`<h2 style="margin-top:0">Lihat bentuk dan urutan goresannya</h2><p class="muted small">Ketuk huruf besar untuk memutar ulang urutan goresan.</p>
    <div class="stack">${items.map(it=>`<div class="kc tint" style="--c:${C}"><button class="big cink" data-play="${it.k}" aria-label="Putar urutan goresan ${it.r}">${kanaSVG(it.k,{anim:true})}</button><div style="min-width:0"><div class="r cink">${it.r}${twin(it.k)}</div><div class="m">${jp(it.m)}</div><div class="cink">${kakijunStrip(it.k)}</div></div></div>`).join('')}</div>
    <div class="actions"><button class="btn pri" id="go">Mulai menjiplak</button></div>`;
    $$('[data-play]',P).forEach(b=>b.onclick=()=>{b.innerHTML=kanaSVG(b.dataset.play,{anim:true})});
    $('#go',P).onclick=()=>{L.step='trace';L.i=0;renderLearn();window.scrollTo(0,0)};
  }else if(L.step==='trace'){
    const it=items[L.i];
    P.innerHTML=head+`<div class="meta"><span>Jiplak sesuai nomor goresan</span><span><b>${L.i+1}</b> dari ${items.length}</span></div>
    <div class="prompt"><div class="rom cink" style="--c:${C}">${it.r}</div></div>
    <div id="pad"></div>
    <div class="tools"><button class="btn sm" id="pl">Putar ulang</button><button class="btn sm" id="un">Urungkan</button><button class="btn sm" id="cl">Hapus</button></div>
    <div class="actions"><button class="btn pri" id="nx" disabled>Jiplak dulu hurufnya</button></div>`;
    const lbl=L.i<items.length-1?'Huruf berikutnya':'Tulis dari ingatan';
    const pad=addPad('learn',$('#pad',P),{row:Rw.id,onChange:()=>{const b=$('#nx',P);if(!b)return;b.disabled=pad.empty();b.textContent=pad.empty()?'Jiplak dulu hurufnya':lbl}});
    pad.showGhost(it.k,{nums:true});
    $('#pl',P).onclick=()=>pad.showGhost(it.k,{anim:true,nums:true});
    $('#un',P).onclick=()=>pad.undo();$('#cl',P).onclick=()=>{pad.clear();pad.showGhost(it.k,{nums:true})};
    $('#nx',P).onclick=()=>{if(pad.empty())return;if(L.i<items.length-1){L.i++}else{L.step='recall';L.order=shuffle(items.map(x=>x.k))}renderLearn()};
  }else if(L.step==='recall'){
    const it=BY[L.order[0]];
    P.innerHTML=head+`<div class="meta"><span>Tulis dari ingatan</span><span><b>${L.order.length}</b> tersisa</span></div>
    <div class="prompt"><div class="lbl">Tulis ${APP.script} untuk</div><div class="rom cink" style="--c:${C}">${it.r}</div></div>
    <div id="pad"></div><div class="reveal" id="rv" aria-live="polite"></div>
    <div class="tools" id="tl"><button class="btn sm" id="un">Urungkan</button><button class="btn sm" id="cl">Hapus</button></div>
    <div class="actions" id="ac"><button class="btn pri" id="ck">Periksa</button></div>`;
    let revealed=false;
    const pad=addPad('learn',$('#pad',P),{row:Rw.id,locked:()=>revealed});
    $('#un',P).onclick=()=>pad.undo();$('#cl',P).onclick=()=>pad.clear();
    const fin=ok=>{grade(it.k,ok);L.order.shift();if(!ok)L.order.splice(Math.min(2,L.order.length),0,it.k);
      if(!L.order.length){S.learned[Rw.id]=true;save();L.step='done'}setTimeout(renderLearn,120)};
    const keys={};L.keys=keys;
    keys.check=()=>{if(revealed)return;revealed=true;judge(P,pad,it,`<div class="mn">${jp(it.m)}</div>`,fin,keys)};
    $('#ck',P).onclick=keys.check;
  }else{
    const ix=ROWS.indexOf(Rw),nx=ROWS[ix+1],mix=(ix+1)%3===0&&!!nx;
    P.innerHTML=head+`<div class="card tint stack" style="--c:${C};text-align:center"><div class="kana cink" lang="ja" style="font-size:2.8rem">${items.map(i=>i.k).join(' ')}</div><h3>${jp(Rw.name)} selesai. Hurufnya sekarang ikut di tab Latih.</h3>
    <p class="muted small" style="margin:0">${mix?'Tiga baris selesai. Latihan campuran 5 menit dulu, lalu istirahat 5 menit.':nx?`Berikutnya ${jp(nx.name)}.`:'Semua baris selesai. Kerjakan Tabel Kosong.'}</p>
    <div class="row" style="justify-content:center">${nx?`<button class="btn ${mix?'':'pri'}" id="nr">Lanjut ke ${jp(nx.name)}</button>`:'<button class="btn pri" id="tb">Tabel Kosong</button>'}<button class="btn ${mix?'pri':''}" id="dr">Latihan campuran</button></div></div>`;
    if(nx)$('#nr',P).onclick=()=>{L={row:nx,step:'intro'};renderLearn();window.scrollTo(0,0)};else $('#tb',P).onclick=()=>{L=null;show('table')};
    $('#dr',P).onclick=()=>{L=null;setMode('base');show('drill')};
    spectrum();
  }
  $('#back',P).onclick=()=>{L=null;renderLearn()};
}

/* ---------- DRILL ---------- */
const DR={mode:'base',q:null,stat:{c:0,w:0},only:null};
function setMode(m){DR.mode=m;DR.only=null;DR.q=null}
function poolFor(mode){
  const learnedBase=BASE.filter(i=>S.learned[i.row]);
  switch(mode){
    case'base':return learnedBase.length?learnedBase:BASE.filter(i=>i.row==='a');
    case'pairs':return[...new Set(PAIRS.flat())].map(k=>BY[k]);
    case'daku':return DAKU;case'combo':return COMBO;case'foreign':return FOREIGN;case'word':return WORDS;
    case'core':return WORDS.filter(w=>w.core);
    case'all':return[...BASE,...DAKU,...COMBO,...FOREIGN,...WORDS];
    case'weak':return(DR.only?DR.only.map(k=>BY[k]).filter(Boolean):Object.keys(S.cards).map(k=>BY[k]).filter(Boolean)).filter(i=>weakOf(i.k));
  }return BASE}
/* weakest first; rare sounds after the common ones of the same level */
function buildQ(items){return[0,1,2,3,4,5].map(b=>{const l=shuffle(items.filter(i=>card(i.k).b===b));return[...l.filter(i=>!i.rare),...l.filter(i=>i.rare)]}).flat()}
function weakKeys(){return Object.keys(S.cards).filter(k=>BY[k]&&weakOf(k))}
function setInfo(o){const pool=poolFor(o.m),n=pool.length,weak=pool.filter(i=>weakOf(i.k)).length;let d;
  if(o.m==='weak')d=n?`${n} kartu perlu diulang`:'Belum ada kartu yang salah';
  else if(o.m==='base'){const r=ROWS.filter(r=>S.learned[r.id]).length;d=r?`${n} huruf, ${r} dari ${ROWS.length} baris dipelajari`:'Belum ada baris dipelajari, memakai Baris A'}
  else if(o.m==='all')d=`Semua set, ${n} kartu`;
  else d=`${n} ${o.u}`;
  if(weak&&o.m!=='weak')d+=`, ${weak} perlu diulang`;
  return{n,d,ex:o.m==='weak'?[...pool.slice(0,2).map(i=>i.k).join(' ')].slice(0,4).join(''):o.ex}}
function recommend(){
  if(S.start){const m=(Date.now()-S.start)/60000,b=PLAN.find(b=>m>=b.s&&m<b.e);if(b&&b.set&&(b.set!=='weak'||weakKeys().length))return b.set}
  if(ROWS.some(r=>!S.learned[r.id]))return'base';
  if(weakKeys().length)return'weak';
  return REC_DEFAULT}
function setButton(){const o=MODES.find(x=>x.m===DR.mode)||MODES[0],i=setInfo(o);
  const lbl=DR.mode==='weak'&&DR.only?'Yang salah dari hasil terakhir':o.l;
  return`<button class="setbtn" id="setbtn" aria-haspopup="dialog"><span class="ex" lang="ja">${esc(i.ex)}</span><span class="tx"><span class="nm">${jp(lbl)}</span><span class="ds">${esc(i.d)}</span></span><span class="go">Ganti set</span></button>`}
function openSheet(){closeSheet(true);const rec=recommend(),groups=[...new Set(MODES.map(o=>o.g))];
  const body=groups.map(g=>`<h4>${g}</h4><div class="opts">${MODES.filter(o=>o.g===g).map(o=>{const i=setInfo(o);
    return`<button class="opt${o.m===DR.mode?' on':''}" data-m="${o.m}"${i.n?'':' disabled'}><span class="ex" lang="ja">${esc(i.ex)}</span><span class="tx"><span class="nm">${jp(o.l)}${o.m===rec&&i.n?'<span class="pill ok">Disarankan</span>':''}</span><span class="ds">${esc(i.d)}</span></span></button>`}).join('')}</div>`).join('');
  document.body.insertAdjacentHTML('beforeend',`<div id="sheet"><div class="sheet-bg" id="sheetbg"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="Pilih set latihan"><div class="sheet-h"><b>Pilih set latihan</b><button class="btn sm ghost" id="sheetx">Tutup</button></div>${body}</div></div>`);
  document.documentElement.style.overflow='hidden';$('.wrap').inert=true;$('nav.tabs').inert=true;
  $('#sheetbg').onclick=()=>closeSheet();$('#sheetx').onclick=()=>closeSheet();
  $$('#sheet .opt').forEach(b=>b.onclick=()=>{setMode(b.dataset.m);closeSheet(true);renderDrill();const s=$('#setbtn');if(s)s.focus({preventScroll:true})});
  const f=$('#sheet .opt.on:not([disabled])')||$('#sheet .opt:not([disabled])');if(f)f.focus({preventScroll:true})}
function closeSheet(silent){const s=$('#sheet');if(!s)return;s.remove();document.documentElement.style.overflow='';$('.wrap').inert=false;$('nav.tabs').inert=false;if(!silent){const b=$('#setbtn');if(b)b.focus({preventScroll:true})}}
function renderDrill(){killPads('drill');const P=$('#p-drill');
  if(DR.only&&DR.q&&!DR.q.length)DR.only=null;
  if(!DR.q){DR.q=buildQ(poolFor(DR.mode));DR.stat={c:0,w:0}}
  else{/* rows learned or cards missed since the queue was built join it */
    const have=new Set(DR.q.map(i=>i.k)),add=poolFor(DR.mode).filter(i=>!have.has(i.k)&&(DR.mode!=='weak'||weakOf(i.k)));if(add.length)DR.q.splice(Math.min(1,DR.q.length),0,...buildQ(add))}
  const bind=()=>{const b=$('#setbtn',P);if(b)b.onclick=()=>openSheet()};
  if(!DR.q.length){P.innerHTML=setButton()+`<div class="card" style="margin-top:12px"><b>${DR.mode==='weak'?(DR.stat.c?'Semua kartu yang salah sudah Anda perbaiki.':'Belum ada kartu yang salah.'):'Set ini kosong.'}</b><p class="muted small" style="margin:4px 0 0">Huruf yang salah di tab mana pun terkumpul di sini.</p></div>`;bind();return}
  const it=DR.q[0],c=card(it.k),C=col(it.row),rom=romOf(it),single=!isWide(it);
  const group=DR.mode==='pairs'?PAIRS.find(g=>g.includes(it.k)):null;
  P.innerHTML=setButton()+`
  <div class="meta" style="margin-top:12px"><span>Sesi ini: benar <b style="color:var(--ok)">${DR.stat.c}</b>, salah <b style="color:var(--bad)">${DR.stat.w}</b></span><span>Hafalan: <b>${c.b}</b> dari 5</span></div>
  <div class="prompt"><div class="lbl">Tulis ${APP.script} untuk</div><div class="rom ${single?'cink':''} ${rom.length>9?'long':''}" style="--c:${C}">${esc(rom)}</div>${qual(it)?`<div class="q">${qual(it)}</div>`:''}</div>
  <div id="pad"></div><div class="reveal" id="rv" aria-live="polite"></div>
  <div class="tools" id="tl"><button class="btn sm" id="un">Urungkan</button><button class="btn sm" id="cl">Hapus</button></div>
  <div class="actions" id="ac"><button class="btn pri" id="ck">Periksa</button></div>
  <div class="kbd">Keyboard: Enter untuk periksa dan lanjut. Panah kiri salah, panah kanan benar.</div>`;
  bind();
  let revealed=false;
  const pad=addPad('drill',$('#pad',P),{wide:!single,row:it.row,locked:()=>revealed});
  $('#un',P).onclick=()=>pad.undo();$('#cl',P).onclick=()=>pad.clear();
  const nt=noteOf(it),xn=group&&EXTRA_NOTE[it.k];
  const extra=`${nt?`<div class="mn">${jp(nt)}</div>`:''}${xn?`<div class="mn">${jp(xn)}</div>`:''}${group?`<div class="tiles">${group.map(k=>`<div class="tile tint" style="--c:var(--r-${ROW_OF[k]})"><b class="cink" lang="ja">${k}</b><span>${BY[k].r}</span></div>`).join('')}</div>`:''}`;
  const fin=ok=>{grade(it.k,ok);ok?DR.stat.c++:DR.stat.w++;
    DR.q.shift();
    /* a card at the top level goes to the back, so long sets keep moving through every card */
    if(!(DR.mode==='weak'&&!weakOf(it.k))){const gap=ok?[4,8,15,30,1e9][card(it.k).b-1]:3;DR.q.splice(Math.min(gap,DR.q.length),0,it)}
    setTimeout(renderDrill,120)};
  const keys={};DR.keys=keys;
  keys.check=()=>{if(revealed)return;revealed=true;judge(P,pad,it,extra,fin,keys)};
  $('#ck',P).onclick=keys.check;
}

/* ---------- BATCH REVIEW (shared by Tabel and Tes) ----------
   x: wrong, un: not graded yet (recognizer unreachable, or small-kana size undecided). Rows marked un must be decided before saving. */
function runAuto(T,list,idOf,refresh){
  if(!list.length){T.auto='done';return}
  T.auto='running';T.prog=0;
  judgeMany(list,(x,a)=>{T.prog++;const id=idOf(x);if(!T.touched[id]){if(a.v==='ok')T.x[id]=false;else if(a.v==='bad')T.x[id]=true;else T.un[id]=true}
    const s=$('#autoStat');if(s)s.textContent=T.prog+' dari '+list.length}).then(()=>{T.auto='done';refresh()})}
const countOf=(o,ids)=>ids.filter(id=>o[id]).length;

/* ---------- TABLE (Tabel Kosong) ---------- */
let TB=null;
function tbPersist(){RUN.save('table',{i:TB.i,ink:TB.ink,elapsed:(Date.now()-TB.t0)/1000})}
function renderTable(){killPads('table');const P=$('#p-table');
  if(!TB){
    const last=S.tables.slice(-3).reverse();
    P.innerHTML=`<div class="card stack">
      <h3>Tabel Kosong</h3>
      <p class="small" style="margin:0">Tulis 46 huruf berurutan, tanpa melihat contoh. Kalau lupa, ketuk Lewati. Dinilai setelah semua terisi.</p>
      <div class="preview" aria-hidden="true">${GRID.flat().map(k=>k?`<i style="--c:var(--r-${ROW_OF[k]})"></i>`:'<i class="void"></i>').join('')}</div>
      <p class="muted small" style="margin:0">Target: sempurna 2 kali berturut-turut. Sekarang ${Math.min(S.streak,2)} dari 2.</p>
      <button class="btn pri" id="go">Mulai</button></div>
      ${last.length?`<h2>Percobaan terakhir</h2><div class="stack">${last.map(t=>`<div class="card meta"><span><b>${t.score}</b> dari 46 benar, ${dur(t.time)}</span><span>${at(t.at)}</span></div>`).join('')}</div>`:''}
      <p class="muted small" style="margin-top:14px">Bisa juga di kertas: gambar tabel 5 kolom dan 11 baris, isi dari ingatan, lalu cocokkan dengan Peta ingatan di tab Rencana.</p>`;
    $('#go',P).onclick=()=>{TB={i:0,ink:{},t0:Date.now(),phase:'write',x:{},un:{},touched:{}};tbPersist();renderTable()};return}
  if(TB.phase==='write'){
    const k=ORDER[TB.i],it=BY[k],rowIx=GRID.findIndex(r=>r.includes(k)),row=GRID[rowIx],C=col(it.row),rowName=ROWS.find(r=>r.id===it.row).name;
    P.innerHTML=`<div class="meta"><span>Huruf <b>${TB.i+1}</b> dari 46, ${jp(rowName)}</span><span id="tt"></span></div>
    <div class="tstrip" style="margin-top:8px">${row.map(c=>c?`<div class="cell tint ${c===k?'cur':''}" style="--c:${C}">${TB.ink[c]?inkSVG(TB.ink[c]):(c in TB.ink&&c!==k?'kosong':'')}</div>`:'<div class="cell void"></div>').join('')}</div>
    <div class="prompt"><div class="rom cink" style="--c:${C}">${it.r}</div></div>
    <div id="pad"></div>
    <div class="tools"><button class="btn sm" id="un">Urungkan</button><button class="btn sm" id="cl">Hapus</button></div>
    <div class="actions">${TB.i?'<button class="btn" id="bk" style="flex:0 0 auto">Kembali</button>':''}<button class="btn" id="sk">Lewati</button><button class="btn pri" id="nx">Lanjut</button></div>
    ${TB.ask?'<div class="confirm stack small" style="margin-top:8px"><b>Batalkan tabel ini? Tulisan yang sudah diisi akan hilang.</b><div class="row"><button class="btn bad" id="abYes">Batalkan</button><button class="btn" id="abNo">Teruskan</button></div></div>'
      :'<div class="row" style="justify-content:center;margin-top:8px"><button class="btn sm ghost" id="ab">Batalkan percobaan</button></div>'}`;
    const pad=addPad('table',$('#pad',P),{row:it.row});
    const t=$('#tt',P),upd=()=>{if(t.isConnected)t.innerHTML='Waktu <b>'+fmt((Date.now()-TB.t0)/1000)+'</b>'};upd();clearInterval(TB.iv);TB.iv=setInterval(upd,1000);
    $('#un',P).onclick=()=>pad.undo();$('#cl',P).onclick=()=>pad.clear();
    const adv=ink=>{TB.ink[k]=ink;TB.i++;TB.ask=false;
      if(TB.i>=ORDER.length){TB.time=(Date.now()-TB.t0)/1000;clearInterval(TB.iv);TB.phase='review'}tbPersist();renderTable()};
    const go=()=>{if(!pad.empty())adv(pad.ink())};
    $('#sk',P).onclick=()=>adv(null);$('#nx',P).onclick=go;
    const bk=$('#bk',P);if(bk)bk.onclick=()=>{TB.i--;delete TB.ink[ORDER[TB.i]];tbPersist();renderTable()};
    const drop=()=>{clearInterval(TB.iv);TB=null;RUN.clear('table');renderTable()};
    const ab=$('#ab',P);if(ab)ab.onclick=()=>{if(TB.i){TB.ask=true;renderTable()}else drop()};
    const ay=$('#abYes',P);if(ay)ay.onclick=drop;const an=$('#abNo',P);if(an)an.onclick=()=>{TB.ask=false;renderTable()};
    TB.keys={check:go};
  }else if(TB.phase==='review'){
    if(TB.time==null)TB.time=(Date.now()-TB.t0)/1000;
    if(TB.auto===undefined){ORDER.forEach(q=>{if(!TB.ink[q])TB.x[q]=true});
      runAuto(TB,ORDER.filter(q=>TB.ink[q]).map(q=>({k:q,ink:TB.ink[q]})),x=>x.k,()=>{if(TB&&TB.phase==='review'&&TAB==='table')renderTable()})}
    const wrong=countOf(TB.x,ORDER),und=countOf(TB.un,ORDER),running=TB.auto==='running';
    const msg=running?`Menilai otomatis, <span id="autoStat">${TB.prog} dari ${ORDER.filter(q=>TB.ink[q]).length}</span>.`
      :'Kotak merah dinilai salah. Huruf yang benar ada di pojok kanan atas. Ketuk kotak untuk mengubah nilainya.'+(und?` ${und} kotak kuning belum dinilai otomatis. Nilai sendiri: ketuk sekali jika benar, dua kali jika salah.`:'');
    P.innerHTML=`<div class="card stack"><h3>Periksa hasil tabel</h3><p class="small" style="margin:0">Waktu ${dur(TB.time)}. ${msg}</p></div>
    <div class="grid" style="margin-top:10px">${GRID.flat().map(k=>k?`<button class="cell tint ${TB.x[k]?'x':TB.un[k]?'un':''}" style="--c:var(--r-${ROW_OF[k]})" data-k="${k}" aria-label="${BY[k].r}">${inkSVG(TB.ink[k])}<span class="ck" lang="ja">${k}</span><span class="rr">${BY[k].r}</span><span class="st">${TB.x[k]?'salah':TB.un[k]?'nilai':''}</span></button>`:'<div class="cell void"></div>').join('')}</div>
    ${und&&!running?'<div class="row" style="justify-content:center;margin-top:8px"><button class="btn sm" id="allok">Anggap semua kotak kuning benar</button></div>':''}
    <div class="actions"><button class="btn pri" id="sv"></button></div>
    <div class="row" style="justify-content:center;margin-top:8px"><button class="btn sm ghost" id="ab">Buang tanpa menyimpan</button></div>`;
    const sv=$('#sv',P),paintSave=()=>{const w=countOf(TB.x,ORDER),u=countOf(TB.un,ORDER);sv.disabled=TB.auto==='running'||u>0;sv.textContent=TB.auto==='running'?'Menilai':u?`Nilai dulu ${u} kotak kuning`:`Simpan hasil, ${46-w} dari 46 benar`};paintSave();
    /* toggles update the tapped cell in place; the grid is not rebuilt */
    $$('[data-k]',P).forEach(b=>b.onclick=()=>{const k=b.dataset.k;TB.touched[k]=true;if(TB.un[k]){TB.un[k]=false;TB.x[k]=false}else TB.x[k]=!TB.x[k];
      b.classList.toggle('x',!!TB.x[k]);b.classList.remove('un');$('.st',b).textContent=TB.x[k]?'salah':'';paintSave();const a=$('#allok',P);if(a&&!countOf(TB.un,ORDER))a.parentNode.remove()});
    const ao=$('#allok',P);if(ao)ao.onclick=()=>{ORDER.forEach(k=>{if(TB.un[k]){TB.un[k]=false;TB.touched[k]=true}});renderTable()};
    $('#ab',P).onclick=()=>{TB=null;RUN.clear('table');renderTable()};
    sv.onclick=()=>{const miss=ORDER.filter(k=>TB.x[k]),score=46-miss.length;
      ORDER.forEach(k=>grade(k,!TB.x[k]));
      S.tables.push({at:Date.now(),score,time:Math.round(TB.time)});S.streak=score===46?S.streak+1:0;save();RUN.clear('table');
      TB.phase='result';TB.miss=miss;TB.score=score;renderTable();window.scrollTo(0,0)};
  }else{
    const m=TB.miss;
    P.innerHTML=`<div class="card stack" style="text-align:center">
      <div class="score">${TB.score}<span class="muted" style="font-size:1.1rem"> dari 46</span></div>
      <div class="muted small">Waktu ${dur(TB.time)}. Sempurna berturut-turut: ${Math.min(S.streak,2)} dari 2.</div>
      ${m.length?`<div class="tiles">${m.map(k=>`<div class="tile tint" style="--c:var(--r-${ROW_OF[k]})"><b class="cink" lang="ja">${k}</b><span>${BY[k].r}</span></div>`).join('')}</div><p class="small" style="margin:0">Tulis tiap huruf ini lima kali sambil mengucapkan romajinya, lalu latih di set Yang salah.</p>`:`<p class="small" style="margin:0">${S.streak>=2?'Sempurna dua kali berturut-turut. Huruf dasar sudah Anda kuasai.':'Sempurna. Ulangi sekali lagi untuk memastikan hasilnya bukan kebetulan.'}</p>`}
      <div class="row" style="justify-content:center">${m.length?'<button class="btn pri" id="dm">Latih yang salah</button>':''}<button class="btn ${m.length?'':'pri'}" id="ag">Ulangi tabel</button></div></div>`;
    if(m.length)$('#dm',P).onclick=()=>{DR.mode='weak';DR.only=m.slice();DR.q=null;TB=null;show('drill')};
    $('#ag',P).onclick=()=>{TB=null;renderTable()};
  }
}

/* ---------- TEST ---------- */
let TS=null;
function tsPersist(){RUN.save('test',{keys:TS.items.map(i=>i.k),i:TS.i,ink:TS.ink,elapsed:(Date.now()-TS.t0)/1000})}
function testItems(){const m=APP.test,core=WORDS.filter(w=>w.core),rest=WORDS.filter(w=>!w.core),nc=core.length?Math.min(m.coreWords||0,m.word):0;
  return shuffle([...pick(BASE,m.base),...pick(DAKU,m.daku),...pick(COMBO,m.combo),...pick(FOREIGN.filter(f=>!f.rare),m.foreign),...pick(core,nc),...pick(core.length?rest:WORDS,m.word-nc)])}
function renderTest(){killPads('test');const P=$('#p-test');
  if(!TS){const hist=S.tests.slice(-3).reverse();
    P.innerHTML=`<div class="card stack"><h3>Simulasi tes</h3>
      <p class="small" style="margin:0">${esc(APP.testIntro)}</p>
      <button class="btn pri" id="go">Mulai</button></div>
      ${hist.length?`<h2>Hasil terakhir</h2><div class="stack">${hist.map(t=>`<div class="card meta"><span><b>${pct(t)}%</b>, ${t.score} dari ${t.total} benar, ${dur(t.time)}</span><span>${at(t.at)}</span></div>`).join('')}</div>`:''}`;
    $('#go',P).onclick=()=>{TS={items:testItems(),i:0,ink:[],t0:Date.now(),phase:'write',x:{},un:{},touched:{}};tsPersist();renderTest()};return}
  const N=TS.items.length,ids=TS.items.map((_,i)=>i);
  if(TS.phase==='write'){const it=TS.items[TS.i],rom=romOf(it);
    P.innerHTML=`<div class="meta"><span>Soal <b>${TS.i+1}</b> dari ${N}</span><span id="tt"></span></div>
    <div class="steps" style="margin:6px 0 4px">${TS.items.map((_,i)=>`<span class="${i<TS.i?'on':''}"></span>`).join('')}</div>
    <div class="prompt" style="margin-top:8px"><div class="lbl">Tulis dalam ${APP.script}</div><div class="rom ${rom.length>9?'long':''}">${esc(rom)}</div>${qual(it)?`<div class="q">${qual(it)}</div>`:''}</div>
    <div id="pad"></div>
    <div class="tools"><button class="btn sm" id="un">Urungkan</button><button class="btn sm" id="cl">Hapus</button></div>
    <div class="actions">${TS.i?'<button class="btn" id="bk" style="flex:0 0 auto">Kembali</button>':''}<button class="btn" id="sk">Lewati</button><button class="btn pri" id="nx">${TS.i<N-1?'Lanjut':'Selesai'}</button></div>
    ${TS.ask?'<div class="confirm stack small" style="margin-top:8px"><b>Batalkan simulasi ini? Jawaban yang sudah ditulis akan hilang.</b><div class="row"><button class="btn bad" id="abYes">Batalkan</button><button class="btn" id="abNo">Teruskan</button></div></div>'
      :'<div class="row" style="justify-content:center;margin-top:8px"><button class="btn sm ghost" id="ab">Batalkan simulasi</button></div>'}`;
    const pad=addPad('test',$('#pad',P),{wide:isWide(it)});
    const t=$('#tt',P),upd=()=>{if(t.isConnected)t.innerHTML='Waktu <b>'+fmt((Date.now()-TS.t0)/1000)+'</b>'};upd();clearInterval(TS.iv);TS.iv=setInterval(upd,1000);
    $('#un',P).onclick=()=>pad.undo();$('#cl',P).onclick=()=>pad.clear();
    const adv=ink=>{TS.ink[TS.i]=ink;TS.i++;TS.ask=false;if(TS.i>=N){TS.time=(Date.now()-TS.t0)/1000;clearInterval(TS.iv);TS.phase='review'}tsPersist();renderTest()};
    const go=()=>{if(!pad.empty())adv(pad.ink())};
    $('#sk',P).onclick=()=>adv(null);$('#nx',P).onclick=go;
    const bk=$('#bk',P);if(bk)bk.onclick=()=>{TS.i--;TS.ink[TS.i]=null;tsPersist();renderTest()};
    const drop=()=>{clearInterval(TS.iv);TS=null;RUN.clear('test');renderTest()};
    const ab=$('#ab',P);if(ab)ab.onclick=()=>{if(TS.i){TS.ask=true;renderTest()}else drop()};
    const ay=$('#abYes',P);if(ay)ay.onclick=drop;const an=$('#abNo',P);if(an)an.onclick=()=>{TS.ask=false;renderTest()};
    TS.keys={check:go};
  }else if(TS.phase==='review'){
    if(TS.time==null)TS.time=(Date.now()-TS.t0)/1000;
    if(TS.auto===undefined){ids.forEach(i=>{if(!TS.ink[i])TS.x[i]=true});
      runAuto(TS,ids.filter(i=>TS.ink[i]).map(i=>({k:TS.items[i].k,i,ink:TS.ink[i]})),x=>x.i,()=>{if(TS&&TS.phase==='review'&&TAB==='test')renderTest()})}
    const und=countOf(TS.un,ids),running=TS.auto==='running';
    const msg=running?`Menilai otomatis, <span id="autoStat">${TS.prog} dari ${ids.filter(i=>TS.ink[i]).length}</span>.`
      :'Baris merah dinilai salah. Ketuk baris untuk mengubah nilainya.'+(und?` ${und} baris kuning perlu Anda nilai, misalnya karena ukuran huruf kecil tidak bisa dipastikan. Ketuk sekali jika benar, dua kali jika salah.`:'');
    const st=i=>TS.x[i]?'x':TS.un[i]?'un':'';
    const pill=i=>TS.x[i]?'<span class="pill bad">Salah</span>':TS.un[i]?'<span class="pill warn">Nilai sendiri</span>':'<span class="pill ok">Benar</span>';
    P.innerHTML=`<div class="card"><h3>Periksa hasil tes</h3><p class="small" style="margin:0">${msg}</p></div>
    <div class="rl" style="margin-top:10px">${TS.items.map((it,i)=>`<button class="ri ${st(i)}" data-i="${i}"><span class="rom">${esc(romOf(it))}${qual(it)?` (${qual(it)})`:''}</span>${pill(i)}<span class="img">${TS.ink[i]?inkSVG(TS.ink[i]):'kosong'}</span><span class="a" lang="ja">${ck(it.k)}</span></button>`).join('')}</div>
    <div class="actions"><button class="btn pri" id="sv"></button></div>
    <div class="row" style="justify-content:center;margin-top:8px"><button class="btn sm ghost" id="ab">Buang tanpa menyimpan</button></div>`;
    const sv=$('#sv',P),paintSave=()=>{const w=countOf(TS.x,ids),u=countOf(TS.un,ids);sv.disabled=TS.auto==='running'||u>0;sv.textContent=TS.auto==='running'?'Menilai':u?`Nilai dulu ${u} baris kuning`:`Simpan hasil, ${N-w} dari ${N} benar`};paintSave();
    $$('[data-i]',P).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;TS.touched[i]=true;if(TS.un[i]){TS.un[i]=false;TS.x[i]=false}else TS.x[i]=!TS.x[i];
      b.className='ri '+st(i);$('.pill',b).outerHTML=pill(i);paintSave()});
    $('#ab',P).onclick=()=>{TS=null;RUN.clear('test');renderTest()};
    sv.onclick=()=>{const miss=TS.items.filter((_,i)=>TS.x[i]).map(i=>i.k);TS.items.forEach((it,i)=>grade(it.k,!TS.x[i]));
      const score=N-miss.length;S.tests.push({at:Date.now(),score,total:N,time:Math.round(TS.time)});save();RUN.clear('test');TS.phase='result';TS.miss=miss;TS.score=score;renderTest();window.scrollTo(0,0)};
  }else{const p=Math.round(100*TS.score/N),pass=p>=90;
    P.innerHTML=`<div class="card stack" style="text-align:center">${pass?'<div class="hanko" role="img" aria-label="Lulus" style="float:none;margin:0 auto"><span lang="ja">合格</span><small>LULUS</small></div>':''}<div class="score">${p}%</div><div class="muted small">${TS.score} dari ${N} benar, ${dur(TS.time)}</div>
    ${TS.miss.length?`<div class="tiles">${TS.miss.map(k=>`<div class="tile"><b lang="ja">${ck(k)}</b><span>${esc(romOf(BY[k]))}</span></div>`).join('')}</div>`:''}
    <p class="small" style="margin:0">${pass?'90% atau lebih. Kalau Tabel Kosong juga sudah sempurna dua kali berturut-turut, Anda siap tes.':'Latih yang salah, lalu ulangi simulasi.'}</p>
    <div class="row" style="justify-content:center">${TS.miss.length?'<button class="btn pri" id="dm">Latih yang salah</button>':''}<button class="btn ${TS.miss.length?'':'pri'}" id="ag">Simulasi lagi</button></div></div>`;
    if(TS.miss.length)$('#dm',P).onclick=()=>{DR.mode='weak';DR.only=TS.miss.slice();DR.q=null;TS=null;show('drill')};
    $('#ag',P).onclick=()=>{TS=null;renderTest()};
  }
}

/* ---------- KEYBOARD ---------- */
document.addEventListener('keydown',e=>{if(e.repeat)return;if($('#sheet')){if(e.key==='Escape')closeSheet();return}
  if(e.target.closest&&e.target.closest('button')&&e.key==='Enter')return;
  const k=TAB==='drill'?DR.keys:TAB==='learn'&&L&&L.step==='recall'?L.keys:TAB==='table'&&TB&&TB.phase==='write'?TB.keys:TAB==='test'&&TS&&TS.phase==='write'?TS.keys:null;
  if(!k)return;
  if(e.key==='Enter'){e.preventDefault();k.check&&k.check()}
  else if(e.key==='ArrowRight'&&k.yes){e.preventDefault();k.yes()}
  else if(e.key==='ArrowLeft'&&k.no){e.preventDefault();k.no()}});

/* ---------- BOOT ---------- */
$('#logo').innerHTML=APP.logo.map(([k,r])=>`<span style="--c:var(--r-${r})">${k}</span>`).join('');
$('#tabs').innerHTML=TABS.map(([id,g,l])=>`<button data-tab="${id}"><span class="g" lang="ja" aria-hidden="true">${g}</span>${l}</button>`).join('');
$$('nav.tabs button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.tab)));
/* pick up a table or test that was interrupted; stored strokes are validated before they are drawn */
(function restore(){
  const num=a=>Array.isArray(a)&&a.length>0&&a.every(v=>typeof v==='number'&&Number.isFinite(v));
  const okInk=i=>!!i&&typeof i==='object'&&Number.isFinite(i.w)&&Number.isFinite(i.h)&&i.w>0&&i.h>0&&Array.isArray(i.ink)&&i.ink.length>0&&i.ink.every(s=>Array.isArray(s)&&num(s[0])&&num(s[1])&&s[0].length===s[1].length);
  const t=RUN.load('table');
  if(t&&typeof t==='object'&&t.ink&&typeof t.ink==='object'&&Number.isFinite(+t.i)){const i=Math.max(0,Math.min(ORDER.length,+t.i|0)),ink={};
    ORDER.slice(0,i).forEach(k=>{ink[k]=okInk(t.ink[k])?t.ink[k]:null});
    TB={i,ink,t0:Date.now()-(+t.elapsed||0)*1000,phase:i>=ORDER.length?'review':'write',x:{},un:{},touched:{}};if(TB.phase==='review')TB.time=+t.elapsed||0}
  const x=RUN.load('test');
  if(x&&typeof x==='object'&&Array.isArray(x.keys)&&Array.isArray(x.ink)&&x.keys.length&&x.keys.every(k=>BY[k])){const i=Math.max(0,Math.min(x.keys.length,+x.i|0));
    TS={items:x.keys.map(k=>BY[k]),i,ink:x.keys.map((_,j)=>j<i&&okInk(x.ink[j])?x.ink[j]:null),t0:Date.now()-(+x.elapsed||0)*1000,phase:i>=x.keys.length?'review':'write',x:{},un:{},touched:{}};if(TS.phase==='review')TS.time=+x.elapsed||0}
})();
const h=(location.hash||'').slice(1);
show(Object.prototype.hasOwnProperty.call(RENDER,h)?h:'plan');
