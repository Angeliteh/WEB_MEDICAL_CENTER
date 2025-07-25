/**
 * STICKY HEADER INTELIGENTE
 * Sistema que maneja el comportamiento del header sticky
 */

class StickyHeaderManager {
    constructor() {
        this.header = null;
        this.lastScrollTop = 0;
        this.scrollThreshold = 20; // Píxeles antes de activar (muy sensible)
        this.isScrollingDown = false;
        this.isHeaderHidden = false;
        
        this.init();
    }

    init() {
        this.header = document.querySelector('.new-compact-header');
        this.navbar = document.querySelector('.navbar');

        if (!this.header) {
            console.log('🔍 Header sticky no encontrado');
            console.log('🔍 Headers disponibles:', document.querySelectorAll('header, section[class*="header"]'));
            return;
        }

        console.log('✅ Header encontrado:', this.header);
        console.log('✅ Navbar encontrado:', this.navbar);

        // Agregar clase inicial a ambos elementos
        this.header.classList.add('sticky-visible');
        if (this.navbar) {
            this.navbar.classList.add('sticky-visible');
        }

        this.bindEvents();
        console.log('📌 Sticky Header Manager initialized');

        // Test automático después de 3 segundos
        setTimeout(() => {
            console.log('🧪 Iniciando test automático del sticky header...');
            this.test();
        }, 3000);
    }

    bindEvents() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollBehavior();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Manejar resize para recalcular posiciones
        window.addEventListener('resize', () => {
            this.resetHeaderState();
        });
    }

    handleScrollBehavior() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Si estamos en la parte superior, mostrar siempre
        if (currentScrollTop <= this.scrollThreshold) {
            this.showHeader();
            this.lastScrollTop = currentScrollTop;
            return;
        }

        // Determinar dirección del scroll
        if (currentScrollTop > this.lastScrollTop) {
            // Scrolling hacia abajo
            if (!this.isScrollingDown) {
                this.isScrollingDown = true;
                console.log('📉 Scroll hacia abajo - ocultando header');
                this.hideHeader();
            }
        } else {
            // Scrolling hacia arriba
            if (this.isScrollingDown) {
                this.isScrollingDown = false;
                console.log('📈 Scroll hacia arriba - mostrando header');
                this.showHeader();
            }
        }

        this.lastScrollTop = currentScrollTop;
    }

    hideHeader() {
        if (!this.isHeaderHidden) {
            console.log('🔴 OCULTANDO HEADER Y NAVBAR');

            // Ocultar header
            this.header.classList.add('sticky-hidden');
            this.header.classList.remove('sticky-visible');

            // Ocultar navbar también
            if (this.navbar) {
                this.navbar.classList.add('sticky-hidden');
                this.navbar.classList.remove('sticky-visible');
            }

            this.isHeaderHidden = true;
        }
    }

    showHeader() {
        if (this.isHeaderHidden || !this.header.classList.contains('sticky-visible')) {
            // Mostrar header
            this.header.classList.remove('sticky-hidden');
            this.header.classList.add('sticky-visible');

            // Mostrar navbar también
            if (this.navbar) {
                this.navbar.classList.remove('sticky-hidden');
                this.navbar.classList.add('sticky-visible');
            }

            this.isHeaderHidden = false;
        }
    }

    resetHeaderState() {
        this.header.classList.remove('sticky-hidden', 'sticky-visible');
        this.isHeaderHidden = false;
        this.lastScrollTop = 0;
    }

    // Método público para forzar mostrar header
    forceShow() {
        this.showHeader();
    }

    // Método público para forzar ocultar header
    forceHide() {
        this.hideHeader();
    }

    // Método de test
    test() {
        if (!this.header) {
            console.log('❌ No se puede hacer test - header no encontrado');
            return;
        }

        console.log('🧪 Iniciando test del sticky header...');
        this.header.classList.add('sticky-test');

        setTimeout(() => {
            this.header.classList.remove('sticky-test');
            this.header.classList.add('sticky-hidden');
            console.log('🧪 Test: Header oculto');
        }, 1000);

        setTimeout(() => {
            this.header.classList.remove('sticky-hidden');
            this.header.classList.add('sticky-visible');
            console.log('🧪 Test: Header visible');
        }, 2000);

        setTimeout(() => {
            this.header.classList.remove('sticky-visible');
            console.log('🧪 Test completado');
        }, 3000);
    }
}

// Función para intentar inicializar
function tryInitializeStickyHeader() {
    if (!window.stickyHeaderManager || !window.stickyHeaderManager.header) {
        console.log('🔄 Intentando inicializar Sticky Header...');
        window.stickyHeaderManager = new StickyHeaderManager();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', tryInitializeStickyHeader);

// También inicializar después de que los componentes se carguen
window.addEventListener('load', () => {
    setTimeout(tryInitializeStickyHeader, 500);
});

// Retry después de que el component loader termine
setTimeout(() => {
    tryInitializeStickyHeader();
}, 2000);

// Función global para testing
window.testStickyHeader = function() {
    if (window.stickyHeaderManager) {
        window.stickyHeaderManager.test();
    } else {
        console.log('❌ Sticky Header Manager no inicializado');
    }
};
