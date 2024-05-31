const db = require('../../../utilities/db');
const TBL_ORDER = 'orders';
const TBL_ORDERDETAIL = 'order_detail';
module.exports = {
    addOrder: function (entity) {
        return db.add(TBL_ORDER, entity);
    },
    addOrderDetail: function (entity) {
        return db.add(TBL_ORDERDETAIL, entity);
    },
    returnAllOrder: function() {
        return db.load(`SELECT * from ${TBL_ORDER}`);
    }
};