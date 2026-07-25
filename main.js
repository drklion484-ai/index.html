// ============================================================
// NUESTRO UNIVERSO ❤️
// main.js - Main Controller
// ============================================================

class UniversoController {
  constructor() {
    this.currentSection = 0;
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.sections = [
      { id: 'loading', duration: 0 },
      { id: 'message', duration: 3 },
      { id: 'photo', duration: 3 },
      { id: 'letter', duration: 3 },
      { id: 'final', duration: 3 }
    ];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startLoadingAnimation();
  }

  setupEventListeners() {
    // Start button
    document.getElementById('startButton').addEventListener('click', () => {
      this.hideLoading();
    });

    // Scroll events
    window.addEventListener('wheel', (e) => this.handleScroll(e), { passive: true });
    window.addEventListener('touchmove', (e) => this.handleTouchScroll(e), { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') this.nextSection();
      if (e.key === 'ArrowUp') this.previousSection();
    });

    // Responsive adjustments
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.adjustForMobile();
      }
    });
  }

  hideLoading() {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';
    
    setTimeout(() => {
      loading.style.display = 'none';
      this.showSection(0);
    }, 500);
  }

  startLoadingAnimation() {
    const starEmoji = document.querySelector('.loader h1');
    setInterval(() => {
      starEmoji.style.animation = 'none';
      setTimeout(() => {
        starEmoji.style.animation = 'pulseHeart 2s infinite';
      }, 10);
    }, 3000);
  }

  handleScroll(event) {
    if (this.isScrolling) return;
    
    const direction = event.deltaY > 0 ? 'down' : 'up';
    
    clearTimeout(this.scrollTimeout);
    this.isScrolling = true;
    
    if (direction === 'down') {
      this.nextSection();
    } else {
      this.previousSection();
    }

    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 800);
  }

  handleTouchScroll(event) {
    // Touch scroll handling for mobile
    if (this.touchStartY === undefined) {
      this.touchStartY = event.touches[0].clientY;
      return;
    }

    const touchEndY = event.touches[0].clientY;
    const diff = this.touchStartY - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
      this.touchStartY = touchEndY;
    }
  }

  nextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.showSection(this.currentSection);
    }
  }

  previousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.showSection(this.currentSection);
    }
  }

  showSection(index) {
    const section = this.sections[index];
    
    // Hide all sections
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('messageBox').style.opacity = '0';
    document.getElementById('photoContainer').style.opacity = '0';
    document.getElementById('letter').style.opacity = '0';
    document.getElementById('final').style.opacity = '0';

    // Show current section
    setTimeout(() => {
      switch(index) {
        case 0:
          this.showOverlay();
          break;
        case 1:
          this.showMessage();
          break;
        case 2:
          this.showPhoto();
          break;
        case 3:
          this.showLetter();
          break;
        case 4:
          this.showFinal();
          break;
      }
    }, 200);
  }

  showOverlay() {
    document.getElementById('overlay').style.opacity = '1';
    triggerParticles(50);
  }

  showMessage() {
    const box = document.getElementById('messageBox');
    box.style.opacity = '1';
    box.style.transform = 'translateX(-50%) translateY(0)';
    triggerParticles(30);
    createShootingStars(3);
  }

  showPhoto() {
    const container = document.getElementById('photoContainer');
    container.style.opacity = '1';
    container.style.transform = 'translate(-50%, -50%) scale(1)';
    triggerHearts(20);
  }

  showLetter() {
    const letter = document.getElementById('letter');
    letter.style.opacity = '1';
    letter.style.transform = 'translate(-50%, -50%) scale(1)';
    triggerHearts(15);
    createConfetti(50);
  }

  showFinal() {
    const final = document.getElementById('final');
    final.style.opacity = '1';
    triggerFireworks();
    triggerHearts(30);
    playConfetti(100);
  }

  adjustForMobile() {
    // Mobile-specific adjustments if needed
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.width = '95%';
    }
  }
}

// ============================================================
// PARTICLE EFFECTS
// ============================================================

function triggerParticles(count) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-10px';
    particle.style.width = Math.random() * 3 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 5000);
  }
}

function triggerHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-20px';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    heart.style.animationDelay = Math.random() * 0.3 + 's';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }
}

function createShootingStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 60 + '%';
    star.style.left = '-200px';
    star.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
    star.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(star);

    setTimeout(() => star.remove(), 2500);
  }
}

function createConfetti(count) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.background = ['#ff4da6', '#6d5dfc', '#38bdf8', '#ffd166'][
      Math.floor(Math.random() * 4)
    ];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    
    const duration = Math.random() * 2 + 1.5;
    const xMove = (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 360;

    confetti.animate([
      {
        transform: `translate(0, 0) rotate(0deg)`,
        opacity: 1
      },
      {
        transform: `translate(${xMove}px, ${window.innerHeight}px) rotate(${rotation}deg)`,
        opacity: 0
      }
    ], {
      duration: duration * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), duration * 1000);
  }
}

function playConfetti(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createConfetti(10), i * 50);
  }
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const universo = new UniversoController();
  window.universo = universo;
});
