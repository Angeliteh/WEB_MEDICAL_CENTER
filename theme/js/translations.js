// Sistema de traducciones para Centro Médico Profesional
// Soporte para Español (ES) e Inglés (EN)

const translations = {
    es: {
        // Meta información
        meta: {
            title: "Centro Médico Profesional - Atención Médica Integral",
            description: "Centro médico profesional con servicios de salud integral. Especialistas certificados, tecnología moderna y atención personalizada para toda la familia."
        },
        
        // Navegación principal
        navigation: {
            home: "Inicio",
            about: "Nosotros",
            services: "Servicios",
            gallery: "Galería",
            team: "Equipo",
            appointment: "Citas",
            contact: "Contacto"
        },

        // Header
        header: {
            email: 'Email',
            emailAddress: 'contacto@centromedico.com',
            phone: 'Teléfono',
            phoneNumber: '+ (52) 55 1234-5678',
            appointmentBtn: 'Agendar Cita'
        },

        // About Page
        about: {
            breadcrumb: 'Acerca de Nosotros',
            title: 'Acerca de Nosotros',
            section: {
                title: 'Cuidado personal para una vida saludable',
                description: 'Somos un centro médico profesional comprometido con brindar la mejor atención médica a nuestros pacientes. Contamos con especialistas certificados y tecnología de vanguardia para garantizar el mejor cuidado de su salud.'
            },
            stats: {
                doctors: 'Doctores Expertos',
                experience: 'Años de Experiencia'
            },
            team: {
                title: 'Conoce a Nuestros Especialistas',
                description: 'Nuestro equipo de especialistas está comprometido con brindar la mejor atención médica.',
                doctor1: { specialty: 'Especialista del Corazón' },
                doctor2: { specialty: 'Especialista en Medicina' },
                doctor3: { specialty: 'Ginecóloga' },
                doctor4: { specialty: 'Pediatra' }
            }
        },

        // Footer
        footer: {
            about: {
                description: 'Somos un centro médico profesional comprometido con brindar la mejor atención médica a nuestros pacientes con tecnología de vanguardia.'
            },
            contact: {
                address: 'Av. Reforma 123, Ciudad de México, CDMX 06600',
                email: 'contacto@centromedico.com',
                phone: '+ (52) 55 1234-5678'
            },

        },

        // About Page
        aboutPage: {
            hero: {
                title: 'Acerca de Nosotros',
                breadcrumb: {
                    home: 'Inicio',
                    current: 'Acerca de'
                }
            },
            story: {
                title: 'Nuestra Historia',
                tagline: 'Cuidando tu salud desde 1995',
                description: 'Somos un centro médico profesional con más de 25 años de experiencia brindando atención médica de calidad. Nuestro compromiso es ofrecer servicios de salud integrales con tecnología de vanguardia y un equipo humano altamente calificado.',
                mission: 'Nuestra Misión',
                missionText: 'Brindar atención médica de excelencia, centrada en el paciente, con tecnología avanzada y un equipo humano comprometido con la salud y bienestar de nuestra comunidad.',
                vision: 'Nuestra Visión',
                visionText: 'Ser el centro médico líder en la región, reconocido por la calidad de nuestros servicios, la innovación en tratamientos y el compromiso con la salud integral de nuestros pacientes.'
            },
            video: {
                subtitle: 'Acerca de Nuestro Hospital',
                title: 'Conoce Nuestras Instalaciones'
            },
            gallery: {
                title: 'Nuestra',
                titleSpan: 'Galería',
                description: 'Conoce nuestras modernas instalaciones y tecnología de vanguardia'
            },
            facilities: {
                facility1: {
                    title: 'Consultorios Modernos',
                    description: 'Espacios cómodos y equipados con la última tecnología médica'
                },
                facility2: {
                    title: 'Laboratorio Clínico',
                    description: 'Análisis precisos y resultados rápidos para un diagnóstico certero'
                },
                facility3: {
                    title: 'Sala de Emergencias',
                    description: 'Atención médica inmediata las 24 horas del día'
                },
                facility4: {
                    title: 'Quirófanos Equipados',
                    description: 'Tecnología de punta para procedimientos quirúrgicos seguros'
                },
                facility5: {
                    title: 'Área de Rehabilitación',
                    description: 'Terapias especializadas para una recuperación completa'
                },
                facility6: {
                    title: 'Farmacia Interna',
                    description: 'Medicamentos disponibles para mayor comodidad del paciente'
                }
            },
            faq: {
                title: 'Preguntas Frecuentes',
                question1: '¿Cuáles son los horarios de atención?',
                answer1: 'Atendemos de lunes a viernes de 8:00 AM a 8:00 PM, y sábados de 8:00 AM a 2:00 PM.',
                question2: '¿Aceptan seguros médicos?',
                answer2: 'Sí, trabajamos con los principales seguros médicos del país. Consulta con tu aseguradora.',
                question3: '¿Cómo puedo agendar una cita?',
                answer3: 'Puedes agendar tu cita llamando al teléfono, por WhatsApp o a través de nuestro formulario en línea.'
            }
        },

        // Appointment Form
        appointmentForm: {
            fields: {
                departments: {
                    cardiology: 'Cardiología',
                    dermatology: 'Dermatología',
                    neurology: 'Neurología',
                    pediatrics: 'Pediatría',
                    gynecology: 'Ginecología',
                    traumatology: 'Traumatología'
                },
                time: {
                    label: 'Horario Preferido',
                    morning1: '8:00 AM',
                    morning2: '9:00 AM',
                    morning3: '10:00 AM',
                    morning4: '11:00 AM',
                    afternoon1: '2:00 PM',
                    afternoon2: '3:00 PM',
                    afternoon3: '4:00 PM',
                    afternoon4: '5:00 PM'
                }
            }
        },

        // Service Page
        servicePage: {
            hero: {
                title: 'Servicios',
                breadcrumb: {
                    home: 'Inicio /',
                    current: 'Servicios'
                }
            },
            overview: {
                title: 'Educación Clínica y Médica',
                description: 'Ofrecemos servicios médicos integrales con tecnología de vanguardia y profesionales altamente capacitados. Nuestro compromiso es brindar atención de calidad centrada en el bienestar del paciente.',
                feature1: 'Atención médica especializada y personalizada',
                feature2: 'Tecnología médica de última generación',
                feature3: 'Profesionales certificados y experimentados',
                feature4: 'Servicios integrales de salud y bienestar',
                appointmentBtn: 'Agendar Cita'
            }
        },

        // Service Page Extended
        servicePageExtended: {
            featured: {
                title: 'Servicios Destacados',
                subtitle: 'Nuestros servicios más importantes disponibles para ti las 24 horas del día',
                emergency: {
                    title: 'Urgencias 24h',
                    description: 'Atención médica de emergencia disponible las 24 horas del día, todos los días del año.',
                    feature1: 'Atención inmediata',
                    feature2: 'Equipo especializado',
                    feature3: 'Ambulancia disponible',
                    button: 'Llamar Ahora'
                },
                service24: {
                    title: 'Servicio 24 Horas',
                    description: 'Nuestro equipo médico está disponible para atenderte en cualquier momento del día.',
                    feature1: 'Personal médico disponible',
                    feature2: 'Consultas de urgencia',
                    feature3: 'Laboratorio 24h',
                    button: 'Agendar Cita'
                },
                hospitalization: {
                    title: 'Hospitalización',
                    description: 'Habitaciones cómodas y completamente equipadas para una estancia hospitalaria de calidad.',
                    feature1: 'Habitaciones privadas',
                    feature2: 'Monitoreo continuo',
                    feature3: 'Equipos modernos',
                    button: 'Más Información'
                }
            },
            departments: {
                title: 'Departamentos Médicos',
                subtitle: 'Especialistas altamente calificados en cada área médica para brindarte la mejor atención',
                cardiology: {
                    title: 'Cardiología',
                    description: 'Especialistas en el diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.'
                },
                neurology: {
                    title: 'Neurología',
                    description: 'Diagnóstico y tratamiento de trastornos del sistema nervioso central y periférico.'
                },
                pediatrics: {
                    title: 'Pediatría',
                    description: 'Atención médica especializada para bebés, niños y adolescentes hasta los 18 años.'
                },
                traumatology: {
                    title: 'Traumatología',
                    description: 'Especialistas en lesiones del sistema musculoesquelético y cirugía ortopédica.'
                }
            },
            additional: {
                title: 'Servicios Adicionales',
                subtitle: 'Complementamos nuestra atención médica con servicios especializados para tu bienestar integral',
                laboratory: {
                    title: 'Laboratorio Clínico',
                    description: 'Análisis clínicos completos con resultados rápidos y confiables para diagnósticos precisos.',
                    feature1: 'Análisis de sangre completos',
                    feature2: 'Estudios de orina y heces',
                    feature3: 'Resultados en 24 horas'
                },
                imaging: {
                    title: 'Imagenología',
                    description: 'Estudios de imagen con equipos digitales de última generación para diagnósticos precisos.',
                    feature1: 'Rayos X digitales',
                    feature2: 'Ecografías 3D y 4D',
                    feature3: 'Menor exposición a radiación'
                },
                safety: {
                    title: 'Protocolos de Seguridad',
                    description: 'Estrictos protocolos de higiene y desinfección para mantener un ambiente seguro.',
                    feature1: 'Desinfección continua',
                    feature2: 'Equipos esterilizados',
                    feature3: 'Personal capacitado'
                }
            },
            carousel: {
                title: 'Todos Nuestros',
                titleSpan: 'Servicios',
                subtitle: 'Explora nuestra amplia gama de servicios médicos especializados. Haz clic en cualquier servicio para conocer más detalles.',
                cardiology: {
                    title: 'Cardiología',
                    subtitle: 'Especialistas Certificados',
                    description: 'Diagnóstico y tratamiento de enfermedades del corazón con tecnología avanzada.'
                },
                neurology: {
                    title: 'Neurología',
                    subtitle: 'Atención Especializada',
                    description: 'Tratamiento de trastornos del sistema nervioso con equipos de última generación.'
                },
                pediatrics: {
                    title: 'Pediatría',
                    subtitle: 'Cuidado Infantil',
                    description: 'Atención médica especializada para bebés, niños y adolescentes.'
                },
                traumatology: {
                    title: 'Traumatología',
                    subtitle: 'Cirugía Ortopédica',
                    description: 'Especialistas en lesiones del sistema musculoesquelético.'
                },
                gynecology: {
                    title: 'Ginecología',
                    subtitle: 'Salud Femenina',
                    description: 'Cuidado integral de la salud femenina con enfoque preventivo.'
                },
                dermatology: {
                    title: 'Dermatología',
                    subtitle: 'Cuidado de la Piel',
                    description: 'Tratamiento especializado de enfermedades de la piel.'
                },
                psychology: {
                    title: 'Psicología',
                    subtitle: 'Bienestar Mental',
                    description: 'Atención psicológica profesional para el bienestar mental y emocional.'
                },
                laboratory: {
                    title: 'Laboratorio',
                    subtitle: 'Diagnóstico Preciso',
                    description: 'Análisis clínicos completos con resultados rápidos y confiables.'
                }
            }
        },

        // Modales de servicios
        modals: {
            close: 'Cerrar',
            appointment: 'Agendar Cita',
            cardiology: {
                title: 'Cardiología',
                subtitle: 'Especialistas en Salud Cardiovascular',
                description: 'Nuestro departamento de cardiología cuenta con especialistas certificados y equipos de última generación para el diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.',
                feature1: 'Electrocardiogramas y ecocardiogramas',
                feature2: 'Cateterismo cardíaco',
                feature3: 'Cirugía cardiovascular',
                feature4: 'Rehabilitación cardíaca'
            },
            neurology: {
                title: 'Neurología',
                subtitle: 'Especialistas en Sistema Nervioso',
                description: 'Diagnóstico y tratamiento de trastornos del sistema nervioso central y periférico con tecnología avanzada y un enfoque integral.',
                feature1: 'Electroencefalogramas',
                feature2: 'Resonancia magnética cerebral',
                feature3: 'Tratamiento de epilepsia y migrañas',
                feature4: 'Neurorehabilitación'
            },
            pediatrics: {
                title: 'Pediatría',
                subtitle: 'Cuidado Especializado para Niños',
                description: 'Atención médica especializada para bebés, niños y adolescentes hasta los 18 años con un enfoque cálido y profesional.',
                feature1: 'Consultas pediátricas generales',
                feature2: 'Vacunación completa',
                feature3: 'Control de crecimiento y desarrollo',
                feature4: 'Urgencias pediátricas 24h'
            },
            traumatology: {
                title: 'Traumatología',
                subtitle: 'Especialistas en Lesiones Musculoesqueléticas',
                description: 'Especialistas en lesiones del sistema musculoesquelético y cirugía ortopédica con técnicas modernas y rehabilitación integral.',
                feature1: 'Cirugías ortopédicas',
                feature2: 'Rehabilitación física',
                feature3: 'Tratamiento de fracturas',
                feature4: 'Medicina deportiva'
            },
            gynecology: {
                title: 'Ginecología',
                subtitle: 'Cuidado Integral de la Salud Femenina',
                description: 'Cuidado integral de la salud femenina con enfoque en prevención y tratamiento especializado.',
                feature1: 'Consultas ginecológicas',
                feature2: 'Control prenatal',
                feature3: 'Cirugía ginecológica',
                feature4: 'Planificación familiar'
            },
            dermatology: {
                title: 'Dermatología',
                subtitle: 'Especialistas en Cuidado de la Piel',
                description: 'Tratamiento especializado de enfermedades de la piel, cabello y uñas con tecnología avanzada.',
                feature1: 'Dermatología clínica y estética',
                feature2: 'Cirugía dermatológica',
                feature3: 'Tratamientos láser',
                feature4: 'Dermatología pediátrica'
            },
            psychology: {
                title: 'Psicología',
                subtitle: 'Bienestar Mental y Emocional',
                description: 'Atención psicológica profesional para el bienestar mental y emocional de nuestros pacientes.',
                feature1: 'Terapia individual y familiar',
                feature2: 'Psicología clínica',
                feature3: 'Terapia cognitivo-conductual',
                feature4: 'Psicología infantil'
            },
            laboratory: {
                title: 'Laboratorio Clínico',
                subtitle: 'Diagnóstico Preciso y Confiable',
                description: 'Servicios completos de diagnóstico con laboratorio clínico y estudios especializados para detección temprana.',
                feature1: 'Análisis clínicos completos',
                feature2: 'Rayos X y ecografías',
                feature3: 'Estudios especializados',
                feature4: 'Resultados en línea'
            }
        },

        // Gallery Page
        galleryPage: {
            hero: {
                title: 'Galería',
                breadcrumb: {
                    home: 'Inicio /',
                    current: 'Galería'
                }
            },
            media: {
                title: 'Medios Recopilados',
                titleSpan: 'de Nuestro Hospital',
                description: 'Aprovecha marcos ágiles para proporcionar una sinopsis sólida para vistas generales de alto nivel. Enfoques iterativos para la estrategia corporativa...'
            },
            shots: {
                title: 'Fotografías Recopiladas',
                titleSpan: 'de Nuestro Hospital',
                description: 'Aprovecha marcos ágiles para proporcionar una sinopsis sólida para vistas generales de alto nivel. Enfoques iterativos para la estrategia corporativa...'
            },
            facilities: {
                facility1: {
                    title: 'Instalación 01',
                    description: 'Consultorios modernos equipados con tecnología de vanguardia para brindar la mejor atención médica.'
                },
                facility2: {
                    title: 'Instalación 02',
                    description: 'Laboratorio clínico con equipos de última generación para análisis precisos y confiables.'
                },
                facility3: {
                    title: 'Instalación 03',
                    description: 'Sala de emergencias preparada para atender cualquier urgencia médica las 24 horas del día.'
                },
                facility4: {
                    title: 'Instalación 04',
                    description: 'Quirófanos completamente equipados para realizar procedimientos quirúrgicos de alta complejidad.'
                },
                facility5: {
                    title: 'Instalación 05',
                    description: 'Área de rehabilitación con terapias especializadas para una recuperación integral del paciente.'
                },
                facility6: {
                    title: 'Instalación 06',
                    description: 'Farmacia interna con medicamentos disponibles para mayor comodidad y acceso de nuestros pacientes.'
                }
            }
        },

        // Team Page
        teamPage: {
            hero: {
                title: 'Equipo',
                breadcrumb: {
                    home: 'Inicio /',
                    current: 'Equipo'
                }
            },
            section: {
                title: 'Gran',
                titleSpan: 'Equipo',
                description: 'Conoce a nuestro equipo de especialistas médicos altamente calificados, comprometidos con brindar la mejor atención médica con tecnología de vanguardia y un enfoque humano.'
            },
            tabs: {
                cardiology: 'Cardiología',
                pediatrics: 'Pediatría',
                traumatology: 'Traumatología',
                specialties: 'Otras Especialidades'
            },
            viewProfile: 'Ver Perfil',
            modal: {
                specialty: 'Especialidad',
                education: 'Educación',
                experience: 'Experiencia Profesional',
                achievements: 'Logros y Certificaciones',
                achievement1: 'Certificación en especialidad médica',
                achievement2: 'Miembro de asociaciones médicas profesionales',
                achievement3: 'Participación en congresos médicos internacionales',
                achievement4: 'Formación continua en nuevas técnicas',
                approach: 'Enfoque de Atención',
                approachText: 'Nuestro compromiso es brindar atención médica personalizada, utilizando las mejores prácticas y tecnología avanzada para garantizar el bienestar de nuestros pacientes.',
                availability: 'Disponibilidad',
                schedule: 'Lunes a Viernes: 8:00 AM - 6:00 PM',
                appointments: 'Citas disponibles con previa programación',
                close: 'Cerrar',
                bookAppointment: 'Agendar Cita'
            }
        },

        // Gallery Page
        galleryPage: {
            hero: {
                title: 'Galería',
                breadcrumb: {
                    home: 'Inicio /',
                    current: 'Galería'
                }
            },
            main: {
                title: 'Galería',
                titleSpan: 'Médica',
                description: 'Explora nuestras instalaciones médicas de vanguardia, equipos especializados y el entorno profesional donde brindamos atención médica de calidad.'
            },
            filters: {
                all: 'Todos',
                cardiology: 'Cardiología',
                pediatrics: 'Pediatría',
                traumatology: 'Traumatología',
                laboratory: 'Laboratorio',
                facilities: 'Instalaciones'
            },
            mediaFilters: {
                all: 'Todo',
                images: 'Imágenes',
                videos: 'Videos'
            },

            loadMore: 'Cargar Más'
        },

        // Appointment Page
        appointmentPage: {
            hero: {
                title: 'Citas',
                breadcrumb: {
                    home: 'Inicio /',
                    current: 'Citas'
                }
            },
            form: {
                title: 'Solicitar',
                titleSpan: 'Cita',
                fields: {
                    name: 'Nombre',
                    email: 'Correo Electrónico',
                    phone: 'Teléfono',
                    date: 'Fecha',
                    message: 'Su Mensaje',
                    departments: 'Departamentos',
                    doctor: 'Doctor',
                    doctorPreference: 'Asignar automáticamente (recomendado)'
                },
                doctorNote: 'El doctor será asignado según disponibilidad y especialización',
                options: {
                    diagnostic: 'Diagnóstico',
                    psychological: 'Psicológico'
                },
                submitButton: 'Enviar Ahora'
            },
            doctors: {
                title: 'Nuestros Expertos',
                titleSpan: 'Doctores',
                description: 'Contamos con un equipo de médicos especialistas altamente calificados y con amplia experiencia para brindarle la mejor atención médica.'
            }
        },

        // Contact Page
        contactPage: {
            hero: {
                title: 'Contacto',
                breadcrumb: {
                    home: 'Inicio /',
                    current: 'Contacto'
                }
            },
            info: {
                location: {
                    title: 'Ubicación',
                    address: 'Av. Reforma 123, Col. Centro<br>Ciudad de México, 06000 México'
                },
                phone: {
                    title: 'Teléfono',
                    numbers: '(+52) 55 1234-5678<br>(+52) 55 1234-5679'
                },
                email: {
                    title: 'Correo Electrónico',
                    addresses: 'contacto@centromedico.com<br>info@centromedico.com'
                }
            },
            form: {
                fields: {
                    name: 'Nombre',
                    email: 'Correo Electrónico',
                    phone: 'Teléfono',
                    message: 'Su mensaje'
                },
                submitButton: 'Enviar Mensaje'
            }
        },

        // WhatsApp
        whatsapp: {
            button: {
                text: '¿Necesitas ayuda?'
            }
        },
        
        // Header superior
        header: {
            openingHours: "Horarios de Atención: Lunes a Viernes - 8am a 6pm",
            email: "Email",
            emailAddress: "info@centromedico.com",
            phone: "Teléfono", 
            phoneNumber: "+ (52) 55 1234-5678",
            appointment: "Citas",
            appointmentHours: "10:00AM - 7:00PM",
            appointmentBtn: "Agendar Cita"
        },
        
        // Hero/Slider principal
        hero: {
            slide1: {
                title: "Nuestros Mejores Cirujanos",
                subtitle: "Contamos con especialistas certificados y tecnología de vanguardia para brindar la mejor atención médica a nuestros pacientes.",
                button: "Conocer Más"
            },
            slide2: {
                title: "Cuidamos de Tu Salud", 
                subtitle: "Centro médico profesional con más de 15 años de experiencia en atención médica integral.",
                button: "Sobre Nosotros"
            },
            slide3: {
                title: "Mejores Servicios Médicos",
                subtitle: "Ofrecemos una amplia gama de servicios médicos especializados con los más altos estándares de calidad.",
                button: "Ver Servicios"
            }
        },

        // CTA Section (Call to Action)
        cta: {
            emergency: {
                title: "Casos de Emergencia",
                phone: "+ (52) 55 1234-5678",
                description: "Atención médica de emergencia disponible las 24 horas del día."
            },
            service24: {
                title: "Servicio 24 Horas",
                description: "Nuestro equipo médico está disponible para atenderte en cualquier momento del día.",
                button: "Leer Más"
            },
            workingHours: {
                title: "Horarios de Atención",
                schedule: {
                    weekdays: "Lun - Vie",
                    hours: "8:00 - 17:00"
                }
            }
        },

        // Features Section (Características)
        features: {
            title: "Mejores Características",
            titleSpan: "de Nuestro Hospital",
            subtitle: "Contamos con las mejores instalaciones y servicios médicos especializados para brindar atención de calidad a nuestros pacientes.",
            items: {
                orthopedics: {
                    title: "Traumatología",
                    description: "Especialistas en tratamiento de lesiones y enfermedades del sistema musculoesquelético con tecnología avanzada."
                },
                diagnostic: {
                    title: "Diagnóstico",
                    description: "Equipos de diagnóstico de última generación para detectar y tratar enfermedades de manera temprana y precisa."
                },
                psychology: {
                    title: "Psicología",
                    description: "Atención psicológica profesional para el bienestar mental y emocional de nuestros pacientes."
                },
                generalTreatment: {
                    title: "Tratamiento General",
                    description: "Atención médica integral para el cuidado de la salud general con un enfoque preventivo y curativo."
                }
            }
        },

        // Service Tabs Section (Pestañas de Servicios)
        serviceTabs: {
            tabs: {
                dormitory: "Hospitalización",
                orthopedic: "Traumatología",
                sonogram: "Ecografía",
                xray: "Rayos X",
                diagnostic: "Diagnóstico"
            },
            content: {
                dormitory: {
                    title: "Hospitalización",
                    description1: "Contamos con habitaciones cómodas y completamente equipadas para brindar la mejor atención hospitalaria a nuestros pacientes durante su estancia.",
                    description2: "Nuestro personal médico y de enfermería está disponible las 24 horas para garantizar el cuidado y bienestar de cada paciente hospitalizado.",
                    features: [
                        "Habitaciones privadas y compartidas disponibles",
                        "Monitoreo médico continuo las 24 horas",
                        "Equipos médicos de última generación"
                    ],
                    button: "Leer Más"
                },
                orthopedic: {
                    title: "Traumatología",
                    description1: "Especialistas en el tratamiento de lesiones y enfermedades del sistema musculoesquelético con tecnología avanzada y técnicas modernas.",
                    description2: "Ofrecemos cirugías ortopédicas, rehabilitación y tratamientos especializados para una recuperación completa y efectiva.",
                    features: [
                        "Cirugías ortopédicas especializadas",
                        "Rehabilitación física personalizada",
                        "Tratamiento de fracturas y lesiones deportivas"
                    ],
                    button: "Leer Más"
                },
                sonogram: {
                    title: "Ecografía",
                    description1: "Estudios de ultrasonido con equipos de alta resolución para diagnósticos precisos y seguimiento médico detallado.",
                    description2: "Realizamos ecografías obstétricas, abdominales, pélvicas y de otros órganos con la más alta calidad de imagen.",
                    features: [
                        "Ecografías 3D y 4D disponibles",
                        "Estudios obstétricos especializados",
                        "Diagnóstico por imagen de alta precisión"
                    ],
                    button: "Leer Más"
                },
                xray: {
                    title: "Rayos X",
                    description1: "Estudios radiológicos con equipos digitales de última generación para diagnósticos rápidos y precisos.",
                    description2: "Contamos con tecnología digital que reduce la exposición a radiación y proporciona imágenes de alta calidad.",
                    features: [
                        "Radiología digital avanzada",
                        "Menor exposición a radiación",
                        "Resultados inmediatos y precisos"
                    ],
                    button: "Leer Más"
                },
                diagnostic: {
                    title: "Diagnóstico",
                    description1: "Servicios integrales de diagnóstico médico con laboratorio clínico y estudios especializados para detección temprana.",
                    description2: "Análisis clínicos completos, estudios de sangre, orina y otros fluidos corporales con resultados confiables.",
                    features: [
                        "Laboratorio clínico completo",
                        "Análisis especializados disponibles",
                        "Resultados rápidos y confiables"
                    ],
                    button: "Leer Más"
                }
            }
        },

        // Sección Acerca de
        about: {
            title: "Acerca de Nosotros",
            subtitle: "Somos un centro médico profesional comprometido con la excelencia en el cuidado de la salud",
            description: "Con más de 15 años de experiencia, nuestro centro médico se ha consolidado como líder en atención médica integral. Contamos con especialistas certificados, tecnología de vanguardia y un enfoque centrado en el paciente.",
            features: {
                feature1: {
                    title: "Especialistas Certificados",
                    description: "Médicos con certificaciones internacionales y amplia experiencia."
                },
                feature2: {
                    title: "Tecnología Avanzada", 
                    description: "Equipos médicos de última generación para diagnósticos precisos."
                },
                feature3: {
                    title: "Atención 24/7",
                    description: "Servicio de emergencias disponible las 24 horas del día."
                }
            },
            button: "Conocer Más"
        },
        
        // Servicios
        services: {
            title: "Nuestros Servicios",
            subtitle: "Ofrecemos una amplia gama de servicios médicos especializados",
            items: {
                cardiology: {
                    title: "Cardiología",
                    description: "Diagnóstico y tratamiento de enfermedades del corazón con tecnología avanzada."
                },
                neurology: {
                    title: "Neurología", 
                    description: "Atención especializada en trastornos del sistema nervioso."
                },
                pediatrics: {
                    title: "Pediatría",
                    description: "Cuidado médico integral para bebés, niños y adolescentes."
                },
                orthopedics: {
                    title: "Traumatología",
                    description: "Tratamiento de lesiones y enfermedades del sistema musculoesquelético."
                },
                gynecology: {
                    title: "Ginecología",
                    description: "Atención médica especializada para la salud femenina."
                },
                dermatology: {
                    title: "Dermatología",
                    description: "Diagnóstico y tratamiento de enfermedades de la piel."
                }
            }
        },
        
        // Galería de servicios
        serviceGallery: {
            title: "Servicios",
            titleSpan: "Proporcionados",
            subtitle: "Ofrecemos una amplia gama de servicios médicos especializados con tecnología de vanguardia y personal altamente calificado para brindar la mejor atención a nuestros pacientes.",
            items: {
                dormitory: {
                    title: "Hospitalización",
                    subtitle: "Mejor Servicio a Bajo Costo",
                    description: "Habitaciones cómodas y completamente equipadas para una estancia hospitalaria de calidad."
                },
                germsProtection: {
                    title: "Protección Sanitaria",
                    subtitle: "Mejor Servicio a Bajo Costo",
                    description: "Protocolos estrictos de higiene y desinfección para mantener un ambiente seguro."
                },
                psychology: {
                    title: "Psicología",
                    subtitle: "Mejor Servicio a Bajo Costo",
                    description: "Atención psicológica profesional para el bienestar mental y emocional."
                }
            }
        },
        
        // Equipo médico
        team: {
            title: "Nuestros Doctores",
            titleSpan: "Expertos",
            subtitle: "Contamos con un equipo de médicos especialistas altamente calificados y comprometidos con brindar la mejor atención médica a nuestros pacientes.",
            members: {
                doctor1: {
                    name: "Dr. Roberto Barrethion",
                    description: "Especialista en medicina interna con más de 15 años de experiencia en diagnóstico y tratamiento de enfermedades complejas."
                },
                doctor2: {
                    name: "Dra. María Lou",
                    description: "Especialista en medicina familiar y preventiva, dedicada al cuidado integral de la salud de toda la familia."
                },
                doctor3: {
                    name: "Dra. Sansa Stark",
                    description: "Especialista en pediatría y cuidado infantil, comprometida con la salud y bienestar de los más pequeños."
                }
            }
        },
        
        // Testimonios
        testimonials: {
            title: "Lo Que Dicen",
            titleSpan: "Nuestros Pacientes",
            items: {
                adamRose: {
                    name: "Adam Rose",
                    text: "Excelente atención médica y profesional. El equipo médico me brindó el mejor cuidado durante mi tratamiento. Muy recomendado para cualquier persona que busque atención médica de calidad."
                },
                davidWarner: {
                    name: "David Warner",
                    text: "El mejor centro médico de la ciudad. Las instalaciones son modernas y el personal es muy profesional. Me siento completamente satisfecho con el servicio recibido."
                },
                amyAdams: {
                    name: "Amy Adams",
                    text: "Gracias al equipo médico por su dedicación y cuidado excepcional. El tratamiento fue exitoso y me siento mucho mejor. Definitivamente regresaré para futuras consultas."
                }
            }
        },

        // FAQ Section (Preguntas Frecuentes)
        faq: {
            title: "FAQ",
            questions: {
                question1: {
                    title: "¿Por qué debería elegir Centro Médico?",
                    answer: "Nuestro centro médico cuenta con más de 15 años de experiencia brindando atención médica de calidad. Contamos con especialistas certificados, tecnología de vanguardia y un enfoque centrado en el paciente que nos distingue como líderes en atención médica integral."
                },
                question2: {
                    title: "¿Cuáles son los horarios de visita del Centro?",
                    answer: "Nuestros horarios de visita son de lunes a viernes de 8:00 AM a 6:00 PM, y los fines de semana de 9:00 AM a 4:00 PM. Para emergencias, contamos con servicio las 24 horas del día, los 7 días de la semana."
                },
                question3: {
                    title: "¿Cuántos visitantes están permitidos?",
                    answer: "Permitimos hasta 2 visitantes por paciente durante los horarios de visita regulares. Para pacientes en cuidados intensivos o áreas especiales, las visitas pueden estar limitadas a 1 persona por razones de seguridad y comodidad del paciente."
                }
            }
        },

        // Formulario de citas
        appointmentForm: {
            title: 'Solicitar',
            titleSpan: 'Cita',
            title: "Solicitar",
            titleSpan: "Cita",
            fields: {
                name: "Nombre",
                email: "Correo Electrónico",
                phone: "Teléfono",
                date: "Fecha",
                message: "Su Mensaje",
                departments: {
                    label: "Departamentos",
                    diagnostic: "Diagnóstico",
                    psychological: "Psicológico"
                },
                doctor: {
                    label: "Doctor",
                    diagnostic: "Diagnóstico",
                    psychological: "Psicológico"
                }
            },
            submit: "enviar ahora",
            success: "¡Cita agendada exitosamente!",
            error: "Error al agendar la cita. Intenta nuevamente."
        },
        
        // Footer
        footer: {
            about: {
                description: "Somos un centro médico profesional comprometido con brindar la mejor atención médica a nuestros pacientes con tecnología de vanguardia."
            },
            contact: {
                address: "Modamba, NY 80021, Estados Unidos",
                email: "support@medic.com",
                phone: "(88017) +123 4567"
            },
            services: {
                title: "Servicios",
                orthopedic: "Responsabilidades Ortopédicas",
                dental: "Clínica Dental",
                dormamu: "Clínica Dormamu",
                psychological: "Clínica Psicológica",
                gynaecological: "Clínica Ginecológica"
            },
            recentPosts: {
                title: "Publicaciones Recientes",
                post1: {
                    title: "Una lección adip isicing",
                    description: "Información importante sobre tratamientos médicos y cuidados de la salud para nuestros pacientes."
                },
                post2: {
                    title: "Cómo hacer un evento",
                    description: "Consejos y recomendaciones para organizar eventos de salud y bienestar en nuestra comunidad."
                }
            },
            bottomLinks: {
                home: "Inicio",
                about: "Nosotros",
                contact: "Contacto"
            },
            copyright: "© Copyright 2021. Diseñado y Desarrollado por Themefisher"
        },

        // WhatsApp Business
        whatsapp: {
            text: "¿Necesitas ayuda?",
            message: "Hola, me gustaría obtener más información sobre sus servicios médicos."
        },

        // SEO Meta Tags
        meta: {
            title: "Centro Médico Profesional - Atención Médica Integral | Especialistas Certificados",
            description: "Centro médico profesional con servicios de salud integral. Especialistas certificados, tecnología moderna y atención personalizada. Consulta médica, diagnóstico y tratamiento.",
            keywords: "centro médico, doctor, consulta médica, especialistas, salud, medicina, hospital, clínica, atención médica, servicios médicos, diagnóstico, tratamiento"
        },

        // PWA System
        pwa: {
            install: {
                title: "Instalar App",
                subtitle: "Acceso rápido desde tu dispositivo",
                button: "Instalar",
                success: "¡App instalada correctamente!",
                error: "Error al instalar la app"
            },
            offline: {
                title: "Sin Conexión",
                message: "Modo offline activado",
                reconnected: "Conexión restaurada"
            },
            update: {
                available: "Nueva versión disponible. Actualiza para obtener las mejoras.",
                button: "Actualizar"
            }
        },

        // Accessibility System
        accessibility: {
            skipToMain: "Saltar al contenido principal",
            skipToNav: "Saltar a navegación",
            panel: {
                title: "Opciones de Accesibilidad",
                close: "Cerrar panel"
            },
            highContrast: "Alto Contraste",
            fontSize: "Tamaño de Fuente",
            reset: "Restablecer",
            announcements: {
                highContrastOn: "Alto contraste activado",
                highContrastOff: "Alto contraste desactivado",
                fontSizeChanged: "Tamaño de fuente cambiado a",
                settingsReset: "Configuración de accesibilidad restablecida",
                pageChanged: "Navegando a",
                formError: "Error en formulario",
                success: "Operación exitosa"
            }
        }
    },
    
    en: {
        // Meta information
        meta: {
            title: "Professional Medical Center - Comprehensive Healthcare",
            description: "Professional medical center with comprehensive health services. Certified specialists, modern technology and personalized care for the whole family."
        },
        
        // Main navigation
        navigation: {
            home: "Home",
            about: "About",
            services: "Services",
            gallery: "Gallery",
            team: "Team",
            appointment: "Appointment",
            contact: "Contact"
        },

        // Header
        header: {
            email: 'Email',
            emailAddress: 'contact@medicalcenter.com',
            phone: 'Phone',
            phoneNumber: '+ (52) 55 1234-5678',
            appointmentBtn: 'Book Appointment'
        },

        // About Page
        about: {
            breadcrumb: 'About Us',
            title: 'About Us',
            section: {
                title: 'Personal care for your healthy living',
                description: 'We are a professional medical center committed to providing the best medical care to our patients. We have certified specialists and cutting-edge technology to guarantee the best care for your health.'
            },
            stats: {
                doctors: 'Expert Doctors',
                experience: 'Years Experience'
            },
            team: {
                title: 'Meet Our Specialist',
                description: 'Our team of specialists is committed to providing the best medical care.',
                doctor1: { specialty: 'Heart Specialist' },
                doctor2: { specialty: 'Medicine Specialist' },
                doctor3: { specialty: 'Gynecologist' },
                doctor4: { specialty: 'Pediatrician' }
            }
        },

        // Footer
        footer: {
            about: {
                description: 'We are a professional medical center committed to providing the best medical care to our patients with cutting-edge technology.'
            },
            contact: {
                address: 'Modamba, NY 80021, United States',
                email: 'support@medic.com',
                phone: '(88017) +123 4567'
            },

        },

        // About Page
        aboutPage: {
            hero: {
                title: 'About Us',
                breadcrumb: {
                    home: 'Home',
                    current: 'About'
                }
            },
            story: {
                title: 'Our Story',
                tagline: 'Caring for your health since 1995',
                description: 'We are a professional medical center with more than 25 years of experience providing quality medical care. Our commitment is to offer comprehensive health services with cutting-edge technology and a highly qualified human team.',
                mission: 'Our Mission',
                missionText: 'To provide excellent medical care, patient-centered, with advanced technology and a human team committed to the health and well-being of our community.',
                vision: 'Our Vision',
                visionText: 'To be the leading medical center in the region, recognized for the quality of our services, innovation in treatments and commitment to the comprehensive health of our patients.'
            },
            video: {
                subtitle: 'About Our Hospital',
                title: 'Discover Our Facilities'
            },
            gallery: {
                title: 'Our',
                titleSpan: 'Gallery',
                description: 'Discover our modern facilities and cutting-edge technology'
            },
            facilities: {
                facility1: {
                    title: 'Modern Offices',
                    description: 'Comfortable spaces equipped with the latest medical technology'
                },
                facility2: {
                    title: 'Clinical Laboratory',
                    description: 'Accurate analysis and fast results for accurate diagnosis'
                },
                facility3: {
                    title: 'Emergency Room',
                    description: 'Immediate medical attention 24 hours a day'
                },
                facility4: {
                    title: 'Equipped Operating Rooms',
                    description: 'State-of-the-art technology for safe surgical procedures'
                },
                facility5: {
                    title: 'Rehabilitation Area',
                    description: 'Specialized therapies for complete recovery'
                },
                facility6: {
                    title: 'Internal Pharmacy',
                    description: 'Medications available for patient convenience'
                }
            },
            faq: {
                title: 'Frequently Asked Questions',
                question1: 'What are the office hours?',
                answer1: 'We serve Monday through Friday from 8:00 AM to 8:00 PM, and Saturdays from 8:00 AM to 2:00 PM.',
                question2: 'Do you accept medical insurance?',
                answer2: 'Yes, we work with the main medical insurances in the country. Check with your insurer.',
                question3: 'How can I schedule an appointment?',
                answer3: 'You can schedule your appointment by calling, WhatsApp or through our online form.'
            }
        },

        // Appointment Form
        appointmentForm: {
            fields: {
                departments: {
                    cardiology: 'Cardiology',
                    dermatology: 'Dermatology',
                    neurology: 'Neurology',
                    pediatrics: 'Pediatrics',
                    gynecology: 'Gynecology',
                    traumatology: 'Traumatology'
                },
                time: {
                    label: 'Preferred Time',
                    morning1: '8:00 AM',
                    morning2: '9:00 AM',
                    morning3: '10:00 AM',
                    morning4: '11:00 AM',
                    afternoon1: '2:00 PM',
                    afternoon2: '3:00 PM',
                    afternoon3: '4:00 PM',
                    afternoon4: '5:00 PM'
                }
            }
        },

        // Service Page
        servicePage: {
            hero: {
                title: 'Services',
                breadcrumb: {
                    home: 'Home /',
                    current: 'Services'
                }
            },
            overview: {
                title: 'Clinical And Medical Education',
                description: 'We offer comprehensive medical services with cutting-edge technology and highly trained professionals. Our commitment is to provide quality care focused on patient well-being.',
                feature1: 'Specialized and personalized medical care',
                feature2: 'Latest generation medical technology',
                feature3: 'Certified and experienced professionals',
                feature4: 'Comprehensive health and wellness services',
                appointmentBtn: 'Book Appointment'
            }
        },

        // Gallery Page
        galleryPage: {
            hero: {
                title: 'Gallery',
                breadcrumb: {
                    home: 'Home /',
                    current: 'Gallery'
                }
            },
            media: {
                title: 'Collected Media',
                titleSpan: 'of Our Hospital',
                description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy...'
            },
            shots: {
                title: 'Collected Shots',
                titleSpan: 'of Our Hospital',
                description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy...'
            },
            facilities: {
                facility1: {
                    title: 'Facility 01',
                    description: 'Modern consultation rooms equipped with cutting-edge technology to provide the best medical care.'
                },
                facility2: {
                    title: 'Facility 02',
                    description: 'Clinical laboratory with state-of-the-art equipment for accurate and reliable analysis.'
                },
                facility3: {
                    title: 'Facility 03',
                    description: 'Emergency room prepared to handle any medical emergency 24 hours a day.'
                },
                facility4: {
                    title: 'Facility 04',
                    description: 'Fully equipped operating rooms to perform highly complex surgical procedures.'
                },
                facility5: {
                    title: 'Facility 05',
                    description: 'Rehabilitation area with specialized therapies for comprehensive patient recovery.'
                },
                facility6: {
                    title: 'Facility 06',
                    description: 'Internal pharmacy with medications available for greater convenience and access for our patients.'
                }
            }
        },

        // Team Page
        teamPage: {
            hero: {
                title: 'Team',
                breadcrumb: {
                    home: 'Home /',
                    current: 'Team'
                }
            },
            section: {
                title: 'Great',
                titleSpan: 'Team',
                description: 'Meet our team of highly qualified medical specialists, committed to providing the best medical care with cutting-edge technology and a human approach.'
            },
            tabs: {
                cardiology: 'Cardiology',
                pediatrics: 'Pediatrics',
                traumatology: 'Traumatology',
                specialties: 'Other Specialties'
            },
            viewProfile: 'View Profile',
            modal: {
                specialty: 'Specialty',
                education: 'Education',
                experience: 'Professional Experience',
                achievements: 'Achievements and Certifications',
                achievement1: 'Medical specialty certification',
                achievement2: 'Member of professional medical associations',
                achievement3: 'Participation in international medical conferences',
                achievement4: 'Continuous training in new techniques',
                approach: 'Care Approach',
                approachText: 'Our commitment is to provide personalized medical care, using best practices and advanced technology to ensure the wellbeing of our patients.',
                availability: 'Availability',
                schedule: 'Monday to Friday: 8:00 AM - 6:00 PM',
                appointments: 'Appointments available by prior scheduling',
                close: 'Close',
                bookAppointment: 'Book Appointment'
            }
        },

        // Gallery Page
        galleryPage: {
            hero: {
                title: 'Gallery',
                breadcrumb: {
                    home: 'Home /',
                    current: 'Gallery'
                }
            },
            main: {
                title: 'Medical',
                titleSpan: 'Gallery',
                description: 'Explore our state-of-the-art medical facilities, specialized equipment and the professional environment where we provide quality medical care.'
            },
            filters: {
                all: 'All',
                cardiology: 'Cardiology',
                pediatrics: 'Pediatrics',
                traumatology: 'Traumatology',
                laboratory: 'Laboratory',
                facilities: 'Facilities'
            },
            mediaFilters: {
                all: 'All',
                images: 'Images',
                videos: 'Videos'
            },

            loadMore: 'Load More'
        },

        // Service Page Extended - English
        servicePageExtended: {
            featured: {
                title: 'Featured Services',
                subtitle: 'Our most important services available to you 24 hours a day',
                emergency: {
                    title: '24h Emergency',
                    description: 'Emergency medical care available 24 hours a day, every day of the year.',
                    feature1: 'Immediate attention',
                    feature2: 'Specialized team',
                    feature3: 'Ambulance available',
                    button: 'Call Now'
                },
                service24: {
                    title: '24 Hour Service',
                    description: 'Our medical team is available to serve you at any time of the day.',
                    feature1: 'Medical staff available',
                    feature2: 'Emergency consultations',
                    feature3: '24h laboratory',
                    button: 'Book Appointment'
                },
                hospitalization: {
                    title: 'Hospitalization',
                    description: 'Comfortable and fully equipped rooms for a quality hospital stay.',
                    feature1: 'Private rooms',
                    feature2: 'Continuous monitoring',
                    feature3: 'Modern equipment',
                    button: 'More Information'
                }
            },
            departments: {
                title: 'Medical Departments',
                subtitle: 'Highly qualified specialists in each medical area to provide you with the best care',
                cardiology: {
                    title: 'Cardiology',
                    description: 'Specialists in the diagnosis and treatment of heart and cardiovascular system diseases.'
                },
                neurology: {
                    title: 'Neurology',
                    description: 'Diagnosis and treatment of central and peripheral nervous system disorders.'
                },
                pediatrics: {
                    title: 'Pediatrics',
                    description: 'Specialized medical care for babies, children and adolescents up to 18 years old.'
                },
                traumatology: {
                    title: 'Traumatology',
                    description: 'Specialists in musculoskeletal system injuries and orthopedic surgery.'
                }
            },
            additional: {
                title: 'Additional Services',
                subtitle: 'We complement our medical care with specialized services for your comprehensive wellbeing',
                laboratory: {
                    title: 'Clinical Laboratory',
                    description: 'Complete clinical analysis with fast and reliable results for accurate diagnoses.',
                    feature1: 'Complete blood tests',
                    feature2: 'Urine and stool studies',
                    feature3: 'Results in 24 hours'
                },
                imaging: {
                    title: 'Medical Imaging',
                    description: 'Imaging studies with state-of-the-art digital equipment for accurate diagnoses.',
                    feature1: 'Digital X-rays',
                    feature2: '3D and 4D ultrasounds',
                    feature3: 'Lower radiation exposure'
                },
                safety: {
                    title: 'Safety Protocols',
                    description: 'Strict hygiene and disinfection protocols to maintain a safe environment.',
                    feature1: 'Continuous disinfection',
                    feature2: 'Sterilized equipment',
                    feature3: 'Trained staff'
                }
            },
            carousel: {
                title: 'All Our',
                titleSpan: 'Services',
                subtitle: 'Explore our wide range of specialized medical services. Click on any service to learn more details.',
                cardiology: {
                    title: 'Cardiology',
                    subtitle: 'Certified Specialists',
                    description: 'Diagnosis and treatment of heart diseases with advanced technology.'
                },
                neurology: {
                    title: 'Neurology',
                    subtitle: 'Specialized Care',
                    description: 'Treatment of nervous system disorders with state-of-the-art equipment.'
                },
                pediatrics: {
                    title: 'Pediatrics',
                    subtitle: 'Child Care',
                    description: 'Specialized medical care for babies, children and adolescents.'
                },
                traumatology: {
                    title: 'Traumatology',
                    subtitle: 'Orthopedic Surgery',
                    description: 'Specialists in musculoskeletal system injuries.'
                },
                gynecology: {
                    title: 'Gynecology',
                    subtitle: 'Women\'s Health',
                    description: 'Comprehensive women\'s health care with a preventive approach.'
                },
                dermatology: {
                    title: 'Dermatology',
                    subtitle: 'Skin Care',
                    description: 'Specialized treatment of skin diseases.'
                },
                psychology: {
                    title: 'Psychology',
                    subtitle: 'Mental Wellbeing',
                    description: 'Professional psychological care for mental and emotional wellbeing.'
                },
                laboratory: {
                    title: 'Laboratory',
                    subtitle: 'Accurate Diagnosis',
                    description: 'Complete clinical analysis with fast and reliable results.'
                }
            }
        },

        // Service Modals - English
        modals: {
            close: 'Close',
            appointment: 'Book Appointment',
            cardiology: {
                title: 'Cardiology',
                subtitle: 'Cardiovascular Health Specialists',
                description: 'Our cardiology department has certified specialists and state-of-the-art equipment for the diagnosis and treatment of heart and cardiovascular system diseases.',
                feature1: 'Electrocardiograms and echocardiograms',
                feature2: 'Cardiac catheterization',
                feature3: 'Cardiovascular surgery',
                feature4: 'Cardiac rehabilitation'
            },
            neurology: {
                title: 'Neurology',
                subtitle: 'Nervous System Specialists',
                description: 'Diagnosis and treatment of central and peripheral nervous system disorders with advanced technology and a comprehensive approach.',
                feature1: 'Electroencephalograms',
                feature2: 'Brain MRI',
                feature3: 'Treatment of epilepsy and migraines',
                feature4: 'Neurorehabilitation'
            },
            pediatrics: {
                title: 'Pediatrics',
                subtitle: 'Specialized Care for Children',
                description: 'Specialized medical care for babies, children and adolescents up to 18 years old with a warm and professional approach.',
                feature1: 'General pediatric consultations',
                feature2: 'Complete vaccination',
                feature3: 'Growth and development control',
                feature4: '24h pediatric emergencies'
            },
            traumatology: {
                title: 'Traumatology',
                subtitle: 'Musculoskeletal Injury Specialists',
                description: 'Specialists in musculoskeletal system injuries and orthopedic surgery with modern techniques and comprehensive rehabilitation.',
                feature1: 'Orthopedic surgeries',
                feature2: 'Physical rehabilitation',
                feature3: 'Fracture treatment',
                feature4: 'Sports medicine'
            },
            gynecology: {
                title: 'Gynecology',
                subtitle: 'Comprehensive Women\'s Health Care',
                description: 'Comprehensive women\'s health care with a focus on prevention and specialized treatment.',
                feature1: 'Gynecological consultations',
                feature2: 'Prenatal care',
                feature3: 'Gynecological surgery',
                feature4: 'Family planning'
            },
            dermatology: {
                title: 'Dermatology',
                subtitle: 'Skin Care Specialists',
                description: 'Specialized treatment of skin, hair and nail diseases with advanced technology.',
                feature1: 'Clinical and aesthetic dermatology',
                feature2: 'Dermatological surgery',
                feature3: 'Laser treatments',
                feature4: 'Pediatric dermatology'
            },
            psychology: {
                title: 'Psychology',
                subtitle: 'Mental and Emotional Wellbeing',
                description: 'Professional psychological care for the mental and emotional wellbeing of our patients.',
                feature1: 'Individual and family therapy',
                feature2: 'Clinical psychology',
                feature3: 'Cognitive-behavioral therapy',
                feature4: 'Child psychology'
            },
            laboratory: {
                title: 'Clinical Laboratory',
                subtitle: 'Accurate and Reliable Diagnosis',
                description: 'Complete diagnostic services with clinical laboratory and specialized studies for early detection.',
                feature1: 'Complete clinical analysis',
                feature2: 'X-rays and ultrasounds',
                feature3: 'Specialized studies',
                feature4: 'Online results'
            }
        },

        // Appointment Page
        appointmentPage: {
            hero: {
                title: 'Appointment',
                breadcrumb: {
                    home: 'Home /',
                    current: 'Appointment'
                }
            },
            form: {
                title: 'Request',
                titleSpan: 'Appointment',
                fields: {
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone',
                    date: 'Date',
                    message: 'Your Message',
                    departments: 'Departments',
                    doctor: 'Doctor',
                    doctorPreference: 'Assign automatically (recommended)'
                },
                doctorNote: 'Doctor will be assigned based on availability and specialization',
                options: {
                    diagnostic: 'Diagnostic',
                    psychological: 'Psychological'
                },
                submitButton: 'Submit Now'
            },
            doctors: {
                title: 'Our Expert',
                titleSpan: 'Doctors',
                description: 'We have a team of highly qualified specialist doctors with extensive experience to provide you with the best medical care.'
            }
        },

        // Contact Page
        contactPage: {
            hero: {
                title: 'Contact',
                breadcrumb: {
                    home: 'Home /',
                    current: 'Contact'
                }
            },
            info: {
                location: {
                    title: 'Location',
                    address: 'Av. Reforma 123, Col. Centro<br>Mexico City, 06000 Mexico'
                },
                phone: {
                    title: 'Phone',
                    numbers: '(+52) 55 1234-5678<br>(+52) 55 1234-5679'
                },
                email: {
                    title: 'Email',
                    addresses: 'contact@medicalcenter.com<br>info@medicalcenter.com'
                }
            },
            form: {
                fields: {
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone',
                    message: 'Your message'
                },
                submitButton: 'Send Message'
            }
        },

        // WhatsApp
        whatsapp: {
            button: {
                text: 'Need help?'
            }
        },
        
        // Top header
        header: {
            openingHours: "Opening Hours: Monday to Friday - 8am to 6pm",
            email: "Email",
            emailAddress: "info@medicalcenter.com",
            phone: "Phone",
            phoneNumber: "+ (1) 555 123-4567", 
            appointment: "Appointment",
            appointmentHours: "10:00AM - 7:00PM",
            appointmentBtn: "Book Appointment"
        },
        
        // Hero/Main slider
        hero: {
            slide1: {
                title: "Our Best Surgeons",
                subtitle: "We have certified specialists and cutting-edge technology to provide the best medical care to our patients.",
                button: "Learn More"
            },
            slide2: {
                title: "We Care for Your Health",
                subtitle: "Professional medical center with over 15 years of experience in comprehensive medical care.",
                button: "About Us"
            },
            slide3: {
                title: "Best Medical Services",
                subtitle: "We offer a wide range of specialized medical services with the highest quality standards.",
                button: "View Services"
            }
        },

        // CTA Section (Call to Action)
        cta: {
            emergency: {
                title: "Emergency Cases",
                phone: "+ (1) 555 123-4567",
                description: "Emergency medical care available 24 hours a day."
            },
            service24: {
                title: "24 Hour Service",
                description: "Our medical team is available to serve you at any time of the day.",
                button: "Read More"
            },
            workingHours: {
                title: "Working Hours",
                schedule: {
                    weekdays: "Mon - Fri",
                    hours: "8:00 - 17:00"
                }
            }
        },

        // Features Section (Characteristics)
        features: {
            title: "Best Features",
            titleSpan: "of Our Hospital",
            subtitle: "We have the best facilities and specialized medical services to provide quality care to our patients.",
            items: {
                orthopedics: {
                    title: "Orthopedics",
                    description: "Specialists in treatment of injuries and diseases of the musculoskeletal system with advanced technology."
                },
                diagnostic: {
                    title: "Diagnostic",
                    description: "State-of-the-art diagnostic equipment to detect and treat diseases early and accurately."
                },
                psychology: {
                    title: "Psychology",
                    description: "Professional psychological care for the mental and emotional wellbeing of our patients."
                },
                generalTreatment: {
                    title: "General Treatment",
                    description: "Comprehensive medical care for general health care with a preventive and curative approach."
                }
            }
        },

        // Service Tabs Section (Service Tabs)
        serviceTabs: {
            tabs: {
                dormitory: "Dormitory",
                orthopedic: "Orthopedic",
                sonogram: "Sonogram",
                xray: "X-Ray",
                diagnostic: "Diagnostic"
            },
            content: {
                dormitory: {
                    title: "Dormitory",
                    description1: "We have comfortable and fully equipped rooms to provide the best hospital care to our patients during their stay.",
                    description2: "Our medical and nursing staff is available 24 hours a day to ensure the care and wellbeing of each hospitalized patient.",
                    features: [
                        "Private and shared rooms available",
                        "Continuous medical monitoring 24 hours",
                        "State-of-the-art medical equipment"
                    ],
                    button: "Read More"
                },
                orthopedic: {
                    title: "Orthopedic",
                    description1: "Specialists in the treatment of injuries and diseases of the musculoskeletal system with advanced technology and modern techniques.",
                    description2: "We offer orthopedic surgeries, rehabilitation and specialized treatments for complete and effective recovery.",
                    features: [
                        "Specialized orthopedic surgeries",
                        "Personalized physical rehabilitation",
                        "Treatment of fractures and sports injuries"
                    ],
                    button: "Read More"
                },
                sonogram: {
                    title: "Sonogram",
                    description1: "Ultrasound studies with high-resolution equipment for accurate diagnoses and detailed medical follow-up.",
                    description2: "We perform obstetric, abdominal, pelvic and other organ ultrasounds with the highest image quality.",
                    features: [
                        "3D and 4D ultrasounds available",
                        "Specialized obstetric studies",
                        "High precision imaging diagnosis"
                    ],
                    button: "Read More"
                },
                xray: {
                    title: "X-Ray",
                    description1: "Radiological studies with state-of-the-art digital equipment for fast and accurate diagnoses.",
                    description2: "We have digital technology that reduces radiation exposure and provides high quality images.",
                    features: [
                        "Advanced digital radiology",
                        "Lower radiation exposure",
                        "Immediate and accurate results"
                    ],
                    button: "Read More"
                },
                diagnostic: {
                    title: "Diagnostic",
                    description1: "Comprehensive medical diagnostic services with clinical laboratory and specialized studies for early detection.",
                    description2: "Complete clinical analysis, blood, urine and other body fluid studies with reliable results.",
                    features: [
                        "Complete clinical laboratory",
                        "Specialized analysis available",
                        "Fast and reliable results"
                    ],
                    button: "Read More"
                }
            }
        },

        // About section
        about: {
            title: "About Us",
            subtitle: "We are a professional medical center committed to excellence in healthcare",
            description: "With over 15 years of experience, our medical center has established itself as a leader in comprehensive medical care. We have certified specialists, cutting-edge technology and a patient-centered approach.",
            features: {
                feature1: {
                    title: "Certified Specialists",
                    description: "Doctors with international certifications and extensive experience."
                },
                feature2: {
                    title: "Advanced Technology",
                    description: "State-of-the-art medical equipment for accurate diagnoses."
                },
                feature3: {
                    title: "24/7 Care",
                    description: "Emergency service available 24 hours a day."
                }
            },
            button: "Learn More"
        },
        
        // Services
        services: {
            title: "Our Services",
            subtitle: "We offer a wide range of specialized medical services",
            items: {
                cardiology: {
                    title: "Cardiology",
                    description: "Diagnosis and treatment of heart diseases with advanced technology."
                },
                neurology: {
                    title: "Neurology",
                    description: "Specialized care for nervous system disorders."
                },
                pediatrics: {
                    title: "Pediatrics", 
                    description: "Comprehensive medical care for babies, children and adolescents."
                },
                orthopedics: {
                    title: "Orthopedics",
                    description: "Treatment of injuries and diseases of the musculoskeletal system."
                },
                gynecology: {
                    title: "Gynecology",
                    description: "Specialized medical care for women's health."
                },
                dermatology: {
                    title: "Dermatology",
                    description: "Diagnosis and treatment of skin diseases."
                }
            }
        },
        
        // Service gallery
        serviceGallery: {
            title: "Provided",
            titleSpan: "Services",
            subtitle: "We offer a wide range of specialized medical services with cutting-edge technology and highly qualified staff to provide the best care to our patients.",
            items: {
                dormitory: {
                    title: "Dormitory",
                    subtitle: "Better Service At Low Cost",
                    description: "Comfortable and fully equipped rooms for quality hospital stay."
                },
                germsProtection: {
                    title: "Germs Protection",
                    subtitle: "Better Service At Low Cost",
                    description: "Strict hygiene and disinfection protocols to maintain a safe environment."
                },
                psychology: {
                    title: "Psychology",
                    subtitle: "Better Service At Low Cost",
                    description: "Professional psychological care for mental and emotional wellbeing."
                }
            }
        },
        
        // Medical team
        team: {
            title: "Our Expert",
            titleSpan: "Doctors",
            subtitle: "We have a team of highly qualified specialist doctors committed to providing the best medical care to our patients.",
            members: {
                doctor1: {
                    name: "Dr. Robert Barrethion",
                    description: "Specialist in internal medicine with over 15 years of experience in diagnosis and treatment of complex diseases."
                },
                doctor2: {
                    name: "Dr. Marry Lou",
                    description: "Specialist in family and preventive medicine, dedicated to comprehensive health care for the whole family."
                },
                doctor3: {
                    name: "Dr. Sansa Stark",
                    description: "Specialist in pediatrics and child care, committed to the health and wellbeing of the little ones."
                }
            }
        },
        
        // Testimonials
        testimonials: {
            title: "What Our",
            titleSpan: "Patients Says",
            items: {
                adamRose: {
                    name: "Adam Rose",
                    text: "Excellent medical and professional care. The medical team provided me with the best care during my treatment. Highly recommended for anyone seeking quality medical attention."
                },
                davidWarner: {
                    name: "David Warner",
                    text: "The best medical center in the city. The facilities are modern and the staff is very professional. I feel completely satisfied with the service received."
                },
                amyAdams: {
                    name: "Amy Adams",
                    text: "Thanks to the medical team for their dedication and exceptional care. The treatment was successful and I feel much better. I will definitely return for future consultations."
                }
            }
        },

        // FAQ Section (Frequently Asked Questions)
        faq: {
            title: "FAQ",
            questions: {
                question1: {
                    title: "Why Should I choose Medical Health",
                    answer: "Our medical center has over 15 years of experience providing quality medical care. We have certified specialists, cutting-edge technology and a patient-centered approach that distinguishes us as leaders in comprehensive medical care."
                },
                question2: {
                    title: "What are the Centre's visiting hours?",
                    answer: "Our visiting hours are Monday to Friday from 8:00 AM to 6:00 PM, and weekends from 9:00 AM to 4:00 PM. For emergencies, we have 24-hour service, 7 days a week."
                },
                question3: {
                    title: "How many visitors are allowed?",
                    answer: "We allow up to 2 visitors per patient during regular visiting hours. For patients in intensive care or special areas, visits may be limited to 1 person for safety and patient comfort reasons."
                }
            }
        },

        // Appointment form
        appointmentForm: {
            title: "Request",
            titleSpan: "Appointment",
            fields: {
                name: "Name",
                email: "Email",
                phone: "Phone",
                date: "Date",
                message: "Your Message",
                departments: {
                    label: "Departments",
                    diagnostic: "Diagnostic",
                    psychological: "Psychological"
                },
                doctor: {
                    label: "Doctor",
                    diagnostic: "Diagnostic",
                    psychological: "Psychological"
                }
            },
            submit: "submit now",
            success: "Appointment booked successfully!",
            error: "Error booking appointment. Please try again."
        },
        
        // Footer
        footer: {
            about: {
                description: "We are a professional medical center committed to providing the best medical care to our patients with cutting-edge technology."
            },
            contact: {
                address: "Av. Reforma 123, Ciudad de México, CDMX 06600",
                email: "contacto@centromedico.com",
                phone: "+ (52) 55 1234-5678"
            },
            services: {
                title: "Services",
                orthopedic: "Orthopadic Liabilities",
                dental: "Dental Clinic",
                dormamu: "Dormamu Clinic",
                psychological: "Psycological Clinic",
                gynaecological: "Gynaecological Clinic"
            },
            recentPosts: {
                title: "Recent Posts",
                post1: {
                    title: "A lesson adip isicing",
                    description: "Important information about medical treatments and health care for our patients."
                },
                post2: {
                    title: "How to make an event",
                    description: "Tips and recommendations for organizing health and wellness events in our community."
                }
            },
            bottomLinks: {
                home: "Home",
                about: "About",
                contact: "Contact"
            },
            copyright: "© Copyright 2021. Designed & Developed by Themefisher"
        },

        // WhatsApp Business
        whatsapp: {
            text: "Need help?",
            message: "Hello, I would like to get more information about your medical services."
        },

        // SEO Meta Tags
        meta: {
            title: "Professional Medical Center - Comprehensive Healthcare | Certified Specialists",
            description: "Professional medical center with comprehensive health services. Certified specialists, modern technology and personalized care. Medical consultation, diagnosis and treatment.",
            keywords: "medical center, doctor, medical consultation, specialists, health, medicine, hospital, clinic, medical care, medical services, diagnosis, treatment"
        },

        // PWA System
        pwa: {
            install: {
                title: "Install App",
                subtitle: "Quick access from your device",
                button: "Install",
                success: "App installed successfully!",
                error: "Error installing the app"
            },
            offline: {
                title: "Offline",
                message: "Offline mode activated",
                reconnected: "Connection restored"
            },
            update: {
                available: "A new version is available. Refresh to update.",
                button: "Update"
            }
        },

        // Accessibility System
        accessibility: {
            skipToMain: "Skip to main content",
            skipToNav: "Skip to navigation",
            panel: {
                title: "Accessibility Options",
                close: "Close panel"
            },
            highContrast: "High Contrast",
            fontSize: "Font Size",
            reset: "Reset",
            announcements: {
                highContrastOn: "High contrast activated",
                highContrastOff: "High contrast deactivated",
                fontSizeChanged: "Font size changed to",
                settingsReset: "Accessibility settings reset",
                pageChanged: "Navigating to",
                formError: "Form error",
                success: "Operation successful"
            }
        },

        // About Page
        aboutPage: {
            meta: {
                title: 'About Us - Professional Medical Center',
                description: 'Learn about our medical center, our team of professionals and our commitment to the health of our patients.'
            },
            hero: {
                title: 'About Us',
                subtitle: 'Learn about our commitment to your health',
                breadcrumb: {
                    home: 'Home',
                    current: 'About Us'
                }
            },
            video: {
                subtitle: 'About Our Hospital',
                title: 'The World Class Hospitality'
            },
            gallery: {
                title: 'Collected Shots',
                titleSpan: 'of Our Hospital',
                description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy...'
            },
            story: {
                title: 'Our Story',
                tagline: 'Excellence in healthcare with over 20 years of experience serving our community with dedication and professionalism.',
                description: 'We are a leading medical center committed to providing comprehensive healthcare services with the highest quality standards. Our team of certified specialists uses cutting-edge technology to ensure the best possible care for our patients.',
                mission: 'Mission',
                missionText: 'To provide accessible, high-quality healthcare services that improve the quality of life of our patients and their families.',
                vision: 'Vision',
                visionText: 'To be the leading medical center in the region, recognized for our excellence in patient care and medical innovation.'
            },
            facilities: {
                facility1: {
                    title: 'Emergency Department',
                    description: 'State-of-the-art emergency care available 24/7 with specialized medical equipment.'
                },
                facility2: {
                    title: 'Surgical Suites',
                    description: 'Modern operating rooms equipped with the latest surgical technology and safety systems.'
                },
                facility3: {
                    title: 'Diagnostic Center',
                    description: 'Complete diagnostic services including MRI, CT scan, X-ray, and laboratory services.'
                },
                facility4: {
                    title: 'Intensive Care Unit',
                    description: 'Advanced critical care unit with specialized monitoring and life support systems.'
                },
                facility5: {
                    title: 'Rehabilitation Center',
                    description: 'Comprehensive rehabilitation services for physical therapy and recovery programs.'
                },
                facility6: {
                    title: 'Outpatient Clinic',
                    description: 'Convenient outpatient services for routine check-ups and specialized consultations.'
                }
            },
            faq: {
                title: 'Frequently Asked Questions',
                question1: 'Why Should I choose Medical Health',
                question2: 'What are the Centre\'s visiting hours?',
                question3: 'How many visitors are allowed?',
                answer1: 'We have over 20 years of experience, cutting-edge technology and a team of highly qualified specialists committed to providing the best medical care. Our patient-centered approach ensures personalized treatment plans.',
                answer2: 'Our visiting hours are Monday to Friday from 8:00 AM to 8:00 PM, and Saturdays from 8:00 AM to 2:00 PM. Sundays we only attend emergencies.',
                answer3: 'For the safety and comfort of our patients, we allow a maximum of 2 visitors per patient during established hours.'
            }
        }
    }
};

console.log('🌐 Translations loaded - ES/EN');
