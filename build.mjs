// Builds public/index.html, public/sw.js and public/manifest.webmanifest from src/.
// Usage: node build.mjs [hiragana|katakana]   (default: taken from the "name" in package.json)
// The two apps share src/styles.css and src/app.js; only the content file and the stroke data differ.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const app=process.argv[2]||(pkg.name.startsWith('kata')?'katakana':'hiragana');
const CFG={
  hiragana:{id:'hira',title:'Hiragana Empat Jam',short:'Hiragana 4J',desc:'Latihan menulis hiragana dari romaji dalam 4 jam, dengan urutan goresan dan penilaian tulisan tangan otomatis.',
    pl:'#2D3A8C',psl:'#E8EAF8',pd:'#9DAAFF',opd:'#15163A',psd:'#272B52'},
  katakana:{id:'kata',title:'Katakana Empat Jam',short:'Katakana 4J',desc:'Latihan menulis katakana dari romaji dalam 4 jam, fokus pada kata serapan, dengan urutan goresan dan penilaian tulisan tangan otomatis.',
    pl:'#7A2E5B',psl:'#F6E6EF',pd:'#F2A3CC',opd:'#3A1028',psd:'#3D2033'}
};
const c=CFG[app];
if(!c){console.error('Unknown app: '+app);process.exit(1)}
const rd=f=>fs.readFileSync(path.join(root,'src',f),'utf8');
const css=rd('styles.css').replaceAll('__PRIMARY_LIGHT__',c.pl).replaceAll('__PRIMARY_SOFT_LIGHT__',c.psl)
  .replaceAll('__PRIMARY_DARK__',c.pd).replaceAll('__ON_PRIMARY_DARK__',c.opd).replaceAll('__PRIMARY_SOFT_DARK__',c.psd);
const js=`(function(){
"use strict";
/* Stroke data: KanjiVG (Ulrich Apel), CC BY-SA 3.0. p: stroke paths in a 109x109 box, n: stroke-number label positions. */
const KVG=${rd('kvg-'+app+'.json').trim()};
${rd(app+'.js')}
${rd('app.js')}
})();`;
const page=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${c.title}</title>
<meta name="description" content="${c.desc}">
<meta name="theme-color" content="#FBFBFE" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#13121C" media="(prefers-color-scheme: dark)">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="${c.short}">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" crossorigin href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&family=Klee+One:wght@600&display=swap">
<style>
html{-webkit-text-size-adjust:100%}body{margin:0}img{max-width:100%}[hidden]{display:none!important}
${css}.wrap{padding-top:calc(10px + env(safe-area-inset-top,0px))}
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <div class="logo"><h1 lang="ja" id="logo"></h1><small>4 JAM</small></div>
    <div class="clock" id="clock"></div>
  </header>
  <div class="spectrum" id="spectrum" aria-hidden="true"></div>
  <main>
  <section class="panel" id="p-plan"></section>
  <section class="panel" id="p-learn" hidden></section>
  <section class="panel" id="p-drill" hidden></section>
  <section class="panel" id="p-table" hidden></section>
  <section class="panel" id="p-test" hidden></section>
  </main>
</div>
<nav class="tabs" aria-label="Menu utama"><div class="in" id="tabs"></div></nav>
<script>
${js}
</script>
<script>if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}</script>
</body>
</html>
`;
const pub=path.join(root,'public');
fs.mkdirSync(pub,{recursive:true});
fs.writeFileSync(path.join(pub,'index.html'),page);

// The cache name follows the page content, so every deploy replaces the old cache.
const ver=crypto.createHash('sha256').update(page).digest('hex').slice(0,8);
fs.writeFileSync(path.join(pub,'sw.js'),`// Pages: network first with a 4-second limit, then the cached copy, so the app opens offline or on a stalled connection.
const C='${c.id}4j-${ver}';
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
`);
fs.writeFileSync(path.join(pub,'manifest.webmanifest'),JSON.stringify({
  id:'/',name:c.title,short_name:c.short,description:c.desc,start_url:'/',scope:'/',display:'standalone',
  background_color:'#FBFBFE',theme_color:'#FBFBFE',lang:'id',
  icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'},{src:'/icon-maskable-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'}]
},null,2)+'\n');
console.log(`${c.title}: public/index.html ${(page.length/1024).toFixed(0)} KB, cache ${c.id}4j-${ver}`);
