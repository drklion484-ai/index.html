// ============================================================
// PARA MI FUTURA ESPOSA ❤️
// main.js - Main Controller - CORREGIDO
// ============================================================

class UniversoController {
  constructor() {
    this.currentSection = 0;
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleLoadingScreen();
  }

  setupEventListeners() {
    // Start button
    const startBtn = document.getElementById('startButton');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.hideLoading());
    }

    // Music toggle
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
      musicToggle.addEventListener('click', () => this.toggleMusic());
    }
  }

  handleLoadingScreen() {
    const loading = document.getElementById('loading');
    if (!loading) return;

    // Auto-hide loading after 3 seconds
    setTimeout(() => {
      this.hideLoading();
    }, 3000);
  }

  hideLoading() {
    const loading = document.getElementById('loading');
    if (!loading) return;

    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';
    
    setTimeout(() => {
      loading.style.display = 'none';
      this.startMusic();
      this.triggerInitialEffects();
    }, 500);
  }

  startMusic() {
    const audio = document.getElementById('music');
    if (audio) {
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  }

  toggleMusic() {
    const audio = document.getElementById('music');
    const btn = document.getElementById('musicToggle');
    if (!audio || !btn) return;

    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊';
    } else {
      audio.pause();
      btn.textContent = '🔇';
    }
  }

  triggerInitialEffects() {
    triggerHearts(30);
    triggerParticles(50);
  }
}

// ============================================================
// PARTICLE EFFECTS
// ============================================================

function triggerParticles(count = 30) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.bottom = '-20px';
    particle.style.width = (Math.random() * 6 + 3) + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = '#F5DEB3';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10';
    particle.style.boxShadow = '0 0 10px rgba(245, 222, 179, 0.8)';
    particle.style.animation = `particleRise ${(Math.random() * 4 + 3)}s linear forwards`;
    particle.style.animationDelay = (Math.random() * 0.5) + 's';
    
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 7000);
  }
}

function triggerHearts(count = 30) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10';
    heart.style.filter = 'drop-shadow(0 0 8px rgba(220, 20, 60, 0.6))';
    heart.style.animation = `heartRise ${(Math.random() * 4 + 3)}s linear forwards`;
    heart.style.animationDelay = (Math.random() * 0.3) + 's';
    
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 7500);
  }
}

function createShootingStars(count = 3) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = '-100px';
    star.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
    star.style.animationDelay = i * 0.3 + 's';
    
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 3000);
  }
}

function triggerConfetti(count = 50) {
  const colors = ['#DC143C', '#1E90FF', '#F5DEB3', '#1A1A1A'];
  
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = (Math.random() * 8 + 5) + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '10';
    confetti.style.opacity = '1';

    const duration = Math.random() * 3 + 2;
    const xMove = (Math.random() - 0.5) * 300;

    confetti.style.animation = `confettiFall ${duration}s linear forwards`;
    confetti.style.setProperty('--tx', xMove + 'px');

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), duration * 1000);
  }
}

function triggerFireworks() {
  const burstColors = ['#DC143C', '#1E90FF', '#F5DEB3'];
  
  for (let j = 0; j < 5; j++) {
    setTimeout(() => {
      const color = burstColors[Math.floor(Math.random() * burstColors.length)];
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10';
        
        const angle = (i / 20) * Math.PI * 2;
        const velocity = Math.random() * 5 + 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `explode 1.5s ease-out forwards`;
        particle.style.setProperty('--vx', vx);
        particle.style.setProperty('--vy', vy);
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
      }
    }, j * 200);
  }
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const universo = new UniversoController();
  window.universo = universo;

  // Scroll event listeners for effects
  window.addEventListener('scroll', () => {
    const sections = ['overlay', 'messageBox', 'photoContainer', 'letter', 'final'];
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !element.dataset.effectTriggered) {
        element.dataset.effectTriggered = 'true';
        
        if (id === 'messageBox') {
          triggerHearts(20);
          createShootingStars(2);
        } else if (id === 'photoContainer') {
          triggerHearts(15);
          triggerParticles(30);
        } else if (id === 'letter') {
          triggerHearts(20);
          triggerConfetti(40);
        } else if (id === 'final') {
          triggerFireworks();
          triggerHearts(40);
          triggerConfetti(80);
        }
      }
    });
  });
});
