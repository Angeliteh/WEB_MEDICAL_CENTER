// Security Configuration
// Configuración personalizable para seguridad avanzada

// ⚠️ IMPORTANTE: Personalizar esta configuración para cada cliente
const SECURITY_CONFIG = {
    // 🔧 CONFIGURACIÓN GENERAL
    enabled: true, // Habilitar sistema de seguridad
    level: 'high', // low, medium, high, maximum
    sector: 'medical', // medical, legal, creative, business
    
    // 🚫 XSS PROTECTION
    xssProtection: {
        enabled: true,
        sanitizeInputs: true, // Sanitizar inputs automáticamente
        blockInlineScripts: true, // Bloquear scripts inline
        filterDangerousChars: true, // Filtrar caracteres peligrosos
        strictMode: true // Modo estricto para sector médico
    },
    
    // 🛡️ CSRF PROTECTION
    csrfProtection: {
        enabled: true,
        tokenExpiry: 3600000, // 1 hora en milisegundos
        regenerateOnSubmit: true, // Regenerar token después de envío
        validateAllForms: true // Validar todos los formularios
    },
    
    // 🔐 CONTENT SECURITY POLICY
    csp: {
        enabled: true,
        strictMode: true, // Modo estricto para máxima seguridad
        allowInlineStyles: false, // No permitir estilos inline
        allowInlineScripts: false, // No permitir scripts inline
        allowedDomains: [
            'fonts.googleapis.com',
            'fonts.gstatic.com',
            'maps.googleapis.com',
            'www.google.com',
            'maps.google.com',
            'maps.gstatic.com'
        ]
    },
    
    // 🚦 RATE LIMITING
    rateLimiting: {
        enabled: true,
        maxRequests: 100, // Máximo requests por minuto
        blockDuration: 300000, // 5 minutos de bloqueo
        trackByIP: true, // Rastrear por IP
        strictForForms: true // Más estricto para formularios
    },
    
    // 🔒 SECURITY HEADERS
    securityHeaders: {
        enabled: true,
        hsts: true, // HTTP Strict Transport Security
        noSniff: true, // X-Content-Type-Options
        frameOptions: true, // X-Frame-Options
        xssFilter: true, // X-XSS-Protection
        referrerPolicy: true, // Referrer-Policy
        permissionsPolicy: true // Permissions-Policy
    },
    
    // 🔍 SECURITY MONITORING
    monitoring: {
        enabled: true,
        logAttempts: true, // Registrar intentos de ataque
        alertThreshold: 5, // Umbral de alerta
        trackSuspiciousActivity: true, // Rastrear actividad sospechosa
        reportInterval: 600000, // Reportes cada 10 minutos
        maxLogEntries: 100 // Máximo entradas en log
    },
    
    // 🧹 INPUT SANITIZATION
    inputSanitization: {
        enabled: true,
        realTime: true, // Sanitización en tiempo real
        strictMode: true, // Modo estricto
        allowedTags: [], // Tags HTML permitidos (ninguno por defecto)
        maxLength: 1000 // Longitud máxima de input
    }
};

// 🏢 CONFIGURACIÓN POR SECTOR

function getSectorSecurityConfig(sector) {
    const configs = {
        medical: {
            // Sector médico requiere máxima seguridad
            level: 'maximum',
            xssProtection: {
                strictMode: true,
                blockInlineScripts: true
            },
            csrfProtection: {
                tokenExpiry: 1800000, // 30 minutos (más corto)
                regenerateOnSubmit: true
            },
            rateLimiting: {
                maxRequests: 50, // Más restrictivo
                blockDuration: 600000 // 10 minutos
            },
            monitoring: {
                alertThreshold: 3, // Más sensible
                reportInterval: 300000 // Reportes cada 5 minutos
            },
            priority: 'maximum'
        },
        legal: {
            // Sector legal requiere alta seguridad
            level: 'high',
            xssProtection: {
                strictMode: true
            },
            csrfProtection: {
                tokenExpiry: 2700000 // 45 minutos
            },
            rateLimiting: {
                maxRequests: 75
            },
            monitoring: {
                alertThreshold: 4
            },
            priority: 'high'
        },
        creative: {
            // Sector creativo con seguridad balanceada
            level: 'medium',
            xssProtection: {
                strictMode: false
            },
            rateLimiting: {
                maxRequests: 150
            },
            monitoring: {
                alertThreshold: 7
            },
            priority: 'medium'
        },
        business: {
            // Sector empresarial estándar
            level: 'medium',
            rateLimiting: {
                maxRequests: 100
            },
            monitoring: {
                alertThreshold: 5
            },
            priority: 'standard'
        }
    };
    
    return configs[sector] || configs.business;
}

// 🎯 CONFIGURACIÓN AUTOMÁTICA

// Detectar sector desde configuración existente
const securityCurrentSector = window.SEO_CONFIG?.sector || 'medical';
const securitySectorConfig = getSectorSecurityConfig(securityCurrentSector);

// Aplicar configuración del sector
Object.assign(SECURITY_CONFIG, {
    level: securitySectorConfig.level,
    sector: securityCurrentSector
});

// Aplicar configuraciones específicas del sector
if (securitySectorConfig.xssProtection) {
    Object.assign(SECURITY_CONFIG.xssProtection, securitySectorConfig.xssProtection);
}
if (securitySectorConfig.csrfProtection) {
    Object.assign(SECURITY_CONFIG.csrfProtection, securitySectorConfig.csrfProtection);
}
if (securitySectorConfig.rateLimiting) {
    Object.assign(SECURITY_CONFIG.rateLimiting, securitySectorConfig.rateLimiting);
}
if (securitySectorConfig.monitoring) {
    Object.assign(SECURITY_CONFIG.monitoring, securitySectorConfig.monitoring);
}

// 📋 GUÍA DE CONFIGURACIÓN RÁPIDA
console.log(`
🔒 SECURITY SYSTEM - GUÍA DE CONFIGURACIÓN

1. 🔧 NIVEL DE SEGURIDAD:
   - level: low, medium, high, maximum
   
2. 🚫 XSS PROTECTION:
   - strictMode: true/false
   - sanitizeInputs: Sanitización automática
   
3. 🛡️ CSRF PROTECTION:
   - tokenExpiry: Tiempo de vida del token
   - validateAllForms: Validar todos los formularios
   
4. 🚦 RATE LIMITING:
   - maxRequests: Máximo requests por minuto
   - blockDuration: Tiempo de bloqueo
   
5. 🔍 MONITORING:
   - alertThreshold: Umbral de alerta
   - trackSuspiciousActivity: Rastrear actividad sospechosa
   
📊 Configuración actual:
🔒 Sector: ${securityCurrentSector}
📋 Nivel: ${SECURITY_CONFIG.level}
🎯 Prioridad: ${securitySectorConfig.priority}
🚦 Max requests: ${SECURITY_CONFIG.rateLimiting.maxRequests}/min
🔍 Alert threshold: ${SECURITY_CONFIG.monitoring.alertThreshold}
`);

// Exportar configuración para uso global
window.SECURITY_CONFIG = SECURITY_CONFIG;
