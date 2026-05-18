const express=require('express');
const app=express();
const morgan=require('morgan');

const routerProduct=require('./api/v1/routes/product');
const orderRouter = require('./api/v1/routes/order');
const userRouter=require('./api/v1/routes/user');
const categoryRouter=require('./api/v1/routes/category');
//const mylog=require('./api/v1/middlewares/mylog');

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

app.use('/order', orderRouter);
app.use('/product',routerProduct);
app.use('/user',userRouter)
app.use('/category',categoryRouter)

module.exports=app;