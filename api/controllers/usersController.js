const User = require("../models/user");
const ErrorWithStatusCode = require("../helpers/ErrorWithStatusCode");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_key } = require("../../config");

module.exports.createUser = async function (req, res, next) {
  const { email, password, username } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return next(new ErrorWithStatusCode("Failed to create user", 500));
    else {
      User.create(
        {
          email: email,
          password: hash,
          userStatus: "registered",
          username: username,
        },
        (err, result) => {
          if (err) {
            return next(new ErrorWithStatusCode(err.message, 400));
          }
          res.status(201).json({ message: "User created", user: result });
        }
      );
    }
  });
};

module.exports.login = async function (req, res, next) {
  const { email } = req.body;
  const user = await User.find({ email: email }).exec();
  if (!user) return next(new ErrorWithStatusCode("Authorization failed", 401));

  bcrypt.compare(req.body.password, user.password, (err, same) => {
    //same [true/false], err => bcrypt error = 500
    if (err) return next(new ErrorWithStatusCode("Authorization failed", 500));

    if (same) {
      res.status(200).json({
        auth: true,
        token: jwt.sign({ _id: user._id, email: user.email }, jwt_key, {
          expiresIn: "1h",
        }),
      });
    } else {
      return next(new ErrorWithStatusCode("Authorization failed", 401));
    }
  });
};

module.exports.getUser = async function (req, res, next) {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username: username })
      .select({ password: 0, email: 0, emailStatus: 0 })
      .exec();
    if (user) res.status(200).json(user);
    else {
      return next(new ErrorWithStatusCode("Failed to retrieve user data", 404));
    }
  } catch (e) {
    return next(new ErrorWithStatusCode("Failed to retrieve user data", 400));
  }
};

module.exports.deleteUser = async function (req, res, next) {
  if (req.userData._id !== req.query.id)
    return next(new ErrorWithStatusCode("Action prohibited", 403));

  User.findOneAndDelete({ _id: req.query.id }, (error, doc) => {
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
