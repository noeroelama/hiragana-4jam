// Pages: network first with a 4-second limit, then the cached copy, so the app opens offline or on a stalled connection.
const C='kata4j-9bbd2f94';
const PRE=['/','/manifest.webmanifest','/icon.svg'];
const put=(k,res)=>{const cp=res.clone();caches.open(C).then(c=>c.put(k,cp))};
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);const font=u.host==='fonts.googleapis.com'||u.host==='fonts.gstatic.com';
  if(u.origin!==location.origin&&!font)return;
  if(font){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok)put(r,res);return res})));return}
  if(r.mode==='navigate'){const net=fetch(r).then(res=>{if(res.ok&&(res.headers.get('content-type')||'').includes('text/html'))put('/',res);return res});
    e.respondWith(Promise.race([net,new Promise((_,no)=>setTimeout(no,4000))]).catch(()=>caches.match('/').then(h=>h||net)));
    e.waitUntil(net.catch(()=>{}));return}
  e.respondWith(fetch(r).then(res=>{if(res.ok&&PRE.includes(u.pathname))put(r,res);return res}).catch(()=>caches.match(r).then(h=>h||Response.error())))});
