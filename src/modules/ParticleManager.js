/**
 * Particle Manager Module
 * Creates and manages modern particle background effects
 */

export class ParticleManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.particleCount = this.isMobile() ? 30 : 60; // Fewer on mobile for performance
    this.mouse = { x: null, y: null, radius: 100 };
    this.animationId = null;
  }

  /**
   * Check if device is mobile
   */
  isMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Create canvas for particles
   */
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particle-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.opacity = '0.6';
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  /**
   * Resize canvas to match window
   */
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  /**
   * Initialize particles with random positions
   */
  initParticles() {
    this.particles = [];
    const isDark = document.documentElement.classList.contains('dark');
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: isDark 
          ? `rgba(100, 181, 246, ${Math.random() * 0.5 + 0.3})`
          : `rgba(74, 144, 226, ${Math.random() * 0.4 + 0.2})`,
        connections: []
      });
    }
  }

  /**
   * Update particle colors when theme changes
   */
  updateTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    this.particles.forEach(particle => {
      particle.color = isDark 
        ? `rgba(100, 181, 246, ${Math.random() * 0.5 + 0.3})`
        : `rgba(74, 144, 226, ${Math.random() * 0.4 + 0.2})`;
    });
  }

  /**
   * Handle mouse movement
   */
  setupMouseTracking() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  /**
   * Draw a single particle
   */
  drawParticle(particle) {
    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * Connect nearby particles with lines
   */
  connectParticles() {
    const isDark = document.documentElement.classList.contains('dark');
    const connectionDistance = this.isMobile() ? 80 : 120;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3;
          this.ctx.strokeStyle = isDark 
            ? `rgba(100, 181, 246, ${opacity})`
            : `rgba(74, 144, 226, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  /**
   * Update particle positions
   */
  updateParticles() {
    this.particles.forEach(particle => {
      // Move particle
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
        }
      }

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY *= -1;
      }

      // Keep within bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }

  /**
   * Animation loop
   */
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateParticles();
    this.connectParticles();
    
    this.particles.forEach(particle => {
      this.drawParticle(particle);
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Initialize particle system
   */
  init() {
    this.createCanvas();
    this.initParticles();
    this.setupMouseTracking();
    this.animate();
    
    // Listen for theme changes
    document.addEventListener('themeChanged', () => {
      this.updateTheme();
    });
  }

  /**
   * Clean up
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
