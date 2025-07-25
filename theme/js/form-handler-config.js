// Form Handler Configuration
// Configuración personalizable para formularios AJAX

// ⚠️ IMPORTANTE: Personalizar esta configuración para cada cliente
const FORM_HANDLER_CONFIG = {
    // 🔧 CONFIGURACIÓN GENERAL
    enabled: true, // Habilitar sistema de formularios AJAX
    ajaxEnabled: true, // Envío AJAX sin recargar página
    realTimeValidation: true, // Validación en tiempo real
    autoSave: true, // Auto-guardar drafts
    sector: 'medical', // medical, legal, creative, business
    
    // ✅ CONFIGURACIÓN DE VALIDACIÓN
    validation: {
        enabled: true,
        strictMode: true, // Modo estricto para sector médico
        showErrors: true, // Mostrar errores de validación
        validateOnBlur: true, // Validar al salir del campo
        validateOnInput: false, // Validar mientras escribe (puede ser molesto)
        customRules: {
            // Reglas personalizadas específicas del cliente
            mexicanPhone: (value, field) => {
                if (!value) return null;
                const phoneRegex = /^(\+52|52)?[\s\-]?[1-9]\d{9}$/;
                const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
                if (!phoneRegex.test(cleanPhone)) {
                    return 'Por favor ingrese un teléfono mexicano válido (10 dígitos)';
                }
                return null;
            },
            
            medicalSpecialty: (value, field) => {
                if (!value) return null;
                const validSpecialties = [
                    'cardiologia', 'dermatologia', 'neurologia', 'pediatria',
                    'ginecologia', 'traumatologia', 'oftalmologia', 'psiquiatria'
                ];
                if (!validSpecialties.includes(value.toLowerCase())) {
                    return 'Por favor seleccione una especialidad médica válida';
                }
                return null;
            }
        }
    },
    
    // 🎨 CONFIGURACIÓN DE FEEDBACK VISUAL
    feedback: {
        enabled: true,
        showLoading: true, // Mostrar spinner de carga
        showSuccess: true, // Mostrar mensaje de éxito
        showErrors: true, // Mostrar mensajes de error
        autoHide: true, // Auto-ocultar mensajes
        hideDelay: 5000, // Tiempo antes de ocultar (ms)
        animations: true, // Animaciones suaves
        position: 'inline' // inline, toast, modal
    },
    
    // 🔒 CONFIGURACIÓN DE SEGURIDAD
    security: {
        enabled: true,
        csrfProtection: true, // Protección CSRF automática
        sanitizeInputs: true, // Sanitizar inputs automáticamente
        rateLimiting: true, // Limitar envíos por minuto
        maxSubmissions: 5, // Máximo envíos por minuto
        blockDuration: 300000 // 5 minutos de bloqueo
    },
    
    // 💾 CONFIGURACIÓN DE AUTO-SAVE
    autoSave: {
        enabled: true,
        interval: 30000, // Guardar cada 30 segundos
        excludeFields: ['password', 'confirm_password', 'credit_card'], // Campos a excluir
        showIndicator: true, // Mostrar indicador de guardado
        maxDrafts: 5 // Máximo drafts por formulario
    },
    
    // 📱 CONFIGURACIÓN RESPONSIVE
    responsive: {
        enabled: true,
        mobileOptimized: true, // Optimización para móvil
        touchFriendly: true, // Elementos touch-friendly
        autoScroll: true, // Auto-scroll a errores
        keyboardSupport: true // Soporte completo de teclado
    },
    
    // 🌐 CONFIGURACIÓN DE IDIOMAS
    i18n: {
        enabled: true,
        defaultLanguage: 'es',
        supportedLanguages: ['es', 'en'],
        autoDetect: true // Auto-detectar idioma del navegador
    }
};

// 🏢 CONFIGURACIÓN POR SECTOR

function getSectorFormConfig(sector) {
    const configs = {
        medical: {
            // Sector médico requiere validación estricta
            validation: {
                strictMode: true,
                validateOnBlur: true,
                customRules: {
                    // Validaciones específicas médicas
                    patientAge: (value, field) => {
                        const age = parseInt(value);
                        if (isNaN(age) || age < 0 || age > 120) {
                            return 'Edad debe estar entre 0 y 120 años';
                        }
                        return null;
                    },
                    
                    emergencyContact: (value, field) => {
                        if (!value || value.trim().length < 10) {
                            return 'Contacto de emergencia es obligatorio (mínimo 10 caracteres)';
                        }
                        return null;
                    },
                    
                    medicalHistory: (value, field) => {
                        if (field.required && (!value || value.trim().length < 20)) {
                            return 'Por favor proporcione detalles médicos (mínimo 20 caracteres)';
                        }
                        return null;
                    }
                }
            },
            security: {
                csrfProtection: true,
                sanitizeInputs: true,
                rateLimiting: true,
                maxSubmissions: 3 // Más restrictivo para formularios médicos
            },
            autoSave: {
                enabled: true,
                interval: 20000, // Guardar más frecuentemente
                excludeFields: ['password', 'ssn', 'medical_id'] // Excluir datos sensibles
            },
            priority: 'maximum'
        },
        
        legal: {
            // Sector legal requiere validación rigurosa
            validation: {
                strictMode: true,
                validateOnBlur: true
            },
            security: {
                csrfProtection: true,
                sanitizeInputs: true,
                maxSubmissions: 3
            },
            autoSave: {
                enabled: true,
                excludeFields: ['password', 'ssn', 'legal_id']
            },
            priority: 'high'
        },
        
        creative: {
            // Sector creativo más flexible
            validation: {
                strictMode: false,
                validateOnBlur: true
            },
            security: {
                maxSubmissions: 10
            },
            autoSave: {
                enabled: true,
                interval: 45000
            },
            priority: 'medium'
        },
        
        business: {
            // Sector empresarial estándar
            validation: {
                strictMode: false
            },
            security: {
                maxSubmissions: 5
            },
            autoSave: {
                enabled: true
            },
            priority: 'standard'
        }
    };
    
    return configs[sector] || configs.business;
}

