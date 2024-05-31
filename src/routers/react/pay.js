const express = require('express');

const router = express.Router();
const payController = require("../../app/controllers//reactController/payController")


// thêm hóa đơn
router.post('/addorder',payController.addOrder);
router.post('/createurlvnpay',payController.createURLVNPay);
router.get  ('/test',payController.test);






module.exports = router;