const { MongoClient } = require("mongodb");
require("dotenv").config();

let dbConnection;
const uri = process.env.DATABASE_URL;

const connectToDb = (cb) => {
  MongoClient.connect(uri)

    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.error(err);
      return cb(err);
    });
};

const getDb = () => dbConnection;

module.exports = { connectToDb, getDb };
