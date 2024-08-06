import CartController from "../controllers/cartController";
import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";

export const cartRouter = Router();

cartRouter.post("/", CartController.addToCart);
// cartRouter.get("/:id", authenticateJWT ,CartController.f)
