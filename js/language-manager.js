// Gestor de idiomas para Plantilla Médica Original
// Sistema multiidioma ES/EN

class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'es';

        // Verificar si las traducciones están disponibles
        if (typeof translations !== 'undefined') {
            this.translations = translations;
            console.log('✅ Traducciones cargadas correctamente');
        } else {
            console.error('❌ Variable translations no está definida');
            this.translations = {};
        }

        this.init();
    }

    init() {
        this.createLanguageSelector();
        this.applyTranslations();
        this.bindEvents();

        // Retry crear selector después de componentes cargados
        setTimeout(() => {
            if (!document.querySelector('#languageDropdown')) {
                console.log('🔄 Reintentando crear selector de idioma...');
                this.createLanguageSelector();
            }
        }, 1000);

        console.log('🌐 Language Manager inicializado - Idioma:', this.currentLanguage);
    }

    // Crear selector de idioma en el header
    createLanguageSelector() {
        // Buscar el contenedor de controles de usuario en el header
        const userControls = document.querySelector('.user-controls-section');
        if (!userControls) {
            console.log('🔍 Contenedor .user-controls-section no encontrado');
            return;
        }
        console.log('✅ Contenedor .user-controls-section encontrado:', userControls);

        // Verificar si ya existe para evitar duplicados
        if (document.querySelector('#languageDropdown')) return;

        // Crear elemento del selector de idioma
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector-wrapper ml-2';
        languageSelector.innerHTML = `
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle accessibility-font-fix accessibility-enhanced" href="#" id="languageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-label="Selector de idioma">
                    <i class="fas fa-globe"></i> ${this.currentLanguage.toUpperCase()}
                </a>
                <div class="dropdown-menu dropdown-menu-right accessibility-font-fix" aria-labelledby="languageDropdown">
                    <a class="dropdown-item accessibility-touch-target accessibility-font-fix accessibility-enhanced" href="#" data-lang="es" tabindex="0">
                        <span class="flag-emoji mr-2 accessibility-font-fix">🇪🇸</span> Español
                    </a>
                    <a class="dropdown-item accessibility-touch-target accessibility-font-fix accessibility-enhanced" href="#" data-lang="en" tabindex="0">
                        <span class="flag-emoji mr-2 accessibility-font-fix">🇺🇸</span> English
                    </a>
                </div>
            </div>
        `;

        // Insertar en el contenedor de controles de usuario (después del botón de modo oscuro)
        userControls.appendChild(languageSelector);
    }

    // Aplicar traducciones
    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        console.log(`🔍 Encontrados ${elements.length} elementos con data-translate`);

        let translatedCount = 0;
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
                translatedCount++;
            } else {
                // Solo mostrar los primeros 10 errores para no saturar la consola
                if (translatedCount < 10) {
                    console.log(`❌ No se encontró traducción para: ${key}`);

                    // Debug específico para claves importantes
                    if (key.startsWith('features.') || key.startsWith('hero.') || key.startsWith('navigation.')) {
                        const keys = key.split('.');
                        let debugPath = this.translations[this.currentLanguage];
                        console.log(`🔍 Debug para ${key}:`);
                        console.log('- Idioma actual:', this.currentLanguage);

                        for (let i = 0; i < keys.length; i++) {
                            const k = keys[i];
                            if (debugPath && debugPath[k]) {
                                debugPath = debugPath[k];
                                console.log(`  ✅ ${keys.slice(0, i+1).join('.')} existe`);
                            } else {
                                console.log(`  ❌ ${keys.slice(0, i+1).join('.')} NO existe`);
                                break;
                            }
                        }
                    }
                }
            }
        });

        console.log(`✅ Se aplicaron ${translatedCount} traducciones de ${elements.length} elementos`);

        // Aplicar traducciones a placeholders específicos
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Actualizar título de la página
        const pageTitle = this.getTranslation('meta.title');
        if (pageTitle) {
            document.title = pageTitle;
        }

        // Actualizar meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        const description = this.getTranslation('meta.description');
        if (metaDescription && description) {
            metaDescription.setAttribute('content', description);
        }
    }

    // Obtener traducción por clave
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];

        // Debug: solo en desarrollo
        if (key === 'features.title' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            console.log('🔍 Debug features.title:');
            console.log('- currentLanguage:', this.currentLanguage);
            console.log('- translations disponibles:', Object.keys(this.translations));
            console.log('- translation inicial:', translation);
            console.log('- features existe?:', translation && translation.features);
        }

        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }

        return translation;
    }

    // Cambiar idioma
    changeLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        this.currentLanguage = lang;
        this.storeLanguage(lang);
        this.applyTranslations();
        this.updateLanguageSelector();
        
        console.log('🌐 Idioma cambiado a:', lang);
        
        // Disparar evento personalizado
        const event = new CustomEvent('languageChanged', {
            detail: { language: lang }
        });
        document.dispatchEvent(event);
    }

    // Actualizar selector de idioma
    updateLanguageSelector() {
        const selector = document.querySelector('#languageDropdown');
        if (selector) {
            selector.innerHTML = `<i class="fas fa-globe"></i> ${this.currentLanguage.toUpperCase()}`;
        }
    }

    // Eventos
    bindEvents() {
        // Eventos para el dropdown de idiomas
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-lang]')) {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                this.changeLanguage(lang);
            }
        });
    }

    // Almacenamiento
    storeLanguage(lang) {
        try {
            localStorage.setItem('selectedLanguage', lang);
        } catch (error) {
            console.warn('No se pudo guardar el idioma en localStorage:', error);
        }
    }

    getStoredLanguage() {
        try {
            return localStorage.getItem('selectedLanguage');
        } catch (error) {
            console.warn('No se pudo obtener el idioma de localStorage:', error);
            return null;
        }
    }

    // Métodos públicos
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();

    // Aplicar traducciones después de un pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        if (window.languageManager) {
            window.languageManager.applyTranslations();
            console.log('🔄 Traducciones aplicadas después de inicialización');
        }
    }, 500);
});

// También aplicar traducciones cuando la página esté completamente cargada
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.languageManager) {
            window.languageManager.applyTranslations();
            console.log('🔄 Traducciones aplicadas después de load completo');
        }
    }, 1000);
});

console.log('🌐 Language Manager cargado');

// Función global para debugging - forzar aplicación de traducciones
window.forceTranslations = () => {
    if (window.languageManager) {
        window.languageManager.applyTranslations();
        console.log('🔄 Traducciones forzadas manualmente');
    } else {
        console.log('❌ Language Manager no está disponible');
    }
};
