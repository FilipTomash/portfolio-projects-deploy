import { UserService } from "../services/users.service.js";

export class UsersController {
  static async getPostsByUser(req, res, next) {
    try {
      const user = req.user;

      const userPosts = await UserService.getPostsByUser(user);

      return res.json(userPosts);
    } catch (error) {
      return next(error);
    }
  }

  static async getCommentsByUser(req, res, next) {
    try {
      const user = req.user;

      const userComments = await UserService.getCommentsByUser(user);

      return res.json(userComments);
    } catch (error) {
      return next(error);
    }
  }
}
