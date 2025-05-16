const createHttpError = require("http-errors");
const { decodeToken } = require("../helpers/tokenHandler"); // Assuming tokenHandler.js exists
const { User } = require("../models/userModel"); // Assuming userModel.js exists

const isLoggedIn = async (req, res, next) => {
  try {
    console.log("[isLoggedIn] Middleware triggered.");
    console.log("[isLoggedIn] All cookies:", req.cookies); // Log all cookies

    const token = req.cookies.token;
    console.log("[isLoggedIn] Token from cookie:", token);

    if (!token) {
      console.log("[isLoggedIn] No token found in cookies.");
      return next(createHttpError(401, "Access denied. No token provided."));
    }

    let decoded;
    try {
      decoded = decodeToken(token); // Assuming decodeToken verifies and decodes
      console.log("[isLoggedIn] Token decoded successfully:", decoded);
    } catch (error) {
      console.error(
        "[isLoggedIn] Token verification/decoding error:",
        error.message
      );
      // Handle specific JWT errors if needed (e.g., TokenExpiredError, JsonWebTokenError)
      if (error.name === "TokenExpiredError") {
        return next(createHttpError(401, "Access denied. Token expired."));
      }
      if (error.name === "JsonWebTokenError") {
        return next(createHttpError(401, "Access denied. Invalid token."));
      }
      return next(
        createHttpError(401, "Access denied. Token processing error.")
      );
    }

    if (!decoded || !decoded.id) {
      console.log("[isLoggedIn] Decoded token is invalid or missing ID.");
      return next(
        createHttpError(401, "Access denied. Invalid token payload.")
      );
    }

    // Optional: Check if user exists in DB, though for /me this might be redundant if mydetails does it
    // const user = await User.findById(decoded.id);
    // if (!user) {
    //   console.log(`[isLoggedIn] User with ID ${decoded.id} not found in DB.`);
    //   return next(createHttpError(401, "Access denied. User not found."));
    // }
    // console.log(`[isLoggedIn] User ${user.username} authenticated.`);

    req.user = decoded; // Attach decoded payload (which should include id, username, isAdmin)
    console.log("[isLoggedIn] req.user set:", req.user);
    next();
  } catch (error) {
    console.error("[isLoggedIn] Unexpected error in middleware:", error);
    return next(
      createHttpError(500, "Internal server error during authentication.")
    );
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      // Optionally, you could try to verify it to see if it's a valid (though unwanted) token
      return next(
        createHttpError(400, "You are already logged in. Please log out first.")
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    // This middleware should run AFTER isLoggedIn, so req.user should be populated
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return next(createHttpError(403, "Forbidden. Admin access required."));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
};
