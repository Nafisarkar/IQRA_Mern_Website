const createHttpError = require("http-errors");
const { verifyToken } = require("../helpers/tokenHandler");

const isLoggedIn = (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies.token;

    if (!token) {
      return next(createHttpError(401, "Not logged in. Please log in."));
    }

    // Verify and decode the token
    const decoded = verifyToken(token);

    if (!decoded) {
      return next(createHttpError(401, "Invalid or expired token"));
    }

    // Attach user info to request for use in downstream middleware/routes
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(createHttpError(401, "Invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      return next(createHttpError(401, "Token has expired"));
    }
    return next(createHttpError(500, `Authentication error: ${error.message}`));
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies.token;

    if (token) {
      return next(createHttpError(403, "You are already logged in"));
    }
    next();
  } catch (error) {
    return next(createHttpError(500, `Authentication error: ${error.message}`));
  }
};

const isAdmin = (req, res, next) => {
  // First authenticate the user using isLoggedIn
  isLoggedIn(req, res, (error) => {
    if (error) {
      return next(error); // Forward any authentication errors
    }

    // At this point, user is authenticated and req.user is set
    if (!req.user.isAdmin) {
      return next(createHttpError(403, "Forbidden: Admin access required"));
    }

    // User is authenticated and is an admin
    next();
  });
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
