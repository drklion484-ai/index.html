// ============================================================
// NUESTRO UNIVERSO ❤️
// loveLetter.js - Love Letter Interactions
// ============================================================

class LoveLetterController {
  constructor() {
    this.letterElement = document.getElementById('letter');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.setupInteractions();
    this.typewriterEffect();
  }

  setupInteractions() {
    this.letterElement.addEventListener('click', () => {
      this.toggleLetter();
    });

    // Add hover effect
    this.letterElement.addEventListener('mouseenter', () => {
      if (!this.isOpen) {
        this.letterElement.style.transform = 'translate(-50%, -50%) scale(1.05)';
      }
    });

    this.letterElement.addEventListener('mouseleave', () => {
      if (!this.isOpen) {
        this.letterElement.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });
  }

  toggleLetter() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.openLetter();
    } else {
      this.closeLetter();
    }
  }

  openLetter() {
    this.letterElement.style.transform = 'translate(-50%, -50%) scale(1.2)';
    this.letterElement.style.boxShadow = '0 0 80px rgba(255, 0, 150, 0.8)';

    // Create particle effect
    particleSystem.createHeartWave({
      x: 0,
      y: 0,
      z: 50
    });

    // Camera focus
    cameraController.zoomTo({ x: 0, y: 0, z: 80 }, 800);
  }

  closeLetter() {
    this.letterElement.style.transform = 'translate(-50%, -50%) scale(1)';
    this.letterElement.style.boxShadow = '0 0 50px rgba(255,255,255,.4), 0 0 120px rgba(255,120,180,.6)';

    cameraController.resetCamera(800);
  }

  typewriterEffect() {
    const paragraphs = this.letterElement.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
      const originalText = p.textContent;
      p.textContent = '';

      let charIndex = 0;
      const typeChar = () => {
        if (charIndex < originalText.length) {
          p.textContent += originalText[charIndex];
          charIndex++;
          setTimeout(typeChar, 30);
        }
      };

      setTimeout(typeChar, index * 100);
    });
  }

  addHeartAnimation() {
    const hearts = setInterval(() => {
      if (!this.isOpen) {
        clearInterval(hearts);
        return;
      }

      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = '100%';
      heart.style.fontSize = Math.random() * 20 + 20 + 'px';
      heart.style.animation = 'heartRise 2.5s linear forwards';
      heart.style.pointerEvents = 'none';

      this.letterElement.appendChild(heart);

      setTimeout(() => heart.remove(), 2500);
    }, 300);
  }
}

// Initialize love letter controller
const loveLetterController = new LoveLetterController();

// Add letter animation when it shows
const originalShowLetter = universo?.showLetter;
if (universo) {
  universo.showLetter = function() {
    if (originalShowLetter) {
      originalShowLetter.call(this);
    }
    loveLetterController.addHeartAnimation();
  };
}
