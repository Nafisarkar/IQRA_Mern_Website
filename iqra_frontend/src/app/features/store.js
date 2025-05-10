import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./posts/postSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    postR: postReducer,
    userR: userReducer,
  },
});

export default store;
