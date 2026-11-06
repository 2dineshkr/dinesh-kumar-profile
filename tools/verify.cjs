const {spawn}=require('node:child_process');
const fs=require('node:fs');
const root=process.cwd();
const server=spawn('python',['tools/preview.py'],{windowsHide:true,stdio:'ignore'});
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=9223','--user-data-dir='+root+'/.local-qa/browser','about:blank'],{windowsHide:true,stdio:'ignore'});
let socket;
(async()=>{
let targets;
for(let i=0;i<30;i++){try{targets=await(await fetch('http://127.0.0.1:9223/json')).json();break}catch{await new Promise(r=>setTimeout(r,500));}}
if(!targets)throw Error('Headless browser did not start');
socket=new WebSocket(targets.find(x=>x.type==='page').webSocketDebuggerUrl);
await new Promise((res,rej)=>{socket.onopen=res;socket.onerror=rej});
let id=0;const pending=new Map();socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result)}};
const cdp=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});socket.send(JSON.stringify({id:n,method,params}))});
const evaluate=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
await cdp('Page.enable');await cdp('Runtime.enable');
const base='http://127.0.0.1:8001/dinesh-kumar-profile/';
async function navigate(path=''){await cdp('Page.navigate',{url:base+path});for(let i=0;i<50;i++){await new Promise(r=>setTimeout(r,100));if(await evaluate('document.readyState === "complete"'))break;}}
const reports=[];
for(const width of [1440,768,390,320]){
await cdp('Emulation.setDeviceMetricsOverride',{width,height:960,deviceScaleFactor:1,mobile:false});
await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'light'},{name:'prefers-reduced-motion',value:'reduce'}]});await navigate();
await evaluate('Promise.all([...document.images].map(i=>{i.loading="eager";return i.decode().catch(()=>{})}))');
const report=await evaluate(`({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),h1:document.querySelectorAll('h1').length,projects:document.querySelectorAll('.feature-project').length,navDisplay:getComputedStyle(document.querySelector('.main-nav')).display,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.hash)).map(a=>a.hash),outOfBounds:[...document.querySelectorAll('main *,header *,footer *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left<-.5||r.right>innerWidth+.5)}).map(e=>e.className).slice(0,15)})`);
if(width<1100){await evaluate('document.querySelector(".menu-toggle").click()');report.menuOpens=await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")==="true" && getComputedStyle(document.querySelector(".nav-links")).display!=="none"');await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});report.menuCloses=await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")==="false"');}
await evaluate('window.scrollTo(0,0)');const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(`review/home-${width}.png`,Buffer.from(shot.data,'base64'));reports.push(report);
}
await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:960,deviceScaleFactor:1,mobile:false});
await navigate(); reports.push({navigation:await evaluate(`['expertise','projects','experience','ai-lab'].map(id=>{window.scrollTo(0,document.querySelector('#'+id).offsetTop-90); window.dispatchEvent(new Event('scroll')); return {section:id,active:document.querySelector('.nav-links .active')?.hash}})`)});
for(const page of ['projects/','apps/','apps/tempguard/','projects/engineering/','projects/ai/','projects/android/','privacy.html','404.html']){await navigate(page);reports.push(await evaluate(`({page:${JSON.stringify(page)},title:document.title,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)})`));}
await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'dark'}]});await navigate();let shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync('review/home-dark-390.png',Buffer.from(shot.data,'base64'));
fs.writeFileSync('review/browser-checks.json',JSON.stringify(reports,null,2));console.log(JSON.stringify(reports,null,2));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{socket?.close();chrome.kill();server.kill()});
