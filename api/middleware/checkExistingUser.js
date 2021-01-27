import ErrorWithStatusCode from "../helpers/ErrorWithStatusCode.js";
import User from "../models/user.js";

export default async (req, res, next) => {
  const { email, username } = req.body;

  if (!(email && username)) {
    return next(new ErrorWithStatusCode("Please provide a valid email and username", 400));
  }

  const emailExists = await exists({ email: email });
  if (emailExists) return next(new ErrorWithStatusCode("Email already in use", 400));

  const usernameExists = await exists({ username: username });
  if (usernameExists) return next(new ErrorWithStatusCode("Username already in use", 400));

  next();
};
