const express = require("express");
const addSeedUsers = require("../controllers/seedUserController");
const { isLoggedIn, isAdmin } = require("../../middlewares/authWare");
const seedUserRouter = express.Router();

//endpoint -> /api/seed/user
seedUserRouter.get("/user", isLoggedIn,isAdmin, addSeedUsers);

module.exports = seedUserRouter;
