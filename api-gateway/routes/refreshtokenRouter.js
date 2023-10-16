var express = require("express");
var router = express.Router();

const refreshTokens = require("./handler/refresh-token");

router.post("/", refreshTokens.refreshToken);

module.exports = router;
