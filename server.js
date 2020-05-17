const express = require('express');
const fs = require('fs');
const path = require('path');
const Trie = require('./trie');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use('/client', express.static(path.resolve(__dirname, 'client')));

// server rendered home page
app.get('/', async (req, res) => {
  const searchIndex = fs.readFileSync(path.join(__dirname, 'data/search-index.json'), 'utf8');
  res.render('index', { initialState: JSON.stringify(JSON.parse(searchIndex)) });
});

app.get('/index', async (req, res, next) => {
  const trie = new Trie();

  try {
    await trie.indexEmails('./data/skilling-j');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

  res.json(trie);
})
;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
