const moment = require("moment/moment");
const payModel = require("../../models/reactModel/payModel");
const productModel = require("../../models/reactModel/productsModel");

class payController {
  // them don hang vao database
  async addOrder(req, res) {
    // console.log(req.body)
    const itemsInCart = req.body.itemInCart;

    // Tạo biến để kiểm tra xem các sản phẩm có đủ số lượng không
    let checkQuantity = true;
    for (let i = 0; i < itemsInCart.length; i++) {
      const itemCheck = await productModel.returnItemToCheckQuantity(
        itemsInCart[i].id_product,
        itemsInCart[i].color,
        itemsInCart[i].size
      );
      if (itemCheck[0].quantity_product - itemsInCart[i].quantity >= 0) {
        checkQuantity = true;
      } else {
        checkQuantity = false;
        break;
      }
    }
    // console.log(checkQuantity);

    // Kiểm tra số lượng có phù hợp hay không để thêm hóa đơn vào giỏ hàng

    if (checkQuantity) {
      const currentDay = new Date();

      const entityOrder = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        recive: req.body.recive,
        adress: req.body.adress,
        paymethod_order: req.body.paymethod_order,
        note_order: req.body.note_order,
        total_money_order: req.body.total_money_order,
        status_order: req.body.status,
        date_order: `${currentDay.getFullYear()}-${
          currentDay.getMonth() + 1
        }-${currentDay.getDate()}`,
      };

      // console.log(entityOrder)
      // Thêm vào hóa đơn vào database

      const addorder = await payModel.addOrder(entityOrder);

      const AllOrder = await payModel.returnAllOrder();

      //  cap nhat lai so luong san pham va them san pham vao bang chi tiet san pham

      for (let i = 0; i < itemsInCart.length; i++) {
        const itemUpdate = await productModel.returnItemToCheckQuantity(
          itemsInCart[i].id_product,
          itemsInCart[i].color,
          itemsInCart[i].size
        );
        const entityUpdateQuantity = {
          id_product: itemsInCart[i].id_product,
          color: itemsInCart[i].color,
          id_size: itemsInCart[i].size,
          quantity_product:
            itemUpdate[0].quantity_product - itemsInCart[i].quantity,
        };

        // console.log(entityUpdateQuantity);
        const resultUpdated = await productModel.updateQuanlityProduct(
          entityUpdateQuantity
        );

        const entityOrderDetail = {
          id_order: AllOrder[AllOrder.length - 1].id_order,
          id_product: itemsInCart[i].id_product,
          quantity: itemsInCart[i].quantity,
          size: itemsInCart[i].size,
          color: itemsInCart[i].color,
          price_temp: itemsInCart[i].price_product,
        };
        //console.log(chitiethdOJ);
        const resutAddOrderDetail = await payModel.addOrderDetail(
          entityOrderDetail
        );
      }
      return res.send("Ban da dat hang thanh cong!!!");
      // res.render("pay", {
      //   announce: "Đơn hàng đã được đặt",
      // });
    }
  }

  async createURLVNPay(req, res) {
    // console.log(req.body)
    function sortObject(obj) {
      let sorted = {};
      let str = [];
      let key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key));
        }
      }
      str.sort();
      for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
          /%20/g,
          "+"
        );
      }
      return sorted;
    }

    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    // var config = require("../../../config/default.json");
    var dateFormat = require("dateformat");

    var tmnCode = "R3PCNCI3";
    var secretKey = "OYEVYAMYAGFLCANWXPECYYTMJOQKHAFJ";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "http://localhost:3001/payment/test";

    var date = new Date();

    // var createDate = dateFormat(date, "yyyymmddHHmmss");
    var createDate = moment(date).format("YYYYMMDDHHmmss");
    var orderId = moment(date).format("HHmmss");
    var amount = req.body.total_money_order;
    // var bankCode = req.body.bankCode;

    var orderInfo = "req.body.orderDescription";
    var orderType = "billpayment";
    var locale = "vn";
    // if (locale === null || locale === "") {
    //   locale = "vn";
    // }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    // if (bankCode !== null && bankCode !== "") {
    //   vnp_Params["vnp_BankCode"] = bankCode;
    // }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    console.log(vnpUrl);
    res.send(vnpUrl);
  }
  async test(req, res) {
    // console.log(req.params);
    function sortObject(obj) {
      let sorted = {};
      let str = [];
      let key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key));
        }
      }
      str.sort();
      for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
          /%20/g,
          "+"
        );
      }
      return sorted;
    }
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];

    let orderId = vnp_Params["vnp_TxnRef"];
    let rspCode = vnp_Params["vnp_ResponseCode"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    // let config = require("config");
    let secretKey = "OYEVYAMYAGFLCANWXPECYYTMJOQKHAFJ";
    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
      //kiểm tra checksum
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus == "0") {
            //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
            if (rspCode == "00") {
              //thanh cong
              //paymentStatus = '1'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
              return res.redirect(
                "http://localhost:3000/payment/success"
              );
              // res.status(200).json({ RspCode: "00", Message: "Success" });
            } else {
              //that bai
              //paymentStatus = '2'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
              return res.redirect(
                "http://localhost:3000/payment/?status=faild"
              );

              // res.status(200).json({ RspCode: "00", Message: "Success" });
            }
          } else {
            res.status(200).json({
              RspCode: "02",
              Message: "This order has been updated to the payment status",
            });
          }
        } else {
          res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
        }
      } else {
        res.status(200).json({ RspCode: "01", Message: "Order not found" });
      }
    } else {
      res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
    }
  }
}
module.exports = new payController();
