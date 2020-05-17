const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const walkDirectory = require('./walk-directory');

const dataDirectory = 'data';
Promise.promisifyAll(require('fs'));

class Node {
  constructor(key) {
    this.key = key;
    this.path = new Set();

    /** @type {Object<string, Node>} */
    this.children = {};
  }

  toJSON() {
    return {
      k: this.key,
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
   * @param {Node} root
   * @param {string} word
   * @param {string} path
   */
  insert(root, word, path) {
    let node = root;
    const letters = word.split('');

    letters.forEach((ch, i) => {
      if (!node.children[ch]) {
        node.children[ch] = new Node(ch);
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
   * @param {Node} trie
   * @return {string[]} paths
   */
  test(word, trie) {
    let node = trie;
    let output = [];
    const letters = word.split('');

    for (let i = 0; i < letters.length; i++) {
      if (node.children[letters[i]]) {
        node = node.children[letters[i]];
      } else {
        return output;
      }

      if (i === letters.length - 1) {
        output = [...output, ...node.path];
      }
    }

    return output;
  }
}

module.exports = Node;
