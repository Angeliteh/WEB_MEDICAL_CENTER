# Script para mover archivos de theme a la raíz para GitHub Pages
# Ejecutar desde la raíz del proyecto

Write-Host "Moviendo archivos de theme/ a la raíz del proyecto..." -ForegroundColor Green

# Crear backup de archivos existentes en la raíz si existen
if (Test-Path "index.html") {
    Write-Host "Creando backup de archivos existentes..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path "backup-root"
    Move-Item "index.html" "backup-root/" -Force -ErrorAction SilentlyContinue
}

# Mover archivos HTML
Write-Host "Moviendo archivos HTML..." -ForegroundColor Cyan
Get-ChildItem "theme/*.html" | ForEach-Object {
    Move-Item $_.FullName "./" -Force
    Write-Host "Movido: $($_.Name)" -ForegroundColor Gray
}

# Mover directorios
Write-Host "Moviendo directorios..." -ForegroundColor Cyan
$directories = @("css", "js", "images", "plugins", "components", "includes")
foreach ($dir in $directories) {
    if (Test-Path "theme/$dir") {
        if (Test-Path "./$dir") {
            Remove-Item "./$dir" -Recurse -Force
        }
        Move-Item "theme/$dir" "./" -Force
        Write-Host "Movido directorio: $dir" -ForegroundColor Gray
    }
}

# Mover archivos individuales importantes
Write-Host "Moviendo archivos de configuración..." -ForegroundColor Cyan
$files = @("manifest.json", "sw.js", "offline.html")
foreach ($file in $files) {
    if (Test-Path "theme/$file") {
        Move-Item "theme/$file" "./" -Force
        Write-Host "Movido: $file" -ForegroundColor Gray
    }
}

# Mover archivos de documentación
Write-Host "Moviendo documentación..." -ForegroundColor Cyan
Get-ChildItem "theme/*.md" | ForEach-Object {
    Move-Item $_.FullName "./" -Force
    Write-Host "Movido: $($_.Name)" -ForegroundColor Gray
}

Write-Host "¡Archivos movidos exitosamente!" -ForegroundColor Green
Write-Host "Ahora puedes eliminar la carpeta theme/ si está vacía" -ForegroundColor Yellow
Write-Host "Recuerda actualizar las rutas en los archivos si es necesario" -ForegroundColor Yellow
