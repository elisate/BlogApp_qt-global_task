import { models } from "../models/index.js";
import { passComparer, tokengenerating } from "../utils/index.js";

const { User } = models; // You don't need Comment and Post for the login function

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure email and password from the request body

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordCorrect = await passComparer(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate token
    const token = tokengenerating({
      user: user,
      id: user.id,
      email: user.email,
    });

    // Create a user response object
    const userResponse = {
      id: user.id,
      fullNames: user.fullNames,
      email: user.email,
      role: user.role,
    };

    // Send response
    res.status(200).json({
      message: "User logged in successfully",
      access_token: token,
      user: userResponse,
    });
  } catch (err) {
    console.error("Login error:", err); // Log the error for debugging
    return res.status(500).json({
      error: "An error occurred during login. Please try again later.",
    });
  }
};
