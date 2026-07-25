// ============================================================
// NUESTRO UNIVERSO ❤️
// music.js - Audio Controller and Visualizer
// ============================================================

class MusicController {
  constructor() {
    this.audio = document.getElementById('music');
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.isPlaying = false;
    this.volume = 0.5;
    this.init();
  }

  init() {
    if (!window.AudioContext && !window.webkitAudioContext) {
      console.warn('Web Audio API not supported');
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    // Create analyser node
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;

    // Create volume control
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    // Setup audio element source
    if (this.audio) {
      const source = this.audioContext.createMediaElementAudioSource(this.audio);
      source.connect(this.gainNode);

      this.audio.volume = this.volume;
    }

    // Frequency data array
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    // User interaction to start audio
    document.addEventListener('click', () => this.resumeAudioContext());
    document.addEventListener('touchstart', () => this.resumeAudioContext());
  }

  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  play() {
    if (this.audio) {
      this.resumeAudioContext();
      this.audio.play().catch(err => {
        console.log('Autoplay prevented:', err);
      });
      this.isPlaying = true;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  }

  getFrequencies() {
    if (!this.analyser) return null;
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  getAverageFrequency() {
    const frequencies = this.getFrequencies();
    if (!frequencies) return 0;
    const average = frequencies.reduce((a, b) => a + b) / frequencies.length;
    return average / 255;
  }

  createAudioVisualizer() {
    const canvas = document.createElement('canvas');
    canvas.id = 'audioVisualizer';
    canvas.width = window.innerWidth;
    canvas.height = 100;
    canvas.style.position = 'fixed';
    canvas.style.bottom = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '10';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const draw = () => {
      const frequencies = this.getFrequencies();
      if (!frequencies) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / frequencies.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < frequencies.length; i++) {
        barHeight = (frequencies[i] / 255) * canvas.height;

        // Color gradient
        const hue = (i / frequencies.length) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      requestAnimationFrame(draw);
    };

    draw();
  }

  addAudioReactiveEffect() {
    const animate = () => {
      const average = this.getAverageFrequency();

      // Scale galaxy based on music
      galaxyScene.galaxies.forEach(galaxy => {
        galaxy.mesh.scale.set(
          1 + average * 0.3,
          1 + average * 0.3,
          1 + average * 0.3
        );
      });

      // Camera shake on bass
      if (average > 0.6) {
        cameraController.shake(0.2, 50);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Initialize music controller
const musicController = new MusicController();

// Auto-play music when entering experience
document.getElementById('startButton').addEventListener('click', () => {
  setTimeout(() => {
    musicController.play();
    musicController.addAudioReactiveEffect();
  }, 500);
});
