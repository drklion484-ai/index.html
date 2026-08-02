// ============================================================
// NUESTRO UNIVERSO ❤️
// music.js - Music and Audio Control
// ============================================================

class MusicController {
  constructor() {
    this.audio = document.getElementById('music');
    this.isPlaying = false;
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.init();
  }

  init() {
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.setupAudioContext();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
    });
  }

  setupAudioContext() {
    if (this.audioContext) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      const source = audioContext.createMediaElementAudioSource(this.audio);
      source.connect(this.analyser);
      this.analyser.connect(audioContext.destination);

      this.audioContext = audioContext;
    } catch (e) {
      console.warn('Audio context not available:', e);
    }
  }

  play() {
    if (this.audio) {
      this.audio.play().catch(err => console.log('Playback error:', err));
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(volume) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  getFrequencies() {
    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      return this.dataArray;
    }
    return null;
  }

  addAudioReactiveEffect() {
    if (!this.analyser) return;

    const animate = () => {
      const frequencies = this.getFrequencies();
      if (frequencies && typeof galaxySystem !== 'undefined') {
        const average = frequencies.reduce((a, b) => a + b) / frequencies.length / 255;
        galaxySystem.respondToAudio(average);
      }
      requestAnimationFrame(animate);
    };

    animate();
  }
}

let musicController;
window.addEventListener('DOMContentLoaded', () => {
  musicController = new MusicController();
});