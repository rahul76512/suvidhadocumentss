/* ============================
   SUVIDHA DOCUMENTS - JS
   ============================ */

// ======= FAQ ACCORDION =======
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

// Keyboard accessibility
document.querySelectorAll('.faq-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(item);
    }
  });
});


const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;
});

// ======= CUSTOM CURSOR =======
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .glass-card, .service-item, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.background = 'var(--accent-blue)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--glow-cyan)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ======= NAVBAR SCROLL =======
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Active nav link
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ======= HAMBURGER MENU =======
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksEl.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ======= PARTICLE CANVAS =======
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '59,130,246' : '6,182,212';
    this.life = 0;
    this.maxLife = Math.random() * 300 + 200;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife) this.reset();
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    const alpha = this.life < 30 ? this.life / 30 :
                  this.life > this.maxLife - 30 ? (this.maxLife - this.life) / 30 : 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity * alpha})`;
    ctx.fill();
  }
}

const particleCount = window.innerWidth < 768 ? 40 : 90;
for (let i = 0; i < particleCount; i++) {
  const p = new Particle();
  p.life = Math.random() * p.maxLife; // stagger
  particles.push(p);
}

// Connection lines
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const alpha = (1 - dist / 120) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  if (window.innerWidth > 768) drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ======= REVEAL ON SCROLL =======
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ======= ANIMATED COUNTERS =======
function animateCounter(el, target, suffix = '') {
  const isYear = target === 2020;
  const start = isYear ? 2015 : 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(start + (target - start) * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const raw = entry.target.dataset.count;
      const target = parseInt(raw);
      const suffix = entry.target.textContent.includes('+') ? '+' : '';
      animateCounter(entry.target, target, suffix);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ======= TILT CARDS =======
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateX(4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ======= HERO PARALLAX =======
const heroContent = document.querySelector('.hero-content');
const heroShapes = document.querySelector('.hero-bg-shapes');
window.addEventListener('scroll', () => {
  if (heroContent) {
    const scrollY = window.scrollY;
    heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
    heroContent.style.opacity = 1 - scrollY * 0.003;
    if (heroShapes) {
      heroShapes.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  }
});

// ======= MOUSE PARALLAX ON HERO =======
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, i) => {
      const factor = (i + 1) * 0.4;
      shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

// ======= GALLERY LIGHTBOX =======
const galleryImages = [
  { src: 'img-shop.png',     label: 'Our Office – Shop No. 35, DDA Market, Sector 10 Dwarka, Delhi' },
  { src: 'img-staff1.png',   label: 'Our Expert Team – Professional Documentation Specialists' },
  { src: 'img-staff2.png',   label: 'Document Processing – Fast & Accurate Service' },
  { src: 'img-aadhaar.png',  label: 'Aadhaar Service Center – New Enrollment, Update & Biometric' },
  { src: 'img-pan1.png',     label: 'PAN Card Service Center – New PAN, Corrections & Linking' },
  { src: 'img-passport.png', label: 'Passport Service Center – Fresh, Renewal & Tatkal Passport' },
  { src: 'img-pan2.png',     label: 'Tax & Legal Documentation Services – PAN, GST, Legal Consultation' },
];

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightboxContent');
  const item = galleryImages[index];
  content.innerHTML = `
    <div style="text-align:center; max-width:90vw; max-height:85vh; overflow:hidden; border-radius:16px; position:relative;">
      <img src="${item.src}" alt="${item.label}"
        style="max-width:100%; max-height:75vh; object-fit:contain; border-radius:16px; display:block; margin:0 auto;">
      <p style="font-family:'Poppins',sans-serif; font-size:14px; font-weight:500; color:rgba(255,255,255,0.8);
         margin-top:14px; padding:0 16px;">${item.label}</p>
    </div>
  `;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ======= TESTIMONIAL SLIDER (duplicate for infinite) =======
const track = document.getElementById('testimonialTrack');
if (track) {
  const cards = track.innerHTML;
  track.innerHTML = cards + cards; // duplicate for seamless loop
}

// ======= CONTACT FORM =======
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const submitBtn = document.querySelector('#contactForm button[type="submit"]');
  const submitText = document.getElementById('submitText');
  submitText.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';

    // Open WhatsApp with pre-filled message
    const waMsg = encodeURIComponent(
      `Hello Suvidha Documents!\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`
    );
    window.open(`https://wa.me/917669883030?text=${waMsg}`, '_blank');
  }, 1200);
}

