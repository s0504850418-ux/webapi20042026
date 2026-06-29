// יוצר Router של Express - אובייקט שמנהל את כל הנתיבים של products בנפרד
const router = require('express').Router();

// מייבא את ה-controller של products - שם נמצאת כל הלוגיקה האמיתית
const productController = require('../controllrs/product');

// GET /product - מחזיר את כל המוצרים מה-DB
// כשמישהו שולח GET ל-/product הפונקציה getAll רצה
router.get('/', productController.getAll);

// GET /product/:pid - מחזיר מוצר אחד לפי ID
// :pid זה פרמטר דינמי - /product/5 יתפוס pid=5
router.get('/:pid', productController.getById);

// DELETE /product/:pid - מוחק מוצר לפי ID
router.delete('/:pid', productController.delete);

// POST /product - מוסיף מוצר חדש
// הנתונים של המוצר מגיעים ב-body של הבקשה (JSON)
router.post('/', productController.add);

// PUT /product/:id - מעדכן מוצר קיים לפי ID
router.put('/:id', productController.update);

// מייצא את ה-router כדי שapp.js יוכל להשתמש בו
module.exports = router;
