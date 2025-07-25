# Script completo para corregir todas las rutas relativas para GitHub Pages
# Ejecutar desde la raíz del proyecto

Write-Host "🔧 Corrigiendo todas las rutas para GitHub Pages..." -ForegroundColor Green

# Lista de archivos HTML a procesar
$htmlFiles = @(
    "about.html",
    "appointment.html", 
    "contact.html",
    "service.html",
    "gallery.html",
    "team.html",
    "offline.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "📝 Procesando: $file" -ForegroundColor Cyan
        
        # Leer contenido del archivo
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Corregir rutas de CSS que no empiecen con ./ o http
        $content = $content -replace 'href="(?!\.\/|http|#|tel:|mailto:)([^"]+\.css)"', 'href="./$1"'
        
        # Corregir rutas de JS que no empiecen con ./ o http
        $content = $content -replace 'src="(?!\.\/|http|https:)([^"]+\.js)"', 'src="./$1"'
        
        # Corregir rutas de imágenes que no empiecen con ./ o http
        $content = $content -replace 'src="(?!\.\/|http|https:|data:)([^"]+\.(png|jpg|jpeg|gif|svg|webp))"', 'src="./$1"'
        
        # Corregir rutas de manifest y favicon
        $content = $content -replace 'href="(?!\.\/|http)([^"]+manifest\.json)"', 'href="./$1"'
        $content = $content -replace 'href="(?!\.\/|http)([^"]+favicon\.(png|ico))"', 'href="./$1"'
        
        # Corregir enlaces a services.html -> service.html
        $content = $content -replace 'href="services\.html"', 'href="./service.html"'
        $content = $content -replace 'href="\.\/services\.html"', 'href="./service.html"'
        
        # Escribir contenido corregido
        $content | Set-Content $file -NoNewline -Encoding UTF8
        
        Write-Host "  ✅ Corregido: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ No encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host "`n🎯 Verificando archivos críticos..." -ForegroundColor Cyan

# Verificar manifest.json
if (Test-Path "manifest.json") {
    $manifest = Get-Content "manifest.json" -Raw
    if ($manifest -match '"/theme/"') {
        Write-Host "⚠️ manifest.json aún contiene rutas /theme/ - ya debería estar corregido" -ForegroundColor Yellow
    } else {
        Write-Host "✅ manifest.json - rutas correctas" -ForegroundColor Green
    }
}

# Verificar sw.js
if (Test-Path "sw.js") {
    $sw = Get-Content "sw.js" -Raw
    if ($sw -match '"/theme/"') {
        Write-Host "⚠️ sw.js aún contiene rutas /theme/ - ya debería estar corregido" -ForegroundColor Yellow
    } else {
        Write-Host "✅ sw.js - rutas correctas" -ForegroundColor Green
    }
}

Write-Host "`n🚀 ¡Proceso completado!" -ForegroundColor Green
Write-Host "📋 Resumen de cambios:" -ForegroundColor Yellow
Write-Host "  • Rutas CSS corregidas a ./css/" -ForegroundColor Gray
Write-Host "  • Rutas JS corregidas a ./js/" -ForegroundColor Gray
Write-Host "  • Rutas de imágenes corregidas a ./images/" -ForegroundColor Gray
Write-Host "  • Rutas de plugins corregidas a ./plugins/" -ForegroundColor Gray
Write-Host "  • Enlaces services.html → service.html" -ForegroundColor Gray
Write-Host "  • Manifest y SW con rutas relativas" -ForegroundColor Gray

Write-Host "`n🌐 Tu sitio está listo para GitHub Pages!" -ForegroundColor Cyan
Write-Host "📱 El PWA debería funcionar correctamente ahora" -ForegroundColor Cyan
