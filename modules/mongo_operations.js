/**
 * Common mongo operations.
 */

const assert = require('assert');
const db = require('mongodb').connect.Db;
const collection = require('mongodb').connect.Collection;


exports.insertDocument = (db, document, collection, callback) => {
    // Get the documents collection
    let coll = db.collection(collection);
    // Insert some documents
    coll.insertOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the document collection "
            + collection);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    // Get the documents collection
    let coll = db.collection(collection);
    // Find some documents
    coll.find({}).toArray(
        (err, docs) => {
            assert.equal(err, null);
            callback(docs);
        }
    )
};

exports.removeDocument = (db, document, collection, callback) => {

    // Get the documents collection
    var coll = db.collection(collection);

    // Delete the document
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document " + document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {

    // Get the documents collection
    var coll = db.collection(collection);

    // Update document
    coll.updateOne(document
        , { $set: update }, null, (err, result) => {

            assert.equal(err, null);
            console.log("Updated the document with " + update);
            callback(result);
        });
};
