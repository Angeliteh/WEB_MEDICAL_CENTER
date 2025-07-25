/**
 * MEDICAL GALLERY SYSTEM
 * Sistema de galería médica organizada por departamentos
 */

// 🏥 DATOS DE LA GALERÍA MÉDICA
const MEDICAL_GALLERY_DATA = {
    // Cardiología
    cardiology: {
        images: [
            {
                id: 'card_img_1',
                src: 'images/gallery/cardiology-1.jpg',
                title: 'Unidad de Cuidados Intensivos Cardiovasculares',
                description: 'Moderna UCI equipada con monitores cardíacos de última generación.',
                tags: ['UCI', 'Monitoreo', 'Cuidados Intensivos']
            },
            {
                id: 'card_img_2',
                src: 'images/gallery/cardiology-2.jpg',
                title: 'Sala de Cateterismo Cardíaco',
                description: 'Equipamiento avanzado para procedimientos intervencionistas.',
                tags: ['Cateterismo', 'Procedimientos', 'Intervencionismo']
            },
            {
                id: 'card_img_3',
                src: 'images/gallery/cardiology-3.jpg',
                title: 'Ecocardiografía Doppler',
                description: 'Tecnología de ultrasonido cardíaco de alta resolución.',
                tags: ['Ecocardiografía', 'Diagnóstico', 'Ultrasonido']
            },
            {
                id: 'card_img_4',
                src: 'images/gallery/gallery-01.jpg',
                title: 'Electrocardiografía Digital',
                description: 'Sistema de ECG de 12 derivaciones con análisis automático.',
                tags: ['ECG', 'Electrocardiografía', 'Diagnóstico']
            },
            {
                id: 'card_img_5',
                src: 'images/gallery/gallery-02.jpg',
                title: 'Monitor de Signos Vitales',
                description: 'Monitoreo continuo de presión arterial, frecuencia cardíaca y saturación.',
                tags: ['Monitoreo', 'Signos Vitales', 'UCI']
            }
        ],
        videos: [
            {
                id: 'card_vid_1',
                src: 'https://www.youtube.com/watch?v=h-h5Mhlt6O0',
                thumbnail: 'images/gallery/video-cardiology-1.jpg',
                title: 'Procedimiento de Angioplastia',
                description: 'Demostración de técnica de angioplastia coronaria.',
                tags: ['Angioplastia', 'Procedimiento', 'Educativo']
            }
        ]
    },

    // Pediatría
    pediatrics: {
        images: [
            {
                id: 'ped_img_1',
                src: 'images/gallery/pediatrics-1.jpg',
                title: 'Consultorios Pediátricos',
                description: 'Ambiente colorido y acogedor diseñado para niños.',
                tags: ['Consultorios', 'Ambiente Infantil', 'Pediatría']
            },
            {
                id: 'ped_img_2',
                src: 'images/gallery/pediatrics-2.jpg',
                title: 'Sala de Juegos Terapéuticos',
                description: 'Espacio de recreación y terapia para pacientes pediátricos.',
                tags: ['Terapia', 'Juegos', 'Recreación']
            },
            {
                id: 'ped_img_3',
                src: 'images/gallery/pediatrics-3.jpg',
                title: 'Unidad de Neonatología',
                description: 'Cuidados especializados para recién nacidos.',
                tags: ['Neonatología', 'Recién Nacidos', 'Cuidados Especiales']
            },
            {
                id: 'ped_img_4',
                src: 'images/gallery/gallery-03.jpg',
                title: 'Área de Vacunación Infantil',
                description: 'Espacio especializado para inmunizaciones pediátricas.',
                tags: ['Vacunación', 'Inmunización', 'Prevención']
            },
            {
                id: 'ped_img_5',
                src: 'images/gallery/gallery-04.jpg',
                title: 'Consultorio de Crecimiento y Desarrollo',
                description: 'Evaluación integral del desarrollo infantil.',
                tags: ['Desarrollo', 'Crecimiento', 'Evaluación']
            }
        ],
        videos: [
            {
                id: 'ped_vid_1',
                src: 'https://www.youtube.com/watch?v=h-h5Mhlt6O0',
                thumbnail: 'images/gallery/video-pediatrics-1.jpg',
                title: 'Cuidados Neonatales',
                description: 'Técnicas de cuidado para recién nacidos prematuros.',
                tags: ['Neonatología', 'Cuidados', 'Educativo']
            }
        ]
    },

    // Traumatología
    traumatology: {
        images: [
            {
                id: 'trauma_img_1',
                src: 'images/gallery/traumatology-1.jpg',
                title: 'Quirófano de Traumatología',
                description: 'Sala de cirugía equipada con tecnología ortopédica avanzada.',
                tags: ['Quirófano', 'Cirugía', 'Ortopedia']
            },
            {
                id: 'trauma_img_2',
                src: 'images/gallery/traumatology-2.jpg',
                title: 'Sala de Rehabilitación',
                description: 'Equipos modernos para fisioterapia y rehabilitación.',
                tags: ['Rehabilitación', 'Fisioterapia', 'Recuperación']
            },
            {
                id: 'trauma_img_3',
                src: 'images/gallery/traumatology-3.jpg',
                title: 'Rayos X Digital',
                description: 'Sistema de radiografía digital de alta resolución.',
                tags: ['Rayos X', 'Diagnóstico', 'Imagenología']
            },
            {
                id: 'trauma_img_4',
                src: 'images/gallery/gallery-05.jpg',
                title: 'Mesa de Cirugía Ortopédica',
                description: 'Mesa quirúrgica especializada para procedimientos ortopédicos.',
                tags: ['Cirugía', 'Ortopedia', 'Quirófano']
            },
            {
                id: 'trauma_img_5',
                src: 'images/gallery/gallery-06.jpg',
                title: 'Equipo de Artroscopia',
                description: 'Tecnología mínimamente invasiva para cirugía articular.',
                tags: ['Artroscopia', 'Cirugía Mínima', 'Articulaciones']
            }
        ],
        videos: [
            {
                id: 'trauma_vid_1',
                src: 'https://www.youtube.com/watch?v=h-h5Mhlt6O0',
                thumbnail: 'images/gallery/video-traumatology-1.jpg',
                title: 'Técnicas de Rehabilitación',
                description: 'Ejercicios y técnicas de fisioterapia post-quirúrgica.',
                tags: ['Rehabilitación', 'Fisioterapia', 'Educativo']
            }
        ]
    },

    // Laboratorio
    laboratory: {
        images: [
            {
                id: 'lab_img_1',
                src: 'images/gallery/laboratory-1.jpg',
                title: 'Laboratorio de Análisis Clínicos',
                description: 'Equipos automatizados para análisis de sangre y orina.',
                tags: ['Análisis', 'Automatización', 'Diagnóstico']
            },
            {
                id: 'lab_img_2',
                src: 'images/gallery/laboratory-2.jpg',
                title: 'Microscopía Avanzada',
                description: 'Microscopios de alta resolución para estudios patológicos.',
                tags: ['Microscopía', 'Patología', 'Diagnóstico']
            },
            {
                id: 'lab_img_3',
                src: 'images/gallery/laboratory-3.jpg',
                title: 'Área de Microbiología',
                description: 'Laboratorio especializado en cultivos y antibiogramas.',
                tags: ['Microbiología', 'Cultivos', 'Bacteriología']
            },
            {
                id: 'lab_img_4',
                src: 'images/team/doctor-lab-1.jpg',
                title: 'Química Sanguínea Automatizada',
                description: 'Analizadores automáticos para química clínica.',
                tags: ['Química Clínica', 'Automatización', 'Análisis']
            },
            {
                id: 'lab_img_5',
                src: 'images/team/doctor-lab-2.jpg',
                title: 'Hematología Completa',
                description: 'Equipos especializados para análisis hematológicos.',
                tags: ['Hematología', 'Sangre', 'Conteo Celular']
            }
        ],
        videos: [
            {
                id: 'lab_vid_1',
                src: 'https://www.youtube.com/watch?v=h-h5Mhlt6O0',
                thumbnail: 'images/gallery/video-laboratory-1.jpg',
                title: 'Proceso de Análisis Clínico',
                description: 'Desde la toma de muestra hasta los resultados.',
                tags: ['Proceso', 'Análisis', 'Educativo']
            }
        ]
    },

    // Instalaciones Generales
    facilities: {
        images: [
            {
                id: 'fac_img_1',
                src: 'images/gallery/facilities-1.jpg',
                title: 'Recepción Principal',
                description: 'Área de recepción moderna y acogedora.',
                tags: ['Recepción', 'Atención al Cliente', 'Instalaciones']
            },
            {
                id: 'fac_img_2',
                src: 'images/gallery/facilities-2.jpg',
                title: 'Salas de Espera',
                description: 'Espacios cómodos y relajantes para pacientes.',
                tags: ['Sala de Espera', 'Comodidad', 'Pacientes']
            },
            {
                id: 'fac_img_3',
                src: 'images/gallery/facilities-3.jpg',
                title: 'Farmacia Hospitalaria',
                description: 'Farmacia completa con medicamentos especializados.',
                tags: ['Farmacia', 'Medicamentos', 'Servicios']
            },
            {
                id: 'fac_img_4',
                src: 'images/team/event-1.jpg',
                title: 'Auditorio Médico',
                description: 'Espacio para conferencias y capacitación médica.',
                tags: ['Auditorio', 'Capacitación', 'Conferencias']
            },
            {
                id: 'fac_img_5',
                src: 'images/team/event-2.jpg',
                title: 'Cafetería y Área de Descanso',
                description: 'Espacios cómodos para pacientes y familiares.',
                tags: ['Cafetería', 'Descanso', 'Comodidad']
            },
            {
                id: 'fac_img_6',
                src: 'images/team/doctor-2.jpg',
                title: 'Estacionamiento Cubierto',
                description: 'Amplio estacionamiento techado para visitantes.',
                tags: ['Estacionamiento', 'Acceso', 'Comodidad']
            }
        ],
        videos: [
            {
                id: 'fac_vid_1',
                src: 'https://www.youtube.com/watch?v=h-h5Mhlt6O0',
                thumbnail: 'images/gallery/video-facilities-tour.jpg',
                title: 'Recorrido por las Instalaciones',
                description: 'Video tour completo por nuestras modernas instalaciones médicas.',
                tags: ['Recorrido', 'Instalaciones', 'Tour']
            }
        ]
    }
};

