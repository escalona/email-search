const fs = require('fs');
const path = require('path');
const dataDirectory = 'data';

function walkDirectory(dir, filePaths = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      filePaths = walkDirectory(filePath, filePaths);
    } else {
      const relativePath = filePath.split(`${dataDirectory}/`);
      filePaths.push(relativePath[1]);
    }
  });

  return filePaths;
}

module.exports = walkDirectory;
