/**
 *
 * @param {string} word
 * @param {Trie} trie
 * @return {string[]} paths
 */
function trieTest(word, trie) {
  let node = trie;
  let output = [];
  const letters = word.split('');

  for (let i = 0; i < letters.length; i++) {
    // Keys are minimized when output to JSON
    const children = node.children || node.c;

    if (children[letters[i]]) {
      node = children[letters[i]];
    } else {
      return output;
    }

    // Keys are minimized when output to JSON
    const path = node.path || node.p;
    if (i === letters.length - 1) {
      output = [...output, ...path];
    }
  }

  return output;
}

module.exports = trieTest;
