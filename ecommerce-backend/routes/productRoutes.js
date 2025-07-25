// import express from "express";
// import {
//     getAllProducts,
//     getProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     deleteProductById,
//     updateProductById


// } from "../controllers/productController.js";
// import { verifyToken } from "../middlewares/verifyToken.js";
// import { isAdmin } from "../middlewares/isAdmin.js";
// const router = express.Router();


// router.get("/", getAllProducts);//?public
// router.get("/:id", getProductById);//?public
// router.post("/", verifyToken, isAdmin, createProduct);//?admin
// router.put("/:id", verifyToken, isAdmin, updateProduct);//? admin
// router.delete("/:id", verifyToken, isAdmin, deleteProduct);//?adm
// router.delete("/:id", verifyToken, isAdmin, deleteProductById);
// router.put("/:id", verifyToken, isAdmin, updateProductById);
// export default router;

import express from "express";
import {
    createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/",getAllProducts);
router.get("/:id",getProductById);

router.post("/",verifyToken,isAdmin,createProduct);
router.put("/:id",verifyToken,isAdmin,updateProduct);
router.delete("/:id",verifyToken,isAdmin,deleteProduct);

export default router;