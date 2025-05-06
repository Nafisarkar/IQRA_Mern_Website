const express = require("express");
const addSeedPosts = require("../controllers/seedPostController");
const { isLoggedIn, isAdmin } = require("../../middlewares/authWare");

const seedPostRouter = express.Router();

//endpoint -> /api/seed/post
seedPostRouter.get("/post", isLoggedIn, isAdmin, addSeedPosts);

module.exports = seedPostRouter;
