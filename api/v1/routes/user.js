const router=require('express').Router();
const userController=require('../controllrs/user');

router.get('/',userController.getAll);

router.get('/:uid',userController.getById);

router.delete('/:uid',userController.delete);

router.post('/',userController.add);

router.put('/:uid',userController.update);

module.exports=router;