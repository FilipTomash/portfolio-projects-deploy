import { BadRequest, GeneralError, NotFound } from "../const/error.const.js";
import { Comment } from "../models/comment.model.js";
import { PostsService } from "./posts.service.js";

export class CommentsService {
  static async getAllComments() {
    try {
      const comments = await Comment.find({}).sort({
        createdAt: "desc",
      });

      return comments;
    } catch (error) {
      throw new GeneralError(`Couldn't fetch commments, ERROR: ${error}`);
    }
  }

  static async createComment(user, commentData) {
    try {
      const post = await PostsService.getPostById(commentData.post);

      const comment = new Comment({ ...commentData, author: user._id });

      const createdComment = await comment.save();

      post.comments.push(createdComment);

      user.comments.push(createdComment);

      await post.save();

      await user.save();

      return createdComment;
    } catch (error) {
      throw new BadRequest(`Couldn't create comment, ERROR: ${error}`);
    }
  }

  static async deleteComment(user, postId) {
    try {
      const foundComment = await Comment.findOneAndDelete({
        _id: postId,
        author: user._id,
      });

      if (!foundComment) throw "Comment not found";
    } catch (error) {
      throw new NotFound(`Comment not found, ERROR: ${error}`);
    }
  }
}
