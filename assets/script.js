// LuckyLuna - Shared JS (vanilla, Telegram-safe)
custom.removeAttribute('aria-hidden'); custom.style.display = 'inline-block'; custom.focus();
}else{ custom.style.display = 'none'; custom.setAttribute('aria-hidden', 'true'); }
compute();
});
if(custom) custom.addEventListener('input', compute);
compute();


// simple accordion
document.querySelectorAll('.accordion-toggle').forEach(btn=>{
btn.addEventListener('click', ()=>{
const panel = btn.nextElementSibling;
if(!panel) return;
const open = panel.style.display === 'block';
// close all
document.querySelectorAll('.accordion-panel').forEach(p=>p.style.display='none');
if(!open) panel.style.display='block';
})
});


// Ripple effect helper
function addRipple(target, e){
if(!target.classList.contains('ripple')) target = target.closest('.ripple') || target;
const rect = target.getBoundingClientRect();
const circle = document.createElement('span');
circle.className = 'ripple-effect';
const size = Math.max(rect.width, rect.height);
circle.style.width = circle.style.height = size + 'px';
circle.style.left = (e.clientX - rect.left - size/2) + 'px';
circle.style.top = (e.clientY - rect.top - size/2) + 'px';
target.appendChild(circle);
setTimeout(()=>circle.remove(), 650);
}


// Attach ripple to primary buttons
document.querySelectorAll('.btn-primary, .btn-gold, .btn-large').forEach(b=>{ b.classList.add('ripple'); b.addEventListener('click', ()=>{}); });


// Animated number (simple counter)
function animateNumber(el, value, duration=600){
if(!el) return;
const start = parseFloat(el.dataset.value) || 0;
const end = parseFloat(value) || 0;
el.dataset.value = end;
const startTime = performance.now();
function frame(now){
const t = Math.min((now - startTime) / duration, 1);
const cur = start + (end - start) * easeOutCubic(t);
el.textContent = '$' + Number(cur.toFixed(2)).toLocaleString();
if(t < 1) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
}
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }


// show/hide sticky CTA on scroll for mobile
let lastScroll = window.scrollY;
window.addEventListener('scroll', ()=>{
const st = window.scrollY;
const sc = document.getElementById('sticky-claim');
if(!sc) return;
if(st > 120 && st > lastScroll) sc.style.transform = 'translateY(0)';
else sc.style.transform = 'translateY(0)';
lastScroll = st;
});


// small safe smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click', (e)=>{
e.preventDefault();
const t = document.querySelector(a.getAttribute('href')) || document.body;
t.scrollIntoView({behavior:'smooth'});
})
});


});
