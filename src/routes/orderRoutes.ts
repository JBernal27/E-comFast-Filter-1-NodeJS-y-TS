import OrderController from "../controllers/orderController";
import { Router } from "express";
import { authenticatePermissionsJWT } from "../middlewares/permissionsMiddleware";

export const orderRouter = Router();

orderRouter.post("/", OrderController.createOrder);
orderRouter.patch("/", OrderController.updateOrder);
orderRouter.delete("/:id", OrderController.delete);
orderRouter.get("/my-orders", OrderController.getByUser)
orderRouter.get("/", authenticatePermissionsJWT ,OrderController.getAll)
