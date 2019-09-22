const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bodyParser = require('body-parser');
const db = require('../db');

router.use(bodyParser.json());

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {

	const promise = new Promise(resolve => {
		db.connect('mongodb://localhost:27017/authorization', (err) => {
    		if (err) return console.log(err);
		}, req.user.name);
		setTimeout(() => resolve(req.user.name), 1800);
	})

	
	promise.then(
		name => res.render('db-category/dashboard', {
			name,
			layout: 'specific-layout'
		})
	)  
	
});

const StorageControllers = require('./controllers/storage');
const CollectionsControllers = require('./controllers/collections');

router.get(
	'/database', 
	ensureAuthenticated, 
	StorageControllers.getDatabase
);

router.post(
	'/database', 
	ensureAuthenticated, 
	StorageControllers.saveData
);

router.put(
	'/database/:id', 
	ensureAuthenticated, 
	StorageControllers.updateData
);

router.delete(
	'/database/:id', 
	ensureAuthenticated, 
	StorageControllers.deleteData
);


router.get(
	'/collections', 
	ensureAuthenticated, 
	CollectionsControllers.getCollections
);

router.post(
	'/collections', 
	ensureAuthenticated,
	CollectionsControllers.saveCollections
);

router.put(
	'/collections/:id',
	ensureAuthenticated,
	CollectionsControllers.updateCollections
);

router.delete(
	'/collections/:id', 
	ensureAuthenticated, 
	CollectionsControllers.deleteCollections
);

module.exports = router;
