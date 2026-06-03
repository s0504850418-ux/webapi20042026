const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{

    try{
        const token=req.headers.authorization.split(' ')[1];
        const user=jwt.verify(token,process.env.PRIVATE_KEY);
        req.user=user;
        next();
    }
    catch{
        return res.status(401).json({status:false,data:[],msg:'invalid token'});
    }
};