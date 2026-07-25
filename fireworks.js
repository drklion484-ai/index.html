// ============================================================
// NUESTRO UNIVERSO ❤️
// fireworks.js - Fireworks and Celebratory Effects
// ============================================================

class FireworksSystem {
  constructor(scene) {
    this.scene = scene;
    this.fireworks = [];
    this.colors = [0xff4da6, 0x6d5dfc, 0x38bdf8, 0xffd166, 0xff1493];
  }

  launch(position = { x: 0, y: 50, z: 0 }) {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const particleCount = 80 + Math.random() * 70;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const life = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = position.x;
      positions[i3 + 1] = position.y;
      positions[i3 + 2] = position.z;

      const speed = 1.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;

      velocities[i3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i3 + 2] = Math.cos(phi) * speed;

      life[i] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.PointsMaterial({
      map: texture,
      color: color,
      size: 0.8,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);

    const firework = {
      mesh: points,
      geometry: geometry,
      positions: positions,
      velocities: velocities,
      life: life,
      material: material,
      age: 0,
      maxAge: 2000
    };

    this.fireworks.push(firework);
    this.animateFirework(firework);
  }

  animateFirework(firework) {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed > firework.maxAge) {
        this.scene.remove(firework.mesh);
        const index = this.fireworks.indexOf(firework);
        if (index > -1) this.fireworks.splice(index, 1);
        return;
      }

      const progress = elapsed / firework.maxAge;
      const positions = firework.geometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += firework.velocities[i3];
        positions[i3 + 1] += firework.velocities[i3 + 1];
        positions[i3 + 2] += firework.velocities[i3 + 2];

        firework.velocities[i3] *= 0.98;
        firework.velocities[i3 + 1] *= 0.98;
        firework.velocities[i3 + 2] *= 0.98;
        firework.velocities[i3 + 1] -= 0.05; // gravity

        firework.life[i] = 1 - progress;
      }

      firework.geometry.attributes.position.needsUpdate = true;
      firework.material.opacity = Math.max(0, 1 - progress * 2);

      requestAnimationFrame(animate);
    };

    animate();
  }

  createBurst(centerX = 0, centerY = 50, count = 8) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = 30;
      setTimeout(() => {
        this.launch({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          z: 0
        });
      }, i * 150);
    }
  }

  createRainbow() {
    const positions = [
      { x: -60, y: 30, z: 0 },
      { x: -30, y: 50, z: 0 },
      { x: 0, y: 60, z: 0 },
      { x: 30, y: 50, z: 0 },
      { x: 60, y: 30, z: 0 }
    ];

    positions.forEach((pos, index) => {
      setTimeout(() => {
        this.launch(pos);
      }, index * 300);
    });
  }

  continuous(duration = 5000, interval = 400) {
    const startTime = Date.now();

    const launch = () => {
      if (Date.now() - startTime < duration) {
        const randomX = (Math.random() - 0.5) * 150;
        const randomY = 20 + Math.random() * 80;
        this.launch({ x: randomX, y: randomY, z: 0 });

        setTimeout(launch, interval);
      }
    };

    launch();
  }
}

// Initialize fireworks system
const fireworksSystem = new FireworksSystem(galaxyScene.scene);

function triggerFireworks() {
  fireworksSystem.createBurst(0, 50, 12);
  setTimeout(() => fireworksSystem.createRainbow(), 800);
  setTimeout(() => fireworksSystem.continuous(3000, 300), 2500);
}
