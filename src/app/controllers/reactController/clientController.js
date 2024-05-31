const cloudinary = require("../../../config/cloudinaryConfig");
const clientModel = require("../../models/reactModel/clientModel");
const productsModel = require("../../models/reactModel/productsModel");

class clientController {
  //ham xoa yeu thich

  async addFavoriteProduct(req, res) {
    let isExsit = false;
    // console.log(req.body)
    try {
      const listfavorite = await clientModel.returnAllFavorite();
      // console.log(listfavorite);
      listfavorite.forEach((element) => {
        if (
          element.id_product == req.body.inforProductFVR.id_product &&
          element.id_user == req.body.inforProductFVR.id_user
        ) {
          isExsit = true;
          //   console.log("da trung");
          return res.send("favoriteProduct is existed");
        }
      });
      // console.log(isExsit);
      if (!isExsit) {
        const entity = {
          id_user: req.body.inforProductFVR.id_user,
          id_product: req.body.inforProductFVR.id_product,
          favorite: true,
        };
        const addFVR = await clientModel.addFavoriteProduct(entity);
        return res.send("Add to favorite success");
      }
    } catch (error) {
      console.log(error);
      return res.send("Add to favorite error");
    }
  }
  async getListFavoriteProduct(req, res) {
    try {
      const listfavorite = await clientModel.returnAllFavoriteByUser(
        req.body.id_user
      );

      // console.log(listfavorite);
      const productdeleted = await productsModel.returnProductDeleted();

      let productFilter = listfavorite;
      productdeleted.forEach((productDeleted, index) => {
        productFilter = productFilter.filter((product) => {
          return productDeleted.id_product_deleted != product.id_product;
        });
      });

      let inforProduct = [];

      for (let index = 0; index < productFilter.length; index++) {
        const element = productFilter[index];
        const product = await productsModel.returnProductById(
          element.id_product
        );
        inforProduct.push(product[0]);
      }

      // console.log(inforProduct)
      return res.send(inforProduct);
    } catch (error) {
      console.log(error);
      return res.send("Get favorite error");
    }
  }

  async deleteFavoriteProduct(req, res) {
    try {
      // console.log(req.body);
      const deleted = await clientModel.deleteFavorite(
        req.body.id_user,
        req.body.id_product
      );

      return res.send("Deleted Favorite Success");
    } catch (error) {
      console.log(error);
      return res.send("Delete error");
    }
  }

  async deleteAllFavoriteProduct(req, res) {
    try {
      // console.log("12312");
      // console.log(req.body);
      const deleted = await clientModel.deleteAllFavorite(req.body.id_user);

      return res.send("Deleted All Favorite Success");
    } catch (error) {
      console.log(error);
      return res.send("Delete All error");
    }
  }
  async deleteOrder(req, res) {
    try {
      const idOrderDelete = req.body.inforDelete.id_order;
      console.log("12312");
      // console.log(req.body);

      console.log(idOrderDelete);
      // const deleted = await clientModel.deleteOrder(
      //   req.body.inforDelete.email,
      //   req.body.inforDelete.id_order
      // );

      return res.send({ mess: "Deleted Order Success", isError: false });
    } catch (error) {
      console.log(error);
      return res.send({ mess: "Delete Order error", isError: true });
    }
  }
  // ham dung de chanupload anh len tren cloudinary
  async uploadImg(req, res) {
    try {
      // console.log(req.body.accessToken);
      // console.log(req.body.id_user);
      // console.log(req.files.length);
      // console.log(req.body.lastname_user);
      // console.log(req.body.firstname_user);
      // console.log(req.body.id_product);

      // ham them content ne co
      if (req.body.content) {
        const entityComment = {
          id_user: req.body.id_user,
          lastname_user: req.body.lastname_user,
          firstname_user: req.body.firstname_user,
          id_product: req.body.id_product,
          content: req.body.content,
        };
        // console.log(entityComment);

        const resultAdd = await clientModel.addComment(entityComment);
      }
      // hm de them hinh anh neu co
      if (req.files.length > 0) {
        if (!req.body.content) {
          const entityComment = {
            id_user: req.body.id_user,
            lastname_user: req.body.lastname_user,
            firstname_user: req.body.firstname_user,
            id_product: req.body.id_product,
            content: "",
          };
          const resultAdd = await clientModel.addComment(entityComment);
        }

        const allCmtById_user = await clientModel.returnAllCmtById_user(
          req.body.id_user
        );
        // console.log(allCmtById_user);

        const images = req.files.map((file) => {
          return file.path;
        });
        // const uploadedImages = [];
        for (let image of images) {
          const results = await cloudinary.uploader.upload(image);
          const entityImageComment = {
            id_content: allCmtById_user[allCmtById_user.length - 1].id_content,
            src_image: results.secure_url,
            publicid_image: results.public_id,
          };

          const resultAddImageCmt = await clientModel.addComment_Picture(
            entityImageComment
          );
          // uploadedImages.push({
          //   url: results.secure_url,
          //   publicId: results.public_id,
          // });
        }
      }

      return res.send("Add comment success");
    } catch (error) {
      console.log(error);
      return res.send("Add comment error");
    }
  }

  // ham de cap nhat thong tin commnet
  async updateComments(req, res) {
    console.log(req.body.entity);
    try {
      const kq = await clientModel.updateComments(req.body.entity);
      return res.send({ mess: "Success Update", isError: false });
    } catch (error) {
      console.log(error);
      return res.send({ mess: "Error Update", isError: true });
    }
  }

  // ham de xoa hinh cua cac comment
  async deleteComments(req, res) {
    // console.log(req.body.entity);
    try {
      const { id_content, id_product, id_user } = req.body.entity;
      const deleteCmt = await clientModel.deleteComments(
        id_user,
        id_product,
        id_content
      );
      const deleteImgCmt = await clientModel.deleteImgComments(id_content);
      return res.send({ mess: "Success Update", isError: false });
    } catch (error) {
      console.log(error);
      return res.send({ mess: "Error Update", isError: true });
    }
  }
}

module.exports = new clientController();
