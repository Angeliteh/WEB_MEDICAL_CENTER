// Mobile Navbar Enhancement
// Mejoras para el menú móvil hamburguesa

class MobileNavbar {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🍔 Mobile Navbar initializing...');

        // Esperar a que los componentes se carguen
        setTimeout(() => {
            this.setupToggleButton();
            this.setupAutoClose();
            this.setupAnimations();
        }, 1000);

        console.log('✅ Mobile Navbar initialized');
    }

    setupToggleButton() {
        const toggleButton = document.querySelector('.mobile-menu-btn');
        const navbar = document.querySelector('#navigation');
        const navbarCollapse = document.querySelector('#navbarLinks');

        if (!toggleButton) {
            console.warn('⚠️ Mobile menu button not found');
            return;
        }

        if (!navbar || !navbarCollapse) {
            console.warn('⚠️ Navbar elements not found');
            return;
        }

        // Configurar el botón hamburguesa
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (this.isMenuOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        });

        console.log('🔘 Toggle button configured');
    }

    openMenu() {
        const toggleButton = document.querySelector('.mobile-menu-btn');
        const navbar = document.querySelector('#navigation');
        const navbarCollapse = document.querySelector('#navbarLinks');

        if (toggleButton && navbar && navbarCollapse) {
            this.isMenuOpen = true;
            toggleButton.setAttribute('aria-expanded', 'true');
            navbar.classList.add('show-mobile');
            navbarCollapse.classList.add('show');

            // Agregar overlay
            this.createOverlay();

            console.log('📱 Menu opened');
        }
    }

    closeMenu() {
        const toggleButton = document.querySelector('.mobile-menu-btn');
        const navbar = document.querySelector('#navigation');
        const navbarCollapse = document.querySelector('#navbarLinks');

        if (toggleButton && navbar && navbarCollapse) {
            this.isMenuOpen = false;
            toggleButton.setAttribute('aria-expanded', 'false');
            navbar.classList.remove('show-mobile');
            navbarCollapse.classList.remove('show');

            // Remover overlay
            this.removeOverlay();

            console.log('📱 Menu closed');
        }
    }

    createOverlay() {
        if (document.querySelector('.mobile-menu-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(overlay);

        // Fade in
        setTimeout(() => overlay.style.opacity = '1', 10);

        // Cerrar al hacer clic en overlay
        overlay.addEventListener('click', () => this.closeMenu());
    }

    removeOverlay() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }

    setupAutoClose() {
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerrar en móvil
                if (window.innerWidth <= 991) {
                    setTimeout(() => this.closeMenu(), 100);
                }
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            const navbar = document.querySelector('.navbar');
            const isClickInsideNavbar = navbar && navbar.contains(e.target);
            
            if (!isClickInsideNavbar && window.innerWidth <= 991) {
                this.closeMenu();
            }
        });

        console.log('🎯 Auto-close configured');
    }

    setupAnimations() {
        // Agregar clases CSS para animaciones suaves
        const style = document.createElement('style');
        style.textContent = `
            .navbar-collapse {
                transition: all 0.3s ease-in-out !important;
            }
            
            .navbar-collapse.show {
                animation: slideDown 0.3s ease-out;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .navbar-nav .nav-link {
                transition: all 0.3s ease !important;
            }
            
            .navbar-nav .nav-link:hover {
                transform: translateX(5px);
            }
        `;
        
        document.head.appendChild(style);
        console.log('✨ Animations configured');
    }

    // Método público para cerrar el menú desde otros scripts
    static closeMenu() {
        const instance = window.mobileNavbar;
        if (instance) {
            instance.closeMenu();
        }
    }
}

// Inicializar automáticamente
window.mobileNavbar = new MobileNavbar();

// Exportar para uso global
window.MobileNavbar = MobileNavbar;
