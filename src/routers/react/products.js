const express = require('express');

const router = express.Router();
const productsController = require("../../app/controllers/reactController/productsController")


// trả về sản phẩm theo danh mục nam
router.get('/men',productsController.getProducts);

// trả về sản phẩm theo danh mục
router.get('/men/:caterogy',productsController.getProductsByCaterogy);

// trả về chi tiết của một sản phẩm
router.get('/:type/:caterogy/:id/:iduser',productsController.getProductsDetail);



module.exports = router;