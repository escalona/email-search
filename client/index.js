function search(word, trie) {
  var node = trie;
  var output = [];
  var letters = word.split('');

  for (var i = 0; i < letters.length; i++) {
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

function handleSearchInput(e) {
  var val = e.target.value;
  console.log(val);
  const output = search(val, window.__STATE__);
  console.log(output);
}

var searchEl = document.getElementById('search');
searchEl.addEventListener('input', handleSearchInput);
