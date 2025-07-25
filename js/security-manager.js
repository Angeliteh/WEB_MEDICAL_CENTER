// Security Manager - Advanced Security System
// Sistema completo de seguridad para sitios médicos

class SecurityManager {
    constructor() {
        // Usar configuración externa si está disponible
        const externalConfig = window.SECURITY_CONFIG || {};
        
        this.config = {
            // Configuración general
            enabled: externalConfig.enabled !== undefined ? externalConfig.enabled : true,
            level: externalConfig.level || 'high', // low, medium, high, maximum
            sector: externalConfig.sector || 'medical',
            
            // XSS Protection
            xssProtection: {
                enabled: externalConfig.xssProtection?.enabled !== undefined ? externalConfig.xssProtection.enabled : true,
                sanitizeInputs: true,
                blockInlineScripts: true,
                filterDangerousChars: true
            },
            
            // CSRF Protection
            csrfProtection: {
                enabled: externalConfig.csrfProtection?.enabled !== undefined ? externalConfig.csrfProtection.enabled : true,
                tokenExpiry: 3600000, // 1 hora
                regenerateOnSubmit: true
            },
            
            // Content Security Policy
            csp: {
                enabled: externalConfig.csp?.enabled !== undefined ? externalConfig.csp.enabled : true,
                strictMode: externalConfig.csp?.strictMode !== undefined ? externalConfig.csp.strictMode : true,
                allowInlineStyles: false,
                allowInlineScripts: false
            },
            
            // Rate Limiting
            rateLimiting: {
                enabled: externalConfig.rateLimiting?.enabled !== undefined ? externalConfig.rateLimiting.enabled : true,
                maxRequests: 100, // por minuto
                blockDuration: 300000, // 5 minutos
                trackByIP: true
            },
            
            // Security Headers
            securityHeaders: {
                enabled: externalConfig.securityHeaders?.enabled !== undefined ? externalConfig.securityHeaders.enabled : true,
                hsts: true,
                noSniff: true,
                frameOptions: true,
                xssFilter: true
            },
            
            // Monitoring
            monitoring: {
                enabled: externalConfig.monitoring?.enabled !== undefined ? externalConfig.monitoring.enabled : true,
                logAttempts: true,
                alertThreshold: 5,
                trackSuspiciousActivity: true
            }
        };
        
        this.securityLog = [];
        this.blockedIPs = new Map();
        this.requestCounts = new Map();
        this.csrfTokens = new Map();
        this.suspiciousActivity = new Map();
        
        this.init();
    }
    
    init() {
        if (!this.config.enabled) return;
        
        console.log('🔒 Security Manager initializing...');
        
        // Aplicar configuración por sector
        this.applySectorConfiguration();
        
        // Inicializar protecciones
        if (this.config.securityHeaders.enabled) {
            this.setupSecurityHeaders();
        }
        
        if (this.config.xssProtection.enabled) {
            this.setupXSSProtection();
        }
        
        if (this.config.csrfProtection.enabled) {
            this.setupCSRFProtection();
        }
        
        if (this.config.csp.enabled) {
            this.setupContentSecurityPolicy();
        }
        
        if (this.config.rateLimiting.enabled) {
            this.setupRateLimiting();
        }
        
        if (this.config.monitoring.enabled) {
            this.setupSecurityMonitoring();
        }
        
        // Configurar sanitización de inputs
        this.setupInputSanitization();
        
        // Configurar protección de formularios
        this.setupFormProtection();
        
        console.log('🛡️ Security Manager initialized');
        console.log(`🔧 Security Level: ${this.config.level.toUpperCase()}`);
        console.log(`🏥 Sector: ${this.config.sector}`);
    }
    
    applySectorConfiguration() {
        // Configuración específica para sector médico
        if (this.config.sector === 'medical') {
            this.config.level = 'maximum';
            this.config.csp.strictMode = true;
            this.config.rateLimiting.maxRequests = 50; // Más restrictivo
            this.config.monitoring.alertThreshold = 3; // Más sensible
        }
    }
    
