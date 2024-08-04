import { models } from "../models/index.js";

const { Comment, Post, User } = models;
export const addComment = async (req, res) => {
  try {
    // Log req.user to debug
    console.log("Request User:", req.user);

    // Check if the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const post = await Post.findByPk(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create the comment
    const comment = await Comment.create({
      content: req.body.content,
      authorId: req.user.id, // Use the authenticated user's ID
      postId: req.params.postId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};


export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: [{ model: User, as: "author" }],
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['fullNames', 'email'] }]
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.authorId !== req.user.id) { // Assuming req.user.id contains the authenticated user's ID
      return res.status(401).json({ message: 'Unauthorized' });
    }

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.authorId !== req.user.id) { // Assuming req.user.id contains the authenticated user's ID
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await comment.destroy();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
