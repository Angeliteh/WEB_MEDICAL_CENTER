// PWA Icon Generator
// Generador automático de iconos PWA usando canvas

class PWAIconGenerator {
    constructor() {
        this.config = {
            // Configuración del icono
            backgroundColor: '#1e88e5',
            iconColor: '#ffffff',
            iconSymbol: '🏥', // Emoji o símbolo
            textSymbol: 'CM', // Texto alternativo
            useEmoji: true, // true = emoji, false = texto
            
            // Tamaños requeridos
            sizes: [72, 96, 128, 144, 152, 192, 384, 512],
            
            // Configuración visual
            borderRadius: 0.125, // 12.5% del tamaño
            shadowBlur: 0.05, // 5% del tamaño
            fontSize: 0.5 // 50% del tamaño
        };
        
        this.init();
    }
    
    init() {
        this.generateAllIcons();
        console.log('🎨 PWA Icon Generator initialized');
    }
    
    generateAllIcons() {
        this.config.sizes.forEach(size => {
            this.generateIcon(size);
        });
        
        // Generar iconos de shortcuts
        this.generateShortcutIcons();
        
        console.log('✅ All PWA icons generated');
    }
    
    generateIcon(size) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = size;
        canvas.height = size;
        
        // Fondo con gradiente
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, this.config.backgroundColor);
        gradient.addColorStop(1, this.darkenColor(this.config.backgroundColor, 0.2));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        // Borde redondeado
        const borderRadius = size * this.config.borderRadius;
        this.roundRect(ctx, 0, 0, size, size, borderRadius);
        
        // Sombra interior
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = size * this.config.shadowBlur;
        ctx.shadowOffsetY = size * 0.02;
        
        // Icono central
        ctx.fillStyle = this.config.iconColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (this.config.useEmoji) {
            // Usar emoji
            ctx.font = `${size * this.config.fontSize}px Arial`;
            ctx.fillText(this.config.iconSymbol, size / 2, size / 2);
        } else {
            // Usar texto
            ctx.font = `bold ${size * this.config.fontSize}px Arial`;
            ctx.fillText(this.config.textSymbol, size / 2, size / 2);
        }
        
        // Convertir a blob y crear URL
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            this.downloadIcon(url, `icon-${size}x${size}.png`);
        }, 'image/png');
    }
    
    generateShortcutIcons() {
        const shortcuts = [
            { name: 'appointment', symbol: '📅', color: '#4caf50' },
            { name: 'contact', symbol: '📞', color: '#2196f3' },
            { name: 'services', symbol: '🏥', color: '#ff9800' },
            { name: 'emergency', symbol: '🚨', color: '#f44336' }
        ];
        
        shortcuts.forEach(shortcut => {
            this.generateShortcutIcon(shortcut);
        });
    }
    
    generateShortcutIcon(shortcut) {
        const size = 96;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = size;
        canvas.height = size;
        
        // Fondo con color específico
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, shortcut.color);
        gradient.addColorStop(1, this.darkenColor(shortcut.color, 0.2));
        
        ctx.fillStyle = gradient;
        this.roundRect(ctx, 0, 0, size, size, size * 0.2);
        
        // Icono
        ctx.fillStyle = '#ffffff';
        ctx.font = `${size * 0.5}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(shortcut.symbol, size / 2, size / 2);
        
        // Convertir y descargar
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            this.downloadIcon(url, `shortcut-${shortcut.name}.png`);
        }, 'image/png');
    }
    
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }
    
    darkenColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * amount));
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * amount));
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * amount));
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    downloadIcon(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Método público para generar iconos personalizados
    generateCustomIcon(options) {
        const config = { ...this.config, ...options };
        
        config.sizes.forEach(size => {
            this.generateIconWithConfig(size, config);
        });
    }
    
    generateIconWithConfig(size, config) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = size;
        canvas.height = size;
        
        // Aplicar configuración personalizada
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, config.backgroundColor);
        gradient.addColorStop(1, this.darkenColor(config.backgroundColor, 0.2));
        
        ctx.fillStyle = gradient;
        this.roundRect(ctx, 0, 0, size, size, size * config.borderRadius);
        
        ctx.fillStyle = config.iconColor;
        ctx.font = `${config.useEmoji ? '' : 'bold '}${size * config.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const symbol = config.useEmoji ? config.iconSymbol : config.textSymbol;
        ctx.fillText(symbol, size / 2, size / 2);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            this.downloadIcon(url, `custom-icon-${size}x${size}.png`);
        }, 'image/png');
    }
}

// Función para generar iconos automáticamente
function generatePWAIcons(customConfig = {}) {
    const generator = new PWAIconGenerator();
    
    if (Object.keys(customConfig).length > 0) {
        generator.generateCustomIcon(customConfig);
    }
    
    return generator;
}

// Configuraciones predefinidas por sector
const SECTOR_ICON_CONFIGS = {
    medical: {
        backgroundColor: '#1e88e5',
        iconSymbol: '🏥',
        textSymbol: 'CM',
        useEmoji: true
    },
    legal: {
        backgroundColor: '#2e7d32',
        iconSymbol: '⚖️',
        textSymbol: 'BL',
        useEmoji: true
    },
    creative: {
        backgroundColor: '#e91e63',
        iconSymbol: '🎨',
        textSymbol: 'EC',
        useEmoji: true
    },
    business: {
        backgroundColor: '#ff9800',
        iconSymbol: '💼',
        textSymbol: 'EP',
        useEmoji: true
    }
};

// Función para generar iconos por sector
function generateSectorIcons(sector) {
    const config = SECTOR_ICON_CONFIGS[sector] || SECTOR_ICON_CONFIGS.business;
    return generatePWAIcons(config);
}

// Exportar para uso global
window.PWAIconGenerator = PWAIconGenerator;
window.generatePWAIcons = generatePWAIcons;
window.generateSectorIcons = generateSectorIcons;

console.log('🎨 PWA Icon Generator loaded');
console.log('💡 Use generateSectorIcons("medical") to generate icons');
