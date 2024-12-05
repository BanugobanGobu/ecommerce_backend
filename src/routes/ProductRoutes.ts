import express from "express";
import upload from "../middlewares/uploadMiddleware"
import ProductController from "../controllers/ProductController";

const router = express.Router();

router.post("/post/api", upload.array("images", 10), ProductController.createProduct);
router.get("/getAllProduct/api", ProductController.getAllProducts);
router.get("/getsingleProduct/api/:id", ProductController.getSingleProduct);
router.patch("/update/api/:id", upload.array("images", 10), ProductController.updateProduct);
router.delete("/delete/api/:id", ProductController.deleteProduct);
router.get("/filter/api", ProductController.filteredProduct);


export default router;