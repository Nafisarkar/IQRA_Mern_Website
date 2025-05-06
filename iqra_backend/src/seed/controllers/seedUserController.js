const createHttpError = require("http-errors");
const { User } = require("../../models/userModel");
const dataset = require("../dummydb/userStorage");

const addSeedUsers = async (req, res, next) => {
  try {
    // Uncomment if you want to delete existing users before seeding
    await User.deleteMany({});

    // Add new seed users using await for consistency
    const seedResult = await User.insertMany(dataset.users);

    return res.status(201).json({
      message: "Seed users added successfully",
      count: seedResult.length,
      data: dataset.users,
    });
  } catch (error) {
    // Properly pass the error to the next middleware
    next(createHttpError(500, `Error seeding users: ${error.message}`));
  }
};

module.exports = addSeedUsers;
