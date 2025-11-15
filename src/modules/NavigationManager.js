/**
 * Navigation Manager Module
 * Handles navigation behavior and interactions
 */

import { config } from '../config/config.js';

export class NavigationManager {
  constructor() {
    this.nav = document.querySelector('.floating-nav');
    this.lastScrollY = window.scrollY;
    this.isNavVisible = true;
  }

  /**
   * Set up floating navigation with auto-hide on scroll
   */
  setupFloatingNav() {
    if (!this.nav) return;
    
    this.nav.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > this.lastScrollY && currentScrollY > config.navigation.hideScrollThreshold) {
        // Scrolling down - hide nav
        if (this.isNavVisible) {
          this.nav.style.transform = 'translateX(-50%) translateY(-100px)';
          this.nav.style.opacity = '0';
          this.isNavVisible = false;
        }
      } else {
        // Scrolling up - show nav
        if (!this.isNavVisible) {
          this.nav.style.transform = 'translateX(-50%) translateY(0)';
          this.nav.style.opacity = '1';
          this.isNavVisible = true;
        }
      }
      
      this.lastScrollY = currentScrollY;
    });
  }

  /**
   * Set up smooth scrolling for navigation links
   */
  setupSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Initialize navigation
   */
  init() {
    this.setupFloatingNav();
    this.setupSmoothScroll();
  }
}
