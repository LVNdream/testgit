const authModel = require("../../models/reactModel/authModel");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
// const adminModel = require("../../models/adminModel");
// const usersModel = require("../../models/usersModel");

// {
//   "lastname_user": "le",
//   "firstname_user": "nhut",
//   "phone_user": "0397224191",
//   "gender_user": "nam",
//   "dateofbirth_user": "24/10/2001",
//   "email_user": "lnhut2410@gmail.com",
//   "password_user": "24102001"
// }
class authController {
  // Lưu thông tin đăng kí vào database
  async register(req, res) {
    try {
      // console.log(req.body.dateofbirth_user)
      // const DOBwasForamt = moment(
      //   req.body.dateofbirth_user,
      //   "DD/MM/YYYY"
      // ).format("YYYY-MM-DD");
      const password_hash = bcrypt.hashSync(req.body.password_user, 8);
      const entity = {
        //iduser:req.body.sodienthoai + 24,
        lastname_user: req.body.lastname_user,
        firstname_user: req.body.firstname_user,
        phone_user: req.body.phone_user,
        gender_user: req.body.gender_user,
        dateofbirth_user: req.body.dateofbirth_user,
        email_user: req.body.email_user,
        password_user: password_hash,
        authorization: 1,
        //Quyền hạn số 1 là người dùng bth
      };
      // res.send('post');
      //console.log(entity);
      let registerResult = await authModel.addAccount(entity);
      if (registerResult.maloi == true) {
        return res.send(
          "Tài khoản đã tồn tại hoặc đã xảy ra lỗi trong quá trình đăng kí! "
        );
      } else {
        return res.send("Bạn đã đăng kí thành công! ");
      }
    } catch (error) {
      res.status(500).json(err);
    }
  }

  // Tao ham de tao TOKEN
  // GENERATE ACCESSTOKEN

  // GENERATE REFHESHTOKEN

  //   hàm để login User

  async loginUser(req, res) {
    console.log(req.cookies);
    const generateAccessToken = (user_temp) => {
      return jwt.sign(
        {
          ...user_temp,
        },
        process.env.JWT_ACCESS_KEY,

        {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }
      );
    };

    const generateRefreshToken = (user_temp) => {
      return jwt.sign(
        {
          ...user_temp,
        },
        process.env.JWT_REFRESHTOKEN_KEY,

        {
          expiresIn: process.env.REFRESH_TOKEN_LIFE,
        }
      );
    };

    try {
      const user = await authModel.getAccountByEmail(req.body.email_user);
      let isSuccess = false;
      if (!user) {
        isSuccess = false;
        return res.send("không tìm thấy tài khoản");
      } else {
        const validPassword = await bcrypt.compareSync(
          req.body.password_user,
          user.password_user
        );
        if (!validPassword) {
          isSuccess = false;
          return res.send("Bạn đã nhập sai mật khẩu");
        } else {
          // console.log(process.env.JWT_ACCESS_KEY);
          const user_temp = user;
          await delete user_temp.password_user;
          await delete user_temp.refreshtoken;

          // console.log(user_temp);

          const accessToken = generateAccessToken(user_temp);
          let refreshToken = generateRefreshToken(user_temp);

          const entityRT = {
            email_user: user.email_user,
            refreshtoken: refreshToken,
          };
          // console.log( entityRT)
          const resultupdate = await authModel.updateRefreshToken(entityRT);

          // res.cookie("accessToken", accessToken, {
          //   httpOnly: true,
          //   secure: false,
          //   path: "/",
          //   sameSite: "strict",
          // });
          // res.cookie("refreshToken", refreshToken, {
          //   httpOnly: true,
          //   secure: false,
          //   path: "/",
          //   sameSite: "strict",
          // });
          isSuccess = true;
          const client = { user_temp, accessToken, refreshToken, isSuccess };
          // console.log(client)
          return res.send(client);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async requestRefreshToken(req, res) {
    const generateAccessToken = (user_temp) => {
      if (user_temp.exp) {
        delete user_temp.exp;
      }
      if (user_temp.iat) {
        delete user_temp.iat;
      }
      return jwt.sign(
        {
          ...user_temp,
        },
        process.env.JWT_ACCESS_KEY,

        {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }
      );
    };

    const generateRefreshToken = (user_temp) => {
      if (user_temp.exp) {
        delete user_temp.exp;
      }
      if (user_temp.iat) {
        delete user_temp.iat;
      }
      return jwt.sign(
        {
          ...user_temp,
        },
        process.env.JWT_REFRESHTOKEN_KEY,

        {
          expiresIn: process.env.REFRESH_TOKEN_LIFE,
        }
      );
    };
    // console.log(req.cookies.refreshToken);
    const refreshTokenOnCookie = req.body.refreshToken;
    // console.log(1231231231,refreshTokenOnCookie)
    if (!refreshTokenOnCookie) {
      return res.send("You're not authenticated");
    } else {
      const decodeToken = jwt.decode(refreshTokenOnCookie);
      // console.log("deco", decodeToken);
      const refreshTokenUser = await authModel.getAccountByEmail(
        decodeToken.email_user
      );
      // console.log("acc", refreshTokenUser);
      if (refreshTokenUser) {
        // console.log(refreshTokenUser);
        if (refreshTokenUser.refreshtoken === refreshTokenOnCookie) {
          // console.log("token dung r", refreshTokenOnCookie);
          jwt.verify(
            refreshTokenOnCookie,
            process.env.JWT_REFRESHTOKEN_KEY,

            async (error, user) => {
              if (error) {
                console.log(error);
              }
              const newAccessToken = generateAccessToken(user);
              const newRefreshToken = generateRefreshToken(user);
              // console.log({ newAccessToken, newRefreshToken });
              // res.cookie("accessToken", newAccessToken, {
              //   httpOnly: true,
              //   secure: false,
              //   path: "/",
              //   sameSite: "strict",
              // });
              // res.cookie("refreshToken", newRefreshToken, {
              //   httpOnly: true,
              //   secure: false,
              //   path: "/",
              //   sameSite: "strict",
              // });
              const entityRT = {
                email_user: decodeToken.email_user,
                refreshtoken: newRefreshToken,
              };
              const resutlUD = await authModel.updateRefreshToken(entityRT);

              return res.send({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              });
            }
          );
        }
      } else {
        return res.send("No account base on refreshToken");
      }
    }
  }

  async logOut(req, res) {
    const accessTokenOnCookie = req.body.accessToken;
    const decodeToken = jwt.decode(accessTokenOnCookie);
    // console.log(decodeToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    const entityRT = {
      email_user: decodeToken.email_user,
      refreshtoken: "",
    };
    const result = await authModel.updateRefreshToken(entityRT);
    return res.send("Logouted success!");
  }

  test(req, res) {
    res.send("21313123");
  }

  async loginApp(req, res) {
    // console.log(req.body);
    try {
      const user = await authModel.getAccountByEmail(req.body.email);
      let isSuccess = false;
      if (!user) {
        isSuccess = false;
        return res.send("không tìm thấy tài khoản");
      } else {
        const validPassword = await bcrypt.compareSync(
          req.body.password,
          user.password_user
        );
        if (!validPassword) {
          isSuccess = false;
          return res.send("Bạn đã nhập sai mật khẩu");
        } else {
          // console.log(process.env.JWT_ACCESS_KEY);
          const user_temp = user;
          await delete user_temp.password_user;
          await delete user_temp.refreshtoken;

          isSuccess = true;
          const client = { token: "18082022levietthai", email:user_temp.email_user };
          // console.log(client)
          return res.send(client);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = new authController();
