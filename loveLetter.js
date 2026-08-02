// ============================================================
// NUESTRO UNIVERSO ❤️
// loveLetter.js - Love Letter Interactions
// ============================================================

class LoveLetterManager {
  constructor() {
    this.letterElement = document.getElementById('letter');
    this.init();
  }

  init() {
    this.setupLetterInteractions();
    this.addHeartAnimation();
  }

  setupLetterInteractions() {
    if (!this.letterElement) return;

    this.letterElement.addEventListener('mouseenter', () => {
      this.letterElement.style.transform = 'scale(1.02) rotateY(1deg)';
    });

    this.letterElement.addEventListener('mouseleave', () => {
      this.letterElement.style.transform = 'scale(1) rotateY(0deg)';
    });
  }

  addHeartAnimation() {
    if (!this.letterElement) return;

    const decoration = this.letterElement.querySelector('.letter-decoration');
    if (decoration) {
      decoration.style.animation = 'float 3s ease-in-out infinite';
    }
  }

  playRevealAnimation() {
    if (!this.letterElement) return;

    const paragraphs = this.letterElement.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
      p.style.opacity = '0';
      p.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
    });
  }
}

let loveLetterManager;
window.addEventListener('DOMContentLoaded', () => {
  loveLetterManager = new LoveLetterManager();
});