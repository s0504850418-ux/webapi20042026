const router=require('express').Router();
const productController=require('../controllrs/product');

router.get('/',productController.getAll);

router.get('/:pid',productController.getById);

router.delete('/:pid',productController.delete);

router.post('/',productController.add);

router.put('/:id',productController.update);

module.exports=router;