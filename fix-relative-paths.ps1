# Script para corregir rutas relativas en archivos HTML para GitHub Pages
# Ejecutar desde la raíz del proyecto

Write-Host "Corrigiendo rutas relativas en archivos HTML..." -ForegroundColor Green

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
        Write-Host "Procesando: $file" -ForegroundColor Cyan
        
        # Leer contenido del archivo
        $content = Get-Content $file -Raw
        
        # Corregir rutas de CSS y JS que no empiecen con ./ o http
        $content = $content -replace 'href="(?!\.\/|http|#)([^"]+)"', 'href="./$1"'
        $content = $content -replace 'src="(?!\.\/|http)([^"]+)"', 'src="./$1"'
        
        # Corregir enlaces a services.html -> service.html
        $content = $content -replace 'href="services\.html"', 'href="./service.html"'
        $content = $content -replace 'href="\.\/services\.html"', 'href="./service.html"'
        
        # Escribir contenido corregido
        $content | Set-Content $file -NoNewline
        
        Write-Host "✓ Corregido: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠ No encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host "`n¡Rutas corregidas exitosamente!" -ForegroundColor Green
Write-Host "Archivos procesados:" -ForegroundColor Yellow
foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Gray
    }
}

Write-Host "`nAhora tu sitio está listo para GitHub Pages!" -ForegroundColor Cyan
