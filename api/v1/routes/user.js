// יוצר Router של Express לניהול נתיבי users
const router = require('express').Router();

// מייבא את ה-controller של users
const userController = require('../controllrs/user');

// מייבא את middleware האוטנטיקציה - בודק שיש JWT תקין בבקשה
const auth = require('../middlewares/auth');

// GET /user - מחזיר את כל המשתמשים (ללא הגנה - כל אחד יכול לגשת)
router.get('/', userController.getAll);

// GET /user/:uid - מחזיר משתמש אחד לפי ID (ללא הגנה)
router.get('/:uid', userController.getById);

// DELETE /user/:uid - מוחק משתמש
// auth באמצע = קודם עובר דרך middleware האוטנטיקציה, רק אחר כך מגיע ל-delete
// בלי JWT תקין יקבל 401 ולא יגיע ל-userController.delete
router.delete('/:uid', auth, userController.delete);

// POST /user - מוסיף משתמש חדש (מוגן - רק מי שמחובר יכול להוסיף)
router.post('/', auth, userController.add);

// PUT /user/:uid - מעדכן משתמש (מוגן)
router.put('/:uid', auth, userController.update);

// POST /user/login - כניסה למערכת, מחזיר JWT token
// שים לב: אין auth כאן - הנתיב הזה פתוח לכולם, כי זה איפה מקבלים את הטוקן
router.post('/login', userController.login);

module.exports = router;
