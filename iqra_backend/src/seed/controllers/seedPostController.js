const createHttpError = require("http-errors");
const Post = require("../../models/postModel");
const dataset = require("../dummydb/postStorage");
const addSeedPosts = async (req, res, next) => {
  try {
    // delete existing users before seeding
    await Post.deleteMany({});

    // Add new seed users using await for consistency
    const seedResult = await Post.insertMany(dataset.postData);

    return res.status(201).json({
      message: "Seed users added successfully",
      count: seedResult.length,
      data: dataset.postData,
    });
  } catch (error) {
    // Properly pass the error to the next middleware
    next(createHttpError(500, `Error seeding users: ${error.message}`));
  }
};

module.exports = addSeedPosts;
