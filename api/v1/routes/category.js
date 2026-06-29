// יוצר Router של Express לניהול נתיבי categories
const router = require('express').Router();

// מייבא את ה-controller של categories
const categoryController = require('../controllrs/category');

// GET /category - מחזיר את כל הקטגוריות מ-MySQL
router.get('/', categoryController.getAll);

// GET /category/:cid - מחזיר קטגוריה אחת לפי ID
router.get('/:cid', categoryController.getByid);

// DELETE /category/:cid - מוחק קטגוריה לפי ID
router.delete('/:cid', categoryController.delete);

// POST /category - מוסיף קטגוריה חדשה
// הנתונים מגיעים ב-body של הבקשה
router.post('/', categoryController.add);

// PUT /category/:cid - מעדכן קטגוריה קיימת
router.put('/:cid', categoryController.update);

module.exports = router;
