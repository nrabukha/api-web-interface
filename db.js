const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

exports.connect = (url, done) => {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return done(err);
      }
      state.db = client.db('storage');
      done();
    });
};

exports.get = () => {
  return state.db;
};
