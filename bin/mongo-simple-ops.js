/**
 * simple server using mongo operations module.
 */

const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const dboper = require('../modules/mongo_operations');

// Connection URL
const url = 'mongodb://localhost:27017/conFusion';


// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes", (result) => {
            console.log(result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log(docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" },
                    "dishes", (result) => {
                        console.log(result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log(docs);

                            db.dropCollection("dishes", (result) => {
                                console.log(result);

                                db.close();
                            });
                        });
                    });
            });
        });
});