// ======= SMOOTH SECTION SCROLL =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======= SERVICE CATEGORY HOVER GLOW =======
document.querySelectorAll('.service-category').forEach(cat => {
  cat.addEventListener('mousemove', (e) => {
    const rect = cat.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cat.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59,130,246,0.12), rgba(255,255,255,0.04))`;
  });
  cat.addEventListener('mouseleave', () => {
    cat.style.background = '';
  });
});

// ======= WHY CARD HOVER GLOW =======
document.querySelectorAll('.why-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59,130,246,0.15), rgba(255,255,255,0.04))`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ======= MAGNETIC BUTTONS =======
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ======= ANIMATED BACKGROUND GRADIENT =======
let gradientAngle = 0;
function animateBackground() {
  gradientAngle = (gradientAngle + 0.1) % 360;
  // Subtle only — do not make it distracting
  requestAnimationFrame(animateBackground);
}
animateBackground();

// ======= PROCESS LINE ANIMATION =======
const processLine = document.querySelector('.process-line');
if (processLine) {
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        processLine.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        processLine.style.opacity = '0.4';
        processLine.style.transformOrigin = 'left';
        processLine.style.transform = 'scaleX(1)';
      }
    });
  }, { threshold: 0.3 });
  processLine.style.transform = 'scaleX(0)';
  processLine.style.opacity = '0';
  processLine.style.transformOrigin = 'left';
  lineObserver.observe(processLine);
}

// ======= FLOATING CARDS PARALLAX =======
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const cards = document.querySelectorAll('.floating-card');
  cards.forEach((card, i) => {
    const offset = scrollY * (0.05 + i * 0.02);
    card.style.transform = `translateY(calc(var(--float-offset, 0px) - ${offset}px))`;
  });
});

// ======= LAZY LOAD HEAVY VISUALS =======
if ('IntersectionObserver' in window) {
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        lazyObserver.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('.shape').forEach(el => {
    el.style.animationPlayState = 'paused';
    lazyObserver.observe(el);
  });
}

// ======= GLOW BORDER ANIMATION =======
const glowCards = document.querySelectorAll('.glass-card');
glowCards.forEach((card, i) => {
  card.style.setProperty('--glow-delay', `${i * 0.2}s`);
});

// ======= PAGE LOAD ANIMATION =======
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Trigger hero animations
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + i * 150);
  });
});

// ======= LIGHT STREAK EFFECT =======
function createStreak() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const streak = document.createElement('div');
  streak.style.cssText = `
    position: absolute;
    width: ${Math.random() * 200 + 100}px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent);
    top: ${Math.random() * 100}%;
    left: -200px;
    z-index: 1;
    pointer-events: none;
    transform: rotate(${Math.random() * 20 - 10}deg);
    animation: streak ${Math.random() * 2 + 1.5}s linear forwards;
  `;
  hero.appendChild(streak);
  setTimeout(() => streak.remove(), 3500);
}

// Add streak keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes streak {
    from { left: -200px; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    to { left: 120%; opacity: 0; }
  }
`;
document.head.appendChild(style);

setInterval(createStreak, 3000);

// ======= SCROLL-TRIGGERED STAT ANIMATION =======
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(el => {
          const target = parseInt(el.dataset.count);
          const suffix = el.textContent.includes('+') ? '+' : '';
          animateCounter(el, target, suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

console.log('%c🏛️ Suvidha Documents', 'font-size:20px; font-weight:bold; color:#3B82F6;');
console.log('%cTrusted Documentation & Legal Services · Dwarka Sector 10, Delhi', 'color:#06B6D4;');
