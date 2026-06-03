require('dotenv').config();
const express=require('express');
const app=express();
const morgan=require('morgan');

const routerProduct=require('./api/v1/routes/product');
const routerUser=require('./api/v1/routes/user');
const routerCategory=require('./api/v1/routes/category');
const orderRouter = require('./api/v1/routes/order');
//const mylog=require('./api/v1/middlewares/mylog');
const auth=require('./api/v1/middlewares/auth');








// connection.connect();
// connection.query('SELECT * FROM t_product',(error,result,fields)=>{
// if(error){
//     console.log('cnot fuind');
// }
// else{
//     console.log(result);
// }
// });








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


// app.use(mylog);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use('/product',auth,routerProduct);
app.use('/user',auth,routerUser);
app.use('/category',routerCategory)
app.use('/order', orderRouter);


module.exports=app;