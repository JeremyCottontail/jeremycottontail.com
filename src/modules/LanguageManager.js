/**
 * Language Manager Module
 * Handles internationalization and language switching
 */

import { config } from '../config/config.js';

export class LanguageManager {
  constructor() {
    this.storageKey = config.language.storageKey;
    this.currentLanguage = this.loadLanguageFromStorage();
  }

  /**
   * Load language preference from localStorage
   */
  loadLanguageFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    return config.language.supported.includes(stored) ? stored : config.language.default;
  }

  /**
   * Save language preference to localStorage
   */
  saveLanguageToStorage() {
    localStorage.setItem(this.storageKey, this.currentLanguage);
  }

  /**
   * Update all text elements with the current language
   */
  updateText() {
    // Update regular text elements
    document.querySelectorAll(`[data-${this.currentLanguage}]`).forEach(element => {
      const text = element.getAttribute(`data-${this.currentLanguage}`);
      if (text) {
        element.textContent = text;
      }
    });

    // Update placeholder attributes
    document.querySelectorAll(`[data-${this.currentLanguage}-placeholder]`).forEach(element => {
      const placeholder = element.getAttribute(`data-${this.currentLanguage}-placeholder`);
      if (placeholder) {
        element.placeholder = placeholder;
      }
    });
  }

  /**
   * Update active language button styling
   */
  updateActiveButton() {
    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === this.currentLanguage) {
        btn.classList.add('active');
      }
    });
  }

  /**
   * Switch to a different language
   */
  switchTo(lang) {
    if (!config.language.supported.includes(lang)) {
      console.warn(`Language '${lang}' not supported`);
      return;
    }

    this.currentLanguage = lang;
    this.saveLanguageToStorage();
    this.updateText();
    this.updateActiveButton();
  }

  /**
   * Initialize language system
   */
  init() {
    this.updateText();
    this.updateActiveButton();
    this.setupEventListeners();
  }

  /**
   * Set up language switcher button listeners
   */
  setupEventListeners() {
    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.switchTo(lang);
        
        // Add scale animation
        if (typeof anime !== 'undefined') {
          anime({
            targets: btn,
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeOutQuart'
          });
        }
      });
    });
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}
