// Accessibility Configuration
// Configuración personalizable para cumplimiento ADA/WCAG 2.1 AA

// ⚠️ IMPORTANTE: Personalizar esta configuración para cada cliente
const ACCESSIBILITY_CONFIG = {
    // 🔧 CONFIGURACIÓN GENERAL
    enabled: true, // Habilitar sistema de accesibilidad
    autoFix: true, // Reparación automática de problemas
    wcagLevel: 'AA', // AA o AAA
    
    // ⌨️ NAVEGACIÓN POR TECLADO
    keyboardNavigation: {
        enabled: true,
        focusVisible: true, // Indicadores de foco visibles
        skipLinks: true, // Enlaces de salto
        arrowKeyNavigation: true // Navegación con flechas en menús
    },
    
    // 🔊 SOPORTE PARA LECTORES DE PANTALLA
    screenReader: {
        enabled: true,
        liveRegions: true, // Regiones dinámicas
        ariaLabels: true, // Etiquetas ARIA automáticas
        landmarks: true, // Mejora de landmarks
        announcements: true // Anuncios automáticos
    },
    
    // 🎨 CONTRASTE Y COLORES
    colorContrast: {
        enabled: true,
        autoFix: true, // Corrección automática
        minimumRatio: 4.5, // WCAG AA (4.5:1)
        largeTextRatio: 3.0, // WCAG AA para texto grande (3:1)
        highContrastMode: true // Modo alto contraste disponible
    },
    
    // 📝 TIPOGRAFÍA
    typography: {
        enabled: true,
        minimumFontSize: 16, // Tamaño mínimo en px
        scalingEnabled: true, // Escalado de fuente
        maxScale: 1.5, // Escala máxima (150%)
        minScale: 0.8, // Escala mínima (80%)
        lineHeightMin: 1.5 // Altura de línea mínima
    },
    
    // 👆 ÁREAS DE TOQUE
    touchTargets: {
        enabled: true,
        minimumSize: 44, // Tamaño mínimo en px (WCAG)
        autoFix: true // Corrección automática
    },
    
    // 🎯 GESTIÓN DE FOCO
    focusManagement: {
        enabled: true,
        trapFocus: true, // Atrapar foco en modales
        restoreFocus: true, // Restaurar foco al cerrar
        visibleIndicators: true, // Indicadores visibles
        skipToContent: true // Saltar al contenido
    },
    
    // 📱 PANEL DE ACCESIBILIDAD
    accessibilityPanel: {
        enabled: true,
        position: 'right', // right, left
        alwaysVisible: false, // Siempre visible o solo en hover
        features: {
            highContrast: true,
            fontSize: true,
            reset: true
        }
    },
    
    // 🔍 DETECCIÓN AUTOMÁTICA
    autoDetection: {
        keyboardUsers: true, // Detectar usuarios de teclado
        screenReaderUsers: true, // Detectar lectores de pantalla
        reducedMotion: true, // Respetar prefers-reduced-motion
        highContrast: true // Respetar prefers-contrast
    },
    
    // 📊 ANALYTICS Y REPORTING
    analytics: {
        enabled: true,
        trackUsage: true, // Rastrear uso de funciones
        reportIssues: true, // Reportar problemas encontrados
        userPreferences: true // Guardar preferencias del usuario
    }
};

// 🏢 CONFIGURACIÓN POR SECTOR

function getSectorAccessibilityConfig(sector) {
    const configs = {
        medical: {
            // Sector médico requiere máxima accesibilidad
            wcagLevel: 'AAA',
            colorContrast: {
                minimumRatio: 7.0, // WCAG AAA
                largeTextRatio: 4.5
            },
            typography: {
                minimumFontSize: 18, // Más grande para sector médico
                maxScale: 2.0 // Permite más escalado
            },
            priority: 'maximum'
        },
        legal: {
            // Sector legal requiere cumplimiento estricto
            wcagLevel: 'AA',
            colorContrast: {
                minimumRatio: 4.5,
                largeTextRatio: 3.0
            },
            typography: {
                minimumFontSize: 16,
                maxScale: 1.8
            },
            priority: 'high'
        },
        creative: {
            // Sector creativo con flexibilidad visual
            wcagLevel: 'AA',
            colorContrast: {
                minimumRatio: 4.5,
                largeTextRatio: 3.0
            },
            typography: {
                minimumFontSize: 16,
                maxScale: 1.5
            },
            priority: 'standard'
        },
        business: {
            // Sector empresarial estándar
            wcagLevel: 'AA',
            colorContrast: {
                minimumRatio: 4.5,
                largeTextRatio: 3.0
            },
            typography: {
                minimumFontSize: 16,
                maxScale: 1.5
            },
            priority: 'standard'
        }
    };
    
    return configs[sector] || configs.business;
}

// 🎯 CONFIGURACIÓN AUTOMÁTICA

// Detectar sector desde configuración existente
const currentSector = window.SEO_CONFIG?.sector || 'medical';
const accessibilitySectorConfig = getSectorAccessibilityConfig(currentSector);

// Aplicar configuración del sector
Object.assign(ACCESSIBILITY_CONFIG, {
    wcagLevel: accessibilitySectorConfig.wcagLevel,
    colorContrast: { ...ACCESSIBILITY_CONFIG.colorContrast, ...accessibilitySectorConfig.colorContrast },
    typography: { ...ACCESSIBILITY_CONFIG.typography, ...accessibilitySectorConfig.typography }
});

// 📋 GUÍA DE CONFIGURACIÓN RÁPIDA
console.log(`
♿ ACCESSIBILITY SYSTEM - GUÍA DE CONFIGURACIÓN

1. 🔧 NIVEL DE CUMPLIMIENTO:
   - wcagLevel: AA (estándar) o AAA (máximo)
   
2. ⌨️ NAVEGACIÓN:
   - keyboardNavigation: Navegación por teclado
   - skipLinks: Enlaces de salto
   
3. 🎨 CONTRASTE:
   - minimumRatio: 4.5 (AA) o 7.0 (AAA)
   - highContrastMode: Modo alto contraste
   
4. 📝 TIPOGRAFÍA:
   - minimumFontSize: Tamaño mínimo de fuente
   - scalingEnabled: Escalado de fuente
   
5. 📱 PANEL:
   - accessibilityPanel.enabled: Mostrar panel
   - position: Posición del panel
   
📊 Configuración actual:
♿ Sector: ${currentSector}
📋 WCAG Level: ${ACCESSIBILITY_CONFIG.wcagLevel}
🎯 Prioridad: ${accessibilitySectorConfig.priority}
📝 Font mínimo: ${ACCESSIBILITY_CONFIG.typography.minimumFontSize}px
🎨 Contraste mínimo: ${ACCESSIBILITY_CONFIG.colorContrast.minimumRatio}:1
`);

// Exportar configuración para uso global
window.ACCESSIBILITY_CONFIG = ACCESSIBILITY_CONFIG;
