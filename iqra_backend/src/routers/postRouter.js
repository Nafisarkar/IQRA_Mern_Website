const express = require("express");
const {
  getAllPosts,
  getPostById,
  searchPostByTitle,
  addPost,
  deletePostById,
  updateViewCount,
} = require("../controllers/postController");
const { isLoggedIn, isAdmin } = require("../middlewares/authWare");
const postRouter = express.Router();

//get all posts from the db
//endpoint -> /api/posts
postRouter.get("/posts", getAllPosts);

//get a post by id from db
//endpoint -> /api/postbyid
postRouter.get("/postbyid/:id", getPostById);

//serach a post from db
//endpoint -> /api/postserach
postRouter.get("/postsearch", searchPostByTitle);

//add a post to db
//endpoint -> /api/post
postRouter.post("/post", isLoggedIn, isAdmin, addPost);

//update view count
//endpoint -> /api/updatecount
postRouter.post("/updatecount/:id", updateViewCount);

//delete a post from db
//endpoint -> /api/postdeletebyid
postRouter.delete("/postdeletebyid/:id", isLoggedIn, isAdmin, deletePostById);

module.exports = postRouter;
