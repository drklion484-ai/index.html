// ============================================================
// NUESTRO UNIVERSO ❤️
// particles.js - Advanced Particle System
// ============================================================

class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particleSystems = [];
  }

  createExplosion(position, color = 0xff4da6) {
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = position.x;
      positions[i3 + 1] = position.y;
      positions[i3 + 2] = position.z;

      const speed = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      velocities[i3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i3 + 2] = Math.cos(phi) * speed;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: color,
      size: 0.5,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);

    const system = {
      mesh: particles,
      positions: positions,
      velocities: velocities,
      life: 1,
      lifeDecay: 0.015,
      geometry: geometry
    };

    this.particleSystems.push(system);
    this.animateExplosion(system);
  }

  animateExplosion(system) {
    const animate = () => {
      if (system.life <= 0) {
        this.scene.remove(system.mesh);
        const index = this.particleSystems.indexOf(system);
        if (index > -1) this.particleSystems.splice(index, 1);
        return;
      }

      const positions = system.geometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += system.velocities[i3] * 0.016;
        positions[i3 + 1] += system.velocities[i3 + 1] * 0.016;
        positions[i3 + 2] += system.velocities[i3 + 2] * 0.016;

        system.velocities[i3] *= 0.98;
        system.velocities[i3 + 1] *= 0.98;
        system.velocities[i3 + 2] *= 0.98;
        system.velocities[i3 + 1] -= 0.1; // gravity
      }

      system.geometry.attributes.position.needsUpdate = true;
      system.mesh.material.opacity = system.life;
      system.life -= system.lifeDecay;

      requestAnimationFrame(animate);
    };

    animate();
  }

  createHeartWave(position) {
    const colors = [0xff4da6, 0x6d5dfc, 0x38bdf8];
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createExplosion(position, colors[i]);
      }, i * 100);
    }
  }

  createRain(count = 100, areaSize = 200) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * areaSize;
      positions[i3 + 1] = Math.random() * areaSize + 50;
      positions[i3 + 2] = (Math.random() - 0.5) * areaSize;

      velocities[i3] = 0;
      velocities[i3 + 1] = -1 - Math.random() * 1;
      velocities[i3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);

    const system = {
      mesh: particles,
      positions: positions,
      velocities: velocities,
      geometry: geometry,
      areaSize: areaSize,
      active: true
    };

    this.animateRain(system);
    return system;
  }

  animateRain(system) {
    const animate = () => {
      if (!system.active) {
        this.scene.remove(system.mesh);
        return;
      }

      const positions = system.geometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += system.velocities[i3] * 0.016;
        positions[i3 + 1] += system.velocities[i3 + 1] * 0.016;
        positions[i3 + 2] += system.velocities[i3 + 2] * 0.016;

        if (positions[i3 + 1] < -50) {
          positions[i3 + 1] = Math.random() * system.areaSize + 50;
        }
      }

      system.geometry.attributes.position.needsUpdate = true;
      requestAnimationFrame(animate);
    };

    animate();
  }

  stopRain(system) {
    system.active = false;
  }
}

// Initialize particle system with the galaxy scene
const particleSystem = new ParticleSystem(galaxyScene.scene);
