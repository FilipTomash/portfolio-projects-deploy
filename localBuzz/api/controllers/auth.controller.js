import { Forbidden } from "../const/error.const.js";
import { createAccessToken, createRefreshToken } from "../const/jwt.const.js";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async registerUser(req, res, next) {
    try {
      const userData = req.body;

      await AuthService.registerUser(userData);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.loginUser(email, password);

      const accessToken = createAccessToken(user._id);

      const refreshToken = createRefreshToken(user._id);

      await AuthService.saveRefreshToken(user, refreshToken);

      res.set("access-token", accessToken);
      res.set("refresh-token", refreshToken);

      res.set("access-control-expose-headers", "access-token, refresh-token");

      return res.json(user);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async refreshAccessToken(req, res, next) {
    try {
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Forbidden();

      const foundUser = await AuthService.validateRefreshToken(refreshToken);

      await AuthService.deleteRefreshToken(foundUser, refreshToken);

      const accessToken = createAccessToken(foundUser._id);
      const newRefreshToken = createRefreshToken(foundUser._id);

      await AuthService.saveRefreshToken(foundUser, newRefreshToken);

      res.set("access-token", accessToken);
      res.set("refresh-token", newRefreshToken);
      res.set("access-control-expose-headers", "access-token, refresh-token");

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }

  static async logoutUser(req, res, next) {
    try {
      const user = req.user;

      const refreshToken = req.headers["refresh-token"];

      await AuthService.deleteRefreshToken(user, refreshToken);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }

  static async logoutAll(req, res, next) {
    try {
      const user = req.user;

      await AuthService.deleteAllRefreshTokens(user);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }
}
