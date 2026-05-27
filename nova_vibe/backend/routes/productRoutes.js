const express= require("express");
const router =express.Router();
const productController=require("../controllers/productController");

router.get('/',productController.getAllProducts);

router.get(`/:id_product`,productController.getProductById);
router.post(`/`,productController.createProduct);
router.put(`/:id_product`,productController.updateProduct);
router.delete(`/:id_product`,productController.deleteProduct);

module.exports=router;