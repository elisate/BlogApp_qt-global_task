import { models } from "../models/index.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const { Comment, Post, User } = models;

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const postData = {
      title,
      content,
      authorId: req.user.id, // Ensure the user is authenticated
    };

    if (req.files && req.files.image) {
      const result = await cloudinary.v2.uploader.upload(
        req.files.image[0].path
      );
      postData.image = result.secure_url;
      console.log("Uploaded file URL:", postData.image);
    }

    const post = await Post.create(postData);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: "author", attributes: ["fullNames", "email"] },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "author", attributes: ["fullNames", "email"] },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { authorId: req.params.userId }, // Use route parameter for userId
      include: [
        { model: User, as: "author", attributes: ["fullNames", "email"] },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "author", attributes: ["fullNames", "email"] },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user posts." });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: "author", attributes: ["fullNames", "email"] },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "author", attributes: ["fullNames", "email"] },
          ],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the post." });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.files && req.files.image) {
      const result = await cloudinary.v2.uploader.upload(
        req.files.image[0].path
      );
      post.image = result.secure_url;
      console.log("Uploaded file URL:", post.image);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post." });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await post.destroy();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
};
