const mysql = require("mysql");
const config = require("../config/db.json");
const pool = mysql.createPool(config.mysql);

module.exports = {
  /// đây là hàm load cũ
  // load: function (sql) {
  //     var cn = mysql.createConnection(config.mysql);
  //     cn.connect();
  //     cn.query(sql, function (error, results, fields) {
  //           if (error) throw error;
  //           console.log(results);
  //           cn.end();
  //         });
  // }
  ////////////////////đây là hàm load cũ cách gọi callback
  // load: function (sql, fn_done, fn_fail) {
  //     pool.query(sql, function (error, results, fields) {
  //         if (error) {
  //             return fn_fail(error);
  //         }
  //         fn_done(results)
  //     });
  // }

  load: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          //console.log('lỗi',error)
          return reject(error);
        }
        //console.log('kq',results)
        resolve(results);
      });
    });
  },
  // thêm dữ liệu vào database
  add: function (table, entity) {
    const sql = `insert into ${table} set ?`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, entity, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  // hàm thêm tài khoản

  addacc: function (table, entity) {
    const sql = `insert into ${table} set ?`;
    return new Promise(function (resolve, reject) {
      //console.log('12333333333333333333333333333333')
      pool.query(sql, entity, function (error, results) {
        if (error) {
          console.log("ưewewewewewe", error);
          resolve({
            thongbao: "Tài khoản Email đã tồn tại",
            maloi: true,
          });
        }
        //console.log('ưewewewewewe',results)
        resolve({
          thongbao: "Bạn đã đăng kí thành công",
          maloi: false,
        });
      });
    });
  },
  updateHD: function (table, entity, condition) {
    const sql = `update ${table} set ? where email="${condition.email}" and id_order="${condition.id_order}"`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  // ham cap nhat san pha  ben react
  updateQuantity: function (table, entity, condition) {
    const sql = `update ${table} set ? where id_product="${condition.id_product}" and lower(color)=lower("${condition.color}") and id_size="${condition.id_size}"`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  updateInforDetailProduct: function (table, entity, condition) {
    const sql = `update ${table} set ? where id_product="${condition.id_product}"`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  updateRefreshToken: function (table, entity, condition) {
    const sql = `update ${table} set ? where email_user="${condition.email_user}"`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  // hàm xóa san pham yeu thich
  delete: function (table, id_user, id_product) {
    const sql = `delete from ${table} where id_user =${id_user} and  id_product = ${id_product}   `;
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  deleteAllFRV: function (table, id_user) {
    const sql = `delete from ${table} where id_user =${id_user}`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  deleteOrder: function (table, email, id_order) {
    const sql = `delete from ${table} where email ="${email}" and  id_order = "${id_order}"  `;
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  // restore product
  restoreProduct: function (table, id_product_deleted) {
    const sql = `delete from ${table} where id_product_deleted = ${id_product_deleted}`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  // ham de updateComment
  updateComments: function (table, entity, condition) {
    const sql = `update ${table} set ? where id_content="${condition.id_content}" and id_user="${condition.id_user}" and id_product="${condition.id_product}" `;
    return new Promise(function (resolve, reject) {
      pool.query(sql, [entity, condition], function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  // hàm để xóa comment
  deleteComments: function (table, id_user, id_product, id_content) {
    const sql = `delete from ${table} where id_user =${id_user} and id_product = ${id_product} and id_content = ${id_content}`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  // hàm để xóa hình của các comments
  deleteImgComments: function (table, id_content) {
    const sql = `delete from ${table} where id_content = ${id_content}`;
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
};
// //////////////////
