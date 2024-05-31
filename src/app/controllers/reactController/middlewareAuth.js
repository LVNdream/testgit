const jwt = require("jsonwebtoken");
const middlewareAuth = {
  verifyToken: (req, res, next) => {
    // console.log(req.body.accessToken, "aaaaaaaaaaaaaaaaaaa");
    // console.log(req);
    let isErrorLogin = false;
    const token = req.body.accessToken;
    // console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, user) => {
        // console.log(user);
        if (error) {
          console.log(error);
          isErrorLogin = true;
          return res.send({ mess: "Token is not valid", isErrorLogin });
        }
        req.user = user;
        next();
      });
    } else {
      isErrorLogin = true;
      return res.send({ mess: "You're not authenticated", isErrorLogin });
    }
  },
  verifyToKenAdminAuth: (req, res, next) => {
    let isErrorLoginAd = true;

    middlewareAuth.verifyToken(req, res, () => {
      // console.log(req.user)
      if (req.user.authorization === 0) {
        next();
      } else {
        isErrorLoginAd = true;

        return res.send({
          mess: "You're not authenticated not admin",
          isErrorLoginAd,
        });
      }
    });
  },
};

module.exports = middlewareAuth;
