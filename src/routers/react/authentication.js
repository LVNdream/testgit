const express = require('express');

const router = express.Router();

const authController= require('../../app/controllers/reactController/authController')
const middlewareAuth= require('../../app/controllers/reactController/middlewareAuth')



router.post('/register',authController.register);
router.post('/login',authController.loginUser);
router.post('/refreshtoken',authController.requestRefreshToken);
router.post('/logout',middlewareAuth.verifyToken,authController.logOut);
router.get('/test',middlewareAuth.verifyToken,authController.test);

// 
router.post('/authction/app',authController.loginApp);







module.exports = router;