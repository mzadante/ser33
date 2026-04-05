const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'assets', 'fonts');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const fonts = [
  {
    url: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.ttf',
    name: 'CormorantGaramond-Bold.ttf'
  },
  {
    url: 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf',
    name: 'Montserrat-Regular.ttf'
  },
  {
    url: 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs36Ew-.ttf',
    name: 'Montserrat-SemiBold.ttf'
  }
];

let done = 0;

fonts.forEach(f => {
  const filePath = path.join(dir, f.name);
  const file = fs.createWriteStream(filePath);
  
  https.get(f.url, res => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      done++;
      const size = fs.statSync(filePath).size;
      console.log(`Downloaded: ${f.name} (${size} bytes)`);
      
      if (done === fonts.length) {
        console.log('\nAll fonts downloaded. Converting to Base64...\n');
        
        fonts.forEach(ff => {
          const fontPath = path.join(dir, ff.name);
          const data = fs.readFileSync(fontPath);
          const b64 = data.toString('base64');
          const varName = ff.name.replace('.ttf', '').replace(/-/g, '_');
          const jsContent = `// Auto-generated font file - DO NOT EDIT\nexport const ${varName} = "${b64}";\n`;
          const jsPath = path.join(dir, varName + '.js');
          fs.writeFileSync(jsPath, jsContent);
          console.log(`Created: ${varName}.js (${Math.round(b64.length / 1024)} KB base64)`);
        });
        
        console.log('\nDone! All fonts ready for jsPDF.');
      }
    });
  }).on('error', err => {
    console.error(`Error downloading ${f.name}:`, err.message);
  });
});
