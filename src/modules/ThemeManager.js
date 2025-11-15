/**
 * Theme Manager Module
 * Handles dark/light mode switching and persistence
 */

import { config } from '../config/config.js';

export class ThemeManager {
  constructor() {
    this.storageKey = config.theme.storageKey;
    this.isDarkMode = this.loadThemeFromStorage();
    this.html = document.documentElement;
  }

  /**
   * Load theme preference from localStorage
   */
  loadThemeFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'true';
  }

  /**
   * Save theme preference to localStorage
   */
  saveThemeToStorage() {
    localStorage.setItem(this.storageKey, this.isDarkMode);
  }

  /**
   * Apply theme to document
   */
  applyTheme() {
    if (this.isDarkMode) {
      this.html.classList.remove('light');
      this.html.classList.add('dark');
    } else {
      this.html.classList.remove('dark');
      this.html.classList.add('light');
    }
  }

  /**
   * Toggle between dark and light mode
   */
  toggle() {
    this.isDarkMode = !this.isDarkMode;
    this.saveThemeToStorage();
    this.applyTheme();
    this.animateToggle();
    
    // Emit custom event for other modules to listen
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { isDark: this.isDarkMode } 
    }));
  }

  /**
   * Animate theme toggle button
   */
  animateToggle() {
    if (typeof anime !== 'undefined') {
      const button = document.querySelector('.theme-toggle');
      if (button) {
        anime({
          targets: button,
          scale: [1, 0.95, 1.05, 1],
          duration: 300,
          easing: 'easeOutQuart'
        });
      }
    }
  }

  /**
   * Initialize theme on page load
   */
  init() {
    this.applyTheme();
    this.setupEventListener();
  }

  /**
   * Set up theme toggle button listener
   */
  setupEventListener() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggle());
    }
  }
}
