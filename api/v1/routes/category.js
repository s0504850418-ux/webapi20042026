const router=require('express').Router();
const categoryController=require('../controllrs/category');

router.get('/',categoryController.getAll);

router.get('/:id',categoryController.getById);

router.delete('/:id',categoryController.delete);

router.post('/',categoryController.AddNew);

router.put('/:id',categoryController.update);


module.exports=router;