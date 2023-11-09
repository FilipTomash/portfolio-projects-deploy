import { CommentsService } from "../services/comments.service.js";

export class CommentsController {
  static async getAllComments(req, res, next) {
    try {
      const comments = await CommentsService.getAllComments();

      return res.status(200).send(comments);
    } catch (error) {
      return next(error);
    }
  }

  static async createComment(req, res, next) {
    try {
      const commentData = req.body;
      const user = req.user;

      const createdComment = await CommentsService.createComment(
        user,
        commentData
      );
      return res.status(201).send({
        message: "Comment Added Sucessfully",
        comment: createdComment,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      await CommentsService.deleteComment(req.user, req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }
}
