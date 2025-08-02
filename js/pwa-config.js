// PWA Configuration
// Configuración personalizable para Progressive Web App

// ⚠️ IMPORTANTE: Personalizar esta configuración para cada cliente
const PWA_CONFIG = {
    // 📱 INFORMACIÓN DE LA APP (OBLIGATORIO)
    appName: 'Centro Médico Profesional', // ⚠️ CAMBIAR
    shortName: 'Centro Médico', // ⚠️ CAMBIAR (máximo 12 caracteres)
    description: 'Centro médico profesional con servicios de salud integral. Especialistas certificados y atención personalizada.',
    
    // 🎨 CONFIGURACIÓN VISUAL
    themeColor: '#1e88e5', // Color principal de la app
    backgroundColor: '#ffffff', // Color de fondo
    
    // 📂 CONFIGURACIÓN DE ARCHIVOS
    startUrl: './', // URL de inicio de la app
    scope: './', // Alcance de la app
    
    // 🌐 CONFIGURACIÓN REGIONAL
    lang: 'es', // es, en, fr, etc.
    dir: 'ltr', // ltr (izquierda a derecha) o rtl (derecha a izquierda)
    
    // 📱 CONFIGURACIÓN DE INSTALACIÓN
    installPrompt: {
        enabled: true, // Mostrar prompt de instalación
        showAfterSeconds: 30, // Mostrar después de X segundos
        showAfterPageViews: 2, // Mostrar después de X páginas vistas
        hideAfterDismiss: 7 // Ocultar por X días si se rechaza
    },
    
    // 🔔 CONFIGURACIÓN DE NOTIFICACIONES
    notifications: {
        enabled: true, // Habilitar notificaciones
        welcomeMessage: true, // Mostrar mensaje de bienvenida
        updateNotifications: true // Notificar actualizaciones
    },
    
    // 💾 CONFIGURACIÓN DE CACHE
    cache: {
        version: '1.0.0', // Versión del cache
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
        maxSize: 50 * 1024 * 1024, // 50MB en bytes
        strategy: 'networkFirst' // networkFirst, cacheFirst, staleWhileRevalidate
    },
    
    // 🎯 CATEGORÍAS DE LA APP (para app stores)
    categories: ['medical', 'health', 'healthcare'], // medical, legal, business, creative
    
    // 🔗 ATAJOS DE LA APP (shortcuts)
    shortcuts: [
        {
            name: 'Agendar Cita',
            shortName: 'Cita',
            description: 'Agendar una cita médica',
            url: '/#appointment',
            icon: '📅'
        },
        {
            name: 'Contacto',
            shortName: 'Contacto', 
            description: 'Información de contacto',
            url: '/#contact',
            icon: '📞'
        },
        {
            name: 'Servicios',
            shortName: 'Servicios',
            description: 'Nuestros servicios médicos',
            url: '/#services',
            icon: '🏥'
        },
        {
            name: 'Emergencias',
            shortName: 'Emergencia',
            description: 'Contacto de emergencia',
            url: 'tel:+525512345678',
            icon: '🚨'
        }
    ]
};

// 🔧 CONFIGURACIÓN AUTOMÁTICA POR SECTOR

