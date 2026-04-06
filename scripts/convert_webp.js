import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('src/assets');

async function convertToWebp() {
  try {
    const files = fs.readdirSync(assetsDir);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const filePath = path.join(assetsDir, file);
        const fileNameWithoutExt = path.basename(file, ext);
        const webpFilePath = path.join(assetsDir, `${fileNameWithoutExt}.webp`);
        
        // Skip if webp already exists
        if (fs.existsSync(webpFilePath)) continue;

        console.log(`Convirtiendo: ${file} -> ${fileNameWithoutExt}.webp`);
        
        await sharp(filePath)
          .webp({ quality: 80 }) // 80% quality is a great balance between size and quality
          .toFile(webpFilePath);
          
        const originalSize = fs.statSync(filePath).size / 1024 / 1024;
        const newSize = fs.statSync(webpFilePath).size / 1024 / 1024;
        
        console.log(`✅ Reducido de ${originalSize.toFixed(2)}MB a ${newSize.toFixed(2)}MB`);
      }
    }
    console.log("¡Todas las imágenes han sido convertidas a WebP exitosamente!");
  } catch (error) {
    console.error("Error al convertir:", error);
  }
}

convertToWebp();
