import express from "express";
import { productController } from "../controllers/product.controller.js";
import uploadImage from "../lib/multer.js";

const router = express.Router();

router.get("/products", productController.getAll);
router.post("/products/category", productController.getProductBySizeAndCategory);
router.get("/:_id", productController.getOne);
router.get("/category/:category_id", productController.getByCategory);
router.post("/create", uploadImage, productController.create);
router.put("/update/:_id", productController.update);
router.delete("/delete/:_id", productController.delete);
router.delete("/deleteAll", productController.deleteAll);
router.delete("/products/:category_id/:size_id", productController.getProductBySizeAndCategory);

export default router;
