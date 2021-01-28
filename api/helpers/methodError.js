import ErrorWithStatusCode from "./ErrorWithStatusCode.js";

const methodError = (methods) => {
  return (req, res, next) => {
    const allowedMethods = methods.allowed.join(", ").trim();
    res.set("Allow", allowedMethods);
    return next(
      new ErrorWithStatusCode(
        `The ${req.method} method for the ${req.originalUrl} route is not supported`,
        405
      )
    );
  };
};

export default methodError;
