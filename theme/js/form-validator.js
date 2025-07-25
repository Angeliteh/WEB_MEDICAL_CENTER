// Form Validator - Smart Validation System
// Sistema inteligente de validación para formularios

class FormValidator {
    constructor(form, config = {}) {
        this.form = form;
        this.config = {
            strictMode: config.strictMode || false,
            showErrors: config.showErrors !== false,
            validateOnBlur: config.validateOnBlur !== false,
            validateOnInput: config.validateOnInput !== false,
            customRules: config.customRules || {}
        };
        
        this.errors = new Map();
        this.rules = this.initializeRules();
        
        this.init();
    }
    
    init() {
        // Configurar reglas personalizadas si existen
        if (this.config.customRules) {
            Object.assign(this.rules, this.config.customRules);
        }
    }
    
    initializeRules() {
        return {
            // Reglas básicas
            required: (value, field) => {
                if (!value || value.toString().trim() === '') {
                    return 'Este campo es obligatorio';
                }
                return null;
            },
            
            // Validación de email
            email: (value, field) => {
                if (!value) return null;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return 'Por favor ingrese un email válido';
                }
                return null;
            },
            
            // Validación de teléfono
            phone: (value, field) => {
                if (!value) return null;
                // Regex para teléfonos mexicanos e internacionales
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
                if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
                    return 'Por favor ingrese un teléfono válido (mínimo 10 dígitos)';
                }
                return null;
            },
            
            // Validación de longitud mínima
            minLength: (value, field) => {
                if (!value) return null;
                const minLength = parseInt(field.getAttribute('data-min-length') || field.minLength || 0);
                if (minLength > 0 && value.length < minLength) {
                    return `Debe tener al menos ${minLength} caracteres`;
                }
                return null;
            },
            
            // Validación de longitud máxima
            maxLength: (value, field) => {
                if (!value) return null;
                const maxLength = parseInt(field.getAttribute('data-max-length') || field.maxLength || 0);
                if (maxLength > 0 && value.length > maxLength) {
                    return `No debe exceder ${maxLength} caracteres`;
                }
                return null;
            },
            
            // Validación de números
            number: (value, field) => {
                if (!value) return null;
                if (isNaN(value)) {
                    return 'Por favor ingrese un número válido';
                }
                return null;
            },
            
            // Validación de rango numérico
            range: (value, field) => {
                if (!value) return null;
                const min = parseFloat(field.min);
                const max = parseFloat(field.max);
                const numValue = parseFloat(value);
                
                if (!isNaN(min) && numValue < min) {
                    return `El valor debe ser mayor o igual a ${min}`;
                }
                if (!isNaN(max) && numValue > max) {
                    return `El valor debe ser menor o igual a ${max}`;
                }
                return null;
            },
            
            // Validación de fecha
            date: (value, field) => {
                if (!value) return null;

                let date;

                // Manejar diferentes formatos de fecha
                if (value.includes('/')) {
                    // Formato DD/MM/YYYY del datepicker
                    const parts = value.split('/');
                    if (parts.length === 3) {
                        date = new Date(parts[2], parts[1] - 1, parts[0]); // año, mes-1, día
                    }
                } else {
                    // Formato estándar
                    date = new Date(value);
                }

                if (!date || isNaN(date.getTime())) {
                    return 'Por favor ingrese una fecha válida';
                }

                // Validar fecha mínima (hoy para citas médicas)
                if (field.name && field.name.includes('appointment')) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date < today) {
                        return 'La fecha debe ser hoy o posterior';
                    }

