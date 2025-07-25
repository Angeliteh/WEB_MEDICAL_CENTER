/**
 * MEDICAL DATA CENTRALIZED SYSTEM
 * Sistema centralizado de datos médicos para coherencia en toda la web
 * Versión: 1.0
 */

// 🏥 SERVICIOS/DEPARTAMENTOS MÉDICOS UNIFICADOS
const MEDICAL_SERVICES = {
    cardiology: {
        id: 'cardiology',
        name: {
            es: 'Cardiología',
            en: 'Cardiology'
        },
        description: {
            es: 'Especialistas en el diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.',
            en: 'Specialists in the diagnosis and treatment of heart and cardiovascular system diseases.'
        },
        features: {
            es: [
                'Electrocardiogramas y ecocardiogramas',
                'Cateterismo cardíaco',
                'Cirugía cardiovascular'
            ],
            en: [
                'Electrocardiograms and echocardiograms',
                'Cardiac catheterization',
                'Cardiovascular surgery'
            ]
        },
        available24h: false,
        priority: 1
    },
    dermatology: {
        id: 'dermatology',
        name: {
            es: 'Dermatología',
            en: 'Dermatology'
        },
        description: {
            es: 'Tratamiento especializado de enfermedades de la piel, cabello y uñas con tecnología avanzada.',
            en: 'Specialized treatment of skin, hair and nail diseases with advanced technology.'
        },
        features: {
            es: [
                'Dermatología clínica y estética',
                'Cirugía dermatológica',
                'Tratamientos láser'
            ],
            en: [
                'Clinical and aesthetic dermatology',
                'Dermatological surgery',
                'Laser treatments'
            ]
        },
        available24h: false,
        priority: 2
    },
    neurology: {
        id: 'neurology',
        name: {
            es: 'Neurología',
            en: 'Neurology'
        },
        description: {
            es: 'Diagnóstico y tratamiento de trastornos del sistema nervioso central y periférico.',
            en: 'Diagnosis and treatment of central and peripheral nervous system disorders.'
        },
        features: {
            es: [
                'Electroencefalogramas',
                'Resonancia magnética cerebral',
                'Tratamiento de epilepsia y migrañas'
            ],
            en: [
                'Electroencephalograms',
                'Brain MRI',
                'Epilepsy and migraine treatment'
            ]
        },
        available24h: false,
        priority: 3
    },
    pediatrics: {
        id: 'pediatrics',
        name: {
            es: 'Pediatría',
            en: 'Pediatrics'
        },
        description: {
            es: 'Atención médica especializada para bebés, niños y adolescentes hasta los 18 años.',
            en: 'Specialized medical care for babies, children and adolescents up to 18 years old.'
        },
        features: {
            es: [
                'Consultas pediátricas generales',
                'Vacunación completa',
                'Control de crecimiento y desarrollo'
            ],
            en: [
                'General pediatric consultations',
                'Complete vaccination',
                'Growth and development control'
            ]
        },
        available24h: true,
        priority: 4
    },
    gynecology: {
        id: 'gynecology',
        name: {
            es: 'Ginecología',
            en: 'Gynecology'
        },
        description: {
            es: 'Cuidado integral de la salud femenina con enfoque en prevención y tratamiento.',
            en: 'Comprehensive women\'s health care with focus on prevention and treatment.'
        },
        features: {
            es: [
                'Consultas ginecológicas',
                'Control prenatal',
                'Cirugía ginecológica'
            ],
            en: [
                'Gynecological consultations',
                'Prenatal care',
                'Gynecological surgery'
            ]
        },
        available24h: false,
        priority: 5
    },
    traumatology: {
        id: 'traumatology',
        name: {
            es: 'Traumatología',
            en: 'Traumatology'
        },
        description: {
            es: 'Especialistas en lesiones del sistema musculoesquelético y cirugía ortopédica.',
            en: 'Specialists in musculoskeletal injuries and orthopedic surgery.'
        },
        features: {
            es: [
                'Cirugías ortopédicas',
                'Rehabilitación física',
                'Tratamiento de fracturas'
            ],
            en: [
                'Orthopedic surgeries',
                'Physical rehabilitation',
                'Fracture treatment'
            ]
        },
        available24h: true,
        priority: 6
    },
    laboratory: {
        id: 'laboratory',
        name: {
            es: 'Laboratorio/Diagnóstico',
            en: 'Laboratory/Diagnostic'
        },
        description: {
            es: 'Servicios completos de diagnóstico con laboratorio clínico y estudios especializados.',
            en: 'Complete diagnostic services with clinical laboratory and specialized studies.'
        },
        features: {
            es: [
                'Análisis clínicos completos',
                'Rayos X y ecografías',
                'Estudios especializados'
            ],
            en: [
                'Complete clinical analysis',
                'X-rays and ultrasounds',
                'Specialized studies'
            ]
        },
        available24h: true,
        priority: 7
    },
    emergency: {
        id: 'emergency',
        name: {
            es: 'Urgencias 24h',
            en: 'Emergency 24h'
        },
        description: {
            es: 'Atención médica de urgencia disponible las 24 horas del día, todos los días del año.',
            en: 'Emergency medical care available 24 hours a day, every day of the year.'
        },
        features: {
            es: [
                'Atención inmediata',
                'Equipo médico especializado',
                'Ambulancia disponible'
            ],
            en: [
                'Immediate attention',
                'Specialized medical team',
                'Ambulance available'
            ]
        },
        available24h: true,
        priority: 8
    }
};

