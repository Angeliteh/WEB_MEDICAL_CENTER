// Component Loader - Sistema de componentes reutilizables
// Carga header, navbar, footer y whatsapp automáticamente

class ComponentLoader {
    constructor() {
        this.components = {
            header: 'components/header.html',
            navbar: 'components/navbar.html',
            footer: 'components/footer.html',
            whatsapp: 'components/whatsapp.html'
        };
        this.loadedComponents = new Set();
    }

    async init() {
        console.log('🔧 Iniciando Component Loader...');
        
        // Cargar componentes en orden
        await this.loadComponent('header', 'header-placeholder');
        await this.loadComponent('navbar', 'navbar-placeholder');
        await this.loadComponent('footer', 'footer-placeholder');
        await this.loadComponent('whatsapp', 'whatsapp-placeholder');
        
        // Inicializar funcionalidades después de cargar componentes
        this.initializeComponents();
        
        console.log('✅ Todos los componentes cargados');
    }

    async loadComponent(name, placeholderId) {
        try {
            const placeholder = document.getElementById(placeholderId);
            if (!placeholder) {
                console.warn(`⚠️ Placeholder ${placeholderId} no encontrado`);
                return;
            }

            const response = await fetch(this.components[name]);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            placeholder.innerHTML = html;
            this.loadedComponents.add(name);
            
            console.log(`✅ Componente ${name} cargado`);
        } catch (error) {
            console.error(`❌ Error cargando componente ${name}:`, error);
        }
    }

    initializeComponents() {
        // Reinicializar managers después de cargar componentes
        setTimeout(() => {


            // Language Manager
            if (window.languageManager) {
                window.languageManager.init();
            }

            // Dark Mode - REINICIALIZAR COMPLETAMENTE
            if (window.darkModeManager) {
                // Crear nueva instancia
                window.darkModeManager = new DarkModeManager();
                console.log('🌙 Dark Mode reinicializado después de componentes');
            }

            // WhatsApp Business - REINICIALIZAR COMPLETAMENTE
            if (window.whatsappBusiness) {
                // Crear nueva instancia
                window.whatsappBusiness = new WhatsAppBusiness();
                // Forzar setup después de reinicializar
                setTimeout(() => {
                    window.whatsappBusiness.setupWhatsAppButton();
                }, 50);
                console.log('📱 WhatsApp Business reinicializado después de componentes');
            }

            // Accessibility Manager - REINICIALIZAR COMPLETAMENTE
            if (window.accessibilityManager) {
                // Crear nueva instancia
                window.accessibilityManager = new AccessibilityManager();
                console.log('♿ Accessibility Manager reinicializado después de componentes');
            }

            // Aplicar traducciones
            if (window.languageManager) {
                window.languageManager.applyTranslations();
            }

            // Inicializar Sticky Header después de componentes
            if (typeof StickyHeaderManager !== 'undefined') {
                window.stickyHeaderManager = new StickyHeaderManager();
                console.log('📌 Sticky Header inicializado después de componentes');
            }

            console.log('🔄 Managers reinicializados');
        }, 100);
    }

    // Método para actualizar página activa en navbar
    setActivePage(pageName) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            const parent = link.closest('.nav-item');
            parent.classList.remove('active');
            
            // Verificar si el href coincide con la página actual
            const href = link.getAttribute('href');
            if (href && href.includes(pageName)) {
                parent.classList.add('active');
            }
        });
    }

    // Método para verificar si todos los componentes están cargados
    isReady() {
        return this.loadedComponents.size === Object.keys(this.components).length;
    }

    // Método para recargar un componente específico
    async reloadComponent(name, placeholderId) {
        console.log(`🔄 Recargando componente ${name}...`);
        await this.loadComponent(name, placeholderId);
        this.initializeComponents();
    }
}

// Función para detectar página actual
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    window.componentLoader = new ComponentLoader();
    await window.componentLoader.init();
    
    // Establecer página activa
    const currentPage = getCurrentPage();
    window.componentLoader.setActivePage(currentPage);
    
    console.log(`📄 Página actual: ${currentPage}`);
});

// Función global para debugging
window.reloadComponents = async () => {
    if (window.componentLoader) {
        await window.componentLoader.init();
        console.log('🔄 Componentes recargados manualmente');
    }
};

console.log('🔧 Component Loader cargado');
