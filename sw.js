// Service Worker - PWA System
// Sistema completo de cache y funcionamiento offline

const CACHE_NAME = 'centro-medico-v1.0.0';
const OFFLINE_URL = './offline.html';

// Archivos críticos para el App Shell
const CORE_CACHE_FILES = [
  './',
  './index.html',
  './offline.html',

  // CSS críticos
  './plugins/bootstrap/bootstrap.min.css',
  './css/style.css',
  './css/dark-mode.css',
  './css/whatsapp-button.css',
  './css/pwa-styles.css',

  // JavaScript críticos
  './plugins/jquery.min.js',
  './plugins/bootstrap/bootstrap.min.js',
  './js/script.js',
  './js/language-manager.js',
  './js/translations.js',
  './js/dark-mode.js',
  './js/whatsapp-business.js',
  './js/seo-optimizer.js',
  './js/pwa-manager.js',

  // Configuraciones
  './js/whatsapp-config.js',
  './js/seo-config.js',
  './manifest.json',

  // Fuentes críticas
  './plugins/fontawesome/css/all.min.css',

  // Imágenes críticas
  './images/logo.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-512x512.png'
];

// Archivos de contenido (cache bajo demanda)
const CONTENT_CACHE_FILES = [
  // Imágenes de contenido
  './images/about/',
  './images/gallery/',
  './images/team/',
  './images/testimonials/',
  './images/blog/',

  // Plugins adicionales
  './plugins/',

  // Páginas adicionales
  './about.html',
  './service.html',
  './contact.html',
  './gallery.html',
  './team.html',
  './appointment.html'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching core files');
        return cache.addAll(CORE_CACHE_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker: Core files cached successfully');
        return self.skipWaiting(); // Activar inmediatamente
      })
      .catch((error) => {
        console.error('❌ Service Worker: Error caching core files:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activated successfully');
        return self.clients.claim(); // Tomar control inmediatamente
      })
  );
});

// Estrategia de fetch - Network First con Cache Fallback
self.addEventListener('fetch', (event) => {
  // Solo manejar requests HTTP/HTTPS
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  // Estrategia especial para navegación (páginas HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(event.request));
    return;
  }
  
  // Estrategia especial para imágenes
  if (event.request.destination === 'image') {
    event.respondWith(handleImageRequest(event.request));
    return;
  }
  
  // Estrategia especial para archivos estáticos (CSS, JS)
  if (event.request.destination === 'style' || 
      event.request.destination === 'script' ||
      event.request.destination === 'font') {
    event.respondWith(handleStaticRequest(event.request));
    return;
  }
  
  // Estrategia por defecto - Network First
  event.respondWith(handleDefaultRequest(event.request));
});

// Manejar requests de navegación (páginas)
async function handleNavigationRequest(request) {
  try {
    // Intentar red primero
    const networkResponse = await fetch(request);
    
    // Si la respuesta es exitosa, cachearla y devolverla
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
    
  } catch (error) {
    console.log('🌐 Service Worker: Network failed, trying cache for:', request.url);
    
    // Si falla la red, intentar cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si no hay cache, mostrar página offline
    const offlineResponse = await caches.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Fallback final
    return new Response('Página no disponible offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Manejar requests de imágenes
async function handleImageRequest(request) {
  try {
    // Cache First para imágenes
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si no está en cache, buscar en red
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Image not found');
    
  } catch (error) {
    console.log('🖼️ Service Worker: Image not available:', request.url);
    
    // Imagen placeholder para offline
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="#f0f0f0"/><text x="100" y="75" text-anchor="middle" fill="#999" font-family="Arial" font-size="14">Imagen no disponible</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}

// Manejar requests de archivos estáticos
async function handleStaticRequest(request) {
  try {
    // Cache First para archivos estáticos
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si no está en cache, buscar en red y cachear
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Static file not found');
    
  } catch (error) {
    console.log('📁 Service Worker: Static file not available:', request.url);
    return new Response('Archivo no disponible', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// Manejar requests por defecto
async function handleDefaultRequest(request) {
  try {
    // Network First por defecto
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
    
  } catch (error) {
    // Fallback a cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Contenido no disponible offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ cacheSize: size });
    });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    clearCache().then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

// Obtener tamaño del cache
async function getCacheSize() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  let totalSize = 0;
  
  for (const key of keys) {
    const response = await cache.match(key);
    if (response) {
      const blob = await response.blob();
      totalSize += blob.size;
    }
  }
  
  return totalSize;
}

// Limpiar cache
async function clearCache() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

// Sincronización en background (para futuras funcionalidades)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Aquí se pueden implementar tareas de sincronización
  // como envío de formularios offline, etc.
  console.log('🔄 Service Worker: Performing background sync');
}

console.log('📱 Service Worker: Loaded successfully');
