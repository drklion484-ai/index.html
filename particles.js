// ============================================================
// NUESTRO UNIVERSO ❤️
// particles.js - Particle System
// ============================================================

class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.maxParticles = 10000;
  }

  createExplosion(config = {}) {
    const {
      x = 0,
      y = 0,
      z = 0,
      count = 50,
      spread = 50,
      color = 0xff4da6
    } = config;

    for (let i = 0; i < count; i++) {
      const geometry = new THREE.SphereGeometry(0.3, 8, 8);
      const material = new THREE.MeshBasicMaterial({ color });
      const particle = new THREE.Mesh(geometry, material);

      particle.position.set(
        x + (Math.random() - 0.5) * spread,
        y + (Math.random() - 0.5) * spread,
        z + (Math.random() - 0.5) * spread
      );

      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );

      particle.life = 1;
      particle.decay = 0.02;

      this.scene.add(particle);
      this.particles.push(particle);
    }
  }

  createSparkles(count = 30) {
    for (let i = 0; i < count; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.6)
      });
      const sparkle = new THREE.Mesh(geometry, material);

      sparkle.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );

      sparkle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );

      sparkle.life = 1;
      sparkle.decay = 0.01;

      this.scene.add(sparkle);
      this.particles.push(sparkle);
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.position.add(p.velocity);
      p.life -= p.decay;
      p.material.opacity = p.life;

      if (p.life <= 0) {
        this.scene.remove(p);
        this.particles.splice(i, 1);
      }
    }
  }
}

let particleSystem;