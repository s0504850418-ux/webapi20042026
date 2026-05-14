const router=require('express').Router();
const productController=require('../controllrs/product');

router.get('/',productController.getAll);

router.get('/:id',productController.getById);

router.delete('/:id',productController.delete);

router.post('/',productController.AddNew);

router.put('/:id',productController.update);

module.exports=router;