const mongoose = require('mongoose');

const state = {
  db: null
};

let clientNew;

exports.connect = (url, done, nameDb) => {

  if (state.db) {
    clientNew.close();
  }

  mongoose.mongo.connect(url, { useNewUrlParser: true },
	(err, client) => {
		if(err) {
			return done(err);
		}
		clientNew = client;
    	state.db = client.db(nameDb);
		done();
	});
};

exports.get = () => {
  return state.db;
};
