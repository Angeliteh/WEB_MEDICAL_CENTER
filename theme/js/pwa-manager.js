// PWA Manager - Progressive Web App System
// Sistema completo de gestión PWA con instalación y offline

class PWAManager {
    constructor() {
        this.config = {
            // Configuración del PWA
            appName: 'Centro Médico Profesional',
            shortName: 'Centro Médico',
            
            // Configuración de instalación
            installPrompt: {
                enabled: true,
                showAfterSeconds: 30, // Mostrar prompt después de 30 segundos
                showAfterPageViews: 2, // Mostrar después de 2 páginas vistas
                hideAfterDismiss: 7 // Ocultar por 7 días si se rechaza
            },
            
            // Configuración de notificaciones
            notifications: {
                enabled: true,
                welcomeMessage: true
            },
            
            // Configuración de cache
            cache: {
                version: '1.0.0',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
                maxSize: 50 * 1024 * 1024 // 50MB
            }
        };
        
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.isOnline = navigator.onLine;
        this.serviceWorkerRegistration = null;
        
        this.init();
    }
    
    async init() {
        // Verificar soporte PWA
        if (!this.isPWASupported()) {
            console.warn('⚠️ PWA: Not supported in this browser');
            return;
        }
        
        // Registrar Service Worker
        await this.registerServiceWorker();
        
        // Configurar eventos de instalación
        this.setupInstallPrompt();
        
        // Configurar eventos de red
        this.setupNetworkEvents();
        
        // Configurar eventos de app instalada
        this.setupAppEvents();
        
        // Crear UI de instalación
        this.createInstallUI();
        
        // Mostrar estado de conexión
        this.updateConnectionStatus();
        
        // Configurar notificaciones
        this.setupNotifications();
        
        console.log('📱 PWA Manager initialized');
        console.log('🔧 App Name:', this.config.appName);
        console.log('📶 Online:', this.isOnline);
    }
    
    isPWASupported() {
        return 'serviceWorker' in navigator && 'PushManager' in window;
    }
    
    async registerServiceWorker() {
        try {
            this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            
            console.log('✅ PWA: Service Worker registered successfully');
            
            // Escuchar actualizaciones
            this.serviceWorkerRegistration.addEventListener('updatefound', () => {
                this.handleServiceWorkerUpdate();
            });
            
            // Verificar si hay actualizaciones
            this.serviceWorkerRegistration.update();
            
        } catch (error) {
            console.error('❌ PWA: Service Worker registration failed:', error);
        }
    }
    
