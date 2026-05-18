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
            const pid=req.params.id;
            const sql=`SELECT * FROM t_product WHERE pid=${pid}`;

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

delete:(req,res)=>{
const pid=req.params.pid;
const sql=`DELETE FROM t_product WHERE pid=${pid}`;
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

update:(req,res)=>{
const uid=req.params.id;
res.status(200).json({msg:`updated user with id  ${uid}`});
},

AddNew:(req,res)=>{
res.status(200).json({msg:` created user with id ${uid}`});
}
};







