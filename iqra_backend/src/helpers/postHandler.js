const Post = require("../models/postModel");

const findPostByIdHelper = async (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(createHttpError(400, "Invalid post ID format"));
  }

  const requestedPost = await Post.findById(id);

  if (!requestedPost) {
    next(createHttpError(404, "Post does not exits"));
  }

  return requestedPost;
};

module.exports = { findPostByIdHelper };
