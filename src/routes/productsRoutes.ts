import ProductController from "../controllers/productController";
import { Router } from "express";

export const productRouter = Router();

productRouter.post("/", ProductController.createProduct);
productRouter.get("/", ProductController.getAll);
productRouter.patch("/", ProductController.changeStock);
productRouter.get("/:id", ProductController.getById);
productRouter.delete("/:id", ProductController.delete);
// productRouter.get("/sorted", ProductController.getSorted)
