//get all posts from the db

const createHttpError = require("http-errors");
const Post = require("../models/postModel");

//endpoint -> /api/posts
//endpoint -> /api/posts
const getAllPosts = async (req, res, next) => {
  try {
    // Add pagination and filtering
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination info first
    const total = await Post.countDocuments({});

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Check if page is out of range
    if ((page > totalPages && total > 0) || page < 0) {
      return next(createHttpError(404, "Page not found"));
    }

    // Get filtered posts with pagination
    const posts = await Post.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    if (posts.length === 0 && page === 1) {
      return next(createHttpError(404, "No posts found"));
    }

    // Return with explicit status code and pagination info
    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      payload: {
        posts,
        pagination: {
          total,
          page,
          limit,
          pages: totalPages,
        },
      },
    });
  } catch (error) {
    next(createHttpError(500, `Error retrieving posts: ${error.message}`));
  }
};

//get a post by id from db
//endpoint -> /api/postbyid/:id
const getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check for valid MongoDB ID format to avoid CastError
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createHttpError(400, "Invalid post ID format"));
    }

    const requestedPost = await Post.findById(id);

    if (!requestedPost) {
      next(createHttpError(404, "Post does not exits"));
    }
    // Return with explicit status code and pagination info
    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      payload: requestedPost,
    });
  } catch (error) {
    return next(
      createHttpError(500, `Error retrieving post by id: ${error.message}`)
    );
  }
};

//search a post in the db
//endpoint -> /api/postsearch
const searchPostByTitle = async (req, res, next) => {
  try {
    const title = req.body.title;
    if (!title) {
      return next(createHttpError(400, "Search title is required"));
    }
    const searchPattern = new RegExp(`.*${title}.*`, "i");
    const foundPosts = await Post.find({ title: searchPattern }).sort({
      createdAt: -1,
    });
    if (foundPosts.length === 0) {
      return next(
        createHttpError(404, "No posts found matching the search term")
      );
    }
    // Return with explicit status code
    return res.status(200).json({
      success: true,
      message: "Posts found successfully",
      count: foundPosts.length,
      payload: foundPosts,
    });
  } catch (error) {
    return next(
      createHttpError(500, `Error searching posts by title: ${error.message}`)
    );
  }
};

//add a post to db
//use json formate to send data
//endpoint -> /api/post
const addPost = async (req, res, next) => {
  try {
    // Validate required fields
    const { title, english, category } = req.body;
    if (!title || !english || !category) {
      return next(
        createHttpError(400, "Title, english text, and category are required")
      );
    }

    // Create post with validated data
    const newPost = await Post.create(req.body);

    // Return with 201 Created status code
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      payload: newPost,
    });
  } catch (error) {
    // Handle specific MongoDB validation errors
    if (error.name === "ValidationError") {
      return next(createHttpError(400, `Validation error: ${error.message}`));
    }

    // Handle other errors
    return next(createHttpError(500, `Error creating post: ${error.message}`));
  }
};

//add a post to db
//use json formate to send data
//endpoint -> /api/post
const updateViewCount = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check for valid MongoDB ID format to avoid CastError
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createHttpError(400, "Invalid post ID format"));
    }

    const requestedPost = await Post.findById(id);

    if (!requestedPost) {
      next(createHttpError(404, "Post does not exits"));
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    // Return with 201 Created status code
    return res.status(201).json({
      success: true,
      message: "Updated view counter",
      payload: updatedPost,
    });
  } catch (error) {
    // Handle other errors
    return next(
      createHttpError(500, `Error updateing view post: ${error.message}`)
    );
  }
};

//delete a post from db
//endpoint -> /api/postdeletebyid/:id
const deletePostById = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check for valid MongoDB ID format to avoid CastError
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createHttpError(400, "Invalid post ID format"));
    }

    const requestedPost = await Post.findById(id);

    if (!requestedPost) {
      return next(createHttpError(404, "Post does not exist"));
    }

    await Post.deleteOne({ _id: id });

    // Return with explicit status code
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return next(
      createHttpError(500, `Error deleting post by id: ${error.message}`)
    );
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  searchPostByTitle,
  updateViewCount,
  addPost,
  deletePostById,
};
