window.marker = null;

function initialize() {
  try {
    var map;

    // Centro Médico Profesional - Ciudad de México, México
    var centroMedico = new google.maps.LatLng(19.432608, -99.133209); // Av. Reforma, CDMX

    console.log('🗺️ Initializing Google Maps...');

  var style = [{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "saturation": -100
      },
      {
        "lightness": -8
      },
      {
        "gamma": 1.18
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "saturation": -100
      },
      {
        "gamma": 1
      },
      {
        "lightness": -24
      }
    ]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "saturation": -100
    }]
  }, {
    "featureType": "administrative",
    "stylers": [{
      "saturation": -100
    }]
  }, {
    "featureType": "transit",
    "stylers": [{
      "saturation": -100
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
      "saturation": -100
    }]
  }, {
    "featureType": "road",
    "stylers": [{
      "saturation": -100
    }]
  }, {
    "featureType": "administrative",
    "stylers": [{
      "saturation": -100
    }]
  }, {
    "featureType": "landscape",
    "stylers": [{
      "saturation": -100
    }]
  }, {
    "featureType": "poi",
    "stylers": [{
      "saturation": -100
    }]
  }, {}];

  var mapOptions = {
    // SET THE CENTER
    center: centroMedico,

    // SET THE MAP STYLE & ZOOM LEVEL
    mapTypeId: google.maps.MapTypeId.ROADMAP,

    // SET THE BACKGROUND COLOUR
    backgroundColor: "#000",

    // REMOVE ALL THE CONTROLS EXCEPT ZOOM
    zoom: 16, // Zoom ajustado para mejor vista del área
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE
    }

  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // SET THE MAP TYPE
  var mapType = new google.maps.StyledMapType(style, {
    name: "Grayscale"
  });
  map.mapTypes.set('grey', mapType);
  map.setMapTypeId('grey');

  //CREATE A CUSTOM PIN ICON
  var marker_image = 'plugins/google-map/images/marker.png';
  var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(74, 73));

  marker = new google.maps.Marker({
    position: centroMedico,
    map: map,
    icon: pinIcon,
    title: 'Centro Médico Profesional'
  });

  // Agregar ventana de información
  var infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px; max-width: 250px;">
        <h4 style="margin: 0 0 10px 0; color: #1e88e5;">Centro Médico Profesional</h4>
        <p style="margin: 0 0 5px 0;"><strong>Dirección:</strong><br>Av. Reforma 123, Col. Centro<br>Ciudad de México, 06000</p>
        <p style="margin: 0 0 5px 0;"><strong>Teléfono:</strong><br>(+52) 55 1234-5678</p>
        <p style="margin: 0;"><strong>Horarios:</strong><br>Lun-Vie: 8:00 AM - 8:00 PM<br>Sáb: 8:00 AM - 2:00 PM</p>
      </div>
    `
  });

  // Mostrar ventana de información al hacer clic en el marcador
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });

  console.log('✅ Google Maps initialized successfully');

  // Verificar después de 3 segundos si hay errores de billing
  setTimeout(() => {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      // Buscar elementos que indiquen error de billing
      const errorElements = mapDiv.querySelectorAll('[style*="color: rgb(86, 86, 86)"]');
      const hasError = mapDiv.innerHTML.includes('BillingNotEnabledMapError') ||
                      mapDiv.innerHTML.includes('billing') ||
                      errorElements.length > 0;

      if (hasError) {
        console.warn('⚠️ Billing error detected after initialization, showing fallback');
        handleMapError();
      }
    }
  }, 3000);

  } catch (error) {
    console.error('❌ Error initializing Google Maps:', error);
    handleMapError();
  }
}

// Función de manejo de errores
function handleMapError() {
  console.log('🗺️ Mostrando mapa profesional (Google Maps requiere billing)');
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 400px;
        background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
        border-radius: 12px;
        text-align: center;
        padding: 30px;
        color: white;
        position: relative;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      ">
        <div style="position: relative; z-index: 2; max-width: 500px;">
          <div style="margin-bottom: 25px;">
            <i class="fas fa-hospital" style="font-size: 64px; color: #fff; margin-bottom: 20px; text-shadow: 0 4px 8px rgba(0,0,0,0.3);"></i>
            <h3 style="color: #fff; margin-bottom: 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); font-size: 28px;">Centro Médico Profesional</h3>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin-bottom: 25px;">Tu salud es nuestra prioridad</p>
          </div>

          <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.2);">
            <div style="display: grid; gap: 15px; text-align: left;">
              <div style="display: flex; align-items: center;">
                <i class="fas fa-map-marker-alt" style="margin-right: 12px; font-size: 18px; width: 20px;"></i>
                <div>
                  <strong>Dirección:</strong><br>
                  <span style="opacity: 0.9;">Av. Reforma 123, Col. Centro<br>Ciudad de México, 06000 México</span>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <i class="fas fa-phone" style="margin-right: 12px; font-size: 18px; width: 20px;"></i>
                <div>
                  <strong>Teléfono:</strong><br>
                  <span style="opacity: 0.9;">(+52) 55 1234-5678</span>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <i class="fas fa-envelope" style="margin-right: 12px; font-size: 18px; width: 20px;"></i>
                <div>
                  <strong>Email:</strong><br>
                  <span style="opacity: 0.9;">contacto@centromedico.com</span>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <i class="fas fa-clock" style="margin-right: 12px; font-size: 18px; width: 20px;"></i>
                <div>
                  <strong>Horarios:</strong><br>
                  <span style="opacity: 0.9;">Lun-Vie: 8:00 AM - 8:00 PM<br>Sáb: 8:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="https://maps.google.com/?q=19.432608,-99.133209" target="_blank"
               style="
                 display: inline-flex;
                 align-items: center;
                 background: rgba(255,255,255,0.2);
                 color: white;
                 padding: 12px 24px;
                 border-radius: 30px;
                 text-decoration: none;
                 font-weight: 600;
                 transition: all 0.3s ease;
                 border: 2px solid rgba(255,255,255,0.3);
                 backdrop-filter: blur(5px);
               "
               onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)'">
              <i class="fas fa-map" style="margin-right: 8px;"></i>
              Ver en Google Maps
            </a>
            <a href="tel:+525512345678"
               style="
                 display: inline-flex;
                 align-items: center;
                 background: rgba(255,255,255,0.2);
                 color: white;
                 padding: 12px 24px;
                 border-radius: 30px;
                 text-decoration: none;
                 font-weight: 600;
                 transition: all 0.3s ease;
                 border: 2px solid rgba(255,255,255,0.3);
                 backdrop-filter: blur(5px);
               "
               onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)'">
              <i class="fas fa-phone" style="margin-right: 8px;"></i>
              Llamar Ahora
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

// Función para manejar errores de Google Maps API
function handleGoogleMapsError() {
  console.error('❌ Google Maps API Error detected');
  setTimeout(() => {
    handleMapError();
  }, 1000);
}

// Escuchar errores globales de Google Maps
window.gm_authFailure = handleGoogleMapsError;

// Listener para errores de billing que aparecen después
window.addEventListener('error', function(e) {
  if (e.message && e.message.includes('BillingNotEnabledMapError')) {
    console.error('❌ Billing error detected:', e.message);
    handleGoogleMapsError();
  }
});

// Interceptar console.error para detectar errores de Maps
const originalConsoleError = console.error;
console.error = function(...args) {
  const message = args.join(' ');
  if (message.includes('BillingNotEnabledMapError') || message.includes('Google Maps')) {
    console.log('🔄 Billing error detected, activating fallback...');
    setTimeout(() => {
      const mapContainer = document.getElementById('map');
      if (mapContainer && !mapContainer.innerHTML.includes('Centro Médico Profesional')) {
        handleMapError();
      }
    }, 500); // Reducir timeout para activación más rápida
  }
  originalConsoleError.apply(console, args);
};

// Verificación adicional cada 2 segundos para detectar errores de billing
let billingCheckInterval = setInterval(() => {
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    // Buscar el mensaje de error de Google Maps
    const errorMessage = mapContainer.querySelector('[style*="color: rgb(86, 86, 86)"]');
    const hasErrorText = mapContainer.textContent.includes("This page can't load Google Maps correctly") ||
                        mapContainer.textContent.includes("Do you own this website?");

    if (errorMessage || hasErrorText) {
      console.log('🔄 Google Maps error detected in DOM, activating fallback...');
      clearInterval(billingCheckInterval);
      handleMapError();
    }
  }
}, 2000);

// Inicializar mapa con manejo de errores mejorado
if ($('#map').length) {
  // Verificar si Google Maps está disponible
  if (typeof google !== 'undefined' && google.maps) {
    console.log('🗺️ Google Maps API detected, initializing...');

    // Timeout para detectar si el mapa no carga
    let mapLoaded = false;
    const mapTimeout = setTimeout(() => {
      if (!mapLoaded) {
        console.warn('⏰ Google Maps timeout - API might have billing issues');
        handleMapError();
      }
    }, 5000); // 5 segundos timeout

    // Timeout adicional para verificar errores de billing después de la carga
    const billingCheckTimeout = setTimeout(() => {
      const mapContainer = document.getElementById('map');
      if (mapContainer && mapLoaded) {
        // Verificar si el mapa está realmente funcionando
        const mapContent = mapContainer.innerHTML;
        if (mapContent.includes('BillingNotEnabledMapError') ||
            mapContent.includes('billing') ||
            mapContainer.querySelector('.gm-err-container')) {
          console.warn('💳 Billing error detected after successful load');
          handleMapError();
        }
      }
    }, 6000); // Verificar después de 6 segundos

    // Función wrapper para marcar como cargado
    const initializeWithCallback = function() {
      try {
        initialize();
        mapLoaded = true;
        clearTimeout(mapTimeout);
        console.log('✅ Google Maps loaded successfully');

        // No limpiar billingCheckTimeout - necesitamos verificar billing después

      } catch (error) {
        console.error('❌ Error in initialize:', error);
        clearTimeout(mapTimeout);
        clearTimeout(billingCheckTimeout);
        handleMapError();
      }
    };

    // Intentar inicializar inmediatamente si ya está cargado
    if (document.readyState === 'complete') {
      initializeWithCallback();
    } else {
      google.maps.event.addDomListener(window, 'load', initializeWithCallback);
    }

  } else {
    console.warn('⚠️ Google Maps API not loaded, showing fallback');
    setTimeout(handleMapError, 1000);
  }
} else {
  console.warn('⚠️ Map container not found');
}
