var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res) => {
  res.send("hej");
});

module.exports = router;
