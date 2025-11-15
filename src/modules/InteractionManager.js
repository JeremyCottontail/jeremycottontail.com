/**
 * Interaction Manager Module
 * Handles button interactions, card hovers, and UI effects
 */

export class InteractionManager {
  constructor(languageManager) {
    this.languageManager = languageManager;
    this.isMobile = this.isMobileDevice();
    this.isTouch = this.isTouchDevice();
  }

  /**
   * Set up button hover animations
   */
  setupButtonHovers() {
    document.querySelectorAll('.btn-gradient').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (typeof anime !== 'undefined') {
          anime({
            targets: btn,
            scale: 1.05,
            duration: 200,
            easing: 'easeOutQuart'
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (typeof anime !== 'undefined') {
          anime({
            targets: btn,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuart'
          });
        }
      });
    });
  }

  /**
   * Set up card 3D tilt effect
   */
  setupCardHovers() {
    document.querySelectorAll('.card-hover').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (typeof anime !== 'undefined') {
          anime({
            targets: card,
            rotateX: -5,
            rotateY: 5,
            translateY: -8,
            duration: 0,
            easing: 'easeOutQuart'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (typeof anime !== 'undefined') {
          anime({
            targets: card,
            rotateX: 0,
            rotateY: 0,
            translateY: 0,
            duration: 200,
            easing: 'easeOutQuart'
          });
        } else {
          card.style.transform = '';
        }
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
    });
  }

  /**
   * Set up hero CTA button actions
   */
  setupHeroButtons() {
    document.querySelectorAll('.hero-content button').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.toLowerCase();
        let targetSection;
        
        if (text.includes('tools') || text.includes('erkunden')) {
          targetSection = document.querySelector('#tools');
        } else {
          targetSection = document.querySelector('#footer');
        }
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Create ripple effect on button click
   */
  createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  init() {
    // 🚨 SKIP ALL HOVER INTERACTIONS ON MOBILE/TABLET
    if (this.isMobile || this.isTouch) {
      console.log('Mobile/touch device detected - disabling hover interactions');
      
      // Keep ONLY essential click handlers - no hover/touchmove listeners
      this.setupHeroButtons();
      return;
    }
    
    // Desktop only: keep all fancy effects
    this.setupButtonHovers();
    this.setupCardHovers();
    this.setupHeroButtons();
  }


    /**
     * Check if device is touch-only (no mouse)
     */
    isTouchDevice() {
      return window.matchMedia("(hover: none)").matches || 
             'ontouchstart' in window || 
             navigator.maxTouchPoints > 0;
    }
    
    isMobileDevice() {
    return window.innerWidth < 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
