import { Router } from "express";
import { PostsController } from "../controllers/posts.controller.js";
import {
  entityValidator,
  postSchema,
  updatePostSchema,
} from "../middlewares/entity-validator.middleware.js";

export const postsRouter = Router();

postsRouter.get("/", PostsController.getAllPosts);

postsRouter.get("/:id", PostsController.getPostById);

postsRouter.post("/", entityValidator(postSchema), PostsController.createPost);

postsRouter.patch(
  "/:id",
  entityValidator(updatePostSchema),
  PostsController.updatePost
);

postsRouter.delete("/:id", PostsController.deletePost);

postsRouter.patch("/:id/like", PostsController.likePost);

postsRouter.patch("/:id/dislike", PostsController.dislikePost);
