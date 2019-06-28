const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const StorageControllers = require('./controllers/storage');
const CollectionsControllers = require('./controllers/collections');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/database', StorageControllers.getDatabase);

app.post('/database', StorageControllers.saveData);

app.put('/database/:id', StorageControllers.updateData);

app.delete('/database/:id', StorageControllers.deleteData);


app.get('/collections', CollectionsControllers.getCollections);

app.post('/collections', CollectionsControllers.saveCollections);

app.put('/collections/:id', CollectionsControllers.updateCollections);

app.delete('/collections/:id', CollectionsControllers.deleteCollections);


db.connect('mongodb://localhost:27017/category', (err) => {
    if (err) {
        return console.log(err);
    }
    app.listen(3000, () => {
        console.log('API started');
    });
});
