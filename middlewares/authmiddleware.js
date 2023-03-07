const jwt = require("jsonwebtoken");
const { getDb } = require("../configs/db");

let db;

exports.verifyToken = (req, res, next) => {
  db = getDb();

  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(500).json({ error: "server error" });
    }
    const userEmail = decoded.email;

    db.collection("users")
      .findOne({ email: userEmail })
      .then((result) => {
        if (result === null) {
          res.status(400).json({ error: "Invalid token" });
        } else {
          req.email = userEmail;
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "DB error occured" });
      });
  });
};
