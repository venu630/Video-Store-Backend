const { getDb } = require("../configs/db");

let db;

exports.addVideo = (req, res) => {
  db = getDb();

  const { username, videourl } = req.body;

  db.collection("videos")
    .insertOne({ username: username, videourl: videourl })
    .then(() => {
      res.status(200).json({
        message: "video added successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occured!",
      });
    });
};

exports.getVideosurl = (req, res) => {
  db = getDb();

  const { page = 1, limit = 12 } = req.query;
  db.collection("videos")
    .find({})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .toArray()
    .then((data) => {
      res.status(200).json({
        total: data.length,
        videosurl: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occured!",
      });
    });
};

exports.getTotalCount = (req, res) => {
  db = getDb();

  db.collection("videos")
    .estimatedDocumentCount()
    .then((data) => {
      res.status(200).json({
        totalCount: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occured!",
      });
    });
};
