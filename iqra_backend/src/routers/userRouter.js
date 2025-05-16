const express = require("express");
const {
  logInUser,
  logOutUser,
  registerUser,
  mydetails,
} = require("../controllers/userController");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/authWare");
const userRouter = express.Router();

//login user
//endpoint -> /api/login
userRouter.post("/login", isLoggedOut, logInUser);

//logout user
//endpoint -> /api/logout
userRouter.post("/logout", isLoggedIn, logOutUser);

//about me
//endpoint -> /api/me
userRouter.get("/me", isLoggedIn, mydetails);

//register new user
//endpoint -> /api/register
userRouter.post("/register", isLoggedOut, registerUser);

module.exports = userRouter;
