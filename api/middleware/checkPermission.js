import ErrorWithStatusCode from "../helpers/ErrorWithStatusCode.js";

const checkPermission = (req, res, next) => {
  if (req.userData._id !== req.params.id) {
    return next(new ErrorWithStatusCode("Forbidden. Insufficient permissions", 403));
  }
  next();
};

export default checkPermission;
