var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.json({
    status: "success",
    data: "oke",
  });
});

module.exports = router;
