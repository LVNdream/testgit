const express = require('express');

const router = express.Router();

const orderController= require('../../app/controllers/reactController/orderController')
const middlewareAuth= require('../../app/controllers/reactController/middlewareAuth')


// trả về đơn hàng đã giao thành công
router.post('/clientgetordersuccess',middlewareAuth.verifyToken,orderController.clientGetOrderSuccess);

// trả về đơn hàng theo email khách hàng
router.post('/clientgetorder',middlewareAuth.verifyToken,orderController.clientGetOrder);
router.get('/clientgetorder',orderController.clientGetOrderAppMobile);









module.exports = router;