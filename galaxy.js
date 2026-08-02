// ============================================================
// NUESTRO UNIVERSO ❤️
// galaxy.js - 3D Galaxy System
// ============================================================

class GalaxySystem {
  constructor(scene) {
    this.scene = scene;
    this.stars = [];
    this.galaxyGroup = new THREE.Group();
    this.scene.add(this.galaxyGroup);
    this.createGalaxy();
  }

  createGalaxy() {
    const starCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = Math.random() * 200;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 20;

      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = y;
      positions[i + 2] = Math.sin(angle) * radius;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.7,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(geometry, material);
    this.galaxyGroup.add(stars);
    this.starSystem = stars;
  }

  update() {
    if (this.starSystem) {
      this.galaxyGroup.rotation.z += 0.0001;
    }
  }

  respondToAudio(frequency) {
    if (this.starSystem && this.starSystem.material) {
      const scale = 0.5 + frequency * 2;
      this.starSystem.scale.set(scale, scale, scale);
    }
  }
}

let galaxySystem;