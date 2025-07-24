import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProductById


} from "../controllers/productController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();


router.get("/", getAllProducts);//?public
router.get("/:id", getProductById);//?public
router.post("/", verifyToken, isAdmin, createProduct);//?admin
router.put("/:id", verifyToken, isAdmin, updateProduct);//? admin
router.delete("/:id", verifyToken, isAdmin, deleteProduct);//?adm
router.delete("/:id", verifyToken, isAdmin , deleteProductById);
router.put("/:id", verifyToken,isAdmin,updateProductById);
export default router;