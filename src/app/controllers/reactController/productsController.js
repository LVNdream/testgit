const productsModel = require("../../models/reactModel/productsModel");
const clientModel = require("../../models/reactModel/clientModel");

class productsController {
  async getProducts(req, res) {
    const id_user = req.query.id_user;

    const products = await productsModel.returnProduct();

    const productdeleted = await productsModel.returnProductDeleted();

    const listFavoriteProduct = await clientModel.returnAllFavorite();

    // console.log(listFavoriteProduct)

    let productFilter = products;
    productdeleted.forEach((productDeleted, index) => {
      productFilter = productFilter.filter((product) => {
        return productDeleted.id_product_deleted != product.id_product;
      });
    });

    // console.log("123123123",productFilter);

    let productsdetail = [];
    for (let i = 0; i < productFilter.length; i++) {
      let isFavorite = false;
      const product = productFilter[i];
      if (id_user) {
        listFavoriteProduct.forEach((element, index) => {
          if (
            product.id_product == element.id_product &&
            id_user == element.id_user
          ) {
            isFavorite = true;
          }
        });
      }
      // console.log(isFavorite)
      const newproduct = {
        ...product,
        listColorDetail: await productsModel.returnProductDetail(
          product.id_product
        ),
        listColor: await productsModel.returnProductListColor(
          product.id_product
        ),
        listSize: await productsModel.returnProductListSize(product.id_product),
        isFavorite,
      };
      productsdetail.push(newproduct);
    }
    req.session.test = {
      name: "nhut",
      age: 23,
      email: "lvnhut@getAccountByEmail.com",
    };
    // return res.send("asdasd ")
    console.log(req.cookies)
    return res
      .cookie("access_token", "Bearer " + "token", {
        maxAge: 1 * 1000,
        httpOnly: true,
        secure: true, // cookie will be removed after 8 hours
      })
      .send({ productsdetail, session: req.session });
  }

  async getProductsByCaterogy(req, res) {
    //const rowPDCT = await menfsModel.returnProduct();
    // console.log(req.params);

    const products = await productsModel.returnProductByCaterogy(
      req.params.caterogy
    );
    // const listFavoriteProduct = await clientModel.returnAllFavorite();

    let productsdetail = [];
    for (let i = 0; i < products.length; i++) {
      let isFavorite = false;
      const product = products[i];
      // listFavoriteProduct.forEach((element, index) => {
      //   if (product.id_product == element.id_product) {
      //     isFavorite = true;
      //   }
      // });
      const newproduct = {
        ...product,
        listColorDetail: await productsModel.returnProductDetail(
          product.id_product
        ),
        listColor: await productsModel.returnProductListColor(
          product.id_product
        ),
        listSize: await productsModel.returnProductListSize(product.id_product),
        isFavorite,
      };
      productsdetail.push(newproduct);
    }

    // console.log(productsdetail.listSize)

    return res.send(productsdetail);
  }

  async getProductsDetail(req, res) {
    // console.log(req.params);
    const id_user = req.params.iduser;
    const id_product = req.params.id;

    let inforDetail;
    const row = await productsModel.returnItemDetail(
      req.params.id,
      req.params.caterogy,
      req.params.type
    );
    let isFavorite = false;
    const listFavoriteProduct = await clientModel.returnAllFavorite();
    if (id_user) {
      listFavoriteProduct.forEach((element, index) => {
        if (id_product == element.id_product && id_user == element.id_user) {
          isFavorite = true;
        }
      });
    }

    let itemDeleted = false;

    const productdeleted = await productsModel.returnProductDeleted();
    productdeleted.forEach((product_deleted, index) => {
      if (product_deleted.id_product_deleted === row[0].id_product) {
        itemDeleted = true;
      }
    });

    // console.log(itemDeleted)

    if (row[0] && !itemDeleted) {
      // listFavoriteProduct.forEach((element, index) => {
      //   if (row[0].id_product == element.id_product) {
      //     isFavorite = true;
      //   }
      // });

      // lay cac cmt cho san pham
      // console.log("asdsdsdsdsdsd",row[0].id_product)
      const arrayCmt = await productsModel.returnCmt_By_Id_product(
        row[0].id_product
      );
      // console.log("asdsdsdsdsdsd",arrayCmt)
      let commentDetail = [];
      // Lấy commnet từ khách
      if (arrayCmt.length > 0) {
        for (let index = 0; index < arrayCmt.length; index++) {
          commentDetail[index] = {
            id_product: arrayCmt[index].id_product,
            id_content: arrayCmt[index].id_content,
            id_user: arrayCmt[index].id_user,
            lastname_user: arrayCmt[index].lastname_user,
            firstname_user: arrayCmt[index].firstname_user,

            content: arrayCmt[index].content,
            img: await productsModel.returnIMG_By_Id_content(
              arrayCmt[index].id_content
            ),
          };
        }
      }
      // console.log(commentDetail)

      //

      inforDetail = {
        ...row[0],
        listColorDetail: await productsModel.returnProductDetail(
          row[0].id_product
        ),
        listColor: await productsModel.returnProductListColor(
          row[0].id_product
        ),
        listSize: await productsModel.returnProductListSize(row[0].id_product),
        isFavorite,
        commentDetail,
      };
    }

    // console.log(inforDetail);
    return res.send(inforDetail);
  }
}
module.exports = new productsController();