// 📋 CONFIGURACIÓN DE TIPOS DE FORMULARIO

const FORM_TYPE_CONFIGS = {
    contact: {
        requiredFields: ['name', 'email', 'message'],
        optionalFields: ['phone', 'subject'],
        successMessage: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
        redirectAfterSuccess: false,
        autoSave: true
    },
    
    appointment: {
        requiredFields: ['name', 'email', 'phone', 'appointment_date', 'appointment_time'],
        optionalFields: ['message', 'specialty'],
        successMessage: '¡Cita solicitada exitosamente! Recibirás una confirmación por email.',
        redirectAfterSuccess: false,
        autoSave: true,
        customValidation: {
            appointment_date: 'date',
            appointment_time: 'time',
            phone: 'mexicanPhone'
        }
    },
    
    consultation: {
        requiredFields: ['name', 'email', 'phone', 'age', 'symptoms'],
        optionalFields: ['medical_history', 'medications', 'allergies'],
        successMessage: '¡Consulta enviada! Un especialista revisará tu caso.',
        redirectAfterSuccess: false,
        autoSave: true,
        customValidation: {
            age: 'patientAge',
            symptoms: 'medicalHistory'
        }
    },
    
    newsletter: {
        requiredFields: ['email'],
        optionalFields: ['name'],
        successMessage: '¡Suscripción exitosa! Gracias por unirte a nuestro newsletter.',
        redirectAfterSuccess: false,
        autoSave: false
    },
    
    search: {
        requiredFields: ['query'],
        optionalFields: [],
        successMessage: 'Búsqueda completada.',
        redirectAfterSuccess: false,
        autoSave: false
    }
};

// 🎯 CONFIGURACIÓN AUTOMÁTICA

// Detectar sector desde configuración existente
const formCurrentSector = window.SEO_CONFIG?.sector || 'medical';
const formSectorConfig = getSectorFormConfig(formCurrentSector);

// Aplicar configuración del sector
Object.assign(FORM_HANDLER_CONFIG, {
    sector: formCurrentSector
});

// Aplicar configuraciones específicas del sector
if (formSectorConfig.validation) {
    Object.assign(FORM_HANDLER_CONFIG.validation, formSectorConfig.validation);
}
if (formSectorConfig.security) {
    Object.assign(FORM_HANDLER_CONFIG.security, formSectorConfig.security);
}
if (formSectorConfig.autoSave) {
    Object.assign(FORM_HANDLER_CONFIG.autoSave, formSectorConfig.autoSave);
}

// 📋 GUÍA DE CONFIGURACIÓN RÁPIDA
console.log(`
📝 FORM HANDLER SYSTEM - GUÍA DE CONFIGURACIÓN

1. 🔧 AJAX FORMS:
   - ajaxEnabled: Envío sin recargar página
   - realTimeValidation: Validación en tiempo real
   
2. ✅ VALIDACIÓN:
   - strictMode: true/false
   - validateOnBlur: Validar al salir del campo
   
3. 🎨 FEEDBACK:
   - showLoading: Mostrar spinner de carga
   - autoHide: Auto-ocultar mensajes
   
4. 🔒 SEGURIDAD:
   - csrfProtection: Protección CSRF automática
   - rateLimiting: Limitar envíos por minuto
   
5. 💾 AUTO-SAVE:
   - enabled: Guardar drafts automáticamente
   - interval: Intervalo de guardado
   
📊 Configuración actual:
📝 Sector: ${formCurrentSector}
📋 AJAX: ${FORM_HANDLER_CONFIG.ajaxEnabled ? 'Enabled' : 'Disabled'}
🎯 Prioridad: ${formSectorConfig.priority}
✅ Validación estricta: ${FORM_HANDLER_CONFIG.validation.strictMode}
🔒 Max envíos/min: ${FORM_HANDLER_CONFIG.security.maxSubmissions}
💾 Auto-save: ${FORM_HANDLER_CONFIG.autoSave.enabled ? 'Enabled' : 'Disabled'}
`);

// Exportar configuraciones para uso global
window.FORM_HANDLER_CONFIG = FORM_HANDLER_CONFIG;
window.FORM_TYPE_CONFIGS = FORM_TYPE_CONFIGS;
