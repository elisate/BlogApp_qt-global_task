import express from "express";
import { addComment, deleteComment, getCommentById, getComments, updateComment } from "../controllers/commentController.js";
import { Authenticate } from "../utils/jwtfunctions.js";

// routes/commentRoutes.js

const CommentRouter = express.Router();
CommentRouter.get('/:postId', getComments);
CommentRouter.get('/comment/:id', getCommentById);
CommentRouter.put('/comment/:id',   updateComment);

CommentRouter.use(Authenticate);
CommentRouter.post('/:postId',   addComment);
CommentRouter.delete('/comment/:id',   deleteComment);
export default CommentRouter;
