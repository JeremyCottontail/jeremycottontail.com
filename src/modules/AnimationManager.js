/**
 * Animation Manager Module
 * Handles all animations including blob, hero, and scroll reveals
 */

import { config } from '../config/config.js';

export class AnimationManager {
  constructor() {
    this.animationConfig = config.animation;
  }

  setupBlobAnimation() {
  // Skip on mobile for performance
  if (window.innerWidth < 768 || this.isTouchDevice()) {
    return;
  }
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'mouse-follow-canvas';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let effectX = mouseX;
  let effectY = mouseY;
  let isMouseMoving = false;
  let idleTime = 0;
  
  // Resize handler
  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Mouse tracking with performance throttle
  let mouseTimer;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    idleTime = 0;
    
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      isMouseMoving = false;
    }, 2000);
  });
  
  // Animation loop
  const animate = () => {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Smooth easing (adjust 0.03 for faster/slower follow)
    effectX += (mouseX - effectX) * 0.03;
    effectY += (mouseY - effectY) * 0.03;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Main gradient circle
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.28;
    const gradient = ctx.createRadialGradient(
      effectX, effectY, 0,
      effectX, effectY, radius
    );
    
    if (isDark) {
      gradient.addColorStop(0, 'rgba(100, 181, 246, 0.4)');
      gradient.addColorStop(0.4, 'rgba(139, 92, 246, 0.3)');
      gradient.addColorStop(1, 'transparent');
    } else {
      gradient.addColorStop(0, 'rgba(74, 144, 226, 0.8)');
      gradient.addColorStop(0.4, 'rgba(255, 107, 107, 0.3)');
      gradient.addColorStop(1, 'transparent');
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(effectX, effectY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Secondary subtle glow
    const glowRadius = radius * 0.8;
    const glowGradient = ctx.createRadialGradient(
      effectX, effectY, 0,
      effectX, effectY, glowRadius
    );
    
    glowGradient.addColorStop(0, isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 107, 107, 0.2)');
    glowGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(effectX, effectY, glowRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Idle animation when mouse stops
    if (!isMouseMoving) {
      idleTime += 0.008;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const idleRadius = 120;
      
      mouseX = centerX + Math.sin(idleTime) * idleRadius;
      mouseY = centerY + Math.cos(idleTime * 0.7) * idleRadius * 0.8;
    }
    
    requestAnimationFrame(animate);
  };
  
  animate();
}


  /**
   * Set up scroll-based reveal animations
   */
  setupScrollAnimations() {
    if (typeof anime === 'undefined') {
      this.setupFallbackAnimations();
      return;
    }

    const observerOptions = {
      threshold: this.animationConfig.cardRevealThreshold,
      rootMargin: this.animationConfig.cardRevealMargin
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          if (entry.target.classList.contains('card-hover')) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              easing: 'easeOutQuart'
            });
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .card-hover').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Fallback animations when anime.js is not available
   */
  setupFallbackAnimations() {
    const observerOptions = {
      threshold: this.animationConfig.cardRevealThreshold,
      rootMargin: this.animationConfig.cardRevealMargin
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .card-hover').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Animate hero section on page load
   */
  animateHero() {
    if (typeof anime === 'undefined') {
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }
      return;
    }

    anime({
      targets: '.hero-content',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      delay: 500,
      easing: 'easeOutQuart'
    });

    setTimeout(() => {
      const typewriter = document.querySelector('.typewriter');
      if (typewriter) {
        typewriter.style.width = '0';
        anime({
          targets: typewriter,
          width: '100%',
          duration: 3000,
          easing: 'easeOutQuart'
        });
      }
    }, 1500);
  }
  
  // Add helper method
    isTouchDevice() {
      return window.matchMedia("(hover: none)").matches || 
             'ontouchstart' in window;
    }

  /**
   * Initialize all animations
   */
  init() {
    this.setupBlobAnimation();
    this.setupScrollAnimations();
    this.animateHero();
  }
}
