#!/usr/bin/env node
const { createGzip } = require('node:zlib');
const { pipeline } = require('node:stream/promises');
const {
  createReadStream,
  createWriteStream,
  readdirSync,
} = require('node:fs');
const { cwd } = require('node:process')
const { extname } = require('node:path')

async function run(file) {
  const gzip = createGzip();
  const source = createReadStream(file);
  const destination = createWriteStream(`${file}.gz`);

  await pipeline(
    source,
    gzip,
    destination,
  );
  console.log(`${file} done ✅`);
}

const FILES_ALLOWED = ['.csv', '.xlsx']

files = readdirSync(cwd());
files.map(async (file) => {
  if(FILES_ALLOWED.includes(extname(file))) {
    run(file).catch(console.error)
  }
});
