const router=require('express').Router();
const categoryController=require('../controllrs/category');

router.get('/',categoryController.getAll);

router.get('/:cid',categoryController.getByid);

router.delete('/:cid',categoryController.delete);

router.post('/',categoryController.add);

router.put('/:cid',categoryController.update);

module.exports=router;