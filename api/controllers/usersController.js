import User from "../models/user.js";
import ErrorWithStatusCode from "../helpers/ErrorWithStatusCode.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt_key } from "../../config.js";

//register
export const register = async (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return next(new ErrorWithStatusCode("Failed to create user", 500));

    User.create({ email: email, password: hash })
      .then((result) => {
        res.status(201).json({ message: "User created successfully", user: result });
      })
      .catch((err) => {
        return next(new ErrorWithStatusCode("Failed to create user", 500));
      });
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.find({ email: email }).exec();
  if (!user) return next(new ErrorWithStatusCode("Authorization failed", 401));

  bcrypt.compare(password, user.password, (err, same) => {
    //same [true/false], err => bcrypt error = 500
    if (err) return next(new ErrorWithStatusCode("Authorization failed", 500));

    if (same) {
      res.status(200).json({
        token: jwt.sign({ _id: user._id, email: user.email }, jwt_key, {
          expiresIn: "1h",
        }),
      });
    } else {
      return next(new ErrorWithStatusCode("Authorization failed", 401));
    }
  });
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select({ password: 0 }).exec();
    if (user) res.status(200).json(user);
    else {
      return next(new ErrorWithStatusCode("Failed to retrieve user data", 404));
    }
  } catch (e) {
    return next(new ErrorWithStatusCode("Failed to retrieve user data", 400));
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  User.findOneAndDelete({ _id: id }, (error, doc) => {
    if (error) {
      return next(new ErrorWithStatusCode("Failed to delete user", 400));
    }

    if (doc)
      return res.status(200).json({
        message: "User deleted",
        result: {
          id: doc._id,
          email: doc.email,
          deleted: true,
        },
      });
    else {
      return next(new ErrorWithStatusCode("Failed to delete user", 400));
    }
  });
};

// TODO: add updateUser
