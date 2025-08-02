// WhatsApp Business Configuration
// Configuración personalizable para el botón de WhatsApp

// ⚠️ IMPORTANTE: Personalizar esta configuración para cada cliente
const WHATSAPP_CONFIG = {
    // 📱 NÚMERO DE WHATSAPP (OBLIGATORIO)
    // Formato: código de país + número (sin espacios, sin +)
    // Ejemplo México: 525512345678
    // Ejemplo España: 34612345678
    // Ejemplo Colombia: 573001234567
    phoneNumber: '525512345678', // ⚠️ CAMBIAR POR EL NÚMERO REAL
    
    // 🏢 INFORMACIÓN DEL NEGOCIO
    businessName: 'Centro Médico Profesional',
    businessType: 'medical', // medical, legal, creative, business
    
    // 🕒 HORARIOS DE ATENCIÓN (opcional)
    businessHours: {
        enabled: true, // true = verificar horarios, false = siempre disponible
        timezone: 'America/Mexico_City', // Zona horaria del negocio
        
        // Horarios por día (formato 24h: HH:MM)
        schedule: {
            monday:    { start: '08:00', end: '18:00' },
            tuesday:   { start: '08:00', end: '18:00' },
            wednesday: { start: '08:00', end: '18:00' },
            thursday:  { start: '08:00', end: '18:00' },
            friday:    { start: '08:00', end: '18:00' },
            saturday:  { start: '09:00', end: '14:00' },
            sunday:    { closed: true } // closed: true = cerrado todo el día
        }
    },
    
    // 💬 MENSAJES PERSONALIZADOS POR SECTOR
    messages: {
        medical: {
            es: 'Hola, me gustaría obtener más información sobre sus servicios médicos.',
            en: 'Hello, I would like to get more information about your medical services.'
        },
        legal: {
            es: 'Hola, necesito asesoría legal. ¿Podrían ayudarme?',
            en: 'Hello, I need legal advice. Could you help me?'
        },
        creative: {
            es: 'Hola, me interesa conocer más sobre sus servicios creativos.',
            en: 'Hello, I am interested in learning more about your creative services.'
        },
        business: {
            es: 'Hola, me gustaría obtener información sobre sus servicios.',
            en: 'Hello, I would like to get information about your services.'
        }
    },
    
    // 🎨 PERSONALIZACIÓN VISUAL
    appearance: {
        position: 'bottom-left', // bottom-left, bottom-right
        showPulse: true, // Animación de pulso
        showNotification: false, // Badge de notificación
        expandOnHover: true // Expandir texto al hacer hover
    },
    
    // 📊 ANALYTICS
    analytics: {
        enabled: true, // Enviar eventos a Google Analytics
        eventCategory: 'contact',
        eventAction: 'whatsapp_click',
        eventLabel: 'business_button'
    }
};

// 🔧 FUNCIONES DE CONFIGURACIÓN AUTOMÁTICA

// Configurar automáticamente según el tipo de negocio
function getBusinessConfig(businessType) {
    const configs = {
        medical: {
            businessName: 'Centro Médico',
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
        legal: {
            businessName: 'Bufete Legal',
            schedule: {
                monday: { start: '09:00', end: '18:00' },
                tuesday: { start: '09:00', end: '18:00' },
                wednesday: { start: '09:00', end: '18:00' },
                thursday: { start: '09:00', end: '18:00' },
                friday: { start: '09:00', end: '17:00' },
                saturday: { closed: true },
                sunday: { closed: true }
            }
        },
        creative: {
            businessName: 'Estudio Creativo',
            schedule: {
                monday: { start: '10:00', end: '19:00' },
                tuesday: { start: '10:00', end: '19:00' },
                wednesday: { start: '10:00', end: '19:00' },
                thursday: { start: '10:00', end: '19:00' },
                friday: { start: '10:00', end: '18:00' },
                saturday: { start: '10:00', end: '15:00' },
                sunday: { closed: true }
            }
        },
        business: {
            businessName: 'Empresa',
            schedule: {
                monday: { start: '09:00', end: '17:00' },
                tuesday: { start: '09:00', end: '17:00' },
                wednesday: { start: '09:00', end: '17:00' },
                thursday: { start: '09:00', end: '17:00' },
                friday: { start: '09:00', end: '17:00' },
                saturday: { closed: true },
                sunday: { closed: true }
            }
        }
    };
    
    return configs[businessType] || configs.business;
}

// Aplicar configuración automática
const autoConfig = getBusinessConfig(WHATSAPP_CONFIG.businessType);
WHATSAPP_CONFIG.businessName = autoConfig.businessName;
WHATSAPP_CONFIG.businessHours.schedule = autoConfig.schedule;

// Configuración de WhatsApp Business aplicada
console.log('📱 WhatsApp Business Manager loaded');

// Exportar configuración para uso global
window.WHATSAPP_CONFIG = WHATSAPP_CONFIG;
