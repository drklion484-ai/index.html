// ============================================================
// NUESTRO UNIVERSO ❤️
// camera.js - Camera Control System
// ============================================================

class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.targetPosition = { x: 0, y: 0, z: 50 };
    this.currentPosition = { x: 0, y: 0, z: 50 };
    this.targetRotation = { x: 0, y: 0, z: 0 };
    this.mouseInfluence = 0.005;
    this.isShaking = false;
    this.init();
  }

  init() {
    this.updateCamera();
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    const animate = () => {
      this.currentPosition.x += (this.targetPosition.x - this.currentPosition.x) * 0.05;
      this.currentPosition.y += (this.targetPosition.y - this.currentPosition.y) * 0.05;
      this.currentPosition.z += (this.targetPosition.z - this.currentPosition.z) * 0.05;

      this.camera.position.set(
        this.currentPosition.x,
        this.currentPosition.y,
        this.currentPosition.z
      );

      this.camera.lookAt(0, 0, 0);
      requestAnimationFrame(animate);
    };

    animate();
  }

  updateFromMouse(mouse) {
    this.targetPosition.x = mouse.x * 15;
    this.targetPosition.y = mouse.y * 15;
  }

  zoomTo(target, duration = 800) {
    const startPos = { ...this.currentPosition };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.targetPosition.x = startPos.x + (target.x - startPos.x) * progress;
      this.targetPosition.y = startPos.y + (target.y - startPos.y) * progress;
      this.targetPosition.z = startPos.z + (target.z - startPos.z) * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  shake(intensity = 0.5, duration = 500) {
    if (this.isShaking) return;
    this.isShaking = true;
    const startTime = Date.now();
    const originalPos = { ...this.currentPosition };

    const shake = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.max(0, 1 - elapsed / duration);

      this.camera.position.x = originalPos.x + (Math.random() - 0.5) * intensity * progress;
      this.camera.position.y = originalPos.y + (Math.random() - 0.5) * intensity * progress;
      this.camera.position.z = originalPos.z + (Math.random() - 0.5) * intensity * progress;

      if (progress > 0) {
        requestAnimationFrame(shake);
      } else {
        this.isShaking = false;
      }
    };

    shake();
  }

  reset() {
    this.targetPosition = { x: 0, y: 0, z: 50 };
  }
}

let cameraController;