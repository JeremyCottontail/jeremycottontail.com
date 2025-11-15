/**
 * Form Manager Module
 * Handles contact form submission and validation
 */

import { config } from '../config/config.js';

export class FormManager {
  constructor(languageManager) {
    this.languageManager = languageManager;
    this.form = document.querySelector('form');
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    const lang = this.languageManager.getCurrentLanguage();
    
    // Loading animation
    submitBtn.textContent = lang === 'de' ? 'Wird gesendet...' : 'Sending...';
    submitBtn.disabled = true;
    
    if (typeof anime !== 'undefined') {
      anime({
        targets: submitBtn,
        scale: [1, 0.95, 1],
        duration: 600,
        easing: 'easeOutQuart',
        complete: () => {
          setTimeout(() => {
            this.showSuccessModal();
            this.form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, config.form.submitDelay);
        }
      });
    } else {
      setTimeout(() => {
        this.showSuccessModal();
        this.form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, config.form.submitDelay);
    }
  }

  /**
   * Show success modal after form submission
   */
  showSuccessModal() {
    const lang = this.languageManager.getCurrentLanguage();
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center transform scale-90">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-2xl font-bold mb-4 gradient-text">
          ${lang === 'de' ? 'Nachricht gesendet!' : 'Message sent!'}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          ${lang === 'de' ? 'Vielen Dank für Ihre Nachricht. Ich werde mich bald bei Ihnen melden.' : 'Thank you for your message. I will get back to you soon.'}
        </p>
        <button class="btn-gradient px-6 py-2 rounded-lg text-white font-semibold">
          ${lang === 'de' ? 'Schließen' : 'Close'}
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    if (typeof anime !== 'undefined') {
      anime({
        targets: modal.querySelector('div'),
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuart'
      });
    } else {
      modal.querySelector('div').style.transform = 'scale(1)';
      modal.querySelector('div').style.opacity = '1';
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.tagName === 'BUTTON') {
        if (typeof anime !== 'undefined') {
          anime({
            targets: modal.querySelector('div'),
            scale: [1, 0.9],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuart',
            complete: () => modal.remove()
          });
        } else {
          modal.remove();
        }
      }
    });
  }

  /**
   * Initialize form handling
   */
  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
}
