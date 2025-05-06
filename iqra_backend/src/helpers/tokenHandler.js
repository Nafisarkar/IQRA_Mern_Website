const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const createToken = (payload, expiresIn = "1d") => {
  if (!process.env.JWT_SECRET_KEY) {
    throw createHttpError(
      500,
      "JWT_SECRET_KEY is not defined in environment variables"
    );
  }

  try {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
  } catch (error) {
    throw createHttpError(500, `Error creating token: ${error.message}`);
  }
};

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw createHttpError(
      500,
      "JWT_SECRET_KEY is not defined in environment variables"
    );
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createHttpError(401, "Token has expired");
    } else {
      throw createHttpError(401, "Invalid token");
    }
  }
};

const decodeToken = (token) => {
  // jwt.decode doesn't throw errors, it returns null for invalid tokens
  return jwt.decode(token);
};

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
};
