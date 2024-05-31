// const axios = require('axios');
const cors = require("cors");
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 3001;
const morgan = require("morgan");
const handlebar = require("express-handlebars");
////Sử dụng để lưu trữ thông tin đăng nhập
const session = require("express-session");
const cookieParser = require("cookie-parser");
// sử dụng body parser
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 3600 * 1000,
      
    },
  })
);
/// để khoét lỗ tạo sections

const hbs_sections = require("express-handlebars-sections");

//cách để phân trang các chức năng trên trang wed

//để express lấy được giữ liệu mà gỏm gửi về
app.use(
  express.urlencoded({
    extended: true,
  })
);
// sử dụng morgan để xem req and res
app.use(morgan("combined"));
// //////////////////////////////////////

//  Sử dụng handlebar để viết file font-end
app.engine(
  "hbs",
  handlebar.engine({
    extname: ".hbs",
    helpers: {
      section: hbs_sections(),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// //////////////

// static file
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);
// /////////////////////////////

const router = require("./routers/index.js");
router(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
////////////// kết nối với MySQL thử xem sao
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   port: 3306,
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Nhut19701977@',
//   database : 'test'
// });

// connection.connect();
// const sql = 'SELECT * from sinhvien';
// connection.query(sql, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
//   connection.end();
// });
const db = require("./utilities/db");
// goi hàm chưa promise
// db.load('SELECT * from sinhvien',
//   function (rows) {
//     console.log(rows);
//   },
//   function (error) {
//     console.log(error);
//   }
// );
// Để chạy promise thử
// const pm = db.load('SELECT * from sinhvien');
// pm.then(function (rows) {
//   console.log(rows)
// })
//   .catch(function (error) {
//     console.log(error)
//   })

// async function main() {
//   const rows = await db.load('SELECT * from product');
//   console.log(rows);
// }
// main();
