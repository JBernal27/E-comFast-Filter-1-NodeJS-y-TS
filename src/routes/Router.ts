import { Router } from "express";
import { userRouter } from "./userRoutes";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { productRouter } from "./productsRoutes";
import { cartRouter } from "./cartRoutes";
import { orderRouter } from "./orderRoutes";

const router = Router();

router.use("/users", userRouter);
router.use(
  "/products",
  authenticateJWT,
  productRouter
);
router.use("/carts", authenticateJWT, cartRouter);
router.use("/orders", authenticateJWT, orderRouter);

export default router;
