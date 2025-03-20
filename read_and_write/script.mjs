import fs from 'fs/promises';
import path from 'path';

// const argument = process.argv.slice(2);
// const argument = process.argv[2];

const createFileWithMessage = async (message) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');

  const directory = `./${y}-${m}-${d}`; // yyyy-mm-dd

  try {
    await fs.access(directory);
    console.log(`Directory accessed successfully: ${directory}`);
  } catch (error) {
    // console.log(`Directory not accessible: ${directory}`);
    await fs.mkdir(directory);
  }

  // hh-mm-ss.txt
  // hh.txt
  const hour = date.getHours().toString().padStart(2, '0');
  const filename = hour + '.txt';
  // console.log(path.join(directory, filename));

  try {
    // await fs.writeFile(path.join(directory, filename), message);
    await fs.appendFile(path.join(directory, filename), '\n' + message);
    return path.join(directory, filename);
  } catch (error) {
    console.error(error);
  }
};

export { createFileWithMessage };

// createFileWithMessage(argument);
