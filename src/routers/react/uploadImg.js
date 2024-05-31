const express = require('express');

const router = express.Router();
const clientController = require("../../app/controllers/reactController/clientController");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const  cloudinary = require('../../config/cloudinaryConfig');
const middlewareAuth = require("../../app/controllers/reactController/middlewareAuth");

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"picture-of-comment",
        // format:"jpg"
    }
})

const upload = multer({storage:storage})

router.post("/image",upload.array("files",10),clientController.uploadImg)


module.exports = router;