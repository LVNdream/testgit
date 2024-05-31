

// ////////
const products = require("./react/products");
const pay = require("./react/pay");
const authentication = require("./react/authentication");
const adminReact = require("./react/admin");
const orderReact = require("./react/order");
const client = require("./react/client");
const uploadImg = require("./react/uploadImg")



function router(app) {
  app.use("/products", products);
  app.use("/payment", pay);
  app.use("/auth",authentication);
  app.use("/",adminReact);
  app.use("/order",orderReact);
  app.use("/client",client);
  app.use("/upload",uploadImg)





  // //////////////////////////////////////////////

}

module.exports = router;
