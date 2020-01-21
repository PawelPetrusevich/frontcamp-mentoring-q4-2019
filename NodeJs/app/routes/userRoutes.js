const auth = require('./auth');
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post('/login', auth.optional, userController.login);
router.post('/register', auth.optional, userController.register);
router.get('/userInfo', auth.required, userController.getUserInfo);

module.exports = router;