/**
 * Main Application Entry Point
 * Orchestrates all modules and initializes the application
 */

import { ThemeManager } from './modules/ThemeManager.js';
import { LanguageManager } from './modules/LanguageManager.js';
import { AnimationManager } from './modules/AnimationManager.js';
import { NavigationManager } from './modules/NavigationManager.js';
import { InteractionManager } from './modules/InteractionManager.js';
import { FormManager } from './modules/FormManager.js';
import { ParticleManager } from './modules/ParticleManager.js';
import { TiltEffectManager } from './modules/TiltEffectManager.js';

/**
 * Portfolio Application
 * Main application class that coordinates all modules
 */
class PortfolioApp {
  constructor() {
    this.modules = {};
  }

  /**
   * Initialize all modules in the correct order
   */
  init() {
    try {
      // Initialize core modules first
      this.modules.theme = new ThemeManager();
      this.modules.language = new LanguageManager();
      
      // Initialize theme and language (must happen before other visual modules)
      this.modules.theme.init();
      this.modules.language.init();
      
      // Initialize visual and interactive modules
      this.modules.animation = new AnimationManager();
      this.modules.navigation = new NavigationManager();
      this.modules.interaction = new InteractionManager(this.modules.language);
      this.modules.form = new FormManager(this.modules.language);
      this.modules.particles = new ParticleManager();
      this.modules.tiltEffect = new TiltEffectManager();
      
      // Start all modules
      this.modules.animation.init();
      this.modules.navigation.init();
      this.modules.interaction.init();
      this.modules.form.init();
      this.modules.particles.init();
      this.modules.tiltEffect.init();
      
      console.log('Portfolio application initialized successfully');
    } catch (error) {
      console.error('Error initializing portfolio application:', error);
    }
  }

  /**
   * Get a specific module instance
   */
  getModule(moduleName) {
    return this.modules[moduleName];
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
  window.portfolioApp.init();
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
