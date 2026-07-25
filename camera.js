// ============================================================
// NUESTRO UNIVERSO ❤️
// camera.js - Camera Controls and Animations
// ============================================================

class CameraController {
  constructor(galaxyScene) {
    this.galaxyScene = galaxyScene;
    this.defaultPosition = { x: 0, y: 0, z: 100 };
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.setupMouseTracking();
  }

  setupMouseTracking() {
    document.addEventListener('mousemove', (event) => {
      if (this.isAnimating) return;

      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.galaxyScene.camera.position.x += (x * 10 - this.galaxyScene.camera.position.x) * 0.05;
      this.galaxyScene.camera.position.y += (y * 10 - this.galaxyScene.camera.position.y) * 0.05;
    });
  }

  zoomTo(target, duration = 1500) {
    this.isAnimating = true;
    const start = {
      x: this.galaxyScene.camera.position.x,
      y: this.galaxyScene.camera.position.y,
      z: this.galaxyScene.camera.position.z
    };

    const startFOV = this.galaxyScene.camera.fov;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeInOutCubic(progress);

      this.galaxyScene.camera.position.x = start.x + (target.x - start.x) * eased;
      this.galaxyScene.camera.position.y = start.y + (target.y - start.y) * eased;
      this.galaxyScene.camera.position.z = start.z + (target.z - start.z) * eased;

      if (target.fov) {
        this.galaxyScene.camera.fov = startFOV + (target.fov - startFOV) * eased;
        this.galaxyScene.camera.updateProjectionMatrix();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
      }
    };

    animate();
  }

  orbit(center, radius, duration = 3000) {
    this.isAnimating = true;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      const angle = progress * Math.PI * 2;

      this.galaxyScene.camera.position.x = center.x + Math.cos(angle) * radius;
      this.galaxyScene.camera.position.y = center.y + Math.sin(angle) * radius * 0.5;
      this.galaxyScene.camera.position.z = center.z + Math.sin(angle) * radius * 0.5;

      this.galaxyScene.camera.lookAt(center.x, center.y, center.z);
      requestAnimationFrame(animate);
    };

    animate();
  }

  stopOrbit() {
    this.isAnimating = false;
  }

  resetCamera(duration = 1000) {
    this.zoomTo(this.defaultPosition, duration);
  }

  shake(intensity = 0.5, duration = 500) {
    const startTime = Date.now();
    const originalPos = {
      x: this.galaxyScene.camera.position.x,
      y: this.galaxyScene.camera.position.y,
      z: this.galaxyScene.camera.position.z
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < duration) {
        this.galaxyScene.camera.position.x = originalPos.x + (Math.random() - 0.5) * intensity;
        this.galaxyScene.camera.position.y = originalPos.y + (Math.random() - 0.5) * intensity;
        this.galaxyScene.camera.position.z = originalPos.z + (Math.random() - 0.5) * intensity;

        requestAnimationFrame(animate);
      } else {
        this.galaxyScene.camera.position.x = originalPos.x;
        this.galaxyScene.camera.position.y = originalPos.y;
        this.galaxyScene.camera.position.z = originalPos.z;
      }
    };

    animate();
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
}

// Initialize camera controller
const cameraController = new CameraController(galaxyScene);
