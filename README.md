# jeremycottontail.com - Portfolio Website

## Project Overview

This is a modern, responsive portfolio website for Jeremy Haas, showcasing his professional background, AI development infrastructure, and homelab setup. The site features a sleek dark/light theme toggle, multilingual support (German/English), interactive elements, and showcases his work in AI development and digital marketing.

The website is built with vanilla JavaScript, HTML, and CSS with no external frameworks. It implements modern UI techniques including:
- Dynamic theme switching (light/dark mode)
- Multilingual content support
- Interactive animations and transitions
- Responsive design for all device sizes
- Custom CSS animations and gradients
- Interactive timeline for career history
- Card-based layout for tools and services

## Key Features

### Technical Architecture
- Single-page application built with vanilla JavaScript
- Modular architecture with dedicated modules for different functionalities
- Responsive design using CSS Grid and Flexbox
- CSS variables for consistent theming
- Custom animations and transitions
- Mobile-first responsive design

### Modules
The application is organized into several modules:
- `ThemeManager.js` - Manages light/dark mode themes
- `LanguageManager.js` - Handles multilingual content
- `AnimationManager.js` - Controls animations and scroll effects
- `NavigationManager.js` - Manages navigation and scroll behavior
- `InteractionManager.js` - Handles user interactions
- `FormManager.js` - Manages form handling
- `ParticleManager.js` - Controls background particles
- `TiltEffectManager.js` - Implements 3D tilt effects

### Design Elements
- Floating navigation bar with theme toggle and language selector
- Animated gradient text and buttons
- Interactive cards with hover effects
- Floating blob background element
- Timeline visualization for career history
- Responsive grid layouts for tools and services

## Sections

### Home
- Introduction with animated text
- Professional profile with photo
- Call-to-action buttons

### Tools & Services
- Showcase of self-hosted tools and services
- Interactive cards with status indicators
- Technology stack tags for each tool

### AI Development Rig
- Detailed overview of local AI infrastructure
- Hardware specifications and performance metrics
- Visual representation of the AI rig

### Homelab Infrastructure
- Comprehensive view of home lab setup
- Network, compute, and storage components
- Visual representation of the homelab

### My Journey
- Interactive timeline of professional experience
- Career highlights and achievements
- Skills and competencies

### Diplomas & Certifications
- Information about ongoing and completed education
- Advanced programs in AI and digital leadership

### Contact
- Social media links
- Professional contact information

## Building and Running

This is a static website that runs directly in the browser. No build process is required.

To run the website:
1. Open `index.html` in a web browser
2. The site will automatically initialize all modules and features

## Development Conventions

### File Structure
```
jeremycottontail.com/
├── index.html           # Main HTML structure
├── src/
│   ├── main.js          # Main application entry point
│   ├── config/
│   │   └── config.js    # Application configuration
│   ├── modules/         # JavaScript modules
│   │   ├── AnimationManager.js
│   │   ├── FormManager.js
│   │   ├── InteractionManager.js
│   │   ├── LanguageManager.js
│   │   ├── NavigationManager.js
│   │   ├── ParticleManager.js
│   │   ├── ThemeManager.js
│   │   └── TiltEffectManager.js
│   └── styles/
│       └── main.css     # Main stylesheet
├── resources/           # Images and assets
│   ├── ai-rig.JPEG
│   ├── homelab.jpeg
│   └── N47_Jeremy_Haas.jpg
└── .env                 # Environment variables (if needed)
```

### Styling Approach
- Uses CSS variables for theming
- Custom animations and transitions
- Responsive design with media queries
- Mobile-first approach
- CSS Grid and Flexbox for layouts
- Gradient backgrounds and text effects
- Custom hover and focus states

### JavaScript Patterns
- Modular architecture with ES6 classes
- Event-driven programming
- DOM manipulation with vanilla JavaScript
- Configuration-driven approach
- Clean separation of concerns between modules

### Multilingual Support
The site supports German and English languages with:
- Language toggle buttons
- Data attributes for content translation
- Language persistence in localStorage
- Dynamic content switching

### Theme Management
- Light/dark mode toggle
- Theme persistence in localStorage
- CSS variable-based theming
- Smooth transitions between themes
- Automatic theme detection from system preference


## Author

Jeremy Haas
- GitHub: [@jeremycottontail](https://github.com/jeremycottontail)
- LinkedIn: [Jeremy Haas](https://www.linkedin.com/in/haasjeremy/)
