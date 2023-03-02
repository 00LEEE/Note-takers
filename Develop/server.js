const express = require('express');
const path = require('path');
const api = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json(), express.urlencoded({ extended: true }), express.static('public'));
app.use('/api', api);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
