const mysqlDb=require('../modoels/mysqldb');
module.exports={

getAll:(req,res)=>{
    const sql='SELECT * FROM t_product';
    mysqlDb.query(sql,(err,results,feilds)=>{
    if(err==null)
    {
        console.log(results);
        res.status(200).json(results);
    }
    else
    {
        console.log(err);
        res.status(500).json({'error': err.message});
    }
});

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







