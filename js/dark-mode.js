/* ===================================
   DARK MODE FUNCTIONALITY
   =================================== */

class DarkModeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.darkModeIcon = document.getElementById('darkModeIcon');
        this.body = document.body;
        this.storageKey = 'medic-center-dark-mode';
        
        this.init();
    }
    
    init() {
        // Load saved preference
        this.loadDarkModePreference();
        
        // Add event listener
        if (this.darkModeToggle) {
            this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!this.hasUserPreference()) {
                    this.setDarkMode(e.matches);
                }
            });
        }
        
        console.log('🌙 Dark Mode Manager initialized');
    }
    
    toggleDarkMode() {
        const isDarkMode = this.body.classList.contains('dark-mode');
        this.setDarkMode(!isDarkMode);
        this.saveDarkModePreference(!isDarkMode);
        
        // Add animation class
        if (this.darkModeIcon) {
            this.darkModeIcon.classList.add(isDarkMode ? 'light-mode-transition' : 'dark-mode-transition');
            setTimeout(() => {
                this.darkModeIcon.classList.remove('light-mode-transition', 'dark-mode-transition');
            }, 500);
        }
    }
    
    setDarkMode(isDark) {
        if (isDark) {
            this.body.classList.add('dark-mode');
            this.updateIcon('sun');
            this.updateToggleTitle('Switch to Light Mode');
        } else {
            this.body.classList.remove('dark-mode');
            this.updateIcon('moon');
            this.updateToggleTitle('Switch to Dark Mode');
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('darkModeChanged', { 
            detail: { isDarkMode: isDark } 
        }));
    }
    
    updateIcon(type) {
        if (!this.darkModeIcon) return;
        
        if (type === 'sun') {
            this.darkModeIcon.className = 'fas fa-sun';
        } else {
            this.darkModeIcon.className = 'fas fa-moon';
        }
    }
    
    updateToggleTitle(title) {
        if (this.darkModeToggle) {
            this.darkModeToggle.setAttribute('title', title);
        }
    }
    
    saveDarkModePreference(isDark) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(isDark));
        } catch (error) {
            console.warn('Could not save dark mode preference:', error);
        }
    }
    
    loadDarkModePreference() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved !== null) {
                const isDark = JSON.parse(saved);
                this.setDarkMode(isDark);
                return;
            }
        } catch (error) {
            console.warn('Could not load dark mode preference:', error);
        }
        
        // If no saved preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setDarkMode(true);
        }
    }
    
    hasUserPreference() {
        try {
            return localStorage.getItem(this.storageKey) !== null;
        } catch (error) {
            return false;
        }
    }
    
    isDarkMode() {
        return this.body.classList.contains('dark-mode');
    }
    
    // Public methods for external use
    enableDarkMode() {
        this.setDarkMode(true);
        this.saveDarkModePreference(true);
    }
    
    disableDarkMode() {
        this.setDarkMode(false);
        this.saveDarkModePreference(false);
    }
}

// Enhanced Dark Mode Features
class DarkModeEnhancements {
    constructor(darkModeManager) {
        this.darkModeManager = darkModeManager;
        this.init();
    }
    
    init() {
        // Listen for dark mode changes
        window.addEventListener('darkModeChanged', (e) => {
            this.handleDarkModeChange(e.detail.isDarkMode);
        });
        
        // Enhance form elements
        this.enhanceFormElements();
        
        // Enhance images for dark mode
        this.enhanceImages();
    }
    
    handleDarkModeChange(isDarkMode) {
        // Update meta theme color
        this.updateThemeColor(isDarkMode);
        
        // Update any charts or graphs if present
        this.updateCharts(isDarkMode);
        
        // Update any third-party widgets
        this.updateThirdPartyWidgets(isDarkMode);
    }
    
    updateThemeColor(isDarkMode) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = isDarkMode ? '#121212' : '#1e88e5';
    }
    
    enhanceFormElements() {
        // Add focus enhancement for form elements in dark mode
        const formElements = document.querySelectorAll('input, textarea, select');
        formElements.forEach(element => {
            element.addEventListener('focus', () => {
                if (this.darkModeManager.isDarkMode()) {
                    element.style.boxShadow = '0 0 0 0.2rem rgba(30, 136, 229, 0.25)';
                }
            });
            
            element.addEventListener('blur', () => {
                element.style.boxShadow = '';
            });
        });
    }
    
    enhanceImages() {
        // You can add logic here to swap images for dark mode versions
        // For example, logos, icons, etc.
        const images = document.querySelectorAll('img[data-dark-src]');
        images.forEach(img => {
            const lightSrc = img.src;
            const darkSrc = img.getAttribute('data-dark-src');
            
            window.addEventListener('darkModeChanged', (e) => {
                img.src = e.detail.isDarkMode ? darkSrc : lightSrc;
            });
        });
    }
    
    updateCharts(isDarkMode) {
        // Placeholder for chart updates
        // If you have charts (Chart.js, etc.), update their colors here
        console.log('Charts updated for', isDarkMode ? 'dark' : 'light', 'mode');
    }
    
    updateThirdPartyWidgets(isDarkMode) {
        // Placeholder for third-party widget updates
        // Update any embedded widgets, maps, etc.
        console.log('Third-party widgets updated for', isDarkMode ? 'dark' : 'light', 'mode');
    }
}

// Keyboard Shortcuts
class DarkModeKeyboardShortcuts {
    constructor(darkModeManager) {
        this.darkModeManager = darkModeManager;
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + D to toggle dark mode
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.darkModeManager.toggleDarkMode();
                
                // Show a brief notification
                this.showToggleNotification();
            }
        });
    }
    
    showToggleNotification() {
        const isDark = this.darkModeManager.isDarkMode();
        const message = `${isDark ? 'Dark' : 'Light'} mode activated`;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isDark ? '#333' : '#fff'};
            color: ${isDark ? '#fff' : '#333'};
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            transform: translateX(100%);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
}

// Initialize Dark Mode when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Dark Mode Manager
    const darkModeManager = new DarkModeManager();
    
    // Initialize Enhancements
    const darkModeEnhancements = new DarkModeEnhancements(darkModeManager);
    
    // Initialize Keyboard Shortcuts
    const keyboardShortcuts = new DarkModeKeyboardShortcuts(darkModeManager);
    
    // Make darkModeManager globally available
    window.darkModeManager = darkModeManager;
    
    console.log('🌙 Dark Mode System fully initialized');
});
