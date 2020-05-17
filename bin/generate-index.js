#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const Trie = require('../trie');
const trie = new Trie();
const outputPath = path.join(__dirname, '../data/search-index.json');

/** Generate search index from emails in data/skilling-j directory */
async function generateIndex() {
  console.log('Generating index...');
  try {
    await trie.indexEmails(path.join(__dirname, '../data/skilling-j'));
    return trie.toJSON();
  } catch (err) {
    console.error(err);
  }
}

return generateIndex().then(data => {
  return fs.writeFileSync(outputPath, JSON.stringify(data), 'utf8');
}).then(() => {
  const stats = fs.statSync(outputPath);
  // File size to megabytes
  const sizeMb = stats.size / 1000000.0;
  console.log(`Index created with size: ${sizeMb} MB`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
