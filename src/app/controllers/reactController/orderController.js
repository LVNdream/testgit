const orderModel = require("../../models/reactModel/orderModel");

class orderController {
  // ham de get order cua khach hang

  async clientGetOrder(req, res) {
    // console.log(12312312)
    // console.log(req.body.email_user);
    let allOrder = [];
    let issetHD;
    const orders = await orderModel.orderByEmail(req.body.email_user);
    //console.log(order);
    if (orders != null) {
      issetHD = true;

      for (let i = 0; i < orders.length; i++) {
        allOrder[i] = {
          listItem: await orderModel.selectOrder_detail(orders[i].id_order),
          id_order: orders[i].id_order,
          fullname: orders[i].fullname,
          date_order: orders[i].date_order,
          adress: orders[i].adress,
          recvie: orders[i].recvie,
          status_order: orders[i].status_order,
          total_money_order: orders[i].total_money_order,
          phone: orders[i].phone,
        };
        // console.log({
        //   listItem: await orderModel.selectOrder_detail(orders[i].id_order),
        // });
      }
      // console.log(allOrder);
    } else {
      issetHD = false;
    }
    res.send({ allOrder, issetHD });
  }

  // get order in app moblie
  async clientGetOrderAppMobile(req, res) {
    // console.log(12312312)
    // console.log("asdsdsad",req.query);
    let allOrder = [];
    const orders = await orderModel.orderByEmail(req.query.email_user);
    // //console.log(order);
    if (orders != null) {
      for (let i = 0; i < orders.length; i++) {
        allOrder[i] = {
          id_order: orders[i].id_order,
          fullname: orders[i].fullname,
          date_order: orders[i].date_order,
          adress: orders[i].adress,
          recvie: orders[i].recive,
          status_order: orders[i].status_order,
          total_money_order: orders[i].total_money_order,
          phone: orders[i].phone,
          listItem: await orderModel.selectOrder_detail(orders[i].id_order),
        };
        console.log({
          listItem: await orderModel.selectOrder_detail(orders[i].id_order),
        });
      }
      // console.log(allOrder);
    } else {
    }
    res.send(allOrder);
  }
  async clientGetOrderSuccess(req, res) {
    // console.log(req.body.email_user);
    let allOrder = [];
    // let issetHD;
    const orders = await orderModel.orderSuccessByEmail(req.body.email_user);
    //console.log(order);
    if (orders != null) {
      // issetHD = true;

      for (let i = 0; i < orders.length; i++) {
        allOrder[i] = {
          listItem: await orderModel.selectOrder_detail(orders[i].id_order),
          id_order: orders[i].id_order,
          fullname: orders[i].fullname,
          date_order: orders[i].date_order,
          adress: orders[i].adress,
          recvie: orders[i].recvie,
          status_order: orders[i].status_order,
          total_money_order: orders[i].total_money_order,
          phone: orders[i].phone,
        };
      }
    } else {
      allOrder = null;
    }
    res.send(allOrder);
    // res.send({ allOrder, issetHD});
  }
}

module.exports = new orderController();
