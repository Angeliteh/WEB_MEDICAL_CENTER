// SEO Advanced Optimizer
// Sistema completo de optimización SEO con Schema Markup y Rich Snippets

class SEOOptimizer {
    constructor() {
        // Usar configuración externa si está disponible
        const externalConfig = window.SEO_CONFIG || {};

        this.config = {
            // Información básica del negocio
            siteName: externalConfig.siteName || 'Centro Médico Profesional',
            businessType: externalConfig.businessType || 'MedicalOrganization',
            sector: externalConfig.sector || 'medical',

            // Información de contacto
            phone: externalConfig.phone || '+52 55 1234-5678',
            email: externalConfig.email || 'contacto@centromedico.com',
            address: externalConfig.address || {
                streetAddress: 'Av. Reforma 123',
                addressLocality: 'Ciudad de México',
                addressRegion: 'CDMX',
                postalCode: '06600',
                addressCountry: 'MX'
            },

            // Información web
            url: externalConfig.url || window.location.origin,
            logo: externalConfig.logo ? (window.location.origin + externalConfig.logo) : (window.location.origin + '/images/logo.png'),

            // Redes sociales
            socialMedia: externalConfig.socialMedia || {
                facebook: 'https://facebook.com/centromedico',
                twitter: 'https://twitter.com/centromedico',
                instagram: 'https://instagram.com/centromedico',
                linkedin: 'https://linkedin.com/company/centromedico'
            },

            // Horarios de atención
            openingHours: externalConfig.openingHours || [
                'Mo-Fr 08:00-18:00',
                'Sa 09:00-14:00'
            ],

            // Servicios
            services: externalConfig.services || {
                medical: [
                    'Consulta General',
                    'Especialidades Médicas',
                    'Diagnóstico por Imagen',
                    'Laboratorio Clínico',
                    'Cirugía Ambulatoria'
                ]
            },

            // Reviews
            reviews: externalConfig.reviews || {
                enabled: true,
                ratingValue: '4.8',
                reviewCount: '127',
                bestRating: '5',
                worstRating: '1'
            },

            // Especialidades
            specialties: externalConfig.specialties || {
                medical: ['General Practice', 'Internal Medicine', 'Cardiology']
            },

            // Títulos y descripciones por defecto
            defaultTitles: externalConfig.defaultTitles || {},
            defaultDescriptions: externalConfig.defaultDescriptions || {},
            sectorKeywords: externalConfig.sectorKeywords || {}
        };

        this.init();
    }
    
    init() {
        this.setupMetaTags();
        this.setupSchemaMarkup();
        this.setupHreflang();
        this.setupCanonicalURL();
        this.setupOpenGraph();
        this.setupTwitterCards();
        this.setupAnalyticsEvents();
        
        console.log('🔍 SEO Optimizer initialized');
        console.log('📊 Business Type:', this.config.businessType);
        console.log('🏢 Sector:', this.config.sector);
    }
    
    setupMetaTags() {
        const currentLanguage = this.getCurrentLanguage();
        
        // Obtener meta información de las traducciones
        const metaTitle = this.getTranslation('meta.title') || this.getDefaultTitle();
        const metaDescription = this.getTranslation('meta.description') || this.getDefaultDescription();
        
        // Actualizar título
        document.title = metaTitle;
        
        // Actualizar meta description
        this.updateMetaTag('description', metaDescription);
        
        // Meta keywords (adaptadas por sector)
        const keywords = this.generateKeywords(currentLanguage);
        this.updateMetaTag('keywords', keywords);
        
        // Meta robots
        this.updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        
        // Meta author
        this.updateMetaTag('author', this.config.siteName);
        
        // Meta viewport (si no existe)
        if (!document.querySelector('meta[name="viewport"]')) {
            this.createMetaTag('viewport', 'width=device-width, initial-scale=1.0');
        }
        
        // Meta theme-color
        this.updateMetaTag('theme-color', '#1e88e5');
        
        console.log('📝 Meta tags updated');
    }
    
