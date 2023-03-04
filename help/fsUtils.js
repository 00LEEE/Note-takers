const fs = require('fs').promises;

async function readJSONFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (err) {
    throw new Error(`Error reading ${filePath}: ${err.message}`);
  }
}

async function writeJSONFile(filePath, data) {
  try {
    const fileContent = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, fileContent, 'utf-8');
  } catch (err) {
    throw new Error(`Error writing to ${filePath}: ${err.message}`);
  }
}

module.exports = { readJSONFile, writeJSONFile };

