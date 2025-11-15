/**
 * Tilt Effect Manager Module
 * Handles 3D card hover effects with mouse tracking
 */

export class TiltEffectManager {
  constructor() {
    this.cards = [];
    this.maxTilt = 10; // Maximum tilt in degrees
    this.tiltEasing = 0.1; // Smoothness of the tilt
  }

  init() {
    // 🚨 SKIP TILT ON MOBILE - CAUSES SCROLL BLOCKING
    if (this.isMobileDevice()) {
      console.log('Mobile device detected - disabling 3D tilt effects');
      return;
    }
    
    this.cards = document.querySelectorAll('.card-hover');
    this.setupEventListeners();
    console.log('Tilt effect manager initialized for', this.cards.length, 'cards');
  }
  
  isMobileDevice() {
    return window.innerWidth < 768 || 
           window.matchMedia("(hover: none)").matches ||
           navigator.maxTouchPoints > 0;
  }


  /**
   * Set up event listeners for cards
   */
  setupEventListeners() {
    this.cards.forEach(card => {
      this.setupCardEvents(card);
    });
  }

  /**
   * Set up events for individual card
   */
  setupCardEvents(card) {
    // Mouse enter
    card.addEventListener('mouseenter', (e) => {
      // Add glow effect
      card.style.zIndex = '10';
    });

    // Mouse leave
    card.addEventListener('mouseleave', (e) => {
      this.resetTilt(card);
      
      // Remove glow effect
      card.style.zIndex = '';
    });

    // Mouse move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate center point
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles
      const rotateX = (y - centerY) / centerY * -this.maxTilt;
      const rotateY = (x - centerX) / centerX * this.maxTilt;
      
      // Apply smooth tilt
      this.applyTilt(card, rotateX, rotateY);
    });

    // Touch events for mobile
    card.addEventListener('touchstart', (e) => {
      this.handleTouchMove(e, card);
    });

    card.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.handleTouchMove(e, card);
    });

    card.addEventListener('touchend', () => {
      this.resetTilt(card);
    });
  }

  /**
   * Handle touch move events
   */
  handleTouchMove(e, card) {
    const touch = e.touches[0];
    if (!touch) return;
    
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -this.maxTilt;
    const rotateY = (x - centerX) / centerX * this.maxTilt;
    
    this.applyTilt(card, rotateX, rotateY);
  }

  /**
   * Apply tilt to card
   */
  applyTilt(card, rotateX, rotateY) {
    card.style.setProperty('--tilt-rotate-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-rotate-y', `${rotateY}deg`);
    card.classList.add('tilt');
  }

  /**
   * Reset tilt on card
   */
  resetTilt(card) {
    card.style.setProperty('--tilt-rotate-x', '0deg');
    card.style.setProperty('--tilt-rotate-y', '0deg');
    card.classList.remove('tilt');
  }



  /**
   * Clean up
   */
  destroy() {
    this.cards.forEach(card => {
      const clone = card.cloneNode(true);
      card.parentNode.replaceChild(clone, card);
    });
  }
}
