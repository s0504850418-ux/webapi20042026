const router=require('express').Router();
const productController=require('../controllrs/product');

router.get('/',productController.getAll);

router.get('/:pid',productController.getById);

router.delete('/:pid',productController.delete);

router.post('/',productController.AddNew);

router.put('/:pid',productController.update);

module.exports=router;