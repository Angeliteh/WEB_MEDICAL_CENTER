/**
 * MEDICAL INTEGRATION SYSTEM
 * Sistema de integración para poblar formularios y contenido dinámicamente
 * Versión: 1.0
 */

const MedicalIntegration = {
    
    // 🔧 POBLAR SELECT DE DEPARTAMENTOS
    populateDepartmentSelect: function(selectElement, language = 'es') {
        if (!selectElement || !window.MedicalData) return;
        
        // Limpiar opciones existentes
        selectElement.innerHTML = '';
        
        // Obtener opciones de servicios
        const options = window.MedicalData.manager.generateServiceOptions(language, true);
        
        // Crear elementos option
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            
            // Agregar data-translate si es necesario
            if (option.value === '') {
                optionElement.setAttribute('data-translate', 'appointmentPage.form.fields.departments');
            }
            
            selectElement.appendChild(optionElement);
        });
        
        console.log(`✅ Department select populated with ${options.length} options`);
    },

    // 🔧 POBLAR SELECT DE DOCTORES
    populateDoctorSelect: function(selectElement, departmentId = null, language = 'es') {
        if (!selectElement || !window.MedicalData) return;
        
        // Limpiar opciones existentes
        selectElement.innerHTML = '';
        
        // Obtener opciones de doctores
        const options = window.MedicalData.manager.generateDoctorOptions(departmentId, language, true);
        
        // Crear elementos option
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            
            // Agregar data-translate si es necesario
            if (option.value === '') {
                optionElement.setAttribute('data-translate', 'appointmentPage.form.fields.doctor');
            }
            
            selectElement.appendChild(optionElement);
        });
        
        console.log(`✅ Doctor select populated with ${options.length} options`);
    },

    // 🔧 CONFIGURAR FILTRADO DINÁMICO DOCTOR POR DEPARTAMENTO
    setupDynamicDoctorFiltering: function(departmentSelectId, doctorSelectId, language = 'es') {
        const departmentSelect = document.getElementById(departmentSelectId);
        const doctorSelect = document.getElementById(doctorSelectId);
        
        if (!departmentSelect || !doctorSelect) {
            console.warn('⚠️ Department or Doctor select not found');
            return;
        }
        
        // Poblar departamentos inicialmente
        this.populateDepartmentSelect(departmentSelect, language);
        this.populateDoctorSelect(doctorSelect, null, language);
        
        // Configurar evento de cambio
        departmentSelect.addEventListener('change', (e) => {
            const selectedDepartment = e.target.value;
            console.log(`🔄 Department changed to: ${selectedDepartment}`);
            
            // Repoblar doctores basado en departamento seleccionado
            this.populateDoctorSelect(doctorSelect, selectedDepartment || null, language);
        });
        
        console.log('✅ Dynamic doctor filtering configured');
    },

    // 🔧 POBLAR SECCIÓN DE SERVICIOS (PARA INDEX.HTML)
    populateServicesSection: function(containerId, language = 'es') {
        if (!window.MedicalData) return;
        
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const services = window.MedicalData.manager.getAllServices(language);
        
        // Tomar solo los primeros 5 servicios para las pestañas
        const mainServices = services.slice(0, 5);
        
        // Generar pestañas
        let tabsHTML = '<ul class="nav nav-tabs justify-content-center" id="aboutTab" role="tablist">';
        
        mainServices.forEach((service, index) => {
            const isActive = index === 2; // Hacer activo el tercer elemento (índice 2)
            tabsHTML += `
                <li class="nav-item" role="presentation">
                    <a class="nav-link accessibility-enhanced ${isActive ? 'active' : ''}" 
                       id="${service.id}-tab" 
                       data-toggle="tab" 
                       href="#${service.id}" 
                       role="tab" 
                       aria-controls="${service.id}" 
                       aria-selected="${isActive}" 
                       tabindex="0">${service.name}</a>
                </li>
            `;
        });
        
        tabsHTML += '</ul>';
        
        // Generar contenido de pestañas
        let contentHTML = '<div class="tab-content accessibility-font-fix" id="aboutTab">';
        
        mainServices.forEach((service, index) => {
            const isActive = index === 2; // Hacer activo el tercer elemento
            contentHTML += `
                <div class="service-box tab-pane fade accessibility-font-fix ${isActive ? 'active show' : ''}" id="${service.id}">
                    <div class="row accessibility-font-fix">
                        <div class="col-lg-6 accessibility-font-fix">
                            <img loading="lazy" class="img-fluid" src="images/services/service-${index + 1}.jpg" alt="service-image">
                        </div>
                        <div class="col-lg-6 accessibility-font-fix">
                            <div class="contents accessibility-font-fix">
                                <div class="section-title accessibility-font-fix">
                                    <h3>${service.name}</h3>
                                </div>
                                <div class="text accessibility-font-fix">
                                    <p class="accessibility-font-fix">${service.description}</p>
                                </div>
                                <ul class="content-list">
            `;
            
            service.features.forEach(feature => {
                contentHTML += `
                    <li>
                        <i class="far fa-dot-circle"></i>
                        <span class="accessibility-font-fix">${feature}</span>
                    </li>
                `;
            });
            
            contentHTML += `
                                </ul>
                                <a href="service.html" class="btn btn-style-one accessibility-font-fix accessibility-enhanced" tabindex="0">Leer Más</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        contentHTML += '</div>';
        
        // Insertar en el contenedor
        container.innerHTML = tabsHTML + contentHTML;
        
        console.log(`✅ Services section populated with ${mainServices.length} services`);
    },

    // 🔧 POBLAR SECCIÓN DE DOCTORES (PARA INDEX.HTML)
    populateDoctorsSection: function(containerId, language = 'es') {
        if (!window.MedicalData) return;
        
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const doctors = window.MedicalData.manager.getAllDoctors(language);
        
        // Tomar solo los primeros 3 doctores
        const mainDoctors = doctors.slice(0, 3);
        
        let doctorsHTML = '';
        
        mainDoctors.forEach((doctor, index) => {
            doctorsHTML += `
                <div class="col-lg-4 col-md-6">
                    <div class="team-item">
                        <img loading="lazy" src="images/team/doctor-${index + 1}.jpg" alt="doctor" class="img-fluid">
                        <div class="contents text-center">
                            <h4>${doctor.name}</h4>
                            <p class="accessibility-font-fix">${doctor.experience}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = doctorsHTML;
        
        console.log(`✅ Doctors section populated with ${mainDoctors.length} doctors`);
    },

    // 🔧 INICIALIZAR INTEGRACIÓN AUTOMÁTICA
    autoInit: function() {
        // Esperar a que MedicalData esté disponible
        const checkMedicalData = () => {
            if (window.MedicalData) {
                this.initPageSpecificIntegrations();
            } else {
                setTimeout(checkMedicalData, 100);
            }
        };
        
        checkMedicalData();
    },

    // 🔧 INICIALIZAR INTEGRACIONES ESPECÍFICAS POR PÁGINA
    initPageSpecificIntegrations: function() {
        const currentPage = this.getCurrentPage();
        const currentLanguage = this.getCurrentLanguage();
        
        console.log(`🔧 Initializing integrations for page: ${currentPage}`);
        
        switch(currentPage) {
            case 'appointment':
                this.initAppointmentPage(currentLanguage);
                break;
            case 'index':
                this.initIndexPage(currentLanguage);
                break;
            case 'service':
                this.initServicePage(currentLanguage);
                break;
            case 'team':
                this.initTeamPage(currentLanguage);
                break;
        }
    },

    // 🔧 INICIALIZAR PÁGINA DE CITAS
    initAppointmentPage: function(language) {
        // Buscar selects de departamento y preferencia de doctor
        const departmentSelect = document.querySelector('select[name="subject"]');
        const doctorPreferenceSelect = document.getElementById('doctor-preference-select');

        if (departmentSelect) {
            // Poblar departamentos
            this.populateDepartmentSelect(departmentSelect, language);

            // Configurar filtrado dinámico de doctores
            if (doctorPreferenceSelect) {
                this.setupDoctorPreferenceFiltering(departmentSelect, doctorPreferenceSelect, language);
            }
        }

        // Poblar sección de doctores destacados
        this.populateAppointmentDoctorsSection(language);

        console.log('✅ Appointment page integration initialized');
    },

    // 🔧 CONFIGURAR FILTRADO DE PREFERENCIA DE DOCTOR
    setupDoctorPreferenceFiltering: function(departmentSelect, doctorSelect, language) {
        // Inicializar con opción por defecto
        this.populateDoctorPreferenceSelect(doctorSelect, null, language);

        // Configurar evento de cambio de departamento
        departmentSelect.addEventListener('change', (e) => {
            const selectedDepartment = e.target.value;
            console.log(`🔄 Department changed to: ${selectedDepartment}`);

            // Repoblar preferencias de doctor basado en departamento
            this.populateDoctorPreferenceSelect(doctorSelect, selectedDepartment || null, language);
        });

        console.log('✅ Doctor preference filtering configured');
    },

    // 🔧 POBLAR SELECT DE PREFERENCIA DE DOCTOR
    populateDoctorPreferenceSelect: function(selectElement, departmentId = null, language = 'es') {
        if (!selectElement || !window.MedicalData) return;

        // Limpiar opciones existentes
        selectElement.innerHTML = '';

        // Opción por defecto (recomendada)
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = language === 'es'
            ? 'Asignar automáticamente (recomendado)'
            : 'Assign automatically (recommended)';
        defaultOption.setAttribute('data-translate', 'appointmentPage.form.fields.doctorPreference');
        selectElement.appendChild(defaultOption);

        // Si hay departamento seleccionado, mostrar doctores de ese departamento
        if (departmentId) {
            const doctors = window.MedicalData.manager.getDoctorsByDepartment(departmentId, language);

            if (doctors.length > 0) {
                // Separador
                const separatorOption = document.createElement('option');
                separatorOption.disabled = true;
                separatorOption.textContent = language === 'es'
                    ? '--- Preferencia específica ---'
                    : '--- Specific preference ---';
                selectElement.appendChild(separatorOption);

                // Doctores del departamento
                doctors.forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor.id;
                    option.textContent = `${doctor.name} - ${doctor.specialty}`;
                    selectElement.appendChild(option);
                });
            }
        }

        console.log(`✅ Doctor preference select populated for department: ${departmentId || 'all'}`);
    },

    // 🔧 POBLAR SECCIÓN DE DOCTORES EN APPOINTMENT.HTML
    populateAppointmentDoctorsSection: function(language = 'es') {
        // Usar función común - mostrar especialidad con educación
        this.populateFeaturedDoctors('appointment-doctors', language, true);
    },

    // 🔧 INICIALIZAR PÁGINA PRINCIPAL
    initIndexPage: function(language) {
        // Poblar sección de servicios si existe
        const servicesContainer = document.querySelector('.service-tab-section .tabs');
        if (servicesContainer && servicesContainer.parentElement) {
            this.populateServicesSection(servicesContainer.parentElement.id || 'services-section', language);
        }

        // Poblar sección de doctores destacados
        this.populateIndexDoctorsSection(language);

        console.log('✅ Index page integration initialized');
    },

    // 🔧 POBLAR SECCIÓN DE DOCTORES EN INDEX.HTML
    populateIndexDoctorsSection: function(language = 'es') {
        // Usar función común - mostrar experiencia sin educación
        this.populateFeaturedDoctors('index-doctors', language, false);
    },

    // 🔧 FUNCIÓN COMÚN PARA POBLAR DOCTORES DESTACADOS
    populateFeaturedDoctors: function(containerId, language = 'es', includeEducation = false) {
        if (!window.MedicalData) return;

        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ Container ${containerId} not found`);
            return;
        }

        const doctors = window.MedicalData.manager.getAllDoctors(language);

        // Tomar solo los primeros 3 doctores principales
        const featuredDoctors = doctors.slice(0, 3);

        let doctorsHTML = '';

        featuredDoctors.forEach((doctor, index) => {
            // Usar las mismas imágenes para mantener consistencia visual
            let imagePath = 'images/team/doctor-2.jpg';
            if (index === 1) imagePath = 'images/team/doctor-lab-3.jpg';
            if (index === 2) imagePath = 'images/team/event-2.jpg';

            // Determinar qué información mostrar
            const description = includeEducation ? doctor.specialty : doctor.experience;
            const extraInfo = includeEducation ? `
                <div class="doctor-info mt-2">
                    <small class="text-muted">${doctor.education}</small>
                </div>
            ` : '';

            doctorsHTML += `
                <div class="col-lg-4 col-md-6">
                    <div class="team-member">
                        <img loading="lazy" src="${imagePath}" alt="doctor" class="img-fluid">
                        <div class="contents text-center">
                            <h4>${doctor.name}</h4>
                            <p>${description}</p>
                            ${extraInfo}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = doctorsHTML;

        console.log(`✅ ${containerId} populated with ${featuredDoctors.length} featured doctors`);
    },

    // 🔧 INICIALIZAR PÁGINA DE SERVICIOS
    initServicePage: function(language) {
        // Implementar población de servicios en service.html
        console.log('✅ Service page integration initialized');
    },

    // 🔧 INICIALIZAR PÁGINA DE EQUIPO
    initTeamPage: function(language) {
        console.log('🔧 Starting team page initialization...');
        console.log('🌐 Language:', language);
        console.log('📊 MedicalData available:', !!window.MedicalData);

        // Poblar doctores por departamento
        this.populateTeamByDepartments(language);
        console.log('✅ Team page integration initialized');
    },

    // 🔧 POBLAR EQUIPO POR DEPARTAMENTOS
    populateTeamByDepartments: function(language = 'es') {
        console.log('🔧 populateTeamByDepartments called');

        if (!window.MedicalData) {
            console.error('❌ MedicalData not available');
            return;
        }

        console.log('✅ MedicalData available, getting doctors...');
        const doctors = window.MedicalData.manager.getAllDoctors(language);
        console.log('👨‍⚕️ Doctors retrieved:', doctors.length, doctors);

        // Agrupar doctores por departamento
        const departmentGroups = {
            cardiology: [],
            pediatrics: [],
            traumatology: [],
            specialties: [] // Para dermatología, neurología, ginecología
        };

        doctors.forEach(doctor => {
            if (doctor.department === 'cardiology') {
                departmentGroups.cardiology.push(doctor);
            } else if (doctor.department === 'pediatrics') {
                departmentGroups.pediatrics.push(doctor);
            } else if (doctor.department === 'traumatology') {
                departmentGroups.traumatology.push(doctor);
            } else {
                departmentGroups.specialties.push(doctor);
            }
        });

        // Verificar que los contenedores existan
        const containers = ['cardiology-doctors', 'pediatrics-doctors', 'traumatology-doctors', 'specialties-doctors'];
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            console.log(`📦 Container ${containerId}:`, !!container);
        });

        // Poblar cada pestaña
        this.populateTeamTab('cardiology-doctors', departmentGroups.cardiology);
        this.populateTeamTab('pediatrics-doctors', departmentGroups.pediatrics);
        this.populateTeamTab('traumatology-doctors', departmentGroups.traumatology);
        this.populateTeamTab('specialties-doctors', departmentGroups.specialties);

        console.log('✅ Team tabs populated by departments');
    },

    // 🔧 POBLAR PESTAÑA ESPECÍFICA DE EQUIPO
    populateTeamTab: function(containerId, doctors) {
        console.log(`🔧 populateTeamTab called for ${containerId} with ${doctors.length} doctors`);

        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`❌ Container ${containerId} not found`);
            return;
        }

        if (!doctors.length) {
            console.warn(`⚠️ No doctors for ${containerId}`);
            return;
        }

        console.log(`✅ Container ${containerId} found, populating with doctors:`, doctors);

        let doctorsHTML = '';

        doctors.forEach((doctor, index) => {
            // Determinar imagen basada en el departamento y índice
            let imageIndex = index + 1;
            let imagePath = `images/team/doctor-${imageIndex}.jpg`;

            // Si es especialidades, usar imágenes de lab
            if (containerId === 'specialties-doctors') {
                imagePath = `images/team/doctor-lab-${imageIndex}.jpg`;
            }

            doctorsHTML += `
                <div class="col-lg-4 col-md-6">
                    <div class="team-person text-center">
                        <div class="doctor-image-container">
                            <img loading="lazy" src="${imagePath}" class="img-fluid" alt="team">
                            <div class="doctor-overlay">
                                <a href="#" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#doctorModal-${doctor.id}" data-translate="teamPage.viewProfile">Ver Perfil</a>
                            </div>
                        </div>
                        <h6>${doctor.name}</h6>
                        <p>${doctor.specialty}</p>
                        <div class="doctor-info mt-2">
                            <small class="text-muted">${doctor.education}</small>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = doctorsHTML;

        // Generar modales para los médicos
        this.generateDoctorModals(doctors);

        console.log(`✅ ${containerId} populated with ${doctors.length} doctors`);
    },

    // 🔧 GENERAR MODALES PARA MÉDICOS
    generateDoctorModals: function(doctors) {
        if (!doctors || !doctors.length) return;

        // Buscar o crear contenedor de modales
        let modalsContainer = document.getElementById('doctor-modals-container');
        if (!modalsContainer) {
            modalsContainer = document.createElement('div');
            modalsContainer.id = 'doctor-modals-container';
            document.body.appendChild(modalsContainer);
        }

        doctors.forEach((doctor, index) => {
            // Verificar si el modal ya existe
            if (document.getElementById(`doctorModal-${doctor.id}`)) {
                return; // Skip si ya existe
            }

            // Obtener datos completos del médico
            const fullDoctorData = window.MedicalData.staff[doctor.id];
            if (!fullDoctorData) return;

            // Determinar imagen
            let imageIndex = index + 1;
            let imagePath = `images/team/doctor-${imageIndex}.jpg`;
            if (doctor.department === 'dermatology' || doctor.department === 'neurology' || doctor.department === 'gynecology') {
                imagePath = `images/team/doctor-lab-${imageIndex}.jpg`;
            }

            const currentLanguage = this.getCurrentLanguage();

            const modalHTML = `
                <div class="modal fade" id="doctorModal-${doctor.id}" tabindex="-1" role="dialog" aria-labelledby="doctorModalLabel-${doctor.id}" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="doctorModalLabel-${doctor.id}">${doctor.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="${imagePath}" alt="${doctor.name}" class="img-fluid rounded mb-3">
                                        <div class="doctor-credentials">
                                            <h6 data-translate="teamPage.modal.specialty">Especialidad</h6>
                                            <p class="text-primary">${doctor.specialty}</p>

                                            <h6 data-translate="teamPage.modal.education">Educación</h6>
                                            <p class="text-muted">${doctor.education}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <h6 data-translate="teamPage.modal.experience">Experiencia Profesional</h6>
                                        <p>${doctor.experience}</p>

                                        <h6 data-translate="teamPage.modal.achievements">Logros y Certificaciones</h6>
                                        <ul class="list-unstyled">
                                            <li><i class="fas fa-award text-primary"></i> <span data-translate="teamPage.modal.achievement1">Certificación en especialidad médica</span></li>
                                            <li><i class="fas fa-medal text-primary"></i> <span data-translate="teamPage.modal.achievement2">Miembro de asociaciones médicas profesionales</span></li>
                                            <li><i class="fas fa-star text-primary"></i> <span data-translate="teamPage.modal.achievement3">Participación en congresos médicos internacionales</span></li>
                                            <li><i class="fas fa-certificate text-primary"></i> <span data-translate="teamPage.modal.achievement4">Formación continua en nuevas técnicas</span></li>
                                        </ul>

                                        <h6 data-translate="teamPage.modal.approach">Enfoque de Atención</h6>
                                        <p data-translate="teamPage.modal.approachText">Nuestro compromiso es brindar atención médica personalizada, utilizando las mejores prácticas y tecnología avanzada para garantizar el bienestar de nuestros pacientes.</p>

                                        <div class="doctor-contact-info mt-4">
                                            <h6 data-translate="teamPage.modal.availability">Disponibilidad</h6>
                                            <p><i class="fas fa-clock text-primary"></i> <span data-translate="teamPage.modal.schedule">Lunes a Viernes: 8:00 AM - 6:00 PM</span></p>
                                            <p><i class="fas fa-calendar text-primary"></i> <span data-translate="teamPage.modal.appointments">Citas disponibles con previa programación</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" data-translate="teamPage.modal.close">Cerrar</button>
                                <a href="appointment.html" class="btn btn-primary" data-translate="teamPage.modal.bookAppointment">Agendar Cita</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            modalsContainer.innerHTML += modalHTML;
        });

        console.log(`✅ Generated modals for ${doctors.length} doctors`);
    },

    // 🔧 OBTENER PÁGINA ACTUAL
    getCurrentPage: function() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    },

    // 🔧 OBTENER IDIOMA ACTUAL
    getCurrentLanguage: function() {
        // Intentar obtener idioma del language manager si existe
        if (window.LanguageManager && window.LanguageManager.currentLanguage) {
            return window.LanguageManager.currentLanguage;
        }
        
        // Fallback a español
        return 'es';
    }
};

// 🚀 AUTO-INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Medical Integration System loading...');
    MedicalIntegration.autoInit();
});

// Hacer disponible globalmente
window.MedicalIntegration = MedicalIntegration;
