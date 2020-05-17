const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.use(express.static('dist'));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', async (req, res) => {
  const searchIndex = fs.readFileSync(path.join(__dirname, 'data/search-index.json'), 'utf8');
  res.render('index', { initialState: JSON.stringify(JSON.parse(searchIndex)) });
});

app.listen(port, () => console.log(`Example app listening on port: ${port}`));
