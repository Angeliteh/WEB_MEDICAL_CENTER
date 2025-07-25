// Form Handler Manager - Advanced AJAX Form System
// Sistema completo de formularios AJAX para sitios médicos

class FormHandlerManager {
    constructor() {
        // Usar configuración externa si está disponible
        const externalConfig = window.FORM_HANDLER_CONFIG || {};
        
        this.config = {
            // Configuración general
            enabled: externalConfig.enabled !== undefined ? externalConfig.enabled : true,
            ajaxEnabled: externalConfig.ajaxEnabled !== undefined ? externalConfig.ajaxEnabled : true,
            realTimeValidation: externalConfig.realTimeValidation !== undefined ? externalConfig.realTimeValidation : true,
            autoSave: externalConfig.autoSave !== undefined ? externalConfig.autoSave : true,
            
            // Configuración de validación
            validation: {
                enabled: externalConfig.validation?.enabled !== undefined ? externalConfig.validation.enabled : true,
                showErrors: true,
                validateOnBlur: true,
                validateOnInput: true,
                strictMode: externalConfig.validation?.strictMode !== undefined ? externalConfig.validation.strictMode : true
            },
            
            // Configuración de feedback
            feedback: {
                enabled: externalConfig.feedback?.enabled !== undefined ? externalConfig.feedback.enabled : true,
                showLoading: true,
                showSuccess: true,
                showErrors: true,
                autoHide: true,
                hideDelay: 5000
            },
            
            // Configuración de seguridad
            security: {
                enabled: externalConfig.security?.enabled !== undefined ? externalConfig.security.enabled : true,
                csrfProtection: true,
                sanitizeInputs: true,
                rateLimiting: true
            },
            
            // Configuración por sector
            sector: externalConfig.sector || 'medical'
        };
        
        this.forms = new Map();
        this.validators = new Map();
        this.submissions = new Map();
        this.drafts = new Map();
        
        this.init();
    }
    
    init() {
        if (!this.config.enabled) return;
        
        console.log('📝 Form Handler Manager initializing...');
        
        // Aplicar configuración por sector
        this.applySectorConfiguration();
        
        // Inicializar formularios existentes
        this.initializeForms();
        
        // Configurar observador para nuevos formularios
        this.observeNewForms();
        
        // Configurar auto-save si está habilitado
        if (this.config.autoSave) {
            this.setupAutoSave();
        }
        
        console.log('📋 Form Handler Manager initialized');
        console.log(`🏥 Sector: ${this.config.sector}`);
        console.log(`✅ AJAX: ${this.config.ajaxEnabled ? 'Enabled' : 'Disabled'}`);
    }
    
    applySectorConfiguration() {
        // Configuración específica para sector médico
        if (this.config.sector === 'medical') {
            this.config.validation.strictMode = true;
            this.config.security.csrfProtection = true;
            this.config.feedback.showLoading = true;
        }
    }
    
    initializeForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.initializeForm(form);
        });
        
        console.log(`📝 Initialized ${forms.length} forms`);
    }
    
    initializeForm(form) {
        const formId = form.id || this.generateFormId();
        if (!form.id) form.id = formId;
        
        // Configurar formulario
        const formConfig = this.getFormConfiguration(form);
        this.forms.set(formId, {
            element: form,
            config: formConfig,
            isSubmitting: false,
            lastSubmission: null,
            validationErrors: new Map()
        });
        
        // Configurar eventos
        this.setupFormEvents(form, formId);
        
        // Configurar validación
        if (this.config.validation.enabled) {
            this.setupFormValidation(form, formId);
        }
        
        // Agregar indicadores visuales
        this.addFormIndicators(form);
        
        console.log(`📋 Form initialized: ${formId}`);
    }
    
    generateFormId() {
        return 'form-' + Math.random().toString(36).substr(2, 9);
    }
    
    getFormConfiguration(form) {
        // Detectar tipo de formulario
        const formType = this.detectFormType(form);
        
        return {
            type: formType,
            ajaxEnabled: this.config.ajaxEnabled,
            validation: { ...this.config.validation },
            feedback: { ...this.config.feedback },
            security: { ...this.config.security },
            multiStep: form.classList.contains('multi-step'),
            autoSave: this.config.autoSave && formType !== 'search'
        };
    }
    
    detectFormType(form) {
        // Detectar tipo basado en campos y clases
        if (form.classList.contains('contact-form')) return 'contact';
        if (form.classList.contains('appointment-form')) return 'appointment';
        if (form.classList.contains('search-form')) return 'search';
        if (form.classList.contains('newsletter-form')) return 'newsletter';
        if (form.classList.contains('consultation-form')) return 'consultation';
        
        // Detectar por campos
        const inputs = form.querySelectorAll('input, select, textarea');
        const fieldNames = Array.from(inputs).map(input => input.name || input.id || '').join(' ').toLowerCase();
        
        if (fieldNames.includes('appointment') || fieldNames.includes('date') || fieldNames.includes('time')) {
            return 'appointment';
        }
        if (fieldNames.includes('email') && fieldNames.includes('message')) {
            return 'contact';
        }
        if (fieldNames.includes('search') || fieldNames.includes('query')) {
            return 'search';
        }
        
        return 'generic';
    }
    
    setupFormEvents(form, formId) {
        // Evento de envío
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(formId, e);
        });
        
        // Eventos de validación en tiempo real
        if (this.config.realTimeValidation) {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (this.config.validation.validateOnInput) {
                    input.addEventListener('input', () => {
                        this.validateField(formId, input);
                    });
                }
                
                if (this.config.validation.validateOnBlur) {
                    input.addEventListener('blur', () => {
                        this.validateField(formId, input);
                    });
                }
            });
        }
    }
    
    setupFormValidation(form, formId) {
        const validator = new FormValidator(form, this.config.validation);
        this.validators.set(formId, validator);
    }
    
    addFormIndicators(form) {
        // Agregar indicador de formulario seguro
        if (this.config.security.enabled) {
            const securityIndicator = document.createElement('div');
            securityIndicator.className = 'form-security-indicator';
            securityIndicator.innerHTML = `
                <span class="form-security-icon">🔒</span>
                <span class="form-security-text" data-translate="forms.secure">Formulario Seguro</span>
            `;
            
            form.insertBefore(securityIndicator, form.firstChild);
        }
        
        // Agregar contenedor para feedback
        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'form-feedback-container';
        feedbackContainer.id = `feedback-${form.id}`;
        
        form.appendChild(feedbackContainer);
    }
    
    async handleFormSubmission(formId, event) {
        const formData = this.forms.get(formId);
        if (!formData || formData.isSubmitting) return;
        
        const form = formData.element;
        
        // Marcar como enviando
        formData.isSubmitting = true;
        
        // Mostrar loading
        this.showFormFeedback(formId, 'loading', 'Enviando formulario...');
        
        try {
            // Validar formulario completo
            const isValid = await this.validateForm(formId);
            if (!isValid) {
                throw new Error('Formulario contiene errores de validación');
            }
            
            // Preparar datos
            const submissionData = this.prepareFormData(form);
            
            // Enviar formulario
            const result = await this.submitForm(formId, submissionData);
            
            // Manejar respuesta exitosa
            this.handleSubmissionSuccess(formId, result);
            
        } catch (error) {
            // Manejar error
            this.handleSubmissionError(formId, error);
        } finally {
            // Limpiar estado
            formData.isSubmitting = false;
        }
    }
    
    async validateForm(formId) {
        const validator = this.validators.get(formId);
        if (!validator) return true;
        
        const isValid = await validator.validateAll();
        
        if (!isValid) {
            const errors = validator.getErrors();
            this.displayValidationErrors(formId, errors);
            
            // Anunciar errores para screen readers
            if (window.accessibilityManager) {
                window.accessibilityManager.announceFormError('Formulario contiene errores. Por favor revise los campos marcados.');
            }
        }
        
        return isValid;
    }
    
    validateField(formId, field) {
        const validator = this.validators.get(formId);
        if (!validator) return true;
        
        const isValid = validator.validateField(field);
        
        if (!isValid) {
            const error = validator.getFieldError(field);
            this.displayFieldError(field, error);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    prepareFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        // Convertir FormData a objeto
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Agregar metadatos
        data._timestamp = new Date().toISOString();
        data._formId = form.id;
        data._formType = this.forms.get(form.id).config.type;
        
        // Agregar token CSRF si está disponible
        if (window.securityManager && this.config.security.csrfProtection) {
            data._csrf_token = window.securityManager.getCurrentCSRFToken();
        }
        
        return data;
    }
    
    async submitForm(formId, data) {
        // Simular envío AJAX (en producción sería una llamada real al servidor)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular diferentes respuestas basadas en el tipo de formulario
                const formData = this.forms.get(formId);
                const formType = formData.config.type;
                
                // Simular ocasionalmente errores para testing
                if (Math.random() < 0.1) { // 10% de probabilidad de error
                    reject(new Error('Error del servidor. Por favor intente nuevamente.'));
                    return;
                }
                
                // Respuesta exitosa
                resolve({
                    success: true,
                    message: this.getSuccessMessage(formType),
                    data: {
                        submissionId: 'sub_' + Math.random().toString(36).substr(2, 9),
                        timestamp: new Date().toISOString()
                    }
                });
            }, 1500 + Math.random() * 1000); // 1.5-2.5 segundos
        });
    }
    
    getSuccessMessage(formType) {
        const messages = {
            contact: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
            appointment: '¡Cita solicitada exitosamente! Recibirás una confirmación por email.',
            consultation: '¡Consulta enviada! Un especialista revisará tu caso.',
            newsletter: '¡Suscripción exitosa! Gracias por unirte a nuestro newsletter.',
            search: 'Búsqueda completada.',
            generic: '¡Formulario enviado correctamente!'
        };
        
        return messages[formType] || messages.generic;
    }
    
    handleSubmissionSuccess(formId, result) {
        const formData = this.forms.get(formId);
        const form = formData.element;
        
        // Mostrar mensaje de éxito
        this.showFormFeedback(formId, 'success', result.message);
        
        // Limpiar formulario si es apropiado
        if (formData.config.type !== 'search') {
            form.reset();
            this.clearAllFieldErrors(formId);
        }
        
        // Limpiar draft guardado
        this.clearFormDraft(formId);
        
        // Anunciar éxito para screen readers
        if (window.accessibilityManager) {
            window.accessibilityManager.announceSuccess(result.message);
        }
        
        // Guardar en historial de envíos
        formData.lastSubmission = {
            timestamp: new Date().toISOString(),
            success: true,
            result: result
        };
        
        console.log(`✅ Form submitted successfully: ${formId}`, result);
    }
    
    handleSubmissionError(formId, error) {
        const errorMessage = error.message || 'Error al enviar el formulario. Por favor intente nuevamente.';
        
        // Mostrar mensaje de error
        this.showFormFeedback(formId, 'error', errorMessage);
        
        // Anunciar error para screen readers
        if (window.accessibilityManager) {
            window.accessibilityManager.announceFormError(errorMessage);
        }
        
        // Guardar en historial de envíos
        const formData = this.forms.get(formId);
        formData.lastSubmission = {
            timestamp: new Date().toISOString(),
            success: false,
            error: errorMessage
        };
        
        console.error(`❌ Form submission failed: ${formId}`, error);
    }

    showFormFeedback(formId, type, message) {
        const feedbackContainer = document.getElementById(`feedback-${formId}`);
        if (!feedbackContainer) return;

        // Limpiar feedback anterior
        feedbackContainer.innerHTML = '';

        // Crear elemento de feedback
        const feedback = document.createElement('div');
        feedback.className = `form-feedback form-feedback-${type}`;
        feedback.setAttribute('role', 'alert');
        feedback.setAttribute('aria-live', 'polite');

        let icon = '';
        switch (type) {
            case 'loading':
                icon = '<div class="form-loading-spinner"></div>';
                break;
            case 'success':
                icon = '<span class="form-feedback-icon">✅</span>';
                break;
            case 'error':
                icon = '<span class="form-feedback-icon">❌</span>';
                break;
        }

        feedback.innerHTML = `
            ${icon}
            <span class="form-feedback-message">${message}</span>
        `;

        feedbackContainer.appendChild(feedback);

        // Auto-hide si está configurado
        if (this.config.feedback.autoHide && type !== 'loading') {
            setTimeout(() => {
                if (feedback.parentElement) {
                    feedback.remove();
                }
            }, this.config.feedback.hideDelay);
        }
    }

    displayValidationErrors(formId, errors) {
        errors.forEach((error, fieldName) => {
            const field = document.querySelector(`#${formId} [name="${fieldName}"], #${formId} #${fieldName}`);
            if (field) {
                this.displayFieldError(field, error);
            }
        });

        // Scroll al primer error
        const firstErrorField = document.querySelector(`#${formId} .field-error`);
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
    }

    displayFieldError(field, error) {
        // Limpiar error anterior
        this.clearFieldError(field);

        // Agregar clase de error
        field.classList.add('field-error');

        // Crear mensaje de error
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error-message';
        errorElement.textContent = error;
        errorElement.setAttribute('role', 'alert');

        // Insertar después del campo
        field.parentNode.insertBefore(errorElement, field.nextSibling);

        // Configurar ARIA
        const errorId = `error-${field.name || field.id}-${Date.now()}`;
        errorElement.id = errorId;
        field.setAttribute('aria-describedby', errorId);
        field.setAttribute('aria-invalid', 'true');
    }

    clearFieldError(field) {
        // Remover clase de error
        field.classList.remove('field-error');

        // Remover mensaje de error
        const errorMessage = field.parentNode.querySelector('.field-error-message');
        if (errorMessage) {
            errorMessage.remove();
        }

        // Limpiar ARIA
        field.removeAttribute('aria-describedby');
        field.removeAttribute('aria-invalid');
    }

    clearAllFieldErrors(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const errorFields = form.querySelectorAll('.field-error');
        errorFields.forEach(field => {
            this.clearFieldError(field);
        });

        const errorMessages = form.querySelectorAll('.field-error-message');
        errorMessages.forEach(message => message.remove());
    }

    observeNewForms() {
        // Observar nuevos formularios agregados dinámicamente
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'FORM') {
                            this.initializeForm(node);
                        } else {
                            const forms = node.querySelectorAll('form');
                            forms.forEach(form => this.initializeForm(form));
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    setupAutoSave() {
        // Auto-guardar drafts cada 30 segundos
        setInterval(() => {
            this.saveAllDrafts();
        }, 30000);

        // Guardar al salir de la página
        window.addEventListener('beforeunload', () => {
            this.saveAllDrafts();
        });
    }

    saveAllDrafts() {
        this.forms.forEach((formData, formId) => {
            if (formData.config.autoSave) {
                this.saveFormDraft(formId);
            }
        });
    }

    saveFormDraft(formId) {
        const formData = this.forms.get(formId);
        if (!formData) return;

        const form = formData.element;
        const draft = this.prepareFormData(form);

        // Solo guardar si hay datos
        const hasData = Object.values(draft).some(value =>
            value && value.toString().trim() !== '' && !value.toString().startsWith('_')
        );

        if (hasData) {
            this.drafts.set(formId, {
                data: draft,
                timestamp: new Date().toISOString()
            });

            // Guardar en localStorage
            try {
                localStorage.setItem(`form_draft_${formId}`, JSON.stringify(draft));
            } catch (e) {
                console.warn('Could not save form draft to localStorage');
            }
        }
    }

    loadFormDraft(formId) {
        try {
            const savedDraft = localStorage.getItem(`form_draft_${formId}`);
            if (savedDraft) {
                const draft = JSON.parse(savedDraft);
                this.restoreFormData(formId, draft);

                // Mostrar notificación de draft restaurado
                this.showFormFeedback(formId, 'info', 'Datos del formulario restaurados automáticamente.');
            }
        } catch (e) {
            console.warn('Could not load form draft from localStorage');
        }
    }

    restoreFormData(formId, data) {
        const form = document.getElementById(formId);
        if (!form) return;

        Object.entries(data).forEach(([key, value]) => {
            if (key.startsWith('_')) return; // Skip metadata

            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    field.checked = value === field.value;
                } else {
                    field.value = value;
                }
            }
        });
    }

    clearFormDraft(formId) {
        this.drafts.delete(formId);
        localStorage.removeItem(`form_draft_${formId}`);
    }

    // Métodos públicos para integración
    getFormStatus(formId) {
        const formData = this.forms.get(formId);
        if (!formData) return null;

        return {
            id: formId,
            type: formData.config.type,
            isSubmitting: formData.isSubmitting,
            lastSubmission: formData.lastSubmission,
            hasErrors: formData.validationErrors.size > 0,
            hasDraft: this.drafts.has(formId)
        };
    }

    getAllFormsStatus() {
        const status = {};
        this.forms.forEach((formData, formId) => {
            status[formId] = this.getFormStatus(formId);
        });
        return status;
    }

    manualSubmit(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const event = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(event);
        }
    }

    resetForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            this.clearAllFieldErrors(formId);
            this.clearFormDraft(formId);

            const feedbackContainer = document.getElementById(`feedback-${formId}`);
            if (feedbackContainer) {
                feedbackContainer.innerHTML = '';
            }
        }
    }

    getSubmissionStats() {
        let totalSubmissions = 0;
        let successfulSubmissions = 0;
        let failedSubmissions = 0;

        this.forms.forEach(formData => {
            if (formData.lastSubmission) {
                totalSubmissions++;
                if (formData.lastSubmission.success) {
                    successfulSubmissions++;
                } else {
                    failedSubmissions++;
                }
            }
        });

        return {
            totalForms: this.forms.size,
            totalSubmissions,
            successfulSubmissions,
            failedSubmissions,
            successRate: totalSubmissions > 0 ? (successfulSubmissions / totalSubmissions * 100).toFixed(1) : 0
        };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.formHandlerManager = new FormHandlerManager();
});

console.log('📝 Form Handler Manager loaded');
