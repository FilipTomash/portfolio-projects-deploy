import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
  entityValidator,
  userSchema,
} from "../middlewares/entity-validator.middleware.js";
import { authValidator } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/login", AuthController.loginUser);

authRouter.post(
  "/register",
  entityValidator(userSchema),
  AuthController.registerUser
);

authRouter.post("/refresh-token", AuthController.refreshAccessToken);

authRouter.post("/logout", authValidator, AuthController.logoutUser);

authRouter.post("/logout-all", authValidator, AuthController.logoutAll);
