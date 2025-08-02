// Cookie Manager System
// Sistema completo de gestión de cookies GDPR

class CookieManager {
    constructor() {
        this.config = {
            // Configuración general
            enabled: true,
            autoShow: true,
            position: 'bottom', // bottom, top
            theme: 'light', // light, dark, auto
            
            // Configuración de cookies
            cookieExpiry: 365, // días
            consentExpiry: 365, // días
            
            // Configuración GDPR
            strictMode: true,
            requireExplicitConsent: true,
            showDeclineButton: true,
            
            // Categorías de cookies
            categories: {
                necessary: {
                    enabled: true,
                    required: true,
                    name: 'Cookies Necesarias',
                    description: 'Estas cookies son esenciales para el funcionamiento del sitio web.'
                },
                analytics: {
                    enabled: false,
                    required: false,
                    name: 'Cookies Analíticas',
                    description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web.'
                },
                marketing: {
                    enabled: false,
                    required: false,
                    name: 'Cookies de Marketing',
                    description: 'Se utilizan para mostrar anuncios relevantes y medir su efectividad.'
                },
                preferences: {
                    enabled: false,
                    required: false,
                    name: 'Cookies de Preferencias',
                    description: 'Permiten recordar sus preferencias y personalizar su experiencia.'
                }
            }
        };
        
        this.consentGiven = false;
        this.userPreferences = {};
        
        this.init();
    }
    
    init() {
        // Verificar si ya hay consentimiento
        this.loadUserPreferences();
        
        // Crear el banner si es necesario
        if (this.config.autoShow && !this.hasValidConsent()) {
            this.createCookieBanner();
        }
        
        // Configurar eventos
        this.setupEventListeners();
        
        console.log('🍪 Cookie Manager initialized');
    }
    
    hasValidConsent() {
        const consent = localStorage.getItem('cookie_consent');
        const consentDate = localStorage.getItem('cookie_consent_date');
        
        if (!consent || !consentDate) {
            return false;
        }
        
        // Verificar si el consentimiento no ha expirado
        const consentTimestamp = parseInt(consentDate);
        const expiryTime = this.config.consentExpiry * 24 * 60 * 60 * 1000; // días a milisegundos
        
        return (Date.now() - consentTimestamp) < expiryTime;
    }
    
    loadUserPreferences() {
        try {
            const preferences = localStorage.getItem('cookie_preferences');
            if (preferences) {
                this.userPreferences = JSON.parse(preferences);
                this.consentGiven = true;
                this.applyCookieSettings();
            }
        } catch (error) {
            console.warn('Error loading cookie preferences:', error);
        }
    }
    
    createCookieBanner() {
        // Crear el HTML del banner
        const bannerHTML = this.generateBannerHTML();
        
        // Insertar en el DOM
        const bannerContainer = document.createElement('div');
        bannerContainer.innerHTML = bannerHTML;
        document.body.appendChild(bannerContainer.firstElementChild);
        
        // Aplicar estilos
        this.applyCookieBannerStyles();
        
        // Configurar eventos del banner
        this.setupBannerEvents();
        
        // Mostrar banner con animación
        setTimeout(() => {
            const banner = document.getElementById('cookie-banner');
            if (banner) {
                banner.classList.add('show');
            }
        }, 500);
    }
    