    setupSchemaMarkup() {
        const currentLanguage = this.getCurrentLanguage();
        
        // Schema principal del negocio
        const businessSchema = this.generateBusinessSchema(currentLanguage);
        
        // Schema de breadcrumbs
        const breadcrumbSchema = this.generateBreadcrumbSchema();
        
        // Schema de servicios
        const servicesSchema = this.generateServicesSchema(currentLanguage);
        
        // Schema de reviews (ejemplo)
        const reviewsSchema = this.generateReviewsSchema();
        
        // Combinar todos los schemas
        const combinedSchema = {
            "@context": "https://schema.org",
            "@graph": [
                businessSchema,
                breadcrumbSchema,
                servicesSchema,
                reviewsSchema
            ]
        };
        
        // Insertar schema en el head
        this.insertSchema(combinedSchema);
        
        console.log('📋 Schema Markup generated');
    }
    
    generateBusinessSchema(language) {
        const services = this.config.services[this.config.sector] || this.config.services.business;
        
        const baseSchema = {
            "@type": this.config.businessType,
            "@id": this.config.url + "/#organization",
            "name": this.config.siteName,
            "url": this.config.url,
            "logo": this.config.logo,
            "telephone": this.config.phone,
            "email": this.config.email,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": this.config.address.streetAddress,
                "addressLocality": this.config.address.addressLocality,
                "addressRegion": this.config.address.addressRegion,
                "postalCode": this.config.address.postalCode,
                "addressCountry": this.config.address.addressCountry
            },
            "openingHoursSpecification": this.config.openingHours.map(hours => ({
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": this.parseDayOfWeek(hours),
                "opens": this.parseOpenTime(hours),
                "closes": this.parseCloseTime(hours)
            })),
            "sameAs": Object.values(this.config.socialMedia),
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": language === 'en' ? "Services" : "Servicios",
                "itemListElement": services.map((service, index) => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": service
                    }
                }))
            }
        };
        
        // Agregar campos específicos según el tipo de negocio
        if (this.config.businessType === 'MedicalOrganization') {
            baseSchema.medicalSpecialty = this.config.specialties[this.config.sector] || this.config.specialties.medical;
        }

        if (this.config.businessType === 'LegalService') {
            baseSchema.areaServed = this.config.address.addressRegion;
            baseSchema.serviceArea = {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "addressCountry": this.config.address.addressCountry
                }
            };
        }
        
        return baseSchema;
    }
    
    generateBreadcrumbSchema() {
        return {
            "@type": "BreadcrumbList",
            "@id": this.config.url + "/#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Inicio",
                    "item": this.config.url
                }
            ]
        };
    }
    
    generateServicesSchema(language) {
        const services = this.config.services[this.config.sector] || this.config.services.business;
        
        return {
            "@type": "ItemList",
            "@id": this.config.url + "/#services",
            "name": language === 'en' ? "Our Services" : "Nuestros Servicios",
            "itemListElement": services.map((service, index) => ({
                "@type": "Service",
                "position": index + 1,
                "name": service,
                "provider": {
                    "@id": this.config.url + "/#organization"
                }
            }))
        };
    }
    
    generateReviewsSchema() {
        if (!this.config.reviews.enabled) {
            return null;
        }

        return {
            "@type": "AggregateRating",
            "@id": this.config.url + "/#reviews",
            "ratingValue": this.config.reviews.ratingValue,
            "reviewCount": this.config.reviews.reviewCount,
            "bestRating": this.config.reviews.bestRating,
            "worstRating": this.config.reviews.worstRating
        };
    }
    
    setupHreflang() {
        const currentPath = window.location.pathname;
        const baseUrl = window.location.origin;
        
        // Eliminar hreflang existentes
        document.querySelectorAll('link[hreflang]').forEach(link => link.remove());
        
        // Agregar hreflang para español
        this.createLinkTag('alternate', baseUrl + currentPath, 'es');
        
        // Agregar hreflang para inglés (si existe traducción)
        this.createLinkTag('alternate', baseUrl + currentPath, 'en');
        
        // Agregar x-default
        this.createLinkTag('alternate', baseUrl + currentPath, 'x-default');
        
        console.log('🌐 Hreflang tags added');
    }
    
    setupCanonicalURL() {
        const canonicalUrl = window.location.origin + window.location.pathname;
        
        // Eliminar canonical existente
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }
        
        // Crear nuevo canonical
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = canonicalUrl;
        document.head.appendChild(canonical);
        
        console.log('🔗 Canonical URL set:', canonicalUrl);
    }
    
    setupOpenGraph() {
        const currentLanguage = this.getCurrentLanguage();
        const title = this.getTranslation('meta.title') || this.getDefaultTitle();
        const description = this.getTranslation('meta.description') || this.getDefaultDescription();
        
        // Open Graph tags
        this.updateMetaProperty('og:type', 'website');
        this.updateMetaProperty('og:title', title);
        this.updateMetaProperty('og:description', description);
        this.updateMetaProperty('og:url', window.location.href);
        this.updateMetaProperty('og:site_name', this.config.siteName);
        this.updateMetaProperty('og:image', this.config.logo);
        this.updateMetaProperty('og:locale', currentLanguage === 'en' ? 'en_US' : 'es_MX');
        
        console.log('📱 Open Graph tags updated');
    }
    
    setupTwitterCards() {
        const title = this.getTranslation('meta.title') || this.getDefaultTitle();
        const description = this.getTranslation('meta.description') || this.getDefaultDescription();

        // Twitter Card tags
        this.updateMetaTag('twitter:card', 'summary_large_image');
        this.updateMetaTag('twitter:title', title);
        this.updateMetaTag('twitter:description', description);
        this.updateMetaTag('twitter:image', this.config.logo);

        console.log('🐦 Twitter Cards updated');
    }

    setupAnalyticsEvents() {
        // Tracking de eventos SEO
        this.trackPageView();
        this.trackScrollDepth();

        // Escuchar cambios de idioma para actualizar SEO
        document.addEventListener('languageChanged', (e) => {
            this.updateSEOForLanguage(e.detail.language);
        });
    }

    // Métodos auxiliares
    getCurrentLanguage() {
        if (window.languageManager && window.languageManager.getCurrentLanguage) {
            return window.languageManager.getCurrentLanguage();
        }
        return 'es';
    }

    getTranslation(key) {
        if (window.languageManager && window.languageManager.getTranslation) {
            return window.languageManager.getTranslation(key);
        }
        return null;
    }

    getDefaultTitle() {
        const currentLanguage = this.getCurrentLanguage();

        // Usar títulos de configuración si están disponibles
        if (this.config.defaultTitles && this.config.defaultTitles[currentLanguage]) {
            return this.config.defaultTitles[currentLanguage];
        }

        // Fallback a títulos por defecto
        const titles = {
            medical: {
                es: 'Centro Médico Profesional - Atención Médica Integral',
                en: 'Professional Medical Center - Comprehensive Healthcare'
            },
            legal: {
                es: 'Bufete Legal Profesional - Servicios Jurídicos Integrales',
                en: 'Professional Law Firm - Comprehensive Legal Services'
            },
            creative: {
                es: 'Estudio Creativo - Diseño y Marketing Digital',
                en: 'Creative Studio - Design and Digital Marketing'
            },
            business: {
                es: 'Empresa Profesional - Servicios de Consultoría',
                en: 'Professional Business - Consulting Services'
            }
        };

        return titles[this.config.sector][currentLanguage] || titles.business[currentLanguage];
    }

    getDefaultDescription() {
        const currentLanguage = this.getCurrentLanguage();

        // Usar descripciones de configuración si están disponibles
        if (this.config.defaultDescriptions && this.config.defaultDescriptions[currentLanguage]) {
            return this.config.defaultDescriptions[currentLanguage];
        }

        // Fallback a descripciones por defecto
        const descriptions = {
            medical: {
                es: 'Centro médico profesional con servicios de salud integral. Especialistas certificados, tecnología moderna y atención personalizada para toda la familia.',
                en: 'Professional medical center with comprehensive health services. Certified specialists, modern technology and personalized care for the whole family.'
            },
            legal: {
                es: 'Bufete legal profesional con servicios jurídicos integrales. Abogados especializados en derecho civil, penal, laboral y mercantil.',
                en: 'Professional law firm with comprehensive legal services. Lawyers specialized in civil, criminal, labor and commercial law.'
            },
            creative: {
                es: 'Estudio creativo especializado en diseño gráfico, desarrollo web y marketing digital. Soluciones creativas para tu negocio.',
                en: 'Creative studio specialized in graphic design, web development and digital marketing. Creative solutions for your business.'
            },
            business: {
                es: 'Empresa de consultoría profesional especializada en gestión empresarial, análisis financiero y estrategia de negocio.',
                en: 'Professional consulting company specialized in business management, financial analysis and business strategy.'
            }
        };

        return descriptions[this.config.sector][currentLanguage] || descriptions.business[currentLanguage];
    }

    generateKeywords(language) {
        // Usar keywords de configuración si están disponibles
        if (this.config.sectorKeywords && this.config.sectorKeywords[language]) {
            return this.config.sectorKeywords[language];
        }

        // Fallback a keywords por defecto
        const keywordSets = {
            medical: {
                es: 'centro médico, doctor, consulta médica, especialistas, salud, medicina, hospital, clínica, atención médica, servicios médicos',
                en: 'medical center, doctor, medical consultation, specialists, health, medicine, hospital, clinic, medical care, medical services'
            },
            legal: {
                es: 'abogado, bufete legal, servicios jurídicos, derecho civil, derecho penal, consultoría legal, asesoría jurídica',
                en: 'lawyer, law firm, legal services, civil law, criminal law, legal consulting, legal advice'
            },
            creative: {
                es: 'diseño gráfico, desarrollo web, marketing digital, branding, creatividad, agencia creativa, diseño',
                en: 'graphic design, web development, digital marketing, branding, creativity, creative agency, design'
            },
            business: {
                es: 'consultoría empresarial, gestión de proyectos, análisis financiero, estrategia de negocio, servicios profesionales',
                en: 'business consulting, project management, financial analysis, business strategy, professional services'
            }
        };

        return keywordSets[this.config.sector][language] || keywordSets.business[language];
    }

    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    updateMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    createMetaTag(name, content) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
    }

    createLinkTag(rel, href, hreflang = null) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (hreflang) {
            link.hreflang = hreflang;
        }
        document.head.appendChild(link);
    }

    insertSchema(schema) {
        // Eliminar schema existente
        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        if (existingSchema) {
            existingSchema.remove();
        }

        // Crear nuevo script con schema
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }

    // Métodos de parsing para horarios
    parseDayOfWeek(hoursString) {
        const dayMap = {
            'Mo': 'Monday',
            'Tu': 'Tuesday',
            'We': 'Wednesday',
            'Th': 'Thursday',
            'Fr': 'Friday',
            'Sa': 'Saturday',
            'Su': 'Sunday'
        };

        const dayPart = hoursString.split(' ')[0];
        if (dayPart.includes('-')) {
            const [start, end] = dayPart.split('-');
            const startDay = dayMap[start];
            const endDay = dayMap[end];

            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const startIndex = days.indexOf(startDay);
            const endIndex = days.indexOf(endDay);

            return days.slice(startIndex, endIndex + 1);
        }

        return [dayMap[dayPart]];
    }

    parseOpenTime(hoursString) {
        const timePart = hoursString.split(' ')[1];
        return timePart.split('-')[0];
    }

    parseCloseTime(hoursString) {
        const timePart = hoursString.split(' ')[1];
        return timePart.split('-')[1];
    }

    updateSEOForLanguage(language) {
        this.setupMetaTags();
        this.setupOpenGraph();
        this.setupTwitterCards();

        console.log('🔄 SEO updated for language:', language);
    }

    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                business_type: this.config.businessType,
                sector: this.config.sector
            });
        }
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const trackingPoints = [25, 50, 75, 90];

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

            trackingPoints.forEach(point => {
                if (scrollPercent >= point && maxScroll < point) {
                    maxScroll = point;

                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            event_category: 'engagement',
                            event_label: `${point}%`,
                            value: point
                        });
                    }
                }
            });
        });
    }

    // Métodos públicos para configuración
    updateBusinessInfo(config) {
        Object.assign(this.config, config);
        this.init();
    }

    getSEOStats() {
        return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            keywords: document.querySelector('meta[name="keywords"]')?.content,
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            language: this.getCurrentLanguage(),
            businessType: this.config.businessType,
            sector: this.config.sector,
            hasHreflang: document.querySelectorAll('link[hreflang]').length > 0,
            hasSchema: document.querySelector('script[type="application/ld+json"]') !== null,
            hasOpenGraph: document.querySelector('meta[property^="og:"]') !== null,
            hasTwitterCards: document.querySelector('meta[name^="twitter:"]') !== null
        };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.seoOptimizer = new SEOOptimizer();
});

console.log('🔍 SEO Optimizer loaded');
