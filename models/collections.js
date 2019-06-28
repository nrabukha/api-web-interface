const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

exports.getCollections = (cb) => {
  db.get().collection('collectionList').find().toArray((err, docs) => {
    cb(err, docs);
  });
};

exports.saveCollections = (collectionData, cb) => {
  db.get().collection('collectionList').insertOne(collectionData, (err) => {
    cb(err);
  });
};

exports.updateCollections = (id, collectionData, cb) => {
  db.get().collection('collectionList').updateOne(
    { _id: ObjectID(id) },
    {
      $set:
      {
        name: collectionData.name,
        description: collectionData.description
      }
    });
};

exports.deleteCollections = (id, cb) => {
  db.get().collection('collectionList').deleteOne(
    { _id: ObjectID(id) },
    cb());
  db.get().collection(id).drop();
};