// 👨‍⚕️ EQUIPO MÉDICO UNIFICADO
const MEDICAL_STAFF = {
    doctor1: {
        id: 'doctor1',
        name: {
            es: 'Dr. Roberto Barrethion',
            en: 'Dr. Roberto Barrethion'
        },
        specialty: {
            es: 'Cardiología',
            en: 'Cardiology'
        },
        department: 'cardiology',
        experience: {
            es: 'Especialista en cardiología con más de 15 años de experiencia en diagnóstico y tratamiento de enfermedades cardiovasculares.',
            en: 'Cardiology specialist with over 15 years of experience in diagnosis and treatment of cardiovascular diseases.'
        },
        education: {
            es: 'Universidad Nacional Autónoma de México',
            en: 'National Autonomous University of Mexico'
        },
        available: true
    },
    doctor2: {
        id: 'doctor2',
        name: {
            es: 'Dra. María Lou',
            en: 'Dr. María Lou'
        },
        specialty: {
            es: 'Dermatología',
            en: 'Dermatology'
        },
        department: 'dermatology',
        experience: {
            es: 'Especialista en dermatología clínica y estética, dedicada al cuidado integral de la piel.',
            en: 'Specialist in clinical and aesthetic dermatology, dedicated to comprehensive skin care.'
        },
        education: {
            es: 'Instituto Politécnico Nacional',
            en: 'National Polytechnic Institute'
        },
        available: true
    },
    doctor3: {
        id: 'doctor3',
        name: {
            es: 'Dra. Sansa Stark',
            en: 'Dr. Sansa Stark'
        },
        specialty: {
            es: 'Pediatría',
            en: 'Pediatrics'
        },
        department: 'pediatrics',
        experience: {
            es: 'Especialista en pediatría y cuidado infantil, comprometida con la salud y bienestar de los más pequeños.',
            en: 'Specialist in pediatrics and child care, committed to the health and wellbeing of the little ones.'
        },
        education: {
            es: 'Universidad de Guadalajara',
            en: 'University of Guadalajara'
        },
        available: true
    },
    doctor4: {
        id: 'doctor4',
        name: {
            es: 'Dr. Emely Robert',
            en: 'Dr. Emely Robert'
        },
        specialty: {
            es: 'Traumatología',
            en: 'Traumatology'
        },
        department: 'traumatology',
        experience: {
            es: 'Especialista en traumatología y cirugía ortopédica con amplia experiencia en lesiones deportivas.',
            en: 'Specialist in traumatology and orthopedic surgery with extensive experience in sports injuries.'
        },
        education: {
            es: 'Universidad Autónoma de Nuevo León',
            en: 'Autonomous University of Nuevo León'
        },
        available: true
    },
    doctor5: {
        id: 'doctor5',
        name: {
            es: 'Dra. Ana Martínez',
            en: 'Dr. Ana Martínez'
        },
        specialty: {
            es: 'Ginecología',
            en: 'Gynecology'
        },
        department: 'gynecology',
        experience: {
            es: 'Especialista en ginecología y obstetricia con enfoque en salud reproductiva femenina.',
            en: 'Specialist in gynecology and obstetrics with focus on female reproductive health.'
        },
        education: {
            es: 'Universidad de Monterrey',
            en: 'University of Monterrey'
        },
        available: true
    },
    doctor6: {
        id: 'doctor6',
        name: {
            es: 'Dr. Carlos Neurón',
            en: 'Dr. Carlos Neurón'
        },
        specialty: {
            es: 'Neurología',
            en: 'Neurology'
        },
        department: 'neurology',
        experience: {
            es: 'Especialista en neurología con experiencia en trastornos del sistema nervioso y neuroimagen.',
            en: 'Neurology specialist with experience in nervous system disorders and neuroimaging.'
        },
        education: {
            es: 'Universidad Anáhuac',
            en: 'Anáhuac University'
        },
        available: true
    },
    doctor6: {
        id: 'doctor6',
        name: {
            es: 'Dr. Carlos Mendoza',
            en: 'Dr. Carlos Mendoza'
        },
        specialty: {
            es: 'Cardiología Intervencionista',
            en: 'Interventional Cardiology'
        },
        department: 'cardiology',
        experience: {
            es: 'Especialista en cardiología intervencionista con más de 12 años de experiencia en procedimientos cardiovasculares mínimamente invasivos.',
            en: 'Interventional cardiology specialist with over 12 years of experience in minimally invasive cardiovascular procedures.'
        },
        education: {
            es: 'Instituto Nacional de Cardiología',
            en: 'National Institute of Cardiology'
        },
        available: true
    },
    doctor7: {
        id: 'doctor7',
        name: {
            es: 'Dra. Ana Patricia Ruiz',
            en: 'Dr. Ana Patricia Ruiz'
        },
        specialty: {
            es: 'Pediatría Neonatal',
            en: 'Neonatal Pediatrics'
        },
        department: 'pediatrics',
        experience: {
            es: 'Especialista en cuidados intensivos neonatales con experiencia en el manejo de recién nacidos prematuros y de alto riesgo.',
            en: 'Specialist in neonatal intensive care with experience in managing premature and high-risk newborns.'
        },
        education: {
            es: 'Hospital Infantil de México',
            en: 'Children\'s Hospital of Mexico'
        },
        available: true
    },
    doctor8: {
        id: 'doctor8',
        name: {
            es: 'Dr. Miguel Ángel Torres',
            en: 'Dr. Miguel Ángel Torres'
        },
        specialty: {
            es: 'Traumatología y Ortopedia',
            en: 'Traumatology and Orthopedics'
        },
        department: 'traumatology',
        experience: {
            es: 'Especialista en cirugía ortopédica y traumatología deportiva con amplia experiencia en artroscopia y reemplazo articular.',
            en: 'Specialist in orthopedic surgery and sports traumatology with extensive experience in arthroscopy and joint replacement.'
        },
        education: {
            es: 'Hospital de Traumatología y Ortopedia',
            en: 'Hospital of Traumatology and Orthopedics'
        },
        available: true
    },
    doctor9: {
        id: 'doctor9',
        name: {
            es: 'Dra. Laura Fernández',
            en: 'Dr. Laura Fernández'
        },
        specialty: {
            es: 'Ginecología y Obstetricia',
            en: 'Gynecology and Obstetrics'
        },
        department: 'gynecology',
        experience: {
            es: 'Especialista en ginecología y obstetricia con enfoque en medicina materno-fetal y cirugía ginecológica mínimamente invasiva.',
            en: 'Specialist in gynecology and obstetrics with focus on maternal-fetal medicine and minimally invasive gynecological surgery.'
        },
        education: {
            es: 'Instituto Nacional de Perinatología',
            en: 'National Institute of Perinatology'
        },
        available: true
    }
};

