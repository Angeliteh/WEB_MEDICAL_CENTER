// SEO Advanced Configuration
// Configuración personalizable para optimización SEO

// ⚠️ IMPORTANTE: Personalizar esta configuración para cada cliente
const SEO_CONFIG = {
    // 🏢 INFORMACIÓN DEL NEGOCIO (OBLIGATORIO)
    siteName: 'Centro Médico Profesional',
    businessType: 'MedicalOrganization', // MedicalOrganization, LegalService, ProfessionalService, Organization
    sector: 'medical', // medical, legal, creative, business
    
    // 📞 INFORMACIÓN DE CONTACTO (OBLIGATORIO)
    phone: '+52 55 1234-5678', // ⚠️ CAMBIAR POR EL TELÉFONO REAL
    email: 'contacto@centromedico.com', // ⚠️ CAMBIAR POR EL EMAIL REAL
    
    // 📍 DIRECCIÓN FÍSICA (IMPORTANTE PARA SEO LOCAL)
    address: {
        streetAddress: 'Av. Reforma 123', // ⚠️ CAMBIAR POR LA DIRECCIÓN REAL
        addressLocality: 'Ciudad de México',
        addressRegion: 'CDMX',
        postalCode: '06600',
        addressCountry: 'MX' // MX, ES, CO, AR, etc.
    },
    
    // 🌐 INFORMACIÓN WEB
    url: 'https://www.centromedico.com', // ⚠️ CAMBIAR POR LA URL REAL
    logo: '/images/logo.png', // Ruta al logo
    
    // 📱 REDES SOCIALES (OPCIONAL)
    socialMedia: {
        facebook: 'https://facebook.com/centromedico',
        twitter: 'https://twitter.com/centromedico',
        instagram: 'https://instagram.com/centromedico',
        linkedin: 'https://linkedin.com/company/centromedico',
        youtube: 'https://youtube.com/c/centromedico'
    },
    
    // 🕒 HORARIOS DE ATENCIÓN
    openingHours: [
        'Mo-Fr 08:00-18:00', // Lunes a Viernes
        'Sa 09:00-14:00'     // Sábado
        // 'Su 10:00-16:00'  // Domingo (descomentar si aplica)
    ],
    
    // 🎯 SERVICIOS POR SECTOR (SE CONFIGURAN AUTOMÁTICAMENTE)
    services: {
        medical: [
            'Consulta General',
            'Medicina Interna',
            'Cardiología',
            'Dermatología',
            'Pediatría',
            'Ginecología',
            'Diagnóstico por Imagen',
            'Laboratorio Clínico',
            'Cirugía Ambulatoria',
            'Medicina Preventiva'
        ],
        legal: [
            'Derecho Civil',
            'Derecho Penal',
            'Derecho Laboral',
            'Derecho Mercantil',
            'Derecho Familiar',
            'Derecho Fiscal',
            'Consultoría Legal',
            'Litigios',
            'Contratos',
            'Asesoría Jurídica'
        ],
        creative: [
            'Diseño Gráfico',
            'Desarrollo Web',
            'Marketing Digital',
            'Branding',
            'Fotografía',
            'Video Marketing',
            'Redes Sociales',
            'SEO/SEM',
            'Diseño UX/UI',
            'Consultoría Creativa'
        ],
        business: [
            'Consultoría Empresarial',
            'Gestión de Proyectos',
            'Análisis Financiero',
            'Estrategia de Negocio',
            'Recursos Humanos',
            'Marketing Estratégico',
            'Transformación Digital',
            'Capacitación',
            'Auditoría',
            'Planificación Estratégica'
        ]
    },
    
    // 📊 CONFIGURACIÓN DE REVIEWS (OPCIONAL)
    reviews: {
        enabled: true,
        ratingValue: '4.8', // Calificación promedio (1-5)
        reviewCount: '127', // Número total de reviews
        bestRating: '5',
        worstRating: '1'
    },
    
    // 🎨 ESPECIALIDADES POR SECTOR (PARA SCHEMA MARKUP)
    specialties: {
        medical: [
            'General Practice',
            'Internal Medicine', 
            'Cardiology',
            'Dermatology',
            'Pediatrics',
            'Gynecology'
        ],
        legal: [
            'Civil Law',
            'Criminal Law',
            'Labor Law',
            'Commercial Law',
            'Family Law',
            'Tax Law'
        ],
        creative: [
            'Graphic Design',
            'Web Development',
            'Digital Marketing',
            'Brand Design',
            'Photography',
            'Video Production'
        ],
        business: [
            'Business Consulting',
            'Project Management',
            'Financial Analysis',
            'Strategic Planning',
            'Human Resources',
            'Digital Transformation'
        ]
    }
};

