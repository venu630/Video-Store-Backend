const express = require('express');
const cors = require('cors');
require('dotenv').config()
const {connectToDb} = require("./configs/db")
const  authRoutes  = require('./routes/auth');
const videos = require('./routes/videos');

const app = express();


app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/auth", authRoutes);
app.use("/videos", videos);

app.get("/", (req, res) => {
    res.status(200).send("server is up and running");
});

connectToDb((err) => {
    if(!err){
        console.log("connect to DB");
    }
    else{
        console.log("error in connecting DB");
    }
})

app.listen(port, () => {
    console.log('listening on port ' + port);
});
