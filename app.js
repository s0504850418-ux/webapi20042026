// טוען את קובץ .env ומכניס את המשתנים שבו ל-process.env
// בלי השורה הזו MONGO_USER, MONGO_PASS וכו' יהיו undefined
require('dotenv').config();

// הגדרת DNS מחדש - ראה server.js להסבר
require('dns').setServers(['8.8.8.8', '1.1.1.1']);

// מייבא את ספריית mongoose לעבודה עם MongoDB
const mongoose = require("mongoose");

// מייבא את Express - הפריימוורק שמטפל בבקשות HTTP
const express = require('express');

// יוצר את אפליקציית Express - זה האובייקט המרכזי שכל ה-API בנוי עליו
const app = express();

// מייבא את morgan - middleware לרישום לוגים של כל בקשה HTTP (method, url, status, זמן)
const morgan = require('morgan');

// בונה את כתובת החיבור ל-MongoDB Atlas מתוך משתני הסביבה
// encodeURIComponent מונע בעיות אם הסיסמה מכילה תווים מיוחדים כמו @ או #
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_SRV}/EcomDb`;

// מתחבר ל-MongoDB Atlas
// .then רץ רק אחרי שהחיבור הצליח
mongoose.connect(connStr).then((conn) => {
    console.log('MongoDb connected'); // מדפיס אישור שהחיבור הצליח
});

// מייבא את קובץ הנתיבים של products
const routerProduct = require('./api/v1/routes/product');

// מייבא את קובץ הנתיבים של users
const routerUser = require('./api/v1/routes/user');

// מייבא את קובץ הנתיבים של categories
const routerCategory = require('./api/v1/routes/category');

// מייבא את קובץ הנתיבים של orders
const orderRouter = require('./api/v1/routes/order');

//const mylog=require('./api/v1/middlewares/mylog'); // middleware לוגים מותאם אישית - כרגע מושבת

// מייבא את middleware האוטנטיקציה (בדיקת JWT) - לא בשימוש גלובלי, מוחל על routes ספציפיים
const auth = require('./api/v1/middlewares/auth');

// ניסיון ישן לחיבור MySQL ישיר - הוחלף על ידי mysqldb.js
// connection.connect();
// connection.query('SELECT * FROM t_product',(error,result,fields)=>{
// if(error){
//     console.log('cnot fuind');
// }
// else{
//     console.log(result);
// }
// });

// middleware ישן שהגביל גישה לפי IP - הוחלף על ידי אוטנטיקציה JWT
// app.use((req,res,next)=>{
//     const arrAllowLIst=['127.0.0.1','::1'];
//     for(let i=0;i<arrAllowLIst.length;i++)
//     {
//         if(arrAllowLIst[i]==req.ip)
//             {
//                 next();
//             }
//             return res.status(401).json({msg:"ikjggyggu"});
//     }
// });

// app.use(mylog); // הפעלת middleware הלוגים המותאם - כרגע מושבת

// מחבר את morgan כ-middleware גלובלי - כל בקשה תירשם בקונסולה
// 'dev' זה פורמט קצר ומוצבע: GET /product 200 5ms
app.use(morgan('dev'));

// מאפשר ל-Express לקרוא body בפורמט JSON (Content-Type: application/json)
// בלי זה req.body יהיה undefined כשהלקוח שולח JSON
app.use(express.json());

// מאפשר ל-Express לקרוא body בפורמט form (Content-Type: application/x-www-form-urlencoded)
app.use(express.urlencoded());

// מגדיר שכל בקשה שמתחילה ב-/product תועבר ל-routerProduct
app.use('/product', routerProduct);

// מגדיר שכל בקשה שמתחילה ב-/user תועבר ל-routerUser
app.use('/user', routerUser);

// מגדיר שכל בקשה שמתחילה ב-/category תועבר ל-routerCategory
app.use('/category', routerCategory);

// מגדיר שכל בקשה שמתחילה ב-/order תועבר ל-orderRouter
app.use('/order', orderRouter);

// מייצא את אפליקציית Express כדי שserver.js יוכל להשתמש בה
module.exports = app;
