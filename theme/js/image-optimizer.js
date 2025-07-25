// Image Optimizer - WebP with Fallback System
// Sistema automático de optimización de imágenes

class ImageOptimizer {
    constructor() {
        this.config = {
            // Configuración de optimización
            enabled: true,
            webpSupport: null, // Se detecta automáticamente
            lazyLoading: true,
            progressiveLoading: true,
            
            // Configuración de formatos
            formats: {
                webp: { quality: 85, enabled: true },
                jpg: { quality: 90, enabled: true },
                png: { enabled: true }
            },
            
            // Configuración de lazy loading
            lazyOptions: {
                rootMargin: '50px 0px',
                threshold: 0.01
            },
            
            // Configuración de placeholder
            placeholder: {
                enabled: true,
                blur: true,
                color: '#f0f0f0'
            }
        };
        
        this.observer = null;
        this.processedImages = new Set();
        
        this.init();
    }
    
    init() {
        if (!this.config.enabled) return;
        
        // Detectar soporte WebP
        this.detectWebPSupport().then(supported => {
            this.config.webpSupport = supported;
            console.log('🖼️ WebP Support:', supported ? 'Yes' : 'No');
            
            // Procesar imágenes existentes
            this.processExistingImages();
            
            // Configurar lazy loading
            if (this.config.lazyLoading) {
                this.setupLazyLoading();
            }
            
            // Observar nuevas imágenes
            this.observeNewImages();
        });
        
        console.log('🖼️ Image Optimizer initialized');
    }
    
    async detectWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    processExistingImages() {
        const images = document.querySelectorAll('img:not([data-optimized])');
        
        images.forEach(img => {
            this.optimizeImage(img);
        });
        
        console.log(`🖼️ Processed ${images.length} existing images`);
    }
    
    optimizeImage(img) {
        if (this.processedImages.has(img)) return;
        
        const originalSrc = img.src || img.dataset.src;
        if (!originalSrc) return;
        
        // Marcar como procesada
        this.processedImages.add(img);
        img.setAttribute('data-optimized', 'true');
        
        // Generar URLs optimizadas
        const optimizedUrls = this.generateOptimizedUrls(originalSrc);
        
        // Configurar picture element si es necesario
        if (this.config.webpSupport && optimizedUrls.webp) {
            this.createPictureElement(img, optimizedUrls);
        } else {
            this.setupFallbackImage(img, optimizedUrls);
        }
        
        // Configurar lazy loading
        if (this.config.lazyLoading) {
            this.setupImageLazyLoading(img);
        }
        
        // Agregar placeholder si está habilitado
        if (this.config.placeholder.enabled) {
            this.addPlaceholder(img);
        }
    }
    
    generateOptimizedUrls(originalSrc) {
        const urls = {
            original: originalSrc
        };
        
        // Generar URL WebP si el archivo existe
        if (this.config.webpSupport) {
            urls.webp = this.convertToWebP(originalSrc);
        }
        
        // Generar URLs de diferentes tamaños (responsive)
        urls.responsive = this.generateResponsiveUrls(originalSrc);
        
        return urls;
    }
    
    convertToWebP(originalSrc) {
        // Convertir extensión a WebP
        const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Verificar si el archivo WebP existe
        return this.checkImageExists(webpSrc) ? webpSrc : null;
    }
    
    generateResponsiveUrls(originalSrc) {
        const sizes = [320, 640, 768, 1024, 1200, 1920];
        const responsive = {};
        
        sizes.forEach(size => {
            // Generar URL con sufijo de tamaño
            const responsiveSrc = originalSrc.replace(
                /(\.[^.]+)$/,
                `_${size}w$1`
            );
            
            responsive[size] = responsiveSrc;
        });
        
        return responsive;
    }
    
    checkImageExists(url) {
        // Esta función verificaría si la imagen existe
        // Por ahora, asumimos que existe si sigue el patrón correcto
        return url.includes('.webp');
    }
    
