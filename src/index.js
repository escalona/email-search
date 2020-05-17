const trieTest = require('../trie-test');

function search(word, trie) {
  return trieTest(word, trie);
}

function handleSearchInput(e) {
  var val = e.target.value;
  const output = search(val, window.__STATE__);
  renderResults(output);
}

function renderResults(results) {
  var template = '' +
    '<div class="results-count">Found in <span' +
    ' class="results-count-number">{{results.length}}</span>' +
    ' files</div>\n' +
    '{{#each results}}\n' +
    '    <div class="result {{#if @first}}border-t-1{{/if}}">{{this}}</div>\n' +
    '{{/each}}';
  var templated = Handlebars.compile(template);
  document.getElementById('results').innerHTML = templated({ results });
}

var searchEl = document.getElementById('search');
searchEl.addEventListener('input', handleSearchInput);
searchEl.focus();
