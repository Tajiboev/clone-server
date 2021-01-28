import ErrorWithStatusCode from "../helpers/ErrorWithStatusCode.js";
import User from "../models/user.js";

const checkUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.find({ email: email }).exec();
  if (user) return next(new ErrorWithStatusCode("User already exists", 409));

  next();
};

export default checkUser;