    handleServiceWorkerUpdate() {
        const newWorker = this.serviceWorkerRegistration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateAvailable();
            }
        });
    }
    
    showUpdateAvailable() {
        const currentLanguage = this.getCurrentLanguage();
        const message = currentLanguage === 'en' 
            ? 'A new version is available. Refresh to update.'
            : 'Nueva versión disponible. Actualiza para obtener las mejoras.';
        
        this.showNotification(message, 'update', () => {
            window.location.reload();
        });
    }
    
    setupInstallPrompt() {
        // Capturar evento beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('📱 PWA: Install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Mostrar botón de instalación después de un tiempo
            if (this.config.installPrompt.enabled) {
                setTimeout(() => {
                    this.showInstallPrompt();
                }, this.config.installPrompt.showAfterSeconds * 1000);
            }
        });
        
        // Detectar cuando la app se instala
        window.addEventListener('appinstalled', (e) => {
            console.log('🎉 PWA: App installed successfully');
            this.isInstalled = true;
            this.hideInstallUI();
            this.trackInstallation();
            this.showWelcomeMessage();
        });
    }
    
    setupNetworkEvents() {
        window.addEventListener('online', () => {
            console.log('📶 PWA: Back online');
            this.isOnline = true;
            this.updateConnectionStatus();
            this.showNotification('Conexión restaurada', 'success');
        });
        
        window.addEventListener('offline', () => {
            console.log('📵 PWA: Gone offline');
            this.isOnline = false;
            this.updateConnectionStatus();
            this.showNotification('Modo offline activado', 'info');
        });
    }
    
    setupAppEvents() {
        // Detectar si la app se ejecuta en modo standalone
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            console.log('📱 PWA: Running in standalone mode');
            this.isInstalled = true;
            document.body.classList.add('pwa-standalone');
        }
        
        // Prevenir zoom en dispositivos móviles cuando está instalada
        if (this.isInstalled) {
            document.addEventListener('gesturestart', (e) => {
                e.preventDefault();
            });
        }
    }
    
    createInstallUI() {
        // Crear botón de instalación flotante
        const installButton = document.createElement('div');
        installButton.id = 'pwa-install-button';
        installButton.className = 'pwa-install-button hidden';
        installButton.innerHTML = `
            <div class="pwa-install-content">
                <div class="pwa-install-icon">📱</div>
                <div class="pwa-install-text">
                    <div class="pwa-install-title" data-translate="pwa.install.title">Instalar App</div>
                    <div class="pwa-install-subtitle" data-translate="pwa.install.subtitle">Acceso rápido desde tu dispositivo</div>
                </div>
                <button class="pwa-install-btn" data-translate="pwa.install.button">Instalar</button>
                <button class="pwa-install-close">×</button>
            </div>
        `;
        
        document.body.appendChild(installButton);
        
        // Eventos del botón
        installButton.querySelector('.pwa-install-btn').addEventListener('click', () => {
            this.installApp();
        });
        
        installButton.querySelector('.pwa-install-close').addEventListener('click', () => {
            this.hideInstallUI();
            this.trackInstallDismiss();
        });
    }
    
    showInstallPrompt() {
        if (!this.deferredPrompt || this.isInstalled) return;
        
        // Verificar si no se ha rechazado recientemente
        const lastDismiss = localStorage.getItem('pwa-install-dismissed');
        if (lastDismiss) {
            const daysSinceDismiss = (Date.now() - parseInt(lastDismiss)) / (1000 * 60 * 60 * 24);
            if (daysSinceDismiss < this.config.installPrompt.hideAfterDismiss) {
                return;
            }
        }
        
        const installButton = document.getElementById('pwa-install-button');
        if (installButton) {
            installButton.classList.remove('hidden');
            installButton.classList.add('show');
        }
    }
    
    async installApp() {
        if (!this.deferredPrompt) return;
        
        try {
            // Mostrar prompt de instalación
            this.deferredPrompt.prompt();
            
            // Esperar respuesta del usuario
            const { outcome } = await this.deferredPrompt.userChoice;
            
            console.log('📱 PWA: Install prompt result:', outcome);
            
            if (outcome === 'accepted') {
                this.trackInstallAccepted();
            } else {
                this.trackInstallDeclined();
            }
            
            // Limpiar prompt
            this.deferredPrompt = null;
            this.hideInstallUI();
            
        } catch (error) {
            console.error('❌ PWA: Install failed:', error);
        }
    }
    
    hideInstallUI() {
        const installButton = document.getElementById('pwa-install-button');
        if (installButton) {
            installButton.classList.remove('show');
            installButton.classList.add('hidden');
        }
    }
    
    updateConnectionStatus() {
        // Actualizar indicador visual de conexión
        document.body.classList.toggle('pwa-offline', !this.isOnline);
        document.body.classList.toggle('pwa-online', this.isOnline);
        
        // Actualizar meta tag de theme-color según el estado
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.content = this.isOnline ? '#1e88e5' : '#757575';
        }
    }
    
    async setupNotifications() {
        if (!this.config.notifications.enabled) return;
        
        // Solicitar permisos de notificación
        if ('Notification' in window && Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            console.log('🔔 PWA: Notification permission:', permission);
        }
    }
    
    showNotification(message, type = 'info', action = null) {
        // Crear notificación visual en la app
        const notification = document.createElement('div');
        notification.className = `pwa-notification pwa-notification-${type}`;
        notification.innerHTML = `
            <div class="pwa-notification-content">
                <span class="pwa-notification-message">${message}</span>
                ${action ? '<button class="pwa-notification-action">Actualizar</button>' : ''}
                <button class="pwa-notification-close">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Eventos
        if (action) {
            notification.querySelector('.pwa-notification-action').addEventListener('click', action);
        }
        
        notification.querySelector('.pwa-notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    showWelcomeMessage() {
        if (!this.config.notifications.welcomeMessage) return;
        
        const currentLanguage = this.getCurrentLanguage();
        const message = currentLanguage === 'en' 
            ? '¡Welcome! The app has been installed successfully.'
            : '¡Bienvenido! La app se ha instalado correctamente.';
        
        setTimeout(() => {
            this.showNotification(message, 'success');
        }, 1000);
    }
    
    // Métodos de tracking
    trackInstallation() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_installed', {
                event_category: 'pwa',
                event_label: 'app_installation',
                value: 1
            });
        }
        
        console.log('📊 PWA: Installation tracked');
    }
    
    trackInstallAccepted() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_install_accepted', {
                event_category: 'pwa',
                event_label: 'install_prompt_accepted'
            });
        }
    }
    
    trackInstallDeclined() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_install_declined', {
                event_category: 'pwa',
                event_label: 'install_prompt_declined'
            });
        }
    }
    
    trackInstallDismiss() {
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_install_dismissed', {
                event_category: 'pwa',
                event_label: 'install_prompt_dismissed'
            });
        }
    }
    
    // Métodos auxiliares
    getCurrentLanguage() {
        if (window.languageManager && window.languageManager.getCurrentLanguage) {
            return window.languageManager.getCurrentLanguage();
        }
        return 'es';
    }
    
    // Métodos públicos para control
    async getCacheSize() {
        if (!this.serviceWorkerRegistration) return 0;
        
        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                resolve(event.data.cacheSize);
            };
            
            this.serviceWorkerRegistration.active.postMessage(
                { type: 'GET_CACHE_SIZE' },
                [messageChannel.port2]
            );
        });
    }
    
    async clearCache() {
        if (!this.serviceWorkerRegistration) return false;
        
        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                resolve(event.data.success);
            };
            
            this.serviceWorkerRegistration.active.postMessage(
                { type: 'CLEAR_CACHE' },
                [messageChannel.port2]
            );
        });
    }
    
    getAppInfo() {
        return {
            name: this.config.appName,
            shortName: this.config.shortName,
            isInstalled: this.isInstalled,
            isOnline: this.isOnline,
            hasServiceWorker: !!this.serviceWorkerRegistration,
            canInstall: !!this.deferredPrompt,
            version: this.config.cache.version
        };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = new PWAManager();
});

console.log('📱 PWA Manager loaded');
