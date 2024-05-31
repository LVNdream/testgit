const express = require("express");

const router = express.Router();

const clientController = require("../../app/controllers/reactController/clientController");
const middlewareAuth = require("../../app/controllers/reactController/middlewareAuth");

// thêm vò sản phẩm yêu thích
router.post(
  "/addfavorite",
  middlewareAuth.verifyToken,
  clientController.addFavoriteProduct
);

// trả về các sản phẩm yêu thích
router.post(
  "/getfavorite",
  middlewareAuth.verifyToken,
  clientController.getListFavoriteProduct
);

// xóa sản phẩm yêu thích
router.post(
  "/deletefavorite",
  middlewareAuth.verifyToken,
  clientController.deleteFavoriteProduct
);

// xóa tất cả các sản phẩm yêu thích
router.post(
  "/deleteallfavorite",
  middlewareAuth.verifyToken,
  clientController.deleteAllFavoriteProduct
);

// hủy hóa đơn
router.post(
  "/deleteorder",
  middlewareAuth.verifyToken,
  clientController.deleteOrder
);
// ham de cap nhat chinh sua comment cua khach hang
router.post(
  "/updatecomments",
  middlewareAuth.verifyToken,
  clientController.updateComments
);

router.post(
  "/deletecomments",
  middlewareAuth.verifyToken,
  clientController.deleteComments
);
module.exports = router;