                    // Validar que no sea fin de semana
                    const dayOfWeek = date.getDay();
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        return 'Solo se pueden agendar citas de lunes a viernes';
                    }

                    // Validar que no sea más de 3 meses adelante
                    const maxDate = new Date();
                    maxDate.setMonth(maxDate.getMonth() + 3);
                    if (date > maxDate) {
                        return 'La fecha no puede ser más de 3 meses adelante';
                    }
                }

                return null;
            },
            
            // Validación de confirmación de password
            confirmPassword: (value, field) => {
                if (!value) return null;
                const passwordField = this.form.querySelector('[name="password"], [type="password"]');
                if (passwordField && value !== passwordField.value) {
                    return 'Las contraseñas no coinciden';
                }
                return null;
            },
            
            // Validación específica para sector médico
            medicalId: (value, field) => {
                if (!value) return null;
                // Validar formato de cédula médica (ejemplo)
                const medicalIdRegex = /^\d{7,8}$/;
                if (!medicalIdRegex.test(value)) {
                    return 'Por favor ingrese una cédula médica válida';
                }
                return null;
            },
            
            // Validación de edad
            age: (value, field) => {
                if (!value) return null;
                const age = parseInt(value);
                if (isNaN(age) || age < 0 || age > 120) {
                    return 'Por favor ingrese una edad válida (0-120)';
                }
                return null;
            },
            
            // Validación de términos y condiciones
            terms: (value, field) => {
                if (field.type === 'checkbox' && field.required && !field.checked) {
                    return 'Debe aceptar los términos y condiciones';
                }
                return null;
            }
        };
    }
    
    async validateAll() {
        this.errors.clear();
        
        const fields = this.form.querySelectorAll('input, select, textarea');
        const validationPromises = Array.from(fields).map(field => this.validateField(field));
        
        await Promise.all(validationPromises);
        
        return this.errors.size === 0;
    }
    
    async validateField(field) {
        const fieldName = field.name || field.id;
        if (!fieldName) return true;
        
        const value = this.getFieldValue(field);
        const rules = this.getFieldRules(field);
        
        // Limpiar errores anteriores para este campo
        this.errors.delete(fieldName);
        
        // Aplicar reglas de validación
        for (const rule of rules) {
            const error = await this.applyRule(rule, value, field);
            if (error) {
                this.errors.set(fieldName, error);
                return false;
            }
        }
        
        return true;
    }
    
    getFieldValue(field) {
        if (field.type === 'checkbox' || field.type === 'radio') {
            return field.checked ? field.value : '';
        }
        return field.value || '';
    }
    
    getFieldRules(field) {
        const rules = [];
        
        // Regla required
        if (field.required || field.hasAttribute('data-required')) {
            rules.push('required');
        }
        
        // Reglas basadas en tipo
        switch (field.type) {
            case 'email':
                rules.push('email');
                break;
            case 'tel':
                rules.push('phone');
                break;
            case 'number':
                rules.push('number', 'range');
                break;
            case 'date':
                rules.push('date');
                break;
            case 'password':
                if (field.name === 'confirm_password' || field.name === 'password_confirmation') {
                    rules.push('confirmPassword');
                }
                break;
            case 'checkbox':
                if (field.name === 'terms' || field.name === 'accept_terms') {
                    rules.push('terms');
                }
                break;
        }
        
        // Reglas basadas en atributos data
        if (field.hasAttribute('data-rule-email')) rules.push('email');
        if (field.hasAttribute('data-rule-phone')) rules.push('phone');
        if (field.hasAttribute('data-rule-medical-id')) rules.push('medicalId');
        if (field.hasAttribute('data-rule-age')) rules.push('age');
        
        // Reglas de longitud
        if (field.minLength || field.hasAttribute('data-min-length')) {
            rules.push('minLength');
        }
        if (field.maxLength || field.hasAttribute('data-max-length')) {
            rules.push('maxLength');
        }
        
        // Reglas personalizadas desde atributos data-rules
        const customRules = field.getAttribute('data-rules');
        if (customRules) {
            rules.push(...customRules.split(',').map(rule => rule.trim()));
        }
        
        return rules;
    }
    
    async applyRule(ruleName, value, field) {
        const rule = this.rules[ruleName];
        if (!rule) {
            console.warn(`Validation rule '${ruleName}' not found`);
            return null;
        }
        
        try {
            return await rule(value, field);
        } catch (error) {
            console.error(`Error applying validation rule '${ruleName}':`, error);
            return 'Error de validación';
        }
    }
    
    getErrors() {
        return new Map(this.errors);
    }
    
    getFieldError(field) {
        const fieldName = field.name || field.id;
        return this.errors.get(fieldName) || null;
    }
    
    hasErrors() {
        return this.errors.size > 0;
    }
    
    clearErrors() {
        this.errors.clear();
    }
    
    clearFieldError(field) {
        const fieldName = field.name || field.id;
        this.errors.delete(fieldName);
    }
    
    // Métodos para agregar reglas personalizadas
    addRule(name, rule) {
        this.rules[name] = rule;
    }
    
    addRules(rules) {
        Object.assign(this.rules, rules);
    }
    
    // Validaciones específicas para formularios médicos
    validateMedicalForm() {
        // Validaciones específicas para formularios de citas médicas
        const appointmentDate = this.form.querySelector('[name="appointment_date"]');
        const appointmentTime = this.form.querySelector('[name="appointment_time"]');
        
        if (appointmentDate && appointmentTime) {
            const date = new Date(appointmentDate.value);
            const time = appointmentTime.value;
            
            // Validar horarios de atención (ejemplo: 8:00 - 18:00)
            if (time) {
                const [hours, minutes] = time.split(':').map(Number);
                if (hours < 8 || hours >= 18) {
                    this.errors.set('appointment_time', 'El horario de atención es de 8:00 AM a 6:00 PM');
                    return false;
                }
            }
            
            // Validar días laborables (lunes a viernes)
            if (date) {
                const dayOfWeek = date.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) { // Domingo o sábado
                    this.errors.set('appointment_date', 'Solo se pueden agendar citas de lunes a viernes');
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // Método para obtener sugerencias de corrección
    getSuggestions(field) {
        const fieldName = field.name || field.id;
        const value = this.getFieldValue(field);
        const suggestions = [];
        
        // Sugerencias para email
        if (field.type === 'email' && value) {
            const commonDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
            const emailParts = value.split('@');
            if (emailParts.length === 2) {
                const domain = emailParts[1];
                commonDomains.forEach(commonDomain => {
                    if (this.calculateSimilarity(domain, commonDomain) > 0.7) {
                        suggestions.push(`¿Quiso decir ${emailParts[0]}@${commonDomain}?`);
                    }
                });
            }
        }
        
        return suggestions;
    }
    
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }
    
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
}

console.log('✅ Form Validator loaded');
