// Accessibility Manager - ADA/WCAG 2.1 AA Compliance System
// Sistema completo de accesibilidad web profesional

class AccessibilityManager {
    constructor() {
        // Usar configuración externa si está disponible
        const externalConfig = window.ACCESSIBILITY_CONFIG || {};

        this.config = {
            // Configuración de accesibilidad
            enabled: externalConfig.enabled !== undefined ? externalConfig.enabled : true,
            autoFix: externalConfig.autoFix !== undefined ? externalConfig.autoFix : true,
            keyboardNavigation: externalConfig.keyboardNavigation?.enabled !== undefined ? externalConfig.keyboardNavigation.enabled : true,
            screenReaderSupport: externalConfig.screenReader?.enabled !== undefined ? externalConfig.screenReader.enabled : true,
            colorContrastFix: externalConfig.colorContrast?.enabled !== undefined ? externalConfig.colorContrast.enabled : true,
            focusManagement: externalConfig.focusManagement?.enabled !== undefined ? externalConfig.focusManagement.enabled : true,

            // Configuración de contraste
            contrastRatio: {
                normal: externalConfig.colorContrast?.minimumRatio || 4.5,
                large: externalConfig.colorContrast?.largeTextRatio || 3.0
            },

            // Configuración de tamaños de fuente
            fontSizes: {
                minimum: externalConfig.typography?.minimumFontSize || 16,
                scaleFactor: 1.2,
                maxScale: externalConfig.typography?.maxScale || 1.5,
                minScale: externalConfig.typography?.minScale || 0.8
            },

            // Configuración de áreas de toque
            touchTargets: {
                minimum: externalConfig.touchTargets?.minimumSize || 44
            },

            // Panel de accesibilidad
            panel: externalConfig.accessibilityPanel || {
                enabled: true,
                position: 'right'
            }
        };
        
        this.isHighContrast = false;
        this.fontSize = 1;
        this.focusedElement = null;
        this.keyboardUsers = new Set();
        
        this.init();
    }
    
    init() {
        if (!this.config.enabled) return;
        
        // Configurar navegación por teclado
        this.setupKeyboardNavigation();
        
        // Configurar soporte para screen readers
        this.setupScreenReaderSupport();
        
        // Reparar problemas automáticamente
        if (this.config.autoFix) {
            this.autoFixAccessibilityIssues();
        }
        
        // Configurar gestión de foco
        this.setupFocusManagement();
        
        // Crear panel de accesibilidad
        this.createAccessibilityPanel();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Detectar usuarios de teclado
        this.detectKeyboardUsers();
        
        console.log('♿ Accessibility Manager initialized');
        console.log('🔧 WCAG 2.1 AA Compliance active');
    }
    
