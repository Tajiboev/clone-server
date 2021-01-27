import jwt from "jsonwebtoken";
import { jwt_key } from "../../config.js";
import ErrorWithStatusCode from "../helpers/ErrorWithStatusCode.js";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_key);
    req.isAuthenticated = true;
    req.userData = decoded;
    next();
  } catch (e) {
    next(new ErrorWithStatusCode("Authorization failed", 401));
  }
};

export default checkAuth;
