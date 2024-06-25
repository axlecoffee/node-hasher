const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const inputDir = './input';
const outputDir = './output';

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const hashes = [];

  files.forEach((file) => {
    const filePath = path.join(inputDir, file);
    const fileExt = path.extname(file);

    if (fileExt === '.jar') {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const hash = crypto.createHash('sha256');
        hash.update(data);
        const sha256 = hash.digest('hex');

        hashes.push(`${file}: ${sha256}`);
        fs.appendFile(path.join(outputDir, 'hashes.txt'), `${sha256}\n`, (err) => {
            if (err) {
              console.error(err);
            }
        })
        // Write the hashes to the file as they are generated
        fs.appendFile(path.join(outputDir, 'hashes-with-names.txt'), `${file}: ${sha256}\n`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  });
});