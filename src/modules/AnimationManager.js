/**
 * Animation Manager Module
 * Handles all animations including blob, hero, and scroll reveals
 */

import { config } from '../config/config.js';

export class AnimationManager {
  constructor() {
    this.isMouseMoving = false;
    this.idleTimer = null;
    this.animationConfig = config.animation;
  }

  /**
   * Set up floating blob background animation
   */
  setupBlobAnimation() {
    const blob = document.getElementById('blob');
    if (!blob) return;
    
    // Mobile: use only idle animation, no mouse tracking
      if (window.innerWidth < 768 || this.isTouchDevice()) {
        blob.style.display = 'block';
        this.startIdleAnimation();
        return;
      }
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = window.innerWidth / 2;
    let blobY = window.innerHeight / 2;

    // Mouse movement handler
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      this.isMouseMoving = true;

      // Restart idle timer
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        this.isMouseMoving = false;
      }, this.animationConfig.blobIdleTimeout);
    });

    // Smooth blob following animation
    const animateBlob = () => {
      const deltaX = mouseX - blobX;
      const deltaY = mouseY - blobY;
      
      blobX += deltaX * this.animationConfig.blobSmoothness;
      blobY += deltaY * this.animationConfig.blobSmoothness;
      
      blob.style.left = (blobX - 250) + 'px';
      blob.style.top = (blobY - 250) + 'px';
      
      requestAnimationFrame(animateBlob);
    };

    animateBlob();
    this.startIdleAnimation();
  }

  /**
   * Start idle animation for blob when mouse is not moving
   */
  startIdleAnimation() {
    const blob = document.getElementById('blob');
    if (!blob) return;
    
    let time = 0;
    
    const idleAnimate = () => {
      if (!this.isMouseMoving) {
        time += this.animationConfig.blobIdleSpeed;
        const x = Math.sin(time) * 50;
        const y = Math.cos(time * 0.7) * 40;
        
        blob.style.transform = `translate(${x}px, ${y}px)`;
      }
      requestAnimationFrame(idleAnimate);
    };
    
    idleAnimate();
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
