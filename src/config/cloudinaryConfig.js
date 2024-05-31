// import {v2 as cloudinary} from 'cloudinary';
// const cloudinary = require("cloudinary")
var cloudinary = require('cloudinary').v2;
// var cloudinary = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'diascy1es', 
  api_key: '222547947462662', 
  api_secret: '2ItHznBLa7CO83UBoyb32bt7Fik' 
});

module.exports = cloudinary;