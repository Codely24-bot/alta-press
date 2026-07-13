import { readFile, writeFile } from 'node:fs/promises';

const files = process.argv.slice(2);

function fixChunk(chunk) {
  return Buffer.from(chunk, 'latin1').toString('utf8');
}

function fixText(text) {
  return text.replace(/[^\x00-\x7F]*(?:Ã.|Â.|â..|�)[^\x00-\x7F]*/g, (chunk) => {
    const fixed = fixChunk(chunk);
    return fixed.includes('�') ? chunk : fixed;
  });
}

for (const file of files) {
  const text = await readFile(file, 'utf8');
  await writeFile(file, fixText(text), 'utf8');
  console.log(`fixed ${file}`);
}
