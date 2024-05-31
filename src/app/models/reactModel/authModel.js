const db = require("../../../utilities/db");
const TBL_USERS = "users";
module.exports = {
  // hàm tạo tài khoản
  addAccount: function (entity) {
    return db.addacc(TBL_USERS, entity);
  },

  // hàm trả về tài khaonr thoe email
  getAccountByEmail: async function (email) {
    const rowUser = await db.load(
      `select * from ${TBL_USERS} where email_user = '${email}'`
    );
    if (rowUser.length === 0) {
      return null;
    }
    return rowUser[0];
  },

// hàm cập nhật RefreshToken
  updateRefreshToken: async function (entity) {
    const condition = {
      email_user: entity.email_user,
    };
    delete entity.email_user;
    return db.updateRefreshToken(TBL_USERS, entity, condition);
  },
};
