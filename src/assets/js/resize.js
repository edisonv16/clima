
  const sharp = require('sharp');
  const fs = require('fs');
  const directorytwo = '../../../build/assets/images';
  
  fs.readdirSync(directorytwo).forEach(file => {
    const name = file.split('.')[0];
    sharp(`${directorytwo}/${file}`)
      .resize(450, 450) // width
      .toFile(`${directorytwo}/${name}-small.jpg`);
  
    sharp(`${directorytwo}/${file}`)
      .resize(750) // width
      .toFile(`${directorytwo}/${name}-medium.jpg`);
  });
