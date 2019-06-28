const Models = require('../models/storage');

exports.getDatabase = (req, res) => {
  Models.getDatabase((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  }, req.query.collection);
};

exports.saveData = (req, res) => {
  Models.saveData(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  }, req.query.collection);
};

exports.updateData = (req, res) => {
  Models.updateData(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  }, req.query.collection);
};

exports.deleteData = (req, res) => {
  Models.deleteData(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  }, req.query.collection);
};
