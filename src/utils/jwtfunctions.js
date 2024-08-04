import jwt from "jsonwebtoken";

// Function to generate a JWT token
export const tokengenerating = (payload) => {
  try {
    // Check if the required environment variables are set
    if (!process.env.JWT_SECRET || !process.env.JWT_EXP) {
      throw new Error(
        "JWT_SECRET and JWT_EXP must be set in the environment variables."
      );
    }

    console.log("-----the process.env.JWT_EXP is ", process.env.JWT_EXP);

    // Generate the token with payload and options
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed.");
  }
};

// Middleware to authenticate requests using JWT
export const Authenticate = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    // Extract token from the Authorization header
    const token = auth?.split(" ")[1];

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({
        message:
          "No access token provided. Please login or set token in headers.",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({
          messagefromverifytoken: err.message,
        });
      }

      // Attach decoded user information to the request object
      req.user = decoded.user;
      req.userId = decoded.id;
      req.userEmail = decoded.email;

      console.log("User from verifying token:", req.user.fullNames);
      next();
    });
  } catch (err) {
    console.error("Internal server error from verify token:", err.message);
    res.status(500).json({
      message: `Internal server error from verify token: ${err.message}`,
    });
  }
};
