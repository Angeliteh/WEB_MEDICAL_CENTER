// Mobile Controls Synchronization
// Sincronización entre controles de escritorio y móvil

class MobileControlsSync {
    constructor() {
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
        console.log('📱 Mobile Controls Sync initializing...');
        
        // Esperar a que los componentes se carguen
        setTimeout(() => {
            this.setupDarkModeSync();
            this.setupLanguageSync();
            this.setupAccessibilitySync();
        }, 1500);
        
        console.log('✅ Mobile Controls Sync initialized');
    }

    setupDarkModeSync() {
        const desktopToggle = document.getElementById('darkModeToggle');
        const mobileToggle = document.getElementById('darkModeToggleMobile');
        const desktopIcon = document.getElementById('darkModeIcon');
        const mobileIcon = document.getElementById('darkModeIconMobile');

        if (!mobileToggle) {
            console.warn('⚠️ Mobile dark mode toggle not found');
            return;
        }

        // Sincronizar estado inicial
        if (desktopIcon && mobileIcon) {
            mobileIcon.className = desktopIcon.className;
        }

        // Configurar evento del botón móvil
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simular clic en el botón de escritorio
            if (desktopToggle) {
                desktopToggle.click();
            }
            
            // Sincronizar iconos
            setTimeout(() => {
                if (desktopIcon && mobileIcon) {
                    mobileIcon.className = desktopIcon.className;
                }
            }, 100);
        });

        // Escuchar cambios en el modo oscuro para sincronizar
        const observer = new MutationObserver(() => {
            if (desktopIcon && mobileIcon) {
                mobileIcon.className = desktopIcon.className;
            }
        });

        if (desktopIcon) {
            observer.observe(desktopIcon, { attributes: true, attributeFilter: ['class'] });
        }

        console.log('🌙 Dark mode sync configured');
    }

    setupLanguageSync() {
        const mobileDropdown = document.getElementById('languageDropdownMobile');
        const mobileCurrentLang = document.getElementById('currentLangMobile');
        const mobileDropdownItems = document.querySelectorAll('.mobile-language-selector .dropdown-item');

        if (!mobileDropdown) {
            console.warn('⚠️ Mobile language selector not found');
            return;
        }

        // Obtener idioma actual
        const currentLang = localStorage.getItem('selectedLanguage') || 'es';
        if (mobileCurrentLang) {
            mobileCurrentLang.textContent = currentLang.toUpperCase();
        }

        // Configurar eventos de los elementos del dropdown móvil
        mobileDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const selectedLang = item.getAttribute('data-lang');
                
                // Actualizar idioma actual en móvil
                if (mobileCurrentLang) {
                    mobileCurrentLang.textContent = selectedLang.toUpperCase();
                }
                
                // Buscar y simular clic en el elemento correspondiente del escritorio
                const desktopItem = document.querySelector(`.language-selector-wrapper .dropdown-item[data-lang="${selectedLang}"]`);
                if (desktopItem) {
                    desktopItem.click();
                }
                
                // Cerrar dropdown móvil
                const dropdownMenu = item.closest('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('show');
                }
                mobileDropdown.setAttribute('aria-expanded', 'false');
            });
        });

        // Escuchar cambios de idioma para sincronizar
        window.addEventListener('languageChanged', (e) => {
            if (mobileCurrentLang && e.detail && e.detail.language) {
                mobileCurrentLang.textContent = e.detail.language.toUpperCase();
            }
        });

        console.log('🌐 Language sync configured');
    }

    setupAccessibilitySync() {
        const desktopToggle = document.getElementById('accessibility-toggle');
        const mobileToggle = document.getElementById('accessibility-toggle-mobile');

        if (!mobileToggle) {
            console.warn('⚠️ Mobile accessibility toggle not found');
            return;
        }

        // Configurar evento del botón móvil
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simular clic en el botón de escritorio
            if (desktopToggle) {
                desktopToggle.click();
            }
        });

        console.log('♿ Accessibility sync configured');
    }

    // Método para actualizar el idioma desde otros scripts
    static updateMobileLanguage(language) {
        const mobileCurrentLang = document.getElementById('currentLangMobile');
        if (mobileCurrentLang) {
            mobileCurrentLang.textContent = language.toUpperCase();
        }
    }

    // Método para sincronizar el modo oscuro desde otros scripts
    static syncDarkMode() {
        const desktopIcon = document.getElementById('darkModeIcon');
        const mobileIcon = document.getElementById('darkModeIconMobile');
        
        if (desktopIcon && mobileIcon) {
            mobileIcon.className = desktopIcon.className;
        }
    }
}

// Inicializar automáticamente
window.mobileControlsSync = new MobileControlsSync();

// Exportar para uso global
window.MobileControlsSync = MobileControlsSync;