    generateBannerHTML() {
        const currentLanguage = this.getCurrentLanguage();
        const texts = this.getTexts(currentLanguage);
        
        return `
            <div id="cookie-banner" class="cookie-banner ${this.config.position}">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h3 class="cookie-banner-title">${texts.title}</h3>
                        <p class="cookie-banner-description">${texts.description}</p>
                    </div>
                    
                    <div class="cookie-banner-actions">
                        <button id="cookie-settings-btn" class="cookie-btn cookie-btn-secondary">
                            ${texts.settings}
                        </button>
                        ${this.config.showDeclineButton ? 
                            `<button id="cookie-decline-btn" class="cookie-btn cookie-btn-decline">
                                ${texts.decline}
                            </button>` : ''
                        }
                        <button id="cookie-accept-btn" class="cookie-btn cookie-btn-primary">
                            ${texts.accept}
                        </button>
                    </div>
                </div>
                
                <!-- Modal de configuración -->
                <div id="cookie-settings-modal" class="cookie-modal" style="display: none;">
                    <div class="cookie-modal-content">
                        <div class="cookie-modal-header">
                            <h3>${texts.settingsTitle}</h3>
                            <button id="cookie-modal-close" class="cookie-modal-close">&times;</button>
                        </div>
                        
                        <div class="cookie-modal-body">
                            <p>${texts.settingsDescription}</p>
                            
                            <div class="cookie-categories">
                                ${this.generateCategoriesHTML(texts)}
                            </div>
                        </div>
                        
                        <div class="cookie-modal-footer">
                            <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">
                                ${texts.savePreferences}
                            </button>
                            <button id="cookie-accept-all" class="cookie-btn cookie-btn-secondary">
                                ${texts.acceptAll}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateCategoriesHTML(texts) {
        let html = '';
        
        Object.keys(this.config.categories).forEach(categoryKey => {
            const category = this.config.categories[categoryKey];
            const isChecked = category.required || category.enabled;
            const isDisabled = category.required;
            
            html += `
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <label class="cookie-switch">
                            <input type="checkbox" 
                                   id="cookie-${categoryKey}" 
                                   ${isChecked ? 'checked' : ''} 
                                   ${isDisabled ? 'disabled' : ''}
                                   data-category="${categoryKey}">
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-category-info">
                            <h4>${category.name}</h4>
                            <p>${category.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    applyCookieBannerStyles() {
        if (document.getElementById('cookie-banner-styles')) {
            return; // Ya están aplicados
        }
        
        const styles = `
            <style id="cookie-banner-styles">
                .cookie-banner {
                    position: fixed;
                    left: 0;
                    right: 0;
                    background: #fff;
                    box-shadow: 0 -2px 20px rgba(0,0,0,0.1);
                    z-index: 10000;
                    transform: translateY(100%);
                    transition: transform 0.3s ease;
                    border-top: 3px solid #48bdc5;
                }
                
                .cookie-banner.bottom {
                    bottom: 0;
                }
                
                .cookie-banner.top {
                    top: 0;
                    transform: translateY(-100%);
                    border-top: none;
                    border-bottom: 3px solid #48bdc5;
                }
                
                .cookie-banner.show {
                    transform: translateY(0);
                }
                
                .cookie-banner-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                }
                
                .cookie-banner-text {
                    flex: 1;
                }
                
                .cookie-banner-title {
                    margin: 0 0 8px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                }
                
                .cookie-banner-description {
                    margin: 0;
                    color: #666;
                    line-height: 1.5;
                }
                
                .cookie-banner-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                
                .cookie-btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                }
                
                .cookie-btn-primary {
                    background: #48bdc5;
                    color: white;
                }
                
                .cookie-btn-primary:hover {
                    background: #3a9aa3;
                }
                
                .cookie-btn-secondary {
                    background: transparent;
                    color: #48bdc5;
                    border: 2px solid #48bdc5;
                }
                
                .cookie-btn-secondary:hover {
                    background: #48bdc5;
                    color: white;
                }
                
                .cookie-btn-decline {
                    background: #f5f5f5;
                    color: #666;
                }
                
                .cookie-btn-decline:hover {
                    background: #e0e0e0;
                }
                
                /* Modal */
                .cookie-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .cookie-modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                
                .cookie-modal-header {
                    padding: 20px 20px 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 15px;
                }
                
                .cookie-modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                }
                
                .cookie-modal-body {
                    padding: 20px;
                }
                
                .cookie-categories {
                    margin-top: 20px;
                }
                
                .cookie-category {
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                }
                
                .cookie-category-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .cookie-switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 24px;
                    flex-shrink: 0;
                }
                
                .cookie-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                
                .cookie-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: .4s;
                    border-radius: 24px;
                }
                
                .cookie-slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                
                input:checked + .cookie-slider {
                    background-color: #48bdc5;
                }
                
                input:checked + .cookie-slider:before {
                    transform: translateX(26px);
                }
                
                input:disabled + .cookie-slider {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                .cookie-category-info h4 {
                    margin: 0 0 5px 0;
                    font-size: 16px;
                    color: #333;
                }
                
                .cookie-category-info p {
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .cookie-modal-footer {
                    padding: 0 20px 20px 20px;
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                }
                
                /* Dark mode */
                body.dark-mode .cookie-banner {
                    background: #2d3748;
                    border-color: #48bdc5;
                }
                
                body.dark-mode .cookie-banner-title {
                    color: #e2e8f0;
                }
                
                body.dark-mode .cookie-banner-description {
                    color: #a0aec0;
                }
                
                body.dark-mode .cookie-modal-content {
                    background: #2d3748;
                    color: #e2e8f0;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .cookie-banner-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .cookie-banner-actions {
                        justify-content: center;
                    }
                    
                    .cookie-btn {
                        flex: 1;
                        min-width: 120px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    setupBannerEvents() {
        // Botón aceptar todo
        document.getElementById('cookie-accept-btn')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });
        
        // Botón rechazar
        document.getElementById('cookie-decline-btn')?.addEventListener('click', () => {
            this.declineAllCookies();
        });
        
        // Botón configuración
        document.getElementById('cookie-settings-btn')?.addEventListener('click', () => {
            this.showSettingsModal();
        });
        
        // Cerrar modal
        document.getElementById('cookie-modal-close')?.addEventListener('click', () => {
            this.hideSettingsModal();
        });
        
        // Guardar preferencias
        document.getElementById('cookie-save-preferences')?.addEventListener('click', () => {
            this.saveUserPreferences();
        });
        
        // Aceptar todo desde modal
        document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });
    }
    
    setupEventListeners() {
        // Escuchar cambios de tema
        window.addEventListener('themeChanged', () => {
            this.updateBannerTheme();
        });
    }
    
    acceptAllCookies() {
        // Habilitar todas las categorías
        Object.keys(this.config.categories).forEach(categoryKey => {
            this.userPreferences[categoryKey] = true;
        });
        
        this.saveConsentAndPreferences();
        this.hideCookieBanner();
        this.applyCookieSettings();
        
        console.log('🍪 All cookies accepted');
    }
    
    declineAllCookies() {
        // Solo habilitar cookies necesarias
        Object.keys(this.config.categories).forEach(categoryKey => {
            const category = this.config.categories[categoryKey];
            this.userPreferences[categoryKey] = category.required;
        });
        
        this.saveConsentAndPreferences();
        this.hideCookieBanner();
        this.applyCookieSettings();
        
        console.log('🍪 Only necessary cookies accepted');
    }
    
    saveUserPreferences() {
        // Leer preferencias del modal
        Object.keys(this.config.categories).forEach(categoryKey => {
            const checkbox = document.getElementById(`cookie-${categoryKey}`);
            if (checkbox) {
                this.userPreferences[categoryKey] = checkbox.checked;
            }
        });
        
        this.saveConsentAndPreferences();
        this.hideSettingsModal();
        this.hideCookieBanner();
        this.applyCookieSettings();
        
        console.log('🍪 User preferences saved');
    }
    
    saveConsentAndPreferences() {
        // Guardar consentimiento
        localStorage.setItem('cookie_consent', 'true');
        localStorage.setItem('cookie_consent_date', Date.now().toString());
        
        // Guardar preferencias
        localStorage.setItem('cookie_preferences', JSON.stringify(this.userPreferences));
        
        this.consentGiven = true;
    }
    
    applyCookieSettings() {
        // Aplicar configuración de Google Analytics
        if (this.userPreferences.analytics) {
            this.enableGoogleAnalytics();
        } else {
            this.disableGoogleAnalytics();
        }
        
        // Aplicar otras configuraciones de cookies
        this.applyMarketingCookies();
        this.applyPreferenceCookies();
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('cookieConsentChanged', {
            detail: this.userPreferences
        }));
    }
    
    enableGoogleAnalytics() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }
    
    disableGoogleAnalytics() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }
    
    applyMarketingCookies() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': this.userPreferences.marketing ? 'granted' : 'denied'
            });
        }
    }
    
    applyPreferenceCookies() {
        // Aplicar cookies de preferencias
        if (this.userPreferences.preferences) {
            // Habilitar cookies de personalización
            console.log('🍪 Preference cookies enabled');
        }
    }
    
    showSettingsModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    hideSettingsModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }
    
    updateBannerTheme() {
        // Actualizar tema del banner según el modo oscuro
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            if (document.body.classList.contains('dark-mode')) {
                banner.classList.add('dark-theme');
            } else {
                banner.classList.remove('dark-theme');
            }
        }
    }
    
    getCurrentLanguage() {
        // Obtener idioma actual del language manager
        if (window.LanguageManager && window.LanguageManager.currentLanguage) {
            return window.LanguageManager.currentLanguage;
        }
        return 'es';
    }
    
    getTexts(language) {
        const texts = {
            es: {
                title: 'Uso de Cookies',
                description: 'Utilizamos cookies para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Al hacer clic en "Aceptar", acepta nuestro uso de cookies.',
                accept: 'Aceptar Todo',
                decline: 'Solo Necesarias',
                settings: 'Configurar',
                settingsTitle: 'Configuración de Cookies',
                settingsDescription: 'Puede elegir qué tipos de cookies permitir. Sus elecciones solo se aplicarán a este sitio web.',
                savePreferences: 'Guardar Preferencias',
                acceptAll: 'Aceptar Todo'
            },
            en: {
                title: 'Cookie Usage',
                description: 'We use cookies to improve your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you agree to our use of cookies.',
                accept: 'Accept All',
                decline: 'Necessary Only',
                settings: 'Settings',
                settingsTitle: 'Cookie Settings',
                settingsDescription: 'You can choose what types of cookies to allow. Your choices will only apply to this website.',
                savePreferences: 'Save Preferences',
                acceptAll: 'Accept All'
            }
        };
        
        return texts[language] || texts.es;
    }
    
    // Métodos públicos para gestión externa
    showCookieBanner() {
        if (!document.getElementById('cookie-banner')) {
            this.createCookieBanner();
        }
    }
    
    resetConsent() {
        localStorage.removeItem('cookie_consent');
        localStorage.removeItem('cookie_consent_date');
        localStorage.removeItem('cookie_preferences');
        this.consentGiven = false;
        this.userPreferences = {};
        this.showCookieBanner();
    }
    
    getConsentStatus() {
        return {
            hasConsent: this.consentGiven,
            preferences: this.userPreferences,
            consentDate: localStorage.getItem('cookie_consent_date')
        };
    }
}

// Inicializar automáticamente
document.addEventListener('DOMContentLoaded', () => {
    window.CookieManager = new CookieManager();
});

// Exportar para uso global
window.CookieManager = CookieManager;
