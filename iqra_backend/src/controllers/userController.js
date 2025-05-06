const createHttpError = require("http-errors");
const { User, validateUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { createToken, decodeToken } = require("../helpers/tokenHandler");

const logInUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(createHttpError(400, "Username and password are required"));
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next(createHttpError(401, "Invalid credentials"));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Password is invalid"));
    }

    // Generate JWT token
    // can set time if needed
    const token = createToken({
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
    // console.log(decodeToken(token));
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Only use secure in production
      // sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      // token,
    });
  } catch (error) {
    return next(createHttpError(500, `Login error: ${error.message}`));
  }
};

const logOutUser = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return next(createHttpError(500, `Logout error: ${error.message}`));
  }
};

const registerUser = async (req, res, next) => {
  try {
    // Input validation
    const { error } = validateUser(req.body);
    if (error) {
      return next(createHttpError(400, error.details[0].message));
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      const field =
        existingUser.email === req.body.email ? "email" : "username";
      return next(
        createHttpError(409, `User with this ${field} already exists`)
      );
    }

    // Create and save new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Password hashing handled by model pre-save hook
    });

    const savedUser = await user.save();

    // Return success response (without sensitive data)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    // Centralized error handling
    return next(createHttpError(500, `Registration error: ${err.message}`));
  }
};

module.exports = {
  logInUser,
  logOutUser,
  registerUser,
};
