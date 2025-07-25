// WhatsApp Business Button Manager
// Sistema profesional de contacto por WhatsApp

class WhatsAppBusiness {
    constructor() {
        // Usar configuración externa si está disponible
        const externalConfig = window.WHATSAPP_CONFIG || {};

        this.config = {
            // Configuración del negocio
            phoneNumber: externalConfig.phoneNumber || '525512345678',
            businessName: externalConfig.businessName || 'Centro Médico Profesional',
            businessType: externalConfig.businessType || 'medical',

            // Configuración de mensajes
            messages: externalConfig.messages || {
                medical: {
                    es: 'Hola, me gustaría obtener más información sobre sus servicios médicos.',
                    en: 'Hello, I would like to get more information about your medical services.'
                }
            },

            // Configuración de horarios
            businessHours: externalConfig.businessHours || {
                enabled: true,
                timezone: 'America/Mexico_City',
                schedule: {
                    monday: { start: '08:00', end: '18:00' },
                    tuesday: { start: '08:00', end: '18:00' },
                    wednesday: { start: '08:00', end: '18:00' },
                    thursday: { start: '08:00', end: '18:00' },
                    friday: { start: '08:00', end: '18:00' },
                    saturday: { start: '09:00', end: '14:00' },
                    sunday: { closed: true }
                }
            },

            // Configuración de apariencia
            appearance: externalConfig.appearance || {
                position: 'bottom-left',
                showPulse: true,
                showNotification: false,
                expandOnHover: true
            },

            // Configuración de analytics
            analytics: externalConfig.analytics || {
                enabled: true,
                eventCategory: 'contact',
                eventAction: 'whatsapp_click',
                eventLabel: 'business_button'
            }
        };

        this.init();
    }
    
    init() {
        this.setupWhatsAppButton();
        this.bindEvents();
        this.updateButtonText();
        
        // Escuchar cambios de idioma
        document.addEventListener('languageChanged', (e) => {
            this.updateButtonText();
        });
        
        console.log('📱 WhatsApp Business initialized');
    }
    
    setupWhatsAppButton() {
        const whatsappButton = document.getElementById('whatsapp-button');
        const whatsappLink = document.getElementById('whatsapp-link');
        
        if (!whatsappButton || !whatsappLink) {
            console.warn('WhatsApp button elements not found');
            return;
        }
        
        // Configurar el enlace inicial
        this.updateWhatsAppLink();
    }
    
    updateWhatsAppLink() {
        const whatsappLink = document.getElementById('whatsapp-link');
        if (!whatsappLink) return;
        
        const currentLanguage = this.getCurrentLanguage();
        const message = this.getWhatsAppMessage(currentLanguage);
        const whatsappUrl = this.generateWhatsAppURL(message);
        
        whatsappLink.href = whatsappUrl;
    }
    
    generateWhatsAppURL(message) {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${this.config.phoneNumber}?text=${encodedMessage}`;
    }
    
    getWhatsAppMessage(language = 'es') {
        // Obtener mensaje personalizado de las traducciones si existe
        if (window.languageManager && window.languageManager.getTranslation) {
            const customMessage = window.languageManager.getTranslation('whatsapp.message');
            if (customMessage) {
                return customMessage;
            }
        }

        // Usar mensaje según el tipo de negocio
        const businessMessages = this.config.messages[this.config.businessType];
        if (businessMessages && businessMessages[language]) {
            return businessMessages[language];
        }

        // Fallback al mensaje médico por defecto
        const medicalMessages = this.config.messages.medical;
        return medicalMessages[language] || medicalMessages.es;
    }
    
    getCurrentLanguage() {
        if (window.languageManager && window.languageManager.getCurrentLanguage) {
            return window.languageManager.getCurrentLanguage();
        }
        return 'es';
    }
    
    updateButtonText() {
        const textElement = document.querySelector('.whatsapp-text');
        if (!textElement) return;
        
        const currentLanguage = this.getCurrentLanguage();
        
        // Obtener texto del botón de las traducciones
        if (window.languageManager && window.languageManager.getTranslation) {
            const buttonText = window.languageManager.getTranslation('whatsapp.text');
            if (buttonText) {
                textElement.textContent = buttonText;
            }
        }
        
        // Actualizar el enlace también
        this.updateWhatsAppLink();
    }
    
    bindEvents() {
        const whatsappLink = document.getElementById('whatsapp-link');
        if (!whatsappLink) return;
        
        whatsappLink.addEventListener('click', (e) => {
            this.handleWhatsAppClick(e);
        });
        
        // Mostrar/ocultar según horarios de negocio (opcional)
        if (this.config.businessHours.enabled) {
            this.checkBusinessHours();
            // Verificar cada minuto
            setInterval(() => this.checkBusinessHours(), 60000);
        }
    }
    
    handleWhatsAppClick(e) {
        // Analytics tracking (si está disponible)
        this.trackWhatsAppClick();
        
        // Verificar horarios de negocio
        if (this.config.businessHours.enabled && !this.isBusinessOpen()) {
            const currentLanguage = this.getCurrentLanguage();
            const message = currentLanguage === 'en' 
                ? 'We are currently closed. We will respond as soon as possible during business hours.'
                : 'Actualmente estamos cerrados. Te responderemos lo antes posible en horario de atención.';
            
            if (confirm(message + '\n\n¿Deseas continuar? / Do you want to continue?')) {
                return true; // Continuar con el enlace
            } else {
                e.preventDefault();
                return false;
            }
        }
        
        return true;
    }
    
    trackWhatsAppClick() {
        if (!this.config.analytics.enabled) return;

        const analytics = this.config.analytics;

        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', analytics.eventAction, {
                event_category: analytics.eventCategory,
                event_label: analytics.eventLabel,
                business_type: this.config.businessType,
                value: 1
            });
        }

        // Google Analytics Universal (fallback)
        if (typeof ga !== 'undefined') {
            ga('send', 'event', analytics.eventCategory, analytics.eventAction, analytics.eventLabel);
        }

        console.log('📊 WhatsApp click tracked:', analytics);
    }
    
    isBusinessOpen() {
        if (!this.config.businessHours.enabled) return true;

        const now = new Date();
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = dayNames[now.getDay()];
        const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

        const todaySchedule = this.config.businessHours.schedule[dayName];

        if (!todaySchedule || todaySchedule.closed) {
            return false;
        }

        return currentTime >= todaySchedule.start && currentTime <= todaySchedule.end;
    }
    
    checkBusinessHours() {
        const whatsappButton = document.getElementById('whatsapp-button');
        if (!whatsappButton) return;
        
        const isOpen = this.isBusinessOpen();
        
        if (isOpen) {
            whatsappButton.classList.remove('business-closed');
            whatsappButton.classList.add('business-open');
        } else {
            whatsappButton.classList.remove('business-open');
            whatsappButton.classList.add('business-closed');
        }
    }
    
    // Métodos públicos para configuración
    updatePhoneNumber(phoneNumber) {
        this.config.phoneNumber = phoneNumber;
        this.updateWhatsAppLink();
    }
    
    updateBusinessName(businessName) {
        this.config.businessName = businessName;
    }
    
    getConfig() {
        return { ...this.config };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.whatsappBusiness = new WhatsAppBusiness();
});

console.log('📱 WhatsApp Business Manager loaded');
