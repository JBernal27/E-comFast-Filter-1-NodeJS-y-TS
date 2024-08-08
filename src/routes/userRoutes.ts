import UserController from "../controllers/userController";
import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { authenticatePermissionsJWT } from "../middlewares/permissionsMiddleware";

export const userRouter = Router();

userRouter.post(
  "/",
  authenticateJWT,
  authenticatePermissionsJWT,
  UserController.createUser
);
userRouter.get(
  "/",
  authenticateJWT,
  authenticatePermissionsJWT,
  UserController.getAll
);
userRouter.get(
  "/:id",
  authenticateJWT,
  authenticatePermissionsJWT,
  UserController.getById
);
userRouter.post("/login", UserController.login);
userRouter.delete(
  "/:id",
  authenticateJWT,
  authenticatePermissionsJWT,
  UserController.deleteUser
);
/* userRouter.patch(
  "/:id",
  authenticateJWT,
  UserController.updateUser
); */
