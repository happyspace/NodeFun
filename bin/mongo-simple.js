/**
 * simple connection to Mongo
 */

const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';

mongoClient.connect(url, (err, db) => {
    assert.equal(err, null);
    console.log("Connected to mongo.");

    let collection = db.collection("dishes");

    collection.insertOne({name: "Uthapizza", description: "test"},
        (err, result) => {
            assert.equal(err, null);
            console.log("After Insert: ");
            console.log(result.ops);

            collection.find({}).toArray(
                (err, docs) => {
                    assert.equal(err,null);
                    console.log("Found:");
                    console.log(docs);

                    db.dropCollection("dishes",
                        (err, result) => {
                            assert.equal(err,null);
                            db.close();
                        }
                    )
                }
            )
        }
    )
});
