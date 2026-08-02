// ============================================================
// NUESTRO UNIVERSO ❤️
// fireworks.js - Fireworks Effects System
// ============================================================

class FireworksSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
  }

  launch(position) {
    const colors = [0xff4da6, 0x6d5dfc, 0x38bdf8, 0xffd166];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 8, 8);
      const material = new THREE.MeshBasicMaterial({ color });
      const particle = new THREE.Mesh(geometry, material);

      particle.position.set(position.x, position.y, position.z);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 0.5 + Math.random() * 1.5;

      particle.velocity = new THREE.Vector3(
        Math.cos(angle) * velocity,
        Math.random() * 1 + 0.5,
        Math.sin(angle) * velocity
      );

      particle.life = 1;
      particle.decay = 0.015;
      particle.gravity = 0.1;

      this.scene.add(particle);
      this.particles.push(particle);
    }
  }

  createBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.launch({ x, y, z: 0 });
      }, i * 100);
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.velocity.y -= p.gravity;
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

let fireworksSystem;