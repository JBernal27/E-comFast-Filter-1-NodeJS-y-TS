import ProductController from "../controllers/productController";
import { Router } from "express";
import { authenticatePermissionsJWT } from "../middlewares/permissionsMiddleware";

export const productRouter = Router();

productRouter.post("/", authenticatePermissionsJWT, ProductController.createProduct);
productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getById);
productRouter.patch("/", authenticatePermissionsJWT,  ProductController.changeStock);
productRouter.delete("/:id", authenticatePermissionsJWT, ProductController.delete);
// productRouter.get("/sorted", ProductController.getSorted)
