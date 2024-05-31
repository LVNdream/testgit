const db = require("../../../utilities/db");
const TBL_ORDERS = "orders";
const TBL_CTHD = "order_detail ";
const TBL_PRODUCT = "products";

module.exports = {
  // trả về hóa đơn theo Email
  orderByEmail: async function (email) {
    const rowOrder = await db.load(
      `select * from ${TBL_ORDERS} where email = '${email}' order by id_order desc`
    );
    if (rowOrder.length === 0) {
      return null;
    }
    return rowOrder;
  },

  // trả về các hóa đơn thành công theo email người dùng
  orderSuccessByEmail: async function (email) {
    const rowOrder = await db.load(
      `select * from ${TBL_ORDERS} where email = '${email}' and status_order="Giao hàng thành công" order by date_order desc`
    );
    if (rowOrder.length === 0) {
      return null;
    }
    return rowOrder;
  },

  // lấy chi tiết hóa đơn theo idorrder
  selectOrder_detail: async function (id_order) {
    const rowOrder_detail = await db.load(
      `select ${TBL_CTHD}.id_product,picture_product,name_product,price_product,quantity,size,color,price_temp from ${TBL_CTHD},${TBL_PRODUCT} where ${TBL_CTHD}.id_product=${TBL_PRODUCT}.id_product and ${TBL_CTHD}.id_order = '${id_order}'`
    );
    if (rowOrder_detail.length === 0) {
      return null;
    }
    return rowOrder_detail;
  },

  // select_product_ById: async function (masp) {
  //     const rowSp = await db.load(`select * from ${TBL_PRODUCT} where masp = '${masp}'`);
  //     if (rowSp.length === 0) {
  //         return null;
  //     }
  //     return rowSp;
  // },
  // selectAllOrder: async function () {
  //     const rowOrder = await db.load(`select * from ${TBL_ORDERS}`);
  //     if (rowOrder.length === 0) {
  //         return null;
  //     }
  //     return rowOrder;
  // },

  // /// cập nhật hóa đơn bên admin

  //     updateHD_Admin: async function(entity) {
  //         const condition ={
  //             idhd:entity.idhd
  //         }
  //         delete entity.idhd
  //         return db.updateHD(TBL_ORDERS,entity,condition)
  //     },
  //     updateQuanlityProduct: async function(entity) {
  //         const condition ={
  //             masp:entity.masp
  //         }
  //         delete entity.masp
  //         return db.updateHD(TBL_PRODUCT,entity,condition)
  //     },

  // //// hàm thêm sản phẩm
  // addProduct: function (entity) {
  //     return db.add(TBL_PRODUCT, entity);
  // },
  //hàm hóa đơn của khách hàng

  //

  // hàm để hủy hóa đơn
  deleteHD: function (entity) {
    return db.delete(TBL_ORDERS, entity);
  },
};
