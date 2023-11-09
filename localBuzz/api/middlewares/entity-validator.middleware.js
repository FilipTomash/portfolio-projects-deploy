import joi from "joi";

export const entityValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
    }
    next();
  };
};

export const postSchema = joi.object({
  title: joi.string().min(3).required(),
  location: joi.string().min(3).max(40).required(),
  date: joi.string().required(),
  time: joi.string().required(),
  cost: joi.number().min(0).optional(),
  description: joi.string().min(3).max(360).required(),
  organizer: joi.string().optional(),
  artists: joi.string().optional(),
  category: joi.string().required(),
});

export const updatePostSchema = joi.object({
  title: joi.string().min(3).optional(),
  location: joi.string().min(3).max(40).optional(),
  date: joi.string().optional(),
  time: joi.string().optional(),
  cost: joi.number().min(0).optional(),
  description: joi.string().min(3).max(360).optional(),
  organizer: joi.string().optional(),
  artists: joi.string().optional(),
  category: joi.string().optional(),
});

export const userSchema = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(35).required(),
});

export const commentSchema = joi.object({
  body: joi.string().min(1).max(240).required(),
  post: joi.string().required(),
});