    createPictureElement(img, urls) {
        // Solo crear picture si no está ya dentro de uno
        if (img.parentElement.tagName === 'PICTURE') return;
        
        const picture = document.createElement('picture');
        
        // Agregar source para WebP
        if (urls.webp) {
            const webpSource = document.createElement('source');
            webpSource.srcset = urls.webp;
            webpSource.type = 'image/webp';
            picture.appendChild(webpSource);
        }
        
        // Agregar source para formato original
        const originalSource = document.createElement('source');
        originalSource.srcset = urls.original;
        picture.appendChild(originalSource);
        
        // Mover img dentro del picture
        img.parentNode.insertBefore(picture, img);
        picture.appendChild(img);
        
        // Copiar atributos importantes
        if (img.alt) picture.setAttribute('alt', img.alt);
        if (img.title) picture.setAttribute('title', img.title);
    }
    
    setupFallbackImage(img, urls) {
        // Configurar imagen con fallback simple
        if (urls.webp && this.config.webpSupport) {
            img.src = urls.webp;
            img.setAttribute('data-fallback', urls.original);
            
            // Manejar error de carga
            img.onerror = () => {
                if (img.src !== urls.original) {
                    img.src = urls.original;
                }
            };
        }
    }
    
    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            // Fallback para navegadores sin soporte
            this.loadAllImages();
            return;
        }
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.config.lazyOptions);
    }
    
    setupImageLazyLoading(img) {
        if (!this.observer) return;
        
        // Mover src a data-src para lazy loading
        if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.removeAttribute('src');
        }
        
        // Agregar clase de lazy loading
        img.classList.add('lazy-image');
        
        // Observar imagen
        this.observer.observe(img);
    }
    
    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
            img.classList.add('lazy-loaded');
            
            // Manejar carga completa
            img.onload = () => {
                img.classList.add('loaded');
                this.removePlaceholder(img);
            };
        }
    }
    
    loadAllImages() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => this.loadImage(img));
    }
    
    addPlaceholder(img) {
        if (!this.config.placeholder.enabled) return;
        
        // Crear placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
            background-color: ${this.config.placeholder.color};
            width: 100%;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        `;
        
        // Agregar icono de carga
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">📷</div>
                <div class="placeholder-text">Cargando imagen...</div>
            </div>
        `;
        
        // Insertar placeholder
        img.parentNode.insertBefore(placeholder, img);
        img.style.display = 'none';
        
        // Asociar placeholder con imagen
        img.dataset.placeholder = 'true';
    }
    
    removePlaceholder(img) {
        if (img.dataset.placeholder) {
            const placeholder = img.previousElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.remove();
            }
            img.style.display = '';
            delete img.dataset.placeholder;
        }
    }
    
    observeNewImages() {
        // Observar nuevas imágenes agregadas dinámicamente
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        const images = node.tagName === 'IMG' ? 
                            [node] : 
                            node.querySelectorAll('img:not([data-optimized])');
                        
                        images.forEach(img => this.optimizeImage(img));
                    }
                });
            });
        });
        
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Métodos públicos
    optimizeNewImage(img) {
        this.optimizeImage(img);
    }
    
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
    
    getOptimizationStats() {
        return {
            processedImages: this.processedImages.size,
            webpSupport: this.config.webpSupport,
            lazyLoading: this.config.lazyLoading,
            placeholders: this.config.placeholder.enabled
        };
    }
    
    // Método para convertir imágenes existentes a WebP (para uso manual)
    convertImageToWebP(imgElement, quality = 85) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                
                ctx.drawImage(img, 0, 0);
                
                // Convertir a WebP
                const webpDataUrl = canvas.toDataURL('image/webp', quality / 100);
                resolve(webpDataUrl);
            };
            
            img.src = imgElement.src;
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
});

console.log('🖼️ Image Optimizer loaded (WebP ready)');
