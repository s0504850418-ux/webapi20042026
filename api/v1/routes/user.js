const router=require('express').Router();
const userController=require('../controllrs/user');

router.get('/',userController.getAll);

router.get('/:id',userController.getById);

router.delete('/:id',userController.delete);

router.post('/',userController.AddNew);

router.put('/:id',userController.update);


module.exports=router;