import { verifyAccessToken } from "../const/jwt.const.js";
import { User } from "../models/users.model.js";

export const authValidator = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(403);

    const token = authHeader.split(" ")[1];

    if (!token) return res.sendStatus(403);

    const { userId } = verifyAccessToken(token);

    const foundUser = await User.findById(userId);

    if (!foundUser) return res.sendStatus(403);

    req.user = foundUser;

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