function getSectorConfig(sector) {
    const configs = {
        medical: {
            categories: ['medical', 'health', 'healthcare'],
            themeColor: '#1e88e5',
            shortcuts: [
                {
                    name: 'Agendar Cita',
                    shortName: 'Cita',
                    description: 'Agendar una cita médica',
                    url: '/#appointment',
                    icon: '📅'
                },
                {
                    name: 'Emergencias',
                    shortName: 'Emergencia',
                    description: 'Contacto de emergencia',
                    url: 'tel:+525512345678',
                    icon: '🚨'
                },
                {
                    name: 'Servicios',
                    shortName: 'Servicios',
                    description: 'Servicios médicos',
                    url: '/#services',
                    icon: '🏥'
                }
            ]
        },
        legal: {
            categories: ['business', 'legal', 'professional'],
            themeColor: '#2e7d32',
            shortcuts: [
                {
                    name: 'Consulta Legal',
                    shortName: 'Consulta',
                    description: 'Agendar consulta legal',
                    url: '/#consultation',
                    icon: '⚖️'
                },
                {
                    name: 'Contacto',
                    shortName: 'Contacto',
                    description: 'Contactar abogado',
                    url: '/#contact',
                    icon: '📞'
                },
                {
                    name: 'Servicios',
                    shortName: 'Servicios',
                    description: 'Servicios legales',
                    url: '/#services',
                    icon: '📋'
                }
            ]
        },
        creative: {
            categories: ['business', 'design', 'creative'],
            themeColor: '#e91e63',
            shortcuts: [
                {
                    name: 'Portfolio',
                    shortName: 'Portfolio',
                    description: 'Ver trabajos',
                    url: '/#portfolio',
                    icon: '🎨'
                },
                {
                    name: 'Cotización',
                    shortName: 'Cotizar',
                    description: 'Solicitar cotización',
                    url: '/#quote',
                    icon: '💰'
                },
                {
                    name: 'Contacto',
                    shortName: 'Contacto',
                    description: 'Contactar estudio',
                    url: '/#contact',
                    icon: '📞'
                }
            ]
        },
        business: {
            categories: ['business', 'professional', 'consulting'],
            themeColor: '#ff9800',
            shortcuts: [
                {
                    name: 'Servicios',
                    shortName: 'Servicios',
                    description: 'Nuestros servicios',
                    url: '/#services',
                    icon: '💼'
                },
                {
                    name: 'Consultoría',
                    shortName: 'Consultoría',
                    description: 'Servicios de consultoría',
                    url: '/#consulting',
                    icon: '📊'
                },
                {
                    name: 'Contacto',
                    shortName: 'Contacto',
                    description: 'Contactar empresa',
                    url: '/#contact',
                    icon: '📞'
                }
            ]
        }
    };
    
    return configs[sector] || configs.business;
}

// 🎨 GENERADOR DE ICONOS AUTOMÁTICO

function generatePWAIcons() {
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    const icons = [];
    
    sizes.forEach(size => {
        icons.push({
            src: `images/icons/icon-${size}x${size}.png`,
            sizes: `${size}x${size}`,
            type: 'image/png',
            purpose: 'maskable any'
        });
    });
    
    return icons;
}

// 📱 GENERADOR DE MANIFEST DINÁMICO

function generateManifest() {
    const sectorConfig = getSectorConfig(PWA_CONFIG.categories[0]);
    
    return {
        name: PWA_CONFIG.appName,
        short_name: PWA_CONFIG.shortName,
        description: PWA_CONFIG.description,
        start_url: PWA_CONFIG.startUrl,
        display: 'standalone',
        background_color: PWA_CONFIG.backgroundColor,
        theme_color: sectorConfig.themeColor,
        orientation: 'portrait-primary',
        scope: PWA_CONFIG.scope,
        lang: PWA_CONFIG.lang,
        dir: PWA_CONFIG.dir,
        categories: sectorConfig.categories,
        icons: generatePWAIcons(),
        shortcuts: sectorConfig.shortcuts.map(shortcut => ({
            name: shortcut.name,
            short_name: shortcut.shortName,
            description: shortcut.description,
            url: shortcut.url,
            icons: [{
                src: `images/icons/shortcut-${shortcut.shortName.toLowerCase()}.png`,
                sizes: '96x96'
            }]
        })),
        related_applications: [],
        prefer_related_applications: false,
        edge_side_panel: {
            preferred_width: 400
        },
        launch_handler: {
            client_mode: 'navigate-existing'
        }
    };
}

// Configuración PWA aplicada
console.log('📱 PWA Manager loaded');

// Aplicar configuración automática por sector
const pwaAutoConfig = getSectorConfig(PWA_CONFIG.categories[0]);
PWA_CONFIG.themeColor = pwaAutoConfig.themeColor;
PWA_CONFIG.categories = pwaAutoConfig.categories;
PWA_CONFIG.shortcuts = pwaAutoConfig.shortcuts;

// Exportar configuración para uso global
window.PWA_CONFIG = PWA_CONFIG;
window.generateManifest = generateManifest;
