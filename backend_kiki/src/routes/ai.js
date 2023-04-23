const express = require("express");
const { train } = require("../controllers/ai");

const router = express.Router();

router.post("/train", train);


module.exports = router;
