// scripts/postexport.js
const fs = require("fs");
const path = require("path");

// Directorio de exportación generado por Next.js
const outDir = path.join(__dirname, "../out");

// Directorio destino para la aplicación con basePath (mi-clima)
const targetDir = path.join(outDir, "mi-clima");

// Crear el directorio destino de forma recursiva si no existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Función para mover un archivo o carpeta
function moveItem(src, dest) {
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
  } else {
    console.warn(`No se encontró ${src}`);
  }
}

// Mover index.html
moveItem(path.join(outDir, "index.html"), path.join(targetDir, "index.html"));

// Mover la carpeta _next
moveItem(path.join(outDir, "_next"), path.join(targetDir, "_next"));

console.log("postexport completado");
