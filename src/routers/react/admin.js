const express = require("express");

const router = express.Router();

const adminController = require("../../app/controllers/reactController/adminController");
const middlewareAuth = require("../../app/controllers/reactController/middlewareAuth");

// đường dẫn để trả về các hóa đơn cho admin
router.post(
  "/admin/getorder",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getAllOrder
);

// hàm để cập nhât trạng thái hóa đơn
router.post("/admin/updatestatus", adminController.updateStatus);

//  thêm sản phẩm
router.post(
  "/admin/addproduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.addProduct
);
// /////////////////////////////

// cập nhật số lượng
router.post(
  "/admin/updateproductquantity",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.updateProductQuantity
);

// thêm sản phẩm chi tiết
router.post(
  "/admin/addproduct/productdetail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.addProductDetail
);

// cập nhật số lượng chi tiết
router.post(
  "/admin/updateproduct/productdetail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.updateProductInfor
);
// ///////////////////////

// hàm thêm sản phẩm vòa danh mục đã xóa
router.post(
  "/admin/deletedroduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.addProductDelete
);

// trả về tất cả các sản phẩm đã xóa
router.post(
  "/admin/getdeletedroduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getProductDelete
);
// hàm để khôi phục lại sản phẩm đã xóa

router.post(
  "/admin/restoreroduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.RestoreProduct
);

// ///////////////////////

// trả về các kiểu quẩn áo men or women
router.post(
  "/admin/gettypeproduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getTypeProduct
);

// trả về danh mục các sản phẩm
router.post(
  "/admin/getcaterogyproduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getCaterogyProduct
);

// thông kê trả về các hóa đơn trong khoảng ngày
router.post(
  "/admin/getorderfilterbydate",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate
);

// filter theo ngay //////////
// các hóa đơn trong khoảng ngày có email
router.post(
  "/admin/getorderfilterbydate/email",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Email
);

// các hóa đơn trong khảng ngày có trạng thái hóa đơn
router.post(
  "/admin/getorderfilterbydate/typeorder",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_TypeOrder
);

// các hóa đơn trong khảng ngày có trạng thái và email
router.post(
  "/admin/getorderfilterbydate/typeorderandemail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_TypeOrder_Email
);

// filter theo năm

// trả về hóa đơn theo năm
router.post(
  "/admin/getorderfilterbydate/year",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterBy_Year
);

// /Trả về hóa đơn theo năm và có email
router.post(
  "/admin/getorderfilterbydate/yearemail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Year_Email
);

// trả về hóa đơn theo năm và có trạng thái hóa đơn
router.post(
  "/admin/getorderfilterbydate/yeartypeorder",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Year_TypeOrder
);

// trả về hóa đơn theo năm có trạng thái hóa đơn và emai
router.post(
  "/admin/getorderfilterbydate/yeartypeorderandemail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Year_TypeOrder_Email
);
//  thống kê doanh thu theo date
router.post(
  "/admin/revenue/date",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.revenueByDate
);
// thống kê doanh thu theo năm
router.post(
  "/admin/revenue/year",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.revenueByYear
);

// thống kê sản phẩm đã bán trong khoảng thời
router.post(
  "/admin/productedtotal/date",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.productedTotal
);

// seemore thong ke san pham
router.post(
  "/admin/productedtotal/dabanchitiet",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.sanphamdabanchitiet
);
router.post(
  "/admin/filtertoupdate",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.filterOrderToUpdate
);
module.exports = router;
