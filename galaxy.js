// ============================================================
// NUESTRO UNIVERSO ❤️
// galaxy.js - 3D Galaxy Visualization
// ============================================================

class GalaxyScene {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.stars = [];
    this.galaxies = [];
    this.particles = [];
    this.init();
  }

  init() {
    this.setupScene();
    this.createGalaxy();
    this.createStars();
    this.createNebula();
    this.animate();
    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 100;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('bg'),
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff4da6, 1, 1000);
    pointLight.position.set(50, 50, 50);
    pointLight.castShadow = true;
    this.scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x6d5dfc, 0.8, 800);
    pointLight2.position.set(-50, -50, 30);
    this.scene.add(pointLight2);
  }

  createGalaxy() {
    const geometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color(0xff4da6),
      new THREE.Color(0x6d5dfc),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xffd166),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < count * 3; i += 3) {
      // Spiral galaxy distribution
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 20;
      const height = (Math.random() - 0.5) * 40;

      positions[i] = Math.cos(angle) * distance;
      positions[i + 1] = height;
      positions[i + 2] = Math.sin(angle) * distance;

      // Random colors
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.7,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
    this.galaxies.push({
      mesh: points,
      rotationSpeed: 0.0003
    });
  }

  createStars() {
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 400;
      positions[i + 1] = (Math.random() - 0.5) * 400;
      positions[i + 2] = (Math.random() - 0.5) * 400;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9
    });

    const stars = new THREE.Points(geometry, material);
    this.scene.add(stars);
    this.stars.push(stars);
  }

  createNebula() {
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 250;
      positions[i + 1] = (Math.random() - 0.5) * 250;
      positions[i + 2] = (Math.random() - 0.5) * 250;

      // Nebula colors: pink, purple, blue
      if (Math.random() > 0.5) {
        colors[i] = 1; // R
        colors[i + 1] = 0.3; // G
        colors[i + 2] = 0.65; // B
      } else {
        colors[i] = 0.42; // R
        colors[i + 1] = 0.37; // G
        colors[i + 2] = 0.99; // B
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.2
    });

    const nebula = new THREE.Points(geometry, material);
    this.scene.add(nebula);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate galaxies
    this.galaxies.forEach(galaxy => {
      galaxy.mesh.rotation.z += galaxy.rotationSpeed;
    });

    // Subtle camera movement
    this.camera.position.x += (Math.sin(Date.now() * 0.0001) * 0.1 - this.camera.position.x * 0.001);
    this.camera.position.y += (Math.cos(Date.now() * 0.00015) * 0.1 - this.camera.position.y * 0.001);
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Camera animation methods
  cameraMoveTo(target, duration = 2000) {
    const start = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    };

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.camera.position.x = start.x + (target.x - start.x) * this.easeInOutCubic(progress);
      this.camera.position.y = start.y + (target.y - start.y) * this.easeInOutCubic(progress);
      this.camera.position.z = start.z + (target.z - start.z) * this.easeInOutCubic(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
}

// Initialize galaxy scene
const galaxyScene = new GalaxyScene();
