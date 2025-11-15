/**
 * Application Configuration
 * Central configuration for the portfolio application
 */

export const config = {
  // Theme settings
  theme: {
    defaultMode: 'light',
    storageKey: 'darkMode'
  },

  // Language settings
  language: {
    default: 'de',
    supported: ['de', 'en'],
    storageKey: 'language'
  },

  // Animation settings
  animation: {
    blobSmoothness: 0.05,
    blobIdleSpeed: 0.001,
    blobIdleTimeout: 3000,
    cardRevealThreshold: 0.1,
    cardRevealMargin: '0px 0px -50px 0px'
  },

  // Navigation settings
  navigation: {
    hideScrollThreshold: 100,
    hideDelay: 300
  },

  // Form settings
  form: {
    submitDelay: 1500
  }
};
