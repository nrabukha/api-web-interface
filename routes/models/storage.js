const db = require('../../db');
const ObjectID = require('mongodb').ObjectID;

exports.getDatabase = (cb, collection) => {
  db.get().collection(collection).find().toArray((err, docs) => {
    cb(err, docs);
  });
};

exports.saveData = (data, cb, collection) => {
  db.get().collection(collection).insertOne(data, (err) => {
    cb(err);
  });
};

exports.updateData = (id, data, cb, collection) => {
  db.get().collection(collection).updateOne(
    { _id: ObjectID(id) },
    {
      $set:
      {
        title: data.title,
        content: data.content,
        category: data.category
      }
    });
};

exports.deleteData = (id, cb, collection) => {
  db.get().collection(collection).deleteOne(
    { _id: ObjectID(id) },
    cb());
};
