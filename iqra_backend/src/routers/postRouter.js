const express = require("express");
const {
  getAllPosts,
  getPostById,
  searchPostByTitle,
  addPost,
  deletePostById,
  updatePostById,
  updateViewCount,
  getPostByCatagory,
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

//update a post to db
//endpoint -> /api/post
postRouter.post("/updatepost/:id", isLoggedIn, isAdmin, updatePostById);

//update view count
//endpoint -> /api/updatecount
postRouter.post("/updatecount/:id", updateViewCount);

//get post by category
//endpoint -> /api/posts/:category
postRouter.get("/posts/:category", getPostByCatagory);

//delete a post from db
//endpoint -> /api/postdeletebyid
postRouter.delete("/postdeletebyid/:id", isLoggedIn, isAdmin, deletePostById);

module.exports = postRouter;
