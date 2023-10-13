const express = require("express");
const router = express.Router();
const TokensHandler = require("./handler/refresh-token");

router.post("/", TokensHandler.createToken);
router.get("/", TokensHandler.getToken);
module.exports = router;
