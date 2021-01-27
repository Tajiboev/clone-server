import { Router } from "express";

//controllers
import { createUser, login, getUser, deleteUser } from "../controllers/usersController.js";

//middleware
import { validateEmail, validatePassword } from "../middleware/validateCredentials.js";
import checkAuth from "../middleware/checkAuth.js";
import checkExistingUser from "../middleware/checkExistingUser.js";

//helpers
import { methodError } from "../helpers/methodError.js";

const router = Router();

router
  .route("/signup")
  .post(validateEmail, validatePassword, checkExistingUser, createUser)
  .all(methodError({ allowed: ["POST"] }));

router
  .route("/login")
  .post(validateEmail, validatePassword, login)
  .all(methodError({ allowed: ["POST"] }));

router
  .route("/")
  .get(getUser) //by id or username [make sure you don't send private fields in response]
  .delete(checkAuth, deleteUser)
  .all(methodError({ allowed: ["GET", "DELETE"] }));

//TODO: add router.patch('/:userId', updateUser)

export default router;
