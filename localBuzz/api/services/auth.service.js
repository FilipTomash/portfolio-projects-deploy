import { User } from "../models/users.model.js";
import { BadRequest, Forbidden, Unauthorized } from "../const/error.const.js";
import { verifyRefreshToken } from "../const/jwt.const.js";
import bcrypt from "bcryptjs";

export class AuthService {
  static async registerUser(userData) {
    try {
      const user = new User(userData);

      await user.save();
    } catch (error) {
      throw new BadRequest(`Couldn't register user, ERROR: ${error}`);
    }
  }

  static async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) throw "Invalid Credentials";

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw "Invalid Credentials";

      return user;
    } catch (error) {
      throw new Unauthorized(error);
    }
  }

  static async validateRefreshToken(refreshToken) {
    try {
      const { userId } = verifyRefreshToken(refreshToken);

      const foundUser = await User.findById(userId);

      if (!foundUser) throw new Forbidden();

      if (!foundUser.refreshTokens.find((token) => token === refreshToken))
        throw new Forbidden();

      return foundUser;
    } catch (error) {
      throw error;
    }
  }

  static async saveRefreshToken(user, refreshToken) {
    try {
      user.refreshTokens.push(refreshToken);

      await user.save();
    } catch (error) {
      throw error;
    }
  }

  static async deleteRefreshToken(user, refreshToken) {
    try {
      user.refreshTokens = user.refreshTokens.filter(
        (token) => token !== refreshToken
      );

      await user.save();
    } catch (error) {
      throw error;
    }
  }

  static async deleteAllRefreshTokens(user) {
    try {
      user.refreshTokens = [];

      await user.save();
    } catch (error) {
      throw error;
    }
  }
}
