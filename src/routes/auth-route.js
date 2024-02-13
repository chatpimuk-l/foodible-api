const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const validateRegister = require("../middlewares/validators/validate-register");
const validateLogin = require("../middlewares/validators/validate-login");
const authenticate = require("../middlewares/authenticate");

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
