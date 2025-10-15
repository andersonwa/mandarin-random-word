const fs = require('fs');
const path = require('path');

// Path to your text file
const filePath = path.join(__dirname, 'mandarin.txt');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split file content into lines and remove empty ones
  const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

  if (lines.length === 0) {
    console.log('No lines found in the file.');
    return;
  }

  // Get a random line
  const randomIndex = Math.floor(Math.random() * lines.length);
  const randomLine = lines[randomIndex].split(' = ');

  console.log('🎲 Random line:');
  console.log(`${randomLine[0]}`);
  console.log(`${randomLine[1]}`);
});