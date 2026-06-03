const router=require('express').Router();
const userController=require('../controllrs/user');
const auth=require('../middlewares/auth');
router.get('/',userController.getAll);

router.get('/:uid',userController.getById);

router.delete('/:uid',auth,userController.delete);

router.post('/',auth,userController.add);

router.put('/:uid',auth,userController.update);

router.post('/login',userController.login);
module.exports=router;