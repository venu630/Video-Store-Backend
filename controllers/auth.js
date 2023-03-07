const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDb } = require("../configs/db");

let db;

exports.signUp = (req, res) => {
  db = getDb();

  const { name, email, password } = req.body;

  //Check email present in DB or not
  db.collection("users")
    .findOne({ email: email })
    .then((result) => {
      if (result === null) {
        //JWT token generation
        let token = jwt.sign(
          {
            email: email,
          },
          process.env.SECRET_KEY
        );

        //Hashing the password and add user to DB
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              err: "error in hashing",
            });
          }

          //adding user to DB
          db.collection("users")
            .insertOne({ email: email, password: hash, name: name })
            .then(() => {
              res.status(200).json({
                message: "user added successfully",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "Database error occured!",
              });
            });
        });
      } else {
        res.status(404).json({ message: "user already exists" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occured!",
      });
    });
};

exports.signIn = (req, res) => {
  db = getDb();
  const { email, password } = req.body;

  //Check email is present or not
  db.collection("users")
    .findOne({ email: email })
    .then((result) => {
      if (result !== null) {
        //Compare the passwords
        bcrypt.compare(password, result.password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "server error",
            });
          } else if (result === true) {
            //JWT token generation
            let token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );

            res.status(200).json({
              message: "user signed in successfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "incorrect password",
            });
          }
        });
      } else {
        res.status(404).json({ message: "user doesn't exists" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occured!",
      });
    });
};
