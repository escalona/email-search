const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.use(express.static('dist'));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.render('index', { initialState: fs.readFileSync(path.join(__dirname, 'data/search-index.json'), 'utf8') });
});

app.listen(port, () => console.log(`Example app listening on port: ${port}`));
