// Particles
(function(){
  const c=document.getElementById('bg-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight}
  resize();window.addEventListener('resize',resize);
  function rnd(a,b){return Math.random()*(b-a)+a}
  class P{constructor(){this.reset()}reset(){this.x=rnd(0,W);this.y=rnd(0,H);this.r=rnd(.4,1.5);this.vx=rnd(-.1,.1);this.vy=rnd(-.22,-.04);this.op=rnd(.07,.4);this.col=Math.random()>.6?'#a3e635':'#38bdf8'}update(){this.x+=this.vx;this.y+=this.vy;if(this.y<-4)this.reset(),this.y=H+4}draw(){ctx.save();ctx.globalAlpha=this.op;ctx.fillStyle=this.col;ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill();ctx.restore()}}
  for(let i=0;i<65;i++)pts.push(new P());
  function loop(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.update();p.draw()});requestAnimationFrame(loop)}
  loop();
})();

// Nav scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>50);
});

// Reveal
const ro=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('on')}),{threshold:.1,rootMargin:'0px 0px -36px 0px'});
document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(el=>ro.observe(el));

// Counters
function animCount(el){
  const t=parseInt(el.dataset.count),sfx=el.dataset.sfx||'';
  if(isNaN(t))return;
  let s=null;
  function step(ts){if(!s)s=ts;const p=Math.min((ts-s)/1400,1),e=1-Math.pow(1-p,3);
  el.textContent=Math.floor(e*t)+sfx;if(p<1)requestAnimationFrame(step)}
  requestAnimationFrame(step);
}
const co=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){animCount(x.target);co.unobserve(x.target)}}),{threshold:.3});
document.querySelectorAll('[data-count]').forEach(el=>{
  const sfx=el.dataset.sfx||'';
  el.textContent='0'+sfx;
  co.observe(el);
});

// Mobile menu
function toggleMob(){document.getElementById('mobMenu').classList.toggle('open')}

// FAQ
function toggleFaq(el){el.classList.toggle('open')}

// Toast
function toast(msg,type){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.style.background=type==='success'?'rgba(52,211,153,.15)':type==='error'?'rgba(248,113,113,.15)':'rgba(163,230,53,.12)';
  t.style.borderColor=type==='success'?'rgba(52,211,153,.35)':type==='error'?'rgba(248,113,113,.35)':'rgba(163,230,53,.25)';
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
}

// Form: Demo
function submitDemo(){
  const fn=document.getElementById('d-fn').value.trim();
  const em=document.getElementById('d-em').value.trim();
  const ph=document.getElementById('d-ph').value.trim();
  const co=document.getElementById('d-co').value.trim();
  
  if(!fn){toast('⚠ Please enter your first name','error');return}
  if(!em||!em.includes('@')){toast('⚠ Please enter a valid email address','error');return}
  if(!ph){toast('⚠ Please enter your WhatsApp / phone number','error');return}
  if(!co){toast('⚠ Please enter your company name','error');return}
  
  // Format the text message for WhatsApp
  const textMessage = 'DEMO REQUEST\n\n' +
                      'Name: '+fn+' '+(document.getElementById('d-ln')?document.getElementById('d-ln').value:'')+'\n' +
                      'Email: '+em+'\n' +
                      'Phone: '+ph+'\n' +
                      'Company: '+co+'\n' +
                      'Industry: '+(document.getElementById('d-in')?document.getElementById('d-in').value:'')+'\n' +
                      'Team size: '+(document.getElementById('d-sz')?document.getElementById('d-sz').value:'')+'\n' +
                      'Current system: '+(document.getElementById('d-cs')?document.getElementById('d-cs').value:'')+'\n\n' +
                      'Message:\n'+(document.getElementById('d-ms')?document.getElementById('d-ms').value:'');
  
  const body=encodeURIComponent(textMessage);
  
  // Redirect to the specific WhatsApp chat number with the message
  window.open('https://wa.me/918426975309?text='+body,'_blank');
  
  toast('✓ Demo request sent via WhatsApp!','success');
  
  ['d-fn','d-ln','d-em','d-ph','d-co','d-ms'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
}


// Form: Contact
function submitContact(){
  const nm=document.getElementById('c-nm').value.trim();
  const em=document.getElementById('c-em').value.trim();
  const ms=document.getElementById('c-ms').value.trim();
  if(!nm){toast('⚠ Please enter your name','error');return}
  if(!em||!em.includes('@')){toast('⚠ Please enter a valid email address','error');return}
  if(!ms){toast('⚠ Please enter your message','error');return}
  const sub=encodeURIComponent('[cinch.AI] '+(document.getElementById('c-su')?document.getElementById('c-su').value:'')+' — '+nm);
  const body=encodeURIComponent('CONTACT\n\nName: '+nm+'\nCompany: '+(document.getElementById('c-co')?document.getElementById('c-co').value:'')+'\nEmail: '+em+'\nSubject: '+(document.getElementById('c-su')?document.getElementById('c-su').value:'')+'\n\nMessage:\n'+ms);
  window.open('mailto:hemrajkmt2576606@gmail.com?subject='+sub+'&body='+body);
  toast('✓ Message sent! We\'ll get back to you within 4 business hours.','success');
  ['c-nm','c-co','c-em','c-ms'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
}

// WhatsApp — number decoded at runtime, never stored in HTML
(function(){
  function initWA(){
    var n=atob('OTE5NzY4NDQ2NDk4');
    var base='https://wa.me/'+n+'?text=';
    var def=base+encodeURIComponent('Hi, I want to know more about cinch.AI.');
    var sup=base+encodeURIComponent('Hi, I want to connect with cinch.AI support.');
    // Quick connect button (if not already set by page-level script)
    var qc=document.getElementById('qc-wa');
    if(qc&&qc.getAttribute('href')==='#') qc.href=def;
    // Footer WhatsApp link
    var fw=document.getElementById('foot-wa');
    if(fw&&fw.getAttribute('href')==='#') fw.href=sup;
    // Any element with data-wa attribute
    document.querySelectorAll('[data-wa]').forEach(function(el){
      if(el.getAttribute('href')==='#'||!el.getAttribute('href')) el.href=base+encodeURIComponent(el.dataset.wa||'Hi, I want to know more about cinch.AI.');
    });
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initWA);}
  else{initWA();}
})();