// 🔧 FUNCIONES UTILITARIAS
const MedicalDataManager = {

    // Obtener todos los servicios
    getAllServices: function(language = 'es') {
        return Object.values(MEDICAL_SERVICES).map(service => ({
            id: service.id,
            name: service.name[language],
            description: service.description[language],
            features: service.features[language],
            available24h: service.available24h,
            priority: service.priority
        })).sort((a, b) => a.priority - b.priority);
    },

    // Obtener servicio por ID
    getServiceById: function(serviceId, language = 'es') {
        const service = MEDICAL_SERVICES[serviceId];
        if (!service) return null;

        return {
            id: service.id,
            name: service.name[language],
            description: service.description[language],
            features: service.features[language],
            available24h: service.available24h,
            priority: service.priority
        };
    },

    // Obtener todos los doctores
    getAllDoctors: function(language = 'es') {
        return Object.values(MEDICAL_STAFF).map(doctor => ({
            id: doctor.id,
            name: doctor.name[language],
            specialty: doctor.specialty[language],
            department: doctor.department,
            experience: doctor.experience[language],
            education: doctor.education[language],
            available: doctor.available
        }));
    },

    // Obtener doctores por departamento
    getDoctorsByDepartment: function(departmentId, language = 'es') {
        return Object.values(MEDICAL_STAFF)
            .filter(doctor => doctor.department === departmentId && doctor.available)
            .map(doctor => ({
                id: doctor.id,
                name: doctor.name[language],
                specialty: doctor.specialty[language],
                department: doctor.department,
                experience: doctor.experience[language],
                education: doctor.education[language],
                available: doctor.available
            }));
    },

    // Obtener doctor por ID
    getDoctorById: function(doctorId, language = 'es') {
        const doctor = MEDICAL_STAFF[doctorId];
        if (!doctor) return null;

        return {
            id: doctor.id,
            name: doctor.name[language],
            specialty: doctor.specialty[language],
            department: doctor.department,
            experience: doctor.experience[language],
            education: doctor.education[language],
            available: doctor.available
        };
    },

    // Generar opciones para select de servicios
    generateServiceOptions: function(language = 'es', includeEmpty = true) {
        let options = [];

        if (includeEmpty) {
            options.push({
                value: '',
                text: language === 'es' ? 'Seleccionar Departamento' : 'Select Department'
            });
        }

        const services = this.getAllServices(language);
        services.forEach(service => {
            options.push({
                value: service.id,
                text: service.name
            });
        });

        return options;
    },

    // Generar opciones para select de doctores
    generateDoctorOptions: function(departmentId = null, language = 'es', includeEmpty = true) {
        let options = [];

        if (includeEmpty) {
            options.push({
                value: '',
                text: language === 'es' ? 'Seleccionar Doctor' : 'Select Doctor'
            });
        }

        const doctors = departmentId
            ? this.getDoctorsByDepartment(departmentId, language)
            : this.getAllDoctors(language);

        doctors.forEach(doctor => {
            options.push({
                value: doctor.id,
                text: `${doctor.name} - ${doctor.specialty}`
            });
        });

        return options;
    },

    // Inicializar sistema
    init: function() {
        console.log('🏥 Medical Data System initialized');
        console.log(`📊 Services loaded: ${Object.keys(MEDICAL_SERVICES).length}`);
        console.log(`👨‍⚕️ Doctors loaded: ${Object.keys(MEDICAL_STAFF).length}`);

        // Hacer disponible globalmente
        window.MedicalData = {
            services: MEDICAL_SERVICES,
            staff: MEDICAL_STAFF,
            manager: this
        };
    }
};

// 🚀 AUTO-INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    MedicalDataManager.init();
});
