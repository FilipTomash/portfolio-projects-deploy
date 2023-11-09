import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";

export const usersRouter = Router();

usersRouter.get("/posts", UsersController.getPostsByUser);
usersRouter.get("/comments", UsersController.getCommentsByUser);
