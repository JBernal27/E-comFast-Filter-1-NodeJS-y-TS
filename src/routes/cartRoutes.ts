import CartController from "../controllers/cartController";
import { Router } from "express";

export const cartRouter = Router();

cartRouter.post("/", CartController.addToCart);
cartRouter.patch("/", CartController.addToCart);
cartRouter.delete("/", CartController.delete);
// cartRouter.get("/:id", authenticateJWT ,CartController.f)
