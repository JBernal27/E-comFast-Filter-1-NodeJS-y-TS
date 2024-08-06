import { Router } from "express";
import { userRouter } from "./userRoutes";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { productRouter } from "./productsRoutes";
import { authenticatePermissionsJWT } from "../middlewares/permissionsMiddleware";
import { cartRouter } from "./cartRoutes";

const router = Router();

router.use("/users", userRouter);
router.use(
  "/products",
  authenticateJWT,
  authenticatePermissionsJWT,
  productRouter
);
router.use("/cart", authenticateJWT, cartRouter);

export default router;
