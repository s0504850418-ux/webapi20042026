// const mysql=require('mysql');
// const connection=mysql.createConnection({
//     host:'localhost',
//     user:'webapiadmin',
//     password:'123123',
//     database:'webapidb'

// });
// connection.connect();

// const obj={
// getAllProducts:(req,res)=>{
//    connection.query('SELECT * FROM T_Product',(error,results,fields)=>{
//     if(error){
//         comsole.log('cnot found ');
//     }
//     else{
//       return res.status(200).json(results);
//         console.log(results);
//     }
//    })
// })




    
// getAll:(req,res)=>{
//     connection.query('SELECT * FROM T_Product',(error,results,fields)=>{
//     if(error){
//         comsole.log('cnot found ');
//     }
//     else{
//      res.status(200).json({msg:'all product'});
//      console.log(results);
//     }
//     })
// },
    

// getById:(req,res)=>{
// const pid=req.params.id;
// res.status(200).json({msg:`get product id ${pid}`});
// },


// delete:(req,res)=>{
// const pid=req.params.id;
// res.status(200).json({msg:`delete product id ${pid}`});
// },

// update:(req,res)=>{
// const pid=req.params.id;
// res.status(200).json({msg:`updated product with id  ${pid}`});
// },

// AddNew:(req,res)=>{
// const pid=req.params.id;
// res.status(200).json({msg:` created product with id ${pid}`});
// }


// module.exports=obj;