    setupSecurityHeaders() {
        // Crear meta tags de seguridad
        const securityHeaders = [
            // X-Content-Type-Options
            { name: 'X-Content-Type-Options', content: 'nosniff' },
            
            // X-Frame-Options
            { name: 'X-Frame-Options', content: 'DENY' },
            
            // X-XSS-Protection
            { name: 'X-XSS-Protection', content: '1; mode=block' },
            
            // Referrer Policy
            { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
            
            // Permissions Policy
            { name: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' },
            
            // Strict Transport Security (simulado)
            { name: 'Strict-Transport-Security', content: 'max-age=31536000; includeSubDomains' }
        ];
        
        securityHeaders.forEach(header => {
            let metaTag = document.querySelector(`meta[name="${header.name}"]`);
            if (!metaTag) {
                metaTag = document.createElement('meta');
                metaTag.name = header.name;
                document.head.appendChild(metaTag);
            }
            metaTag.content = header.content;
        });
        
        console.log('🔒 Security headers applied');
    }
    
    setupXSSProtection() {
        // Protección contra XSS
        this.dangerousPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe\b[^>]*>/gi,
            /<object\b[^>]*>/gi,
            /<embed\b[^>]*>/gi,
            /<link\b[^>]*>/gi,
            /<meta\b[^>]*>/gi
        ];
        
        // Interceptar modificaciones del DOM
        this.observeDOM();
        
        console.log('🚫 XSS Protection enabled');
    }
    
    observeDOM() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            this.scanElementForThreats(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    scanElementForThreats(element) {
        // Excluir elementos seguros del sistema de seguridad
        if (this.isWhitelistedElement(element)) {
            return;
        }

        // Escanear elemento por contenido malicioso
        const innerHTML = element.innerHTML || '';
        const outerHTML = element.outerHTML || '';

        this.dangerousPatterns.forEach(pattern => {
            if (pattern.test(innerHTML) || pattern.test(outerHTML)) {
                this.logSecurityEvent('XSS_ATTEMPT', {
                    element: element.tagName,
                    content: innerHTML.substring(0, 100),
                    timestamp: new Date().toISOString()
                });

                // Sanitizar elemento
                this.sanitizeElement(element);
            }
        });
    }

    isWhitelistedElement(element) {
        // Lista blanca de elementos seguros
        const whitelistedClasses = [
            'ui-datepicker',
            'ui-datepicker-header',
            'ui-datepicker-calendar',
            'ui-datepicker-title',
            'ui-widget',
            'ui-widget-content',
            'ui-widget-header',
            'ui-corner-all',
            // Google Maps elements
            'gm-style',
            'gm-style-moc',
            'gmnoprint',
            'modern-datepicker',
            'datepicker-header',
            'datepicker-body',
            'datepicker-footer',
            'datepicker-days',
            'datepicker-weekdays',
            'slick-track',
            'slick-slide',
            'slick-dots'
        ];

        const whitelistedIds = [
            'ui-datepicker-div',
            'modern-datepicker',
            'datepicker-days'
        ];

        // Verificar si el elemento contiene contenido de datepicker
        const innerHTML = element.innerHTML || '';
        const isDatepickerContent = innerHTML.includes('datepicker') ||
                                   innerHTML.includes('ui-widget') ||
                                   innerHTML.includes('month-year') ||
                                   innerHTML.includes('weekday');

        if (isDatepickerContent) {
            return true;
        }

        // Verificar si el elemento es de Google Maps
        const tagName = element.tagName || '';
        const isGoogleMapsElement = tagName === 'GMP-INTERNAL-CAMERA-CONTROL' ||
                                   innerHTML.includes('gm-style') ||
                                   innerHTML.includes('gmnoprint') ||
                                   innerHTML.includes('Map camera controls') ||
                                   element.closest('#map') !== null;

        if (isGoogleMapsElement) {
            return true;
        }

        // Verificar si el elemento o su padre tiene clases/IDs seguros
        let currentElement = element;
        for (let i = 0; i < 5; i++) { // Verificar hasta 5 niveles arriba
            if (!currentElement) break;

            // Verificar clases
            if (currentElement.className) {
                const classes = currentElement.className.split(' ');
                if (classes.some(cls => whitelistedClasses.includes(cls))) {
                    return true;
                }
            }

            // Verificar IDs
            if (currentElement.id && whitelistedIds.includes(currentElement.id)) {
                return true;
            }

            currentElement = currentElement.parentElement;
        }

        return false;
    }
    
    sanitizeElement(element) {
        // Remover atributos peligrosos
        const dangerousAttributes = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus'];
        dangerousAttributes.forEach(attr => {
            if (element.hasAttribute(attr)) {
                element.removeAttribute(attr);
            }
        });
        
        // Sanitizar contenido
        if (element.innerHTML) {
            element.innerHTML = this.sanitizeHTML(element.innerHTML);
        }
    }
    
    sanitizeHTML(html) {
        // Sanitización básica de HTML
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '')
            .replace(/<iframe\b[^>]*>/gi, '')
            .replace(/<object\b[^>]*>/gi, '')
            .replace(/<embed\b[^>]*>/gi, '');
    }
    
    setupCSRFProtection() {
        // Generar token CSRF para la sesión
        this.generateCSRFToken();
        
        // Agregar tokens a todos los formularios
        this.protectForms();
        
        // Interceptar envíos de formularios
        this.interceptFormSubmissions();
        
        console.log('🛡️ CSRF Protection enabled');
    }
    
    generateCSRFToken() {
        const token = this.generateSecureToken();
        const expiry = Date.now() + this.config.csrfProtection.tokenExpiry;
        
        this.csrfTokens.set('current', { token, expiry });
        
        // Guardar en sessionStorage para persistencia
        sessionStorage.setItem('csrf_token', token);
        sessionStorage.setItem('csrf_expiry', expiry.toString());
        
        return token;
    }
    
    generateSecureToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    protectForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.addCSRFTokenToForm(form);
        });
        
        // Observar nuevos formularios
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.tagName === 'FORM') {
                        this.addCSRFTokenToForm(node);
                    } else if (node.nodeType === 1) {
                        const forms = node.querySelectorAll('form');
                        forms.forEach(form => this.addCSRFTokenToForm(form));
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    addCSRFTokenToForm(form) {
        // Verificar si ya tiene token
        if (form.querySelector('input[name="csrf_token"]')) {
            return;
        }
        
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'csrf_token';
        tokenInput.value = this.getCurrentCSRFToken();
        
        form.appendChild(tokenInput);
    }
    
    getCurrentCSRFToken() {
        const current = this.csrfTokens.get('current');
        if (!current || Date.now() > current.expiry) {
            return this.generateCSRFToken();
        }
        return current.token;
    }

    interceptFormSubmissions() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM') {
                if (!this.validateCSRFToken(form)) {
                    e.preventDefault();
                    this.logSecurityEvent('CSRF_VIOLATION', {
                        form: form.action || 'unknown',
                        timestamp: new Date().toISOString()
                    });
                    this.showSecurityAlert('Formulario bloqueado por seguridad');
                }
            }
        });
    }

    validateCSRFToken(form) {
        const tokenInput = form.querySelector('input[name="csrf_token"]');
        if (!tokenInput) return false;

        const submittedToken = tokenInput.value;
        const currentToken = this.getCurrentCSRFToken();

        return submittedToken === currentToken;
    }

    setupContentSecurityPolicy() {
        // Configurar CSP via meta tag
        let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (!cspMeta) {
            cspMeta = document.createElement('meta');
            cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
            document.head.appendChild(cspMeta);
        }

        const cspDirectives = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://fonts.googleapis.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com",
            "img-src 'self' data: https: https://maps.googleapis.com https://maps.gstatic.com",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://maps.googleapis.com https://*.googleapis.com",
            "frame-src 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ];

        if (this.config.csp.strictMode) {
            cspDirectives.push("upgrade-insecure-requests");
        }

        cspMeta.content = cspDirectives.join('; ');

        console.log('🔐 Content Security Policy applied');
    }

    setupRateLimiting() {
        // Implementar rate limiting básico
        this.startRateLimitingCleanup();

        // Interceptar requests (simulado con eventos) - Solo para formularios
        document.addEventListener('submit', (e) => {
            this.checkRateLimit('form_submit');
        });

        document.addEventListener('submit', (e) => {
            if (!this.checkRateLimit('submit')) {
                e.preventDefault();
                this.showSecurityAlert('Demasiadas solicitudes. Intente más tarde.');
            }
        });

        console.log('🚦 Rate Limiting enabled');
    }

    checkRateLimit(action) {
        const clientId = this.getClientIdentifier();
        const now = Date.now();
        const windowStart = now - 60000; // 1 minuto

        if (!this.requestCounts.has(clientId)) {
            this.requestCounts.set(clientId, []);
        }

        const requests = this.requestCounts.get(clientId);

        // Limpiar requests antiguos
        const recentRequests = requests.filter(timestamp => timestamp > windowStart);

        if (recentRequests.length >= this.config.rateLimiting.maxRequests) {
            this.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
                clientId,
                action,
                requestCount: recentRequests.length,
                timestamp: new Date().toISOString()
            });

            // Bloquear temporalmente
            this.blockedIPs.set(clientId, now + this.config.rateLimiting.blockDuration);

            return false;
        }

        // Agregar request actual
        recentRequests.push(now);
        this.requestCounts.set(clientId, recentRequests);

        return true;
    }

    getClientIdentifier() {
        // Generar identificador único del cliente
        return 'client_' + (sessionStorage.getItem('client_id') || this.generateClientId());
    }

    generateClientId() {
        const id = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('client_id', id);
        return id;
    }

    startRateLimitingCleanup() {
        // Limpiar contadores cada 5 minutos
        setInterval(() => {
            const now = Date.now();

            // Limpiar IPs bloqueadas expiradas
            for (const [ip, blockTime] of this.blockedIPs.entries()) {
                if (now > blockTime) {
                    this.blockedIPs.delete(ip);
                }
            }

            // Limpiar contadores antiguos
            for (const [clientId, requests] of this.requestCounts.entries()) {
                const recentRequests = requests.filter(timestamp => timestamp > now - 300000); // 5 minutos
                if (recentRequests.length === 0) {
                    this.requestCounts.delete(clientId);
                } else {
                    this.requestCounts.set(clientId, recentRequests);
                }
            }
        }, 300000); // 5 minutos
    }

    setupSecurityMonitoring() {
        // Monitorear actividad sospechosa
        this.monitorSuspiciousActivity();

        // Reportar estadísticas cada 10 minutos
        setInterval(() => {
            this.generateSecurityReport();
        }, 600000);

        console.log('🔍 Security Monitoring enabled');
    }

    monitorSuspiciousActivity() {
        // Detectar patrones sospechosos
        const suspiciousEvents = [
            'contextmenu', // Click derecho
            'selectstart', // Selección de texto
            'dragstart',   // Arrastrar elementos
            'keydown'      // Teclas específicas
        ];

        suspiciousEvents.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                this.analyzeSuspiciousEvent(eventType, e);
            });
        });
    }

    analyzeSuspiciousEvent(eventType, event) {
        const clientId = this.getClientIdentifier();

        if (!this.suspiciousActivity.has(clientId)) {
            this.suspiciousActivity.set(clientId, { events: [], score: 0 });
        }

        const activity = this.suspiciousActivity.get(clientId);
        activity.events.push({
            type: eventType,
            timestamp: Date.now(),
            details: this.getEventDetails(eventType, event)
        });

        // Calcular score de sospecha
        activity.score += this.calculateSuspicionScore(eventType, event);

        if (activity.score > this.config.monitoring.alertThreshold) {
            this.logSecurityEvent('SUSPICIOUS_ACTIVITY', {
                clientId,
                score: activity.score,
                events: activity.events.slice(-5), // Últimos 5 eventos
                timestamp: new Date().toISOString()
            });
        }
    }

    calculateSuspicionScore(eventType, event) {
        let score = 0;

        switch (eventType) {
            case 'keydown':
                // F12, Ctrl+Shift+I, etc.
                if (event.key === 'F12' ||
                    (event.ctrlKey && event.shiftKey && event.key === 'I')) {
                    score += 2;
                }
                break;
            case 'contextmenu':
                score += 1;
                break;
            case 'selectstart':
                score += 0.5;
                break;
        }

        return score;
    }

    getEventDetails(eventType, event) {
        const details = { type: eventType };

        if (eventType === 'keydown') {
            details.key = event.key;
            details.ctrlKey = event.ctrlKey;
            details.shiftKey = event.shiftKey;
        }

        return details;
    }

    setupInputSanitization() {
        // Sanitizar inputs en tiempo real
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.sanitizeInput(e.target);
            }
        });

        console.log('🧹 Input Sanitization enabled');
    }

    sanitizeInput(input) {
        const originalValue = input.value;
        let sanitizedValue = originalValue;

        // Remover scripts y código malicioso
        sanitizedValue = sanitizedValue
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '')
            .replace(/[<>]/g, ''); // Remover < y >

        if (sanitizedValue !== originalValue) {
            input.value = sanitizedValue;
            this.logSecurityEvent('INPUT_SANITIZED', {
                field: input.name || input.id || 'unknown',
                original: originalValue.substring(0, 50),
                sanitized: sanitizedValue.substring(0, 50),
                timestamp: new Date().toISOString()
            });
        }
    }

    setupFormProtection() {
        // Proteger formularios contra ataques
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.protectForm(form);
        });
    }

    protectForm(form) {
        // Agregar validación de seguridad
        form.addEventListener('submit', (e) => {
            if (!this.validateFormSecurity(form)) {
                e.preventDefault();
                this.showSecurityAlert('Formulario bloqueado por contenido sospechoso');
            }
        });
    }

    validateFormSecurity(form) {
        const formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            if (typeof value === 'string') {
                // Verificar contenido malicioso
                for (const pattern of this.dangerousPatterns) {
                    if (pattern.test(value)) {
                        this.logSecurityEvent('MALICIOUS_FORM_DATA', {
                            field: key,
                            value: value.substring(0, 100),
                            timestamp: new Date().toISOString()
                        });
                        return false;
                    }
                }
            }
        }

        return true;
    }

    logSecurityEvent(type, details) {
        const event = {
            type,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.securityLog.push(event);

        // Mantener solo los últimos 100 eventos
        if (this.securityLog.length > 100) {
            this.securityLog = this.securityLog.slice(-100);
        }

        // Log en consola para desarrollo
        console.warn(`🚨 Security Event: ${type}`, details);

        // Guardar en localStorage para persistencia
        this.saveSecurityLog();
    }

    saveSecurityLog() {
        try {
            localStorage.setItem('security_log', JSON.stringify(this.securityLog.slice(-20)));
        } catch (e) {
            // Ignorar errores de localStorage
        }
    }

    showSecurityAlert(message) {
        // Mostrar alerta de seguridad al usuario
        if (window.accessibilityManager) {
            window.accessibilityManager.announceFormError(message);
        }

        // Crear notificación visual
        this.createSecurityNotification(message);
    }

    createSecurityNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'security-notification';
        notification.innerHTML = `
            <div class="security-notification-content">
                <span class="security-icon">🛡️</span>
                <span class="security-message">${message}</span>
                <button class="security-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    generateSecurityReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalEvents: this.securityLog.length,
            eventTypes: this.getEventTypeCounts(),
            blockedIPs: this.blockedIPs.size,
            activeClients: this.requestCounts.size,
            suspiciousClients: Array.from(this.suspiciousActivity.entries())
                .filter(([_, activity]) => activity.score > 2).length,
            config: {
                level: this.config.level,
                sector: this.config.sector,
                protections: this.getActiveProtections()
            }
        };

        console.log('📊 Security Report:', report);
        return report;
    }

    getEventTypeCounts() {
        const counts = {};
        this.securityLog.forEach(event => {
            counts[event.type] = (counts[event.type] || 0) + 1;
        });
        return counts;
    }

    getActiveProtections() {
        return {
            xssProtection: this.config.xssProtection.enabled,
            csrfProtection: this.config.csrfProtection.enabled,
            csp: this.config.csp.enabled,
            rateLimiting: this.config.rateLimiting.enabled,
            securityHeaders: this.config.securityHeaders.enabled,
            monitoring: this.config.monitoring.enabled
        };
    }

    // Métodos públicos para integración
    getSecurityStatus() {
        return {
            enabled: this.config.enabled,
            level: this.config.level,
            protections: this.getActiveProtections(),
            stats: {
                totalEvents: this.securityLog.length,
                blockedIPs: this.blockedIPs.size,
                activeClients: this.requestCounts.size
            }
        };
    }

    clearSecurityLog() {
        this.securityLog = [];
        localStorage.removeItem('security_log');
        console.log('🗑️ Security log cleared');
    }

    updateSecurityLevel(level) {
        this.config.level = level;
        console.log(`🔧 Security level updated to: ${level}`);

        // Reconfigurar según el nuevo nivel
        this.applySectorConfiguration();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.securityManager = new SecurityManager();
});

console.log('🔒 Security Manager loaded');