// 🔧 CONFIGURACIÓN AUTOMÁTICA POR SECTOR

function getSectorConfig(sector) {
    const configs = {
        medical: {
            businessType: 'MedicalOrganization',
            defaultTitle: {
                es: 'Centro Médico Profesional - Atención Médica Integral',
                en: 'Professional Medical Center - Comprehensive Healthcare'
            },
            defaultDescription: {
                es: 'Centro médico profesional con servicios de salud integral. Especialistas certificados, tecnología moderna y atención personalizada.',
                en: 'Professional medical center with comprehensive health services. Certified specialists, modern technology and personalized care.'
            },
            keywords: {
                es: 'centro médico, doctor, consulta médica, especialistas, salud, medicina, hospital, clínica, atención médica',
                en: 'medical center, doctor, medical consultation, specialists, health, medicine, hospital, clinic, medical care'
            }
        },
        legal: {
            businessType: 'LegalService',
            defaultTitle: {
                es: 'Bufete Legal Profesional - Servicios Jurídicos Integrales',
                en: 'Professional Law Firm - Comprehensive Legal Services'
            },
            defaultDescription: {
                es: 'Bufete legal profesional con servicios jurídicos integrales. Abogados especializados en todas las áreas del derecho.',
                en: 'Professional law firm with comprehensive legal services. Lawyers specialized in all areas of law.'
            },
            keywords: {
                es: 'abogado, bufete legal, servicios jurídicos, derecho civil, derecho penal, consultoría legal, asesoría jurídica',
                en: 'lawyer, law firm, legal services, civil law, criminal law, legal consulting, legal advice'
            }
        },
        creative: {
            businessType: 'ProfessionalService',
            defaultTitle: {
                es: 'Estudio Creativo - Diseño y Marketing Digital',
                en: 'Creative Studio - Design and Digital Marketing'
            },
            defaultDescription: {
                es: 'Estudio creativo especializado en diseño gráfico, desarrollo web y marketing digital. Soluciones creativas para tu negocio.',
                en: 'Creative studio specialized in graphic design, web development and digital marketing. Creative solutions for your business.'
            },
            keywords: {
                es: 'diseño gráfico, desarrollo web, marketing digital, branding, creatividad, agencia creativa',
                en: 'graphic design, web development, digital marketing, branding, creativity, creative agency'
            }
        },
        business: {
            businessType: 'Organization',
            defaultTitle: {
                es: 'Empresa Profesional - Servicios de Consultoría',
                en: 'Professional Business - Consulting Services'
            },
            defaultDescription: {
                es: 'Empresa de consultoría profesional especializada en gestión empresarial y estrategia de negocio.',
                en: 'Professional consulting company specialized in business management and business strategy.'
            },
            keywords: {
                es: 'consultoría empresarial, gestión de proyectos, análisis financiero, estrategia de negocio',
                en: 'business consulting, project management, financial analysis, business strategy'
            }
        }
    };
    
    return configs[sector] || configs.business;
}

// Aplicar configuración automática
const sectorConfig = getSectorConfig(SEO_CONFIG.sector);
SEO_CONFIG.businessType = sectorConfig.businessType;
SEO_CONFIG.defaultTitles = sectorConfig.defaultTitle;
SEO_CONFIG.defaultDescriptions = sectorConfig.defaultDescription;
SEO_CONFIG.sectorKeywords = sectorConfig.keywords;

// Configuración SEO aplicada
console.log('🔍 SEO Optimizer loaded');

// Exportar configuración para uso global
window.SEO_CONFIG = SEO_CONFIG;
