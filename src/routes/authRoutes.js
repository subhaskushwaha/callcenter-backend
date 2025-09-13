const express = require("express");
const register = require("../controllers/auth/registerController");
const login = require("../controllers/auth/loginController");
// const resetpassword = require("../controllers/auth/resetpasswordController");
// const forgetpassword = require("../controllers/auth/forgetpasswordController");
const changepassword = require("../controllers/auth/changepasswordController");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/resetpassword", resetpassword);
// router.post("/forgetpassword", forgetpassword);
router.post("/changepassword", authMiddleware , changepassword);

module.exports = router;