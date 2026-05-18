const mysql=require('mysql2');
const conn=mysql.createConnection(
    {
      host:'localhost',
      user:'a123',
      password:'Aa12341234#',
      database:'webapi'
    }
);
module.exports=conn;