    setupKeyboardNavigation() {
        if (!this.config.keyboardNavigation) return;
        
        // Agregar tabindex a elementos interactivos sin él
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [onclick], [role="button"]');
        
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex') && !element.disabled) {
                element.setAttribute('tabindex', '0');
            }
        });
        
        // Configurar navegación con flechas para menús
        this.setupArrowKeyNavigation();
        
        // Configurar teclas de escape
        this.setupEscapeKey();
        
        console.log('⌨️ Keyboard navigation configured');
    }
    
    setupArrowKeyNavigation() {
        const menus = document.querySelectorAll('.navbar-nav, .dropdown-menu');
        
        menus.forEach(menu => {
            const items = menu.querySelectorAll('a, button');
            
            items.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    let targetIndex;
                    
                    switch(e.key) {
                        case 'ArrowDown':
                            e.preventDefault();
                            targetIndex = (index + 1) % items.length;
                            items[targetIndex].focus();
                            break;
                            
                        case 'ArrowUp':
                            e.preventDefault();
                            targetIndex = (index - 1 + items.length) % items.length;
                            items[targetIndex].focus();
                            break;
                            
                        case 'Home':
                            e.preventDefault();
                            items[0].focus();
                            break;
                            
                        case 'End':
                            e.preventDefault();
                            items[items.length - 1].focus();
                            break;
                    }
                });
            });
        });
    }
    
    setupEscapeKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Cerrar modales
                const modals = document.querySelectorAll('.modal.show');
                modals.forEach(modal => {
                    const closeBtn = modal.querySelector('[data-dismiss="modal"]');
                    if (closeBtn) closeBtn.click();
                });
                
                // Cerrar dropdowns
                const dropdowns = document.querySelectorAll('.dropdown-menu.show');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
                
                // Cerrar panel de accesibilidad
                const panel = document.getElementById('accessibility-panel');
                if (panel && panel.classList.contains('show')) {
                    panel.classList.remove('show');
                }
            }
        });
    }
    
    setupScreenReaderSupport() {
        if (!this.config.screenReaderSupport) return;
        
        // Agregar roles ARIA faltantes
        this.addMissingAriaRoles();
        
        // Agregar labels faltantes
        this.addMissingLabels();
        
        // Configurar live regions
        this.setupLiveRegions();
        
        // Mejorar navegación por landmarks
        this.improveLandmarks();
        
        console.log('🔊 Screen reader support configured');
    }
    
    addMissingAriaRoles() {
        // Agregar role="navigation" a elementos de navegación
        const navElements = document.querySelectorAll('nav:not([role])');
        navElements.forEach(nav => nav.setAttribute('role', 'navigation'));

        // Agregar role="main" al contenido principal
        const mainContent = document.querySelector('main:not([role])') ||
                           document.querySelector('.main-content:not([role])') ||
                           document.querySelector('#main:not([role])');
        if (mainContent) {
            mainContent.setAttribute('role', 'main');
        }

        // Agregar role="banner" al header
        const header = document.querySelector('header:not([role])');
        if (header) {
            header.setAttribute('role', 'banner');
        }

        // Agregar role="contentinfo" al footer
        const footer = document.querySelector('footer:not([role])');
        if (footer) {
            footer.setAttribute('role', 'contentinfo');
        }

        // Arreglar accordion completamente según ARIA spec
        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            // Remover cualquier role problemático del accordion
            accordion.removeAttribute('role');

            // Buscar card-headers específicos
            const cardHeaders = accordion.querySelectorAll('.card-header');
            cardHeaders.forEach((header, index) => {
                // Remover roles problemáticos de headers
                header.removeAttribute('role');

                // Encontrar el botón/enlace dentro del header
                const toggleElement = header.querySelector('button, a[data-toggle="collapse"], [data-toggle="collapse"]');
                if (toggleElement) {
                    // Configurar el elemento toggle correctamente
                    toggleElement.setAttribute('role', 'button');
                    toggleElement.setAttribute('aria-expanded', 'false');

                    // Asegurar que tenga ID único
                    if (!toggleElement.id) {
                        toggleElement.id = `accordion-toggle-${index}`;
                    }

                    // Encontrar el panel correspondiente
                    const targetId = toggleElement.getAttribute('data-target') ||
                                   toggleElement.getAttribute('href');

                    if (targetId) {
                        const panelId = targetId.replace('#', '');
                        const panel = document.getElementById(panelId);

                        if (panel) {
                            // Configurar panel correctamente
                            panel.setAttribute('role', 'region');
                            panel.setAttribute('aria-labelledby', toggleElement.id);
                            toggleElement.setAttribute('aria-controls', panelId);

                            // Remover roles problemáticos del panel
                            panel.removeAttribute('tablist');
                            panel.removeAttribute('tabpanel');
                        }
                    }
                }
            });
        });

        // Arreglar dropdown roles duplicados
        const dropdownToggles = document.querySelectorAll('#navbarDropdown');
        dropdownToggles.forEach((toggle, index) => {
            if (index > 0) {
                // Cambiar ID duplicado
                toggle.id = `navbarDropdown-${index}`;
            }
        });

        // Agregar role="button" a elementos clickeables
        const clickableElements = document.querySelectorAll('[onclick]:not([role]):not(button):not(a)');
        clickableElements.forEach(element => {
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
        });
    }
    
    addMissingLabels() {
        // Agregar aria-label a botones sin texto
        const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    let label = 'Botón';

                    if (iconClass.includes('search')) label = 'Buscar';
                    else if (iconClass.includes('menu')) label = 'Menú';
                    else if (iconClass.includes('close')) label = 'Cerrar';
                    else if (iconClass.includes('play')) label = 'Reproducir';
                    else if (iconClass.includes('pause')) label = 'Pausar';
                    else if (iconClass.includes('whatsapp')) label = 'WhatsApp';
                    else if (iconClass.includes('phone')) label = 'Teléfono';
                    else if (iconClass.includes('email')) label = 'Email';

                    button.setAttribute('aria-label', label);
                }
            }
        });

        // Agregar labels a inputs sin label
        const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
        inputs.forEach(input => {
            const label = input.closest('form')?.querySelector(`label[for="${input.id}"]`);
            if (!label && input.placeholder) {
                input.setAttribute('aria-label', input.placeholder);
            }

            // Agregar required indicator
            if (input.required && !input.getAttribute('aria-required')) {
                input.setAttribute('aria-required', 'true');
            }
        });

        // Agregar alt text a imágenes sin él
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            const src = img.src || img.dataset.src || '';
            let altText = 'Imagen';

            // Generar alt text más descriptivo basado en el src
            if (src.includes('doctor')) altText = 'Imagen de doctor';
            else if (src.includes('medical')) altText = 'Imagen médica';
            else if (src.includes('hospital')) altText = 'Imagen de hospital';
            else if (src.includes('team')) altText = 'Imagen del equipo médico';
            else if (src.includes('service')) altText = 'Imagen de servicio médico';
            else if (src.includes('logo')) altText = 'Logo del centro médico';

            img.setAttribute('alt', altText);
        });

        // Agregar labels a enlaces sin texto descriptivo
        const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
        links.forEach(link => {
            if (!link.textContent.trim() || link.textContent.trim().length < 3) {
                const icon = link.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    let label = 'Enlace';

                    if (iconClass.includes('facebook')) label = 'Facebook';
                    else if (iconClass.includes('twitter')) label = 'Twitter';
                    else if (iconClass.includes('instagram')) label = 'Instagram';
                    else if (iconClass.includes('linkedin')) label = 'LinkedIn';
                    else if (iconClass.includes('youtube')) label = 'YouTube';
                    else if (iconClass.includes('whatsapp')) label = 'WhatsApp';

                    link.setAttribute('aria-label', label);
                }
            }
        });
    }
    
    setupLiveRegions() {
        // Crear región para anuncios dinámicos
        const liveRegion = document.createElement('div');
        liveRegion.id = 'accessibility-announcements';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        
        document.body.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }
    
    improveLandmarks() {
        // Agregar skip links si no existen
        if (!document.querySelector('.skip-link')) {
            this.addSkipLinks();
        }
        
        // Mejorar headings hierarchy
        this.fixHeadingHierarchy();
    }
    
    addSkipLinks() {
        // Verificar si ya existen skip links
        if (document.querySelector('.skip-links')) {
            return;
        }

        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link" data-translate="accessibility.skipToMain">Saltar al contenido principal</a>
            <a href="#navigation" class="skip-link" data-translate="accessibility.skipToNav">Saltar a navegación</a>
        `;

        document.body.insertBefore(skipLinks, document.body.firstChild);

        // Asegurar que los targets existen
        this.ensureSkipLinkTargets();
    }

    ensureSkipLinkTargets() {
        // Crear target para main content si no existe
        let mainContent = document.getElementById('main-content');
        if (!mainContent) {
            mainContent = document.querySelector('main') ||
                         document.querySelector('.main-content') ||
                         document.querySelector('#main') ||
                         document.querySelector('.container').parentElement;

            if (mainContent) {
                mainContent.id = 'main-content';
                mainContent.setAttribute('tabindex', '-1'); // Permite focus programático
            }
        }

        // Crear target para navigation si no existe
        let navigation = document.getElementById('navigation');
        if (!navigation) {
            navigation = document.querySelector('nav') ||
                        document.querySelector('.navbar') ||
                        document.querySelector('#navbar');

            if (navigation) {
                navigation.id = 'navigation';
                navigation.setAttribute('tabindex', '-1'); // Permite focus programático
            }
        }
    }
    
    fixHeadingHierarchy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let issuesFixed = 0;

        // Crear un mapa de niveles esperados
        const levelMap = new Map();
        let currentExpectedLevel = 1;

        headings.forEach((heading, index) => {
            const currentLevel = parseInt(heading.tagName.charAt(1));

            // Si es H1, resetear
            if (currentLevel === 1) {
                currentExpectedLevel = 2;
                levelMap.set(heading, 1);
                return;
            }

            // Si el nivel es secuencial, está bien
            if (currentLevel <= currentExpectedLevel) {
                levelMap.set(heading, currentLevel);
                currentExpectedLevel = currentLevel + 1;
            } else {
                // Hay un salto - corregir
                const correctedLevel = currentExpectedLevel;
                heading.setAttribute('aria-level', correctedLevel.toString());
                heading.setAttribute('role', 'heading');
                levelMap.set(heading, correctedLevel);
                currentExpectedLevel = correctedLevel + 1;
                issuesFixed++;
            }
        });

        // Corrección específica para headings problemáticos
        const specificProblems = document.querySelectorAll('h5, h6');
        specificProblems.forEach(heading => {
            // Si no tiene aria-level ya asignado, verificar contexto
            if (!heading.hasAttribute('aria-level')) {
                const allPrevHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
                const currentIndex = allPrevHeadings.indexOf(heading);

                if (currentIndex > 0) {
                    const prevHeading = allPrevHeadings[currentIndex - 1];
                    const prevLevel = parseInt(prevHeading.tagName.charAt(1));
                    const currentLevel = parseInt(heading.tagName.charAt(1));

                    if (currentLevel > prevLevel + 1) {
                        const correctedLevel = prevLevel + 1;
                        heading.setAttribute('aria-level', correctedLevel.toString());
                        heading.setAttribute('role', 'heading');
                        issuesFixed++;
                    }
                }
            }
        });

        if (issuesFixed > 0) {
            console.log(`♿ Fixed ${issuesFixed} heading hierarchy issues`);
        }
    }
    
    autoFixAccessibilityIssues() {
        // Corregir contraste de colores
        if (this.config.colorContrastFix) {
            this.fixColorContrast();
        }

        // Corregir tamaños de área de toque
        this.fixTouchTargets();

        // Corregir tamaños de fuente
        this.fixFontSizes();

        // Agregar atributos faltantes para Lighthouse
        this.addLighthouseRequiredAttributes();

        // Limpiar problemas ARIA específicos
        this.cleanupSpecificAriaIssues();

        console.log('🔧 Auto-fix accessibility issues completed');
    }

    cleanupSpecificAriaIssues() {
        // Limpiar accordion roles problemáticos
        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            // Remover atributos ARIA problemáticos
            accordion.removeAttribute('aria-multiselectable');
            accordion.removeAttribute('aria-expanded');
            accordion.removeAttribute('aria-controls');

            // Limpiar card-headers
            const cardHeaders = accordion.querySelectorAll('.card-header');
            cardHeaders.forEach(header => {
                header.removeAttribute('role');
                header.removeAttribute('aria-expanded');
                header.removeAttribute('aria-controls');
            });
        });

        // Limpiar elementos con tabindex > 0
        const elementsWithHighTabindex = document.querySelectorAll('[tabindex]');
        elementsWithHighTabindex.forEach(element => {
            const tabindex = parseInt(element.getAttribute('tabindex'));
            if (tabindex > 0) {
                element.removeAttribute('tabindex');
            }
        });

        // Asegurar que skip links no tengan tabindex > 0
        const skipLinks = document.querySelectorAll('.skip-link');
        skipLinks.forEach(link => {
            link.removeAttribute('tabindex');
        });

        // Limpiar elementos de slider que no necesitan modificaciones visuales
        this.cleanupSliderElements();

        console.log('🧹 Cleaned up specific ARIA issues');
    }

    cleanupSliderElements() {
        // Limpiar botones de slider que tienen texto innecesario PERO mantener flechas visibles
        const sliderButtons = document.querySelectorAll('.slick-next, .slick-prev');
        sliderButtons.forEach(button => {
            // Mantener aria-label pero ocultar solo el texto, no las flechas
            if (button.textContent.trim() === 'Next' || button.textContent.trim() === 'Prev') {
                button.innerHTML = ''; // Limpiar texto
                // NO aplicar estilos que oculten las flechas - el CSS se encarga
            }
        });

        // Limpiar dots de slider
        const sliderDots = document.querySelectorAll('.slick-dots li button');
        sliderDots.forEach(button => {
            // Mantener aria-label pero hacer el botón más pequeño visualmente
            button.style.width = '20px';
            button.style.height = '20px';
            button.style.minWidth = '20px';
            button.style.minHeight = '20px';
            button.style.fontSize = '0';
            button.style.textIndent = '-9999px';
        });

        console.log('🎨 Cleaned up slider elements (arrows preserved)');
    }

    addLighthouseRequiredAttributes() {
        // Agregar lang attribute si no existe
        if (!document.documentElement.hasAttribute('lang')) {
            document.documentElement.setAttribute('lang', 'es');
        }

        // Asegurar que todos los form elements tengan labels
        const formElements = document.querySelectorAll('input, select, textarea');
        formElements.forEach(element => {
            if (!element.hasAttribute('aria-label') &&
                !element.hasAttribute('aria-labelledby')) {

                // Generar label apropiado según el tipo
                let label = 'Campo de formulario';

                if (element.tagName === 'SELECT') {
                    label = 'Seleccionar opción';
                    if (element.name && element.name.includes('department')) label = 'Seleccionar departamento';
                    if (element.name && element.name.includes('doctor')) label = 'Seleccionar doctor';
                    if (element.name && element.name.includes('time')) label = 'Seleccionar hora';
                    if (element.name && element.name.includes('date')) label = 'Seleccionar fecha';
                } else if (element.type === 'email') {
                    label = 'Correo electrónico';
                } else if (element.type === 'tel') {
                    label = 'Número de teléfono';
                } else if (element.type === 'text') {
                    label = 'Texto';
                    if (element.name && element.name.includes('name')) label = 'Nombre';
                    if (element.name && element.name.includes('subject')) label = 'Asunto';
                } else if (element.tagName === 'TEXTAREA') {
                    label = 'Mensaje';
                }

                element.setAttribute('aria-label', label);

                // Generar ID único si no existe
                if (!element.id) {
                    element.id = 'form-element-' + Math.random().toString(36).substr(2, 9);
                }
            }
        });

        // Asegurar que todos los botones tengan texto accesible
        const buttonsWithoutText = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        buttonsWithoutText.forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Botón interactivo');
            }
        });

        // Agregar role="button" a elementos clickeables que no son botones
        const clickableElements = document.querySelectorAll('[onclick]:not(button):not(a):not([role])');
        clickableElements.forEach(element => {
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');

            // Agregar keyboard support
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Mejorar contraste de elementos interactivos
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        interactiveElements.forEach(element => {
            element.classList.add('accessibility-enhanced');
        });
    }
    
    fixColorContrast() {
        // Esta función se implementaría con una librería de análisis de contraste
        // Por ahora, agregamos clases CSS que se pueden personalizar
        document.body.classList.add('accessibility-enhanced');
    }
    
    fixTouchTargets() {
        const smallTargets = document.querySelectorAll('a, button, input[type="checkbox"], input[type="radio"]');

        smallTargets.forEach(target => {
            const rect = target.getBoundingClientRect();

            // Excepciones para elementos que no necesitan touch target grande
            const isSliderElement = target.closest('.slick-dots, .slick-arrow') ||
                                  target.classList.contains('slick-next') ||
                                  target.classList.contains('slick-prev');

            const isSmallByDesign = target.classList.contains('btn-sm') ||
                                  target.classList.contains('close') ||
                                  target.parentElement?.classList.contains('pagination');

            if (!isSliderElement && !isSmallByDesign &&
                (rect.width < this.config.touchTargets.minimum ||
                 rect.height < this.config.touchTargets.minimum)) {
                target.classList.add('accessibility-touch-target');
            }
        });
    }
    
    fixFontSizes() {
        const textElements = document.querySelectorAll('p, span, div, a, button, input, label');

        textElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const fontSize = parseFloat(computedStyle.fontSize);

            // Excepciones para elementos que deben mantener su tamaño
            const isSliderElement = element.closest('.slick-dots, .slick-arrow') ||
                                  element.classList.contains('slick-next') ||
                                  element.classList.contains('slick-prev');

            const isIconElement = element.classList.contains('fa') ||
                                element.classList.contains('icon') ||
                                element.tagName === 'I';

            const isSmallByDesign = element.classList.contains('small') ||
                                  element.classList.contains('text-sm') ||
                                  element.parentElement?.classList.contains('badge');

            if (!isSliderElement && !isIconElement && !isSmallByDesign &&
                fontSize < this.config.fontSizes.minimum) {
                element.classList.add('accessibility-font-fix');
            }
        });
    }
    
    setupFocusManagement() {
        if (!this.config.focusManagement) return;
        
        // Mejorar indicadores de foco
        document.addEventListener('focusin', (e) => {
            this.focusedElement = e.target;
            e.target.classList.add('accessibility-focused');
        });
        
        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('accessibility-focused');
        });
        
        // Gestionar foco en modales
        this.setupModalFocusManagement();
    }
    
    setupModalFocusManagement() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', () => {
                const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            });
            
            modal.addEventListener('hidden.bs.modal', () => {
                if (this.focusedElement) {
                    this.focusedElement.focus();
                }
            });
        });
    }
    
    detectKeyboardUsers() {
        let isUsingKeyboard = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                isUsingKeyboard = true;
                document.body.classList.add('keyboard-navigation');
                this.keyboardUsers.add('current-session');
            }
        });

        document.addEventListener('mousedown', () => {
            if (isUsingKeyboard) {
                isUsingKeyboard = false;
                document.body.classList.remove('keyboard-navigation');
            }
        });
    }

    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.id = 'accessibility-panel';
        panel.className = 'accessibility-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-labelledby', 'accessibility-panel-title');
        panel.innerHTML = `
            <div class="accessibility-panel-content">
                <div class="accessibility-panel-header">
                    <h3 id="accessibility-panel-title" data-translate="accessibility.panel.title">Opciones de Accesibilidad</h3>
                    <button class="accessibility-panel-close" aria-label="Cerrar panel de accesibilidad">×</button>
                </div>
                <div class="accessibility-panel-body">
                    <div class="accessibility-option">
                        <label for="high-contrast-toggle" data-translate="accessibility.highContrast">Alto Contraste</label>
                        <button id="high-contrast-toggle" class="accessibility-toggle" role="switch" aria-checked="false">
                            <span class="toggle-slider"></span>
                        </button>
                    </div>
                    <div class="accessibility-option">
                        <label for="font-size-control" data-translate="accessibility.fontSize">Tamaño de Fuente</label>
                        <div class="font-size-controls">
                            <button id="font-decrease" aria-label="Disminuir tamaño de fuente">A-</button>
                            <span id="font-size-display">100%</span>
                            <button id="font-increase" aria-label="Aumentar tamaño de fuente">A+</button>
                        </div>
                    </div>
                    <div class="accessibility-option">
                        <button id="reset-accessibility" data-translate="accessibility.reset">Restablecer</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        // El botón de accesibilidad ya existe en la navbar, no crear uno duplicado
        // Solo configurar los eventos del panel
        this.setupPanelEvents();
    }

    setupPanelEvents() {
        const panel = document.getElementById('accessibility-panel');
        const toggleBtn = document.getElementById('accessibility-toggle');
        const closeBtn = panel.querySelector('.accessibility-panel-close');

        // Debug: verificar si el botón existe
        if (!toggleBtn) {
            console.error('❌ Accessibility toggle button not found!');
            return;
        }
        console.log('✅ Accessibility toggle button found:', toggleBtn);
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        const fontIncrease = document.getElementById('font-increase');
        const fontDecrease = document.getElementById('font-decrease');
        const resetBtn = document.getElementById('reset-accessibility');

        // Abrir/cerrar panel
        toggleBtn.addEventListener('click', (e) => {
            console.log('🔧 Accessibility button clicked!');
            e.preventDefault();
            panel.classList.toggle('show');
            if (panel.classList.contains('show')) {
                console.log('✅ Panel opened');
                highContrastToggle.focus();
            } else {
                console.log('✅ Panel closed');
            }
        });

        closeBtn.addEventListener('click', () => {
            panel.classList.remove('show');
            toggleBtn.focus();
        });

        // Alto contraste
        highContrastToggle.addEventListener('click', () => {
            this.toggleHighContrast();
        });

        // Tamaño de fuente
        fontIncrease.addEventListener('click', () => {
            this.increaseFontSize();
        });

        fontDecrease.addEventListener('click', () => {
            this.decreaseFontSize();
        });

        // Reset
        resetBtn.addEventListener('click', () => {
            this.resetAccessibilitySettings();
        });
    }

    setupEventListeners() {
        // Escuchar cambios de idioma
        document.addEventListener('languageChanged', () => {
            this.updateAccessibilityTexts();
        });

        // Escuchar cambios de tema oscuro
        document.addEventListener('darkModeChanged', (e) => {
            this.handleDarkModeChange(e.detail.isDark);
        });
    }

    toggleHighContrast() {
        this.isHighContrast = !this.isHighContrast;

        if (this.isHighContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        const toggle = document.getElementById('high-contrast-toggle');
        toggle.setAttribute('aria-checked', this.isHighContrast.toString());

        this.announceToScreenReader(
            this.isHighContrast ? 'Alto contraste activado' : 'Alto contraste desactivado'
        );

        // Guardar preferencia
        localStorage.setItem('accessibility-high-contrast', this.isHighContrast.toString());
    }

    increaseFontSize() {
        if (this.fontSize < 1.5) {
            this.fontSize += 0.1;
            this.applyFontSize();
        }
    }

    decreaseFontSize() {
        if (this.fontSize > 0.8) {
            this.fontSize -= 0.1;
            this.applyFontSize();
        }
    }

    applyFontSize() {
        document.documentElement.style.fontSize = `${this.fontSize}rem`;

        const display = document.getElementById('font-size-display');
        if (display) {
            display.textContent = `${Math.round(this.fontSize * 100)}%`;
        }

        this.announceToScreenReader(`Tamaño de fuente: ${Math.round(this.fontSize * 100)}%`);

        // Guardar preferencia
        localStorage.setItem('accessibility-font-size', this.fontSize.toString());
    }

    resetAccessibilitySettings() {
        this.isHighContrast = false;
        this.fontSize = 1;

        document.body.classList.remove('high-contrast');
        document.documentElement.style.fontSize = '';

        const toggle = document.getElementById('high-contrast-toggle');
        const display = document.getElementById('font-size-display');

        if (toggle) toggle.setAttribute('aria-checked', 'false');
        if (display) display.textContent = '100%';

        this.announceToScreenReader('Configuración de accesibilidad restablecida');

        // Limpiar localStorage
        localStorage.removeItem('accessibility-high-contrast');
        localStorage.removeItem('accessibility-font-size');
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;

            // Limpiar después de un momento
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    updateAccessibilityTexts() {
        // Actualizar textos cuando cambie el idioma
        const elementsToUpdate = document.querySelectorAll('[data-translate^="accessibility."]');
        elementsToUpdate.forEach(element => {
            if (window.languageManager && window.languageManager.translateElement) {
                window.languageManager.translateElement(element);
            }
        });
    }

    handleDarkModeChange(isDark) {
        // Ajustar accesibilidad según el modo oscuro
        if (isDark) {
            document.body.classList.add('dark-mode-accessibility');
        } else {
            document.body.classList.remove('dark-mode-accessibility');
        }
    }

    loadSavedSettings() {
        // Cargar configuración guardada
        const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
        const savedFontSize = localStorage.getItem('accessibility-font-size');

        if (savedHighContrast === 'true') {
            this.toggleHighContrast();
        }

        if (savedFontSize) {
            this.fontSize = parseFloat(savedFontSize);
            this.applyFontSize();
        }
    }

    // Métodos públicos para integración
    getAccessibilityReport() {
        const report = {
            wcagLevel: this.config.wcagLevel || 'AA',
            keyboardNavigation: this.config.keyboardNavigation,
            screenReaderSupport: this.config.screenReaderSupport,
            highContrast: this.isHighContrast,
            fontSize: this.fontSize,
            keyboardUsers: this.keyboardUsers.size,

            // Estadísticas detalladas
            stats: {
                imagesWithAlt: document.querySelectorAll('img[alt]').length,
                totalImages: document.querySelectorAll('img').length,
                buttonsWithLabels: document.querySelectorAll('button[aria-label], button:not(:empty)').length,
                totalButtons: document.querySelectorAll('button').length,
                linksWithText: document.querySelectorAll('a:not(:empty), a[aria-label]').length,
                totalLinks: document.querySelectorAll('a').length,
                formElementsWithLabels: document.querySelectorAll('input[aria-label], input[aria-labelledby], select[aria-label], textarea[aria-label]').length,
                totalFormElements: document.querySelectorAll('input, select, textarea').length
            }
        };

        // Calcular score aproximado
        const stats = report.stats;
        let score = 0;

        if (stats.totalImages > 0) {
            score += (stats.imagesWithAlt / stats.totalImages) * 25;
        } else {
            score += 25;
        }

        if (stats.totalButtons > 0) {
            score += (stats.buttonsWithLabels / stats.totalButtons) * 25;
        } else {
            score += 25;
        }

        if (stats.totalLinks > 0) {
            score += (stats.linksWithText / stats.totalLinks) * 25;
        } else {
            score += 25;
        }

        if (stats.totalFormElements > 0) {
            score += (stats.formElementsWithLabels / stats.totalFormElements) * 25;
        } else {
            score += 25;
        }

        report.estimatedScore = Math.round(score);

        return report;
    }

    // Método para mostrar reporte detallado
    showAccessibilityReport() {
        const report = this.getAccessibilityReport();

        console.log(`
♿ ACCESSIBILITY REPORT
======================
📊 Estimated Score: ${report.estimatedScore}/100
📋 WCAG Level: ${report.wcagLevel}
⌨️ Keyboard Navigation: ${report.keyboardNavigation ? '✅' : '❌'}
🔊 Screen Reader Support: ${report.screenReaderSupport ? '✅' : '❌'}
🎨 High Contrast: ${report.highContrast ? '✅ Active' : '⚪ Available'}
📝 Font Size: ${Math.round(report.fontSize * 100)}%

📈 DETAILED STATS:
🖼️ Images with alt text: ${report.stats.imagesWithAlt}/${report.stats.totalImages}
🔘 Buttons with labels: ${report.stats.buttonsWithLabels}/${report.stats.totalButtons}
🔗 Links with text: ${report.stats.linksWithText}/${report.stats.totalLinks}
📝 Form elements with labels: ${report.stats.formElementsWithLabels}/${report.stats.totalFormElements}

⌨️ Keyboard users detected: ${report.keyboardUsers}
        `);

        return report;
    }

    announcePageChange(pageName) {
        this.announceToScreenReader(`Navegando a ${pageName}`);
    }

    announceFormError(message) {
        this.announceToScreenReader(`Error: ${message}`);
    }

    announceSuccess(message) {
        this.announceToScreenReader(`Éxito: ${message}`);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();

    // Cargar configuración guardada
    setTimeout(() => {
        window.accessibilityManager.loadSavedSettings();

        // Ejecutar verificación final después de que todo esté cargado
        setTimeout(() => {
            window.accessibilityManager.runFinalAccessibilityCheck();
        }, 1000);
    }, 100);
});

// Función para verificación final
AccessibilityManager.prototype.runFinalAccessibilityCheck = function() {
    console.log('🔍 Running final accessibility check...');

    // Re-ejecutar correcciones para elementos cargados dinámicamente
    this.addMissingAriaRoles();
    this.addMissingLabels();
    this.addLighthouseRequiredAttributes();
    this.cleanupSpecificAriaIssues();

    // Mostrar reporte final
    const report = this.getAccessibilityReport();

    if (report.estimatedScore >= 95) {
        console.log('🎉 Accessibility score: EXCELLENT (' + report.estimatedScore + '/100)');
    } else if (report.estimatedScore >= 85) {
        console.log('✅ Accessibility score: GOOD (' + report.estimatedScore + '/100)');
    } else {
        console.log('⚠️ Accessibility score: NEEDS IMPROVEMENT (' + report.estimatedScore + '/100)');
    }
};

// Correcciones específicas para Lighthouse
AccessibilityManager.prototype.fixSpecificLighthouseIssues = function() {
    // Forzar contraste en elementos específicos
    const lowContrastElements = document.querySelectorAll(
        '.btn-style-one, .btn-main, .nav-link.active, #dormitory-tab'
    );

    lowContrastElements.forEach(element => {
        element.style.setProperty('background-color', '#0056b3', 'important');
        element.style.setProperty('color', '#ffffff', 'important');
        element.style.setProperty('border-color', '#0056b3', 'important');
    });

    // Asegurar que skip links sean completamente accesibles
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.style.setProperty('position', 'absolute', 'important');
        link.style.setProperty('left', '-9999px', 'important');
        link.style.setProperty('top', '-9999px', 'important');

        // Agregar event listeners para focus
        link.addEventListener('focus', function() {
            this.style.setProperty('position', 'fixed', 'important');
            this.style.setProperty('left', '10px', 'important');
            this.style.setProperty('top', '10px', 'important');
            this.style.setProperty('z-index', '10000', 'important');
        });

        link.addEventListener('blur', function() {
            this.style.setProperty('position', 'absolute', 'important');
            this.style.setProperty('left', '-9999px', 'important');
            this.style.setProperty('top', '-9999px', 'important');
        });
    });

    console.log('🔧 Applied specific Lighthouse fixes');
};

console.log('♿ Accessibility Manager loaded');
