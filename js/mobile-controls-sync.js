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

        // Intentar configurar inmediatamente
        this.setupDarkModeSync();
        this.setupLanguageSync();
        this.setupAccessibilitySync();

        // Reintentar después de un tiempo para asegurar que todo esté cargado
        setTimeout(() => {
            console.log('📱 Retrying mobile controls setup...');
            this.setupDarkModeSync();
            this.setupLanguageSync();
            this.setupAccessibilitySync();
        }, 1000);

        // Reintentar una vez más para páginas lentas
        setTimeout(() => {
            console.log('📱 Final retry mobile controls setup...');
            this.setupDarkModeSync();
            this.setupLanguageSync();
            this.setupAccessibilitySync();
        }, 3000);

        console.log('✅ Mobile Controls Sync initialized');
    }

    setupDarkModeSync() {
        const desktopToggle = document.getElementById('darkModeToggle');
        const mobileToggle = document.getElementById('darkModeToggleMobile');
        const mobileMenuToggle = document.getElementById('darkModeToggleMobileMenu');
        const desktopIcon = document.getElementById('darkModeIcon');
        const mobileIcon = document.getElementById('darkModeIconMobile');
        const mobileMenuIcon = document.getElementById('darkModeIconMobileMenu');

        console.log('🌙 Setting up dark mode sync...');
        console.log('Desktop toggle:', !!desktopToggle);
        console.log('Mobile menu toggle:', !!mobileMenuToggle);
        console.log('Mobile toggle:', !!mobileToggle);

        // Configurar botón en el menú móvil
        if (mobileMenuToggle && !mobileMenuToggle.hasAttribute('data-sync-configured')) {
            mobileMenuToggle.setAttribute('data-sync-configured', 'true');
            mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🌙 Mobile menu dark mode clicked');

                // Simular clic en el botón de escritorio
                if (desktopToggle) {
                    desktopToggle.click();
                    console.log('🌙 Desktop toggle clicked from mobile');
                } else {
                    // Si no hay botón de escritorio, usar el manager directamente
                    if (window.darkModeManager) {
                        window.darkModeManager.toggleDarkMode();
                        console.log('🌙 Dark mode toggled directly');
                    }
                }

                // Sincronizar iconos
                setTimeout(() => {
                    this.syncAllDarkModeIcons();
                }, 100);
            });
            console.log('🌙 Mobile menu toggle configured');
        }

        if (!mobileToggle && !mobileMenuToggle) {
            console.warn('⚠️ Mobile dark mode toggle not found');
            return;
        }

        // Sincronizar estado inicial
        if (desktopIcon && mobileIcon) {
            mobileIcon.className = desktopIcon.className;
        }
        if (desktopIcon && mobileMenuIcon) {
            mobileMenuIcon.className = desktopIcon.className;
        }

        // Configurar evento del botón móvil (si existe)
        if (mobileToggle && !mobileToggle.hasAttribute('data-sync-configured')) {
            mobileToggle.setAttribute('data-sync-configured', 'true');
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🌙 Mobile dark mode clicked');

                // Simular clic en el botón de escritorio
                if (desktopToggle) {
                    desktopToggle.click();
                } else if (window.darkModeManager) {
                    window.darkModeManager.toggleDarkMode();
                }

                // Sincronizar iconos
                setTimeout(() => {
                    this.syncAllDarkModeIcons();
                }, 100);
            });
            console.log('🌙 Mobile toggle configured');
        }

        // Escuchar cambios en el modo oscuro para sincronizar
        const observer = new MutationObserver(() => {
            if (desktopIcon && mobileIcon) {
                mobileIcon.className = desktopIcon.className;
            }
            if (desktopIcon && mobileMenuIcon) {
                mobileMenuIcon.className = desktopIcon.className;
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
        const mobileMenuLangButtons = document.querySelectorAll('.mobile-lang-btn');

        // Obtener idioma actual
        const currentLang = localStorage.getItem('selectedLanguage') || 'es';

        // Actualizar estado inicial de botones en menú móvil
        mobileMenuLangButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (mobileCurrentLang) {
            mobileCurrentLang.textContent = currentLang.toUpperCase();
        }

        // Configurar eventos de los botones del menú móvil
        mobileMenuLangButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                const selectedLang = btn.getAttribute('data-lang');

                // Actualizar estado visual
                mobileMenuLangButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Buscar y simular clic en el elemento correspondiente del escritorio
                const desktopItem = document.querySelector(`.language-selector-wrapper .dropdown-item[data-lang="${selectedLang}"]`);
                if (desktopItem) {
                    desktopItem.click();
                }
            });
        });

        // Configurar eventos de los elementos del dropdown móvil (si existen)
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
                if (mobileDropdown) {
                    mobileDropdown.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Escuchar cambios de idioma para sincronizar
        window.addEventListener('languageChanged', (e) => {
            if (e.detail && e.detail.language) {
                const newLang = e.detail.language;

                // Actualizar botones del menú móvil
                mobileMenuLangButtons.forEach(btn => {
                    const btnLang = btn.getAttribute('data-lang');
                    if (btnLang === newLang) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                if (mobileCurrentLang) {
                    mobileCurrentLang.textContent = newLang.toUpperCase();
                }
            }
        });

        console.log('🌐 Language sync configured');
    }

    setupAccessibilitySync() {
        const desktopToggle = document.getElementById('accessibility-toggle');
        const mobileToggle = document.getElementById('accessibility-toggle-mobile');
        const mobileMenuToggle = document.getElementById('accessibility-toggle-mobile-menu');

        console.log('♿ Setting up accessibility sync...');
        console.log('Desktop toggle:', !!desktopToggle);
        console.log('Mobile toggle:', !!mobileToggle);
        console.log('Mobile menu toggle:', !!mobileMenuToggle);

        // Configurar botón en el menú móvil
        if (mobileMenuToggle && !mobileMenuToggle.hasAttribute('data-accessibility-configured')) {
            mobileMenuToggle.setAttribute('data-accessibility-configured', 'true');
            mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('♿ Mobile menu accessibility clicked');

                // Simular clic en el botón de escritorio
                if (desktopToggle) {
                    desktopToggle.click();
                    console.log('♿ Desktop accessibility toggle clicked from mobile menu');
                } else {
                    // Si no hay botón de escritorio, abrir panel directamente
                    const panel = document.getElementById('accessibility-panel');
                    if (panel) {
                        panel.classList.toggle('show');
                        console.log('♿ Accessibility panel toggled directly');
                    }
                }
            });
            console.log('♿ Mobile menu accessibility configured');
        }

        // Configurar botón móvil original (si existe)
        if (mobileToggle && !mobileToggle.hasAttribute('data-accessibility-configured')) {
            mobileToggle.setAttribute('data-accessibility-configured', 'true');
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('♿ Mobile accessibility clicked');

                // Simular clic en el botón de escritorio
                if (desktopToggle) {
                    desktopToggle.click();
                } else {
                    // Si no hay botón de escritorio, abrir panel directamente
                    const panel = document.getElementById('accessibility-panel');
                    if (panel) {
                        panel.classList.toggle('show');
                        console.log('♿ Accessibility panel toggled directly');
                    }
                }
            });
            console.log('♿ Mobile accessibility configured');
        }

        if (!mobileToggle && !mobileMenuToggle) {
            console.warn('⚠️ Mobile accessibility toggle not found');
            return;
        }

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