// 🔧 SISTEMA DE GALERÍA
const MedicalGallerySystem = {
    currentFilter: 'all',
    currentMediaFilter: 'all',
    itemsPerPage: 9,
    currentPage: 1,
    allItems: [],

    // Inicializar sistema
    init: function() {
        this.generateAllItems();
        this.setupEventListeners();
        this.renderGallery();
        console.log('🖼️ Medical Gallery System initialized');
    },

    // Generar todos los elementos
    generateAllItems: function() {
        this.allItems = [];
        
        Object.keys(MEDICAL_GALLERY_DATA).forEach(department => {
            const deptData = MEDICAL_GALLERY_DATA[department];
            
            // Agregar imágenes
            if (deptData.images) {
                deptData.images.forEach(item => {
                    this.allItems.push({
                        ...item,
                        department: department,
                        type: 'images'
                    });
                });
            }
            
            // Agregar videos
            if (deptData.videos) {
                deptData.videos.forEach(item => {
                    this.allItems.push({
                        ...item,
                        department: department,
                        type: 'videos'
                    });
                });
            }
            

        });
        
        console.log(`📊 Generated ${this.allItems.length} gallery items`);
    },

    // Configurar event listeners
    setupEventListeners: function() {
        // Filtros de departamento
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setDepartmentFilter(filter);
            });
        });

        // Filtros de tipo de media
        document.querySelectorAll('.media-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-media');
                this.setMediaFilter(filter);
            });
        });

        // Botón cargar más
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
    },

    // Establecer filtro de departamento
    setDepartmentFilter: function(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Actualizar botones activos
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });
        
        this.renderGallery();
    },

    // Establecer filtro de media
    setMediaFilter: function(filter) {
        this.currentMediaFilter = filter;
        this.currentPage = 1;
        
        // Actualizar botones activos
        document.querySelectorAll('.media-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-media') === filter) {
                btn.classList.add('active');
            }
        });
        
        this.renderGallery();
    },

    // Filtrar elementos
    getFilteredItems: function() {
        let filtered = this.allItems;
        
        // Filtrar por departamento
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(item => item.department === this.currentFilter);
        }
        
        // Filtrar por tipo de media
        if (this.currentMediaFilter !== 'all') {
            filtered = filtered.filter(item => item.type === this.currentMediaFilter);
        }
        
        return filtered;
    },

    // Renderizar galería
    renderGallery: function() {
        const container = document.getElementById('gallery-grid');
        if (!container) return;
        
        const filteredItems = this.getFilteredItems();
        const itemsToShow = filteredItems.slice(0, this.currentPage * this.itemsPerPage);
        
        container.innerHTML = '';
        
        itemsToShow.forEach(item => {
            const itemHTML = this.createGalleryItemHTML(item);
            container.innerHTML += itemHTML;
        });
        
        // Actualizar botón "Cargar más"
        this.updateLoadMoreButton(filteredItems.length, itemsToShow.length);
        
        // Reinicializar FancyBox
        if (window.$ && $.fancybox) {
            $('[data-fancybox]').fancybox({
                buttons: ['zoom', 'share', 'slideShow', 'fullScreen', 'close'],
                loop: true,
                protect: true
            });
        }
    },

    // Crear HTML de elemento de galería
    createGalleryItemHTML: function(item) {
        const mediaIcon = this.getMediaIcon(item.type);
        const isVideo = item.type === 'videos';

        const imageSrc = isVideo ? item.thumbnail : item.src;
        const fancyboxHref = isVideo ? item.src : item.src;
        const fancyboxType = isVideo ? 'iframe' : 'image';

        return `
            <div class="col-lg-4 col-md-6">
                <div class="gallery-item media-type-${item.type}" data-department="${item.department}" data-type="${item.type}">
                    <div class="gallery-item-image">
                        <img loading="lazy" src="${imageSrc}" class="img-fluid" alt="${item.title}">
                        <div class="media-type-icon">
                            <i class="${mediaIcon}"></i>
                        </div>
                        <div class="gallery-item-overlay">
                            <div class="gallery-item-actions">
                                <a href="${fancyboxHref}" data-fancybox="gallery" data-type="${fancyboxType}" class="btn btn-primary btn-sm">
                                    <i class="fas fa-eye"></i> Ver
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="gallery-item-content">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <div class="gallery-item-meta">
                            <div class="gallery-item-tags">
                                ${item.tags.map(tag => `<span class="gallery-tag">${tag}</span>`).join('')}
                            </div>
                            <span class="gallery-item-type">${this.getTypeLabel(item.type)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Obtener icono de media
    getMediaIcon: function(type) {
        switch(type) {
            case 'videos': return 'fas fa-play';
            default: return 'fas fa-image';
        }
    },

    // Obtener etiqueta de tipo
    getTypeLabel: function(type) {
        switch(type) {
            case 'videos': return 'Video';
            default: return 'Imagen';
        }
    },

    // Cargar más elementos
    loadMore: function() {
        this.currentPage++;
        this.renderGallery();
    },

    // Actualizar botón cargar más
    updateLoadMoreButton: function(totalItems, shownItems) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;
        
        if (shownItems >= totalItems) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que otros scripts estén cargados
    setTimeout(() => {
        MedicalGallerySystem.init();
    }, 500);
});

// Hacer disponible globalmente
window.MedicalGallerySystem = MedicalGallerySystem;
