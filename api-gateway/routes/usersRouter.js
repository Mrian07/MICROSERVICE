var express = require("express");
var router = express.Router();

const usersHandler = require("./handler/users");
const verifyToken = require("../middlewares/verifytoken.middlewares");

router.post("/register", usersHandler.register);
router.put("/update", verifyToken, usersHandler.updateProfile);
router.get("/", verifyToken, usersHandler.getUsers);
router.post("/login", usersHandler.login);
router.post("/logout", verifyToken, usersHandler.logOut);

module.exports = router;
