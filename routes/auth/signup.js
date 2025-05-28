// Purpose: Handle all routes related to singup.
const express = require("express");
const router = express.Router();

const {
    handleUserSingup,
} = require("../../controllers/auth/signup");

router.route("/")
    .post(handleUserSingup);

module.exports = router;