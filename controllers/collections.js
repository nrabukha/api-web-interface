const Models = require('../models/collections');

exports.getCollections = (req, res) => {
  Models.getCollections((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  }, req.query.collection);
};

exports.saveCollections = (req, res) => {
  Models.saveCollections(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  }, req.query.collection);
};

exports.updateCollections = (req, res) => {
  Models.updateCollections(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  }, req.query.collection);
};

exports.deleteCollections = (req, res) => {
  console.log(req.params);
  Models.deleteCollections(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  }, req.query.collection);
};
