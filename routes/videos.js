const express = require('express');
const { addVideo, getVideosurl, getTotalCount } = require("../controllers/videos");
const {verifyToken} = require("../middlewares/authmiddleware");
const router = express.Router();
  

router.post("/addvideo",verifyToken, addVideo );
router.get("/getvideosurl",verifyToken, getVideosurl );
router.get("/gettotalcount",verifyToken, getTotalCount );


module.exports = router;