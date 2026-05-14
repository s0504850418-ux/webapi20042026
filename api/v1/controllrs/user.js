module.exports={

getAll:(req,res)=>{
    res.status(200).json({msg:'all users'});
},

getById:(req,res)=>{
const uid=req.params.id;
res.status(200).json({msg:`get user id ${uid}`});
},

delete:(req,res)=>{
const uid=req.params.id;
res.status(200).json({msg:`delete user id ${uid}`});
},

update:(req,res)=>{
const uid=req.params.id;
res.status(200).json({msg:`updated user with id  ${uid}`});
},

AddNew:(req,res)=>{
res.status(200).json({msg:` created user with id ${uid}`});
}
};







