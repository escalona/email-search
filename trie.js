const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const walkDirectory = require('./walk-directory');
const trieTest = require('./trie-test');

const dataDirectory = 'data';
Promise.promisifyAll(require('fs'));

class Trie {
  constructor() {
    this.path = new Set();

    /** @type {Object<string, Trie>} */
    this.children = {};
  }

  toJSON() {
    return {
      p: [...this.path],
      c: this.children
    };
  }

  /**
   *
   * @param {string} pathToDirectory
   */
  indexEmails(pathToDirectory) {
    const filePaths = walkDirectory(pathToDirectory);
    // load all files in parallel
    return Promise.map(filePaths, (filePath) => {
      return fs.readFileAsync(path.join(__dirname, dataDirectory, filePath), 'utf8');
    }).then(contents => {
      for (let i = 0; i < contents.length; i++) {
        const words = contents[i].replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').split(' ');
        for (const word of words) {
          this.insert(this, word, filePaths[i]);
        }
      }
    }).catch(e => {
      throw e;
    });
  }

  /**
   *
   * @param {Trie} root
   * @param {string} word
   * @param {string} path
   */
  insert(root, word, path) {
    let node = root;
    const letters = word.split('');

    letters.forEach((ch, i) => {
      if (!node.children[ch]) {
        node.children[ch] = new Trie(ch);
      }

      node = node.children[ch];

      if (i === letters.length - 1) {
        node.path.add(path);
      }
    });
  }

  /**
   *
   * @param {string} word
   * @param {Trie} trie
   * @return {string[]} paths
   */
  test(word, trie) {
    return trieTest(word, trie);
  }
}

module.exports = Trie;
