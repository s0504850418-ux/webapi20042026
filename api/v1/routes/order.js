// יוצר Router של Express לניהול נתיבי orders
const router=require('express').Router();

// מייבא את ה-controller של orders (כרגע stub - בלי DB)
const orderController=require('../controllrs/order');

// GET /order - מחזיר את כל ההזמנות
router.get('/',orderController.getAll);

// GET /order/:id - מחזיר הזמנה לפי ID
router.get('/:id',orderController.getById);

// DELETE /order/:id - מוחק הזמנה
router.delete('/:id',orderController.delete);

// POST /order - יוצר הזמנה חדשה
router.post('/',orderController.AddNew);

// PUT /order/:id - מעדכן הזמנה
router.put('/:id',orderController.update);


module.exports=router;