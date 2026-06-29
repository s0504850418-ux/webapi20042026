// מייבא את ה-model של product - האובייקט שמייצג את הקולקציה ב-MongoDB
const productModel = require('../modoels/product');

// מייצא אובייקט עם כל הפונקציות של ה-controller
// כל פונקציה מקבלת req (הבקשה) ו-res (התשובה)
module.exports = {

    // GET /product - מחזיר את כל המוצרים מ-MongoDB
    getAll: async (req, res) => {
        try {
            // find() בלי פרמטרים מחזיר את כל המסמכים בקולקציה
            const data = await productModel.find();

            // מדפיס לקונסולה את שם הקולקציה וכמה מוצרים נמצאו
            console.log('collection:', productModel.collection.name, 'count:', data.length);

            // שולח תשובה עם סטטוס 200 (הצלחה) ואת הנתונים בפורמט JSON
            return res.status(200).json(data);
        }
        catch (err) {
            // אם משהו השתבש - שולח סטטוס 500 (שגיאת שרת) עם פרטי השגיאה
            res.status(500).json(err);
        }
    },

    // GET /product/:pid - מחזיר מוצר אחד לפי pid
    getById: async (req, res) => {
        try {
            // req.params.pid מכיל את המספר שבא אחרי /product/ בURL
            // לדוגמה: GET /product/42 → pid = "42"
            const pid = req.params.pid;

            // find עם תנאי - מחפש מסמכים שבהם השדה pid שווה לערך שקיבלנו
            const data = await productModel.find({ pid: pid });

            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE /product/:pid - מוחק מוצר לפי pid
    delete: async (req, res) => {
        try {
            const pid = req.params.pid;

            // deleteOne מוחק את המסמך הראשון שמתאים לתנאי
            const data = await productModel.deleteOne({ pid: pid });

            // מחזיר אישור המחיקה (כמה מסמכים נמחקו)
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT /product/:id - מעדכן מוצר קיים
    update: async (req, res) => {
        try {
            const pid = req.params.id;

            // findOneAndUpdate: מוצא לפי תנאי, מעדכן עם req.body, ומחזיר את המסמך החדש
            // { new: true } = תחזיר את הגרסה אחרי העדכון (ולא לפני)
            const data = await productModel.findOneAndUpdate({ pid: pid }, req.body, { new: true });

            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // POST /product - מוסיף מוצר חדש
    add: async (req, res) => {
        try {
            // יוצר instance חדש של ה-model עם הנתונים שהגיעו ב-body
            const product = new productModel(req.body);

            // save() שומר את המסמך ב-MongoDB
            const data = await product.save();

            // 201 = Created (נוצר בהצלחה) - שונה מ-200 שזה רק "הצלחה"
            return res.status(201).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};
