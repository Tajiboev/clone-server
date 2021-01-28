import { Router } from "express";

//controllers
import { register, login, getUser, deleteUser } from "../controllers/usersController.js";

//middleware
import { validateEmail, validatePassword } from "../middleware/validateCredentials.js";
import checkAuth from "../middleware/checkAuth.js";
import checkPermission from "../middleware/checkPermission.js";
import checkUser from "../middleware/checkUser.js";

//helpers
import methodError from "../helpers/methodError.js";

const router = Router();

router
  .route("/register")
  .post(validateEmail, validatePassword, checkUser, register)
  .all(methodError({ allowed: ["POST"] }));

router
  .route("/login")
  .post(validateEmail, validatePassword, login)
  .all(methodError({ allowed: ["POST"] }));

router
  .route("/:id")
  .get(getUser) //by id or username [make sure you don't send private fields in response]
  .delete(checkAuth, checkPermission, deleteUser)
  .all(methodError({ allowed: ["GET", "DELETE"] }));

//TODO: add router.patch('/:userId', updateUser)

export default router;
