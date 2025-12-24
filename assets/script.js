// LuckyLuna - Shared JS (vanilla, Telegram-safe)
// Edit DIRECT_LINK to your real DirectLink or Telegram Web App URL.
const DIRECT_LINK = "https://itsluckyluna.github.io/Luckyluna-app/"; // <- REPLACE with your DirectLink

document.addEventListener('DOMContentLoaded', ()=>{
  // set current year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // Hook up sticky claim and header CTAs
  const sticky = document.getElementById('sticky-claim');
  const heroClaim = document.getElementById('hero-claim');
  const mainClaim = document.getElementById('main-claim');
  const howtoClaim = document.getElementById('howto-claim');
  const calcClaim = document.getElementById('calc-claim');

  function openDirectLink(){
    // For Telegram Web Apps, Telegram will open the link using WebApp.openLink in their environment —
    // but a plain anchor will work for DirectLink traffic. Keep it simple and safe.
    window.location.href = DIRECT_LINK;
  }
  [sticky, heroClaim, mainClaim, howtoClaim, calcClaim].forEach(el=>{
    if(!el) return;
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      addRipple(e.target, e);
      // small delay for ripple
      setTimeout(()=>openDirectLink(), 160);
    })
  })

  // Nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Bonus calculator logic
  const depositInput = document.getElementById('deposit');
  const preset = document.getElementById('preset-percent');
  const custom = document.getElementById('custom-percent');
  const bonusValue = document.getElementById('bonus-value');
  const totalValue = document.getElementById('total-value');

  function compute(){
    const deposit = parseFloat(depositInput?.value) || 0;
    let pct = 0;
    if(preset && preset.value !== 'custom') pct = parseFloat(preset.value);
    else pct = parseFloat(custom?.value) || 0;

    const bonus = +(deposit * pct / 100).toFixed(2);
    const total = +(deposit + bonus).toFixed(2);
    animateNumber(bonusValue, bonus, 600);
    animateNumber(totalValue, total, 600);
  }
  if(depositInput) depositInput.addEventListener('input', compute);
  if(preset) preset.addEventListener('change', (e)=>{
    if(e.target.value === 'custom'){
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


/* END OF script.js */
