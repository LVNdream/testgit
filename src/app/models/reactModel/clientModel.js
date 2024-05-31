const db = require("../../../utilities/db");
const TBL_LF = "listfavorite";
const TBL_ORDER = "orders";
const TBL_COMMENTS = "comments";
const TBL_COMMENT_IMAGE = "comments_image";
module.exports = {
  returnAllFavorite: function () {
    return db.load(`SELECT * from ${TBL_LF}`);
  },
  disFavorite: async function (entity) {
    return db.add(TBL_LF, entity);
  },
  addFavoriteProduct: async function (entity) {
    return db.add(TBL_LF, entity);
  },
  deleteFavorite: async function (id_user, id_product) {
    return db.delete(TBL_LF, id_user, id_product);
  },

  deleteAllFavorite: async function (id_user) {
    return db.deleteAllFRV(TBL_LF, id_user);
  },
  returnAllFavoriteByUser: function (id_user) {
    return db.load(`SELECT * from ${TBL_LF} where id_user='${id_user}'`);
  },
  deleteOrder: function (email, id_order) {
    return db.deleteOrder(TBL_ORDER, email, id_order);
  },

  //////////////
  // hàm thêm commnets
  addComment: async function (entity) {
    return db.add(TBL_COMMENTS, entity);
  },

  // hàm thêm comment hình ảnh
  addComment_Picture: async function (entity) {
    return db.add(TBL_COMMENT_IMAGE, entity);
  },

  // trả về tất cả các comment theo iduser
  returnAllCmtById_user: async function (id_user) {
    return db.load(`SELECT * from ${TBL_COMMENTS} where id_user='${id_user}'`);
  },
  // cap nhat comment
  updateComments: async function (entity) {
    const condition = {
      id_product: entity.id_product,
      id_user: entity.id_user,
      id_content: entity.id_content,
    };
    delete entity.id_product;
    delete entity.id_user;
    delete entity.id_content;
    return db.updateComments(TBL_COMMENTS, entity, condition);
  },

  // hàm để xóa comment trên bình luận sản phẩm

  deleteComments: async function (id_user, id_product, id_content) {
    return db.deleteComments(TBL_COMMENTS, id_user, id_product, id_content);
  },
  // hàm để xóa hình comments
  deleteImgComments: async function (id_content) {
    return db.deleteImgComments(TBL_COMMENT_IMAGE, id_content);
  },
};
