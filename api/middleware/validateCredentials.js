import ErrorWithStatusCode from "../helpers/ErrorWithStatusCode.js";

export const validateEmail = (req, res, next) => {
  const validEmail = req.body.email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  if (!validEmail)
    return next(new ErrorWithStatusCode("Please provide a valid email address", 400));
  // const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  // return valid.test(email)
  next();
};

export const validatePassword = (req, res, next) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  const validPassword = req.body.password.match(/^(?=.*?[A-z])(?=.*?[0-9]).{8,}$/);
  if (!validPassword) return next(new ErrorWithStatusCode("Please provide a valid password", 400));

  next();
};
