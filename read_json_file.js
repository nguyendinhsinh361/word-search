import fs from 'fs';
import util from 'util';

export async function readJSONFile(filePath) {
    try {
        let data;
        const readFile = util.promisify(fs.readFile);
        const fileContent = await readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
        return data;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
  }