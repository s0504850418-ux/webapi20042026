const router=require('express').Router();
const orderController=require('../controllrs/order');

router.get('/',orderController.getAll);

router.get('/:id',orderController.getById);

router.delete('/:id',orderController.delete);

router.post('/',orderController.AddNew);

router.put('/:id',orderController.update);


module.exports=router;