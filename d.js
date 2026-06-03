const jwt=require('jsonwebtoken');

const data={uid:5,email:"hbsuwsbu@data;com"};
const pk="my";

const token=jwt.sign(data,pk,{  expiresIn:'1h'});

console.log(token);

try{
    const newData=jwt.verify(token,pk);
    console.log(newData);
}
catch(err){
    console.log(err.message);
}