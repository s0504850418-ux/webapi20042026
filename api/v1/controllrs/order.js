// controller של orders - כרגע זהו STUB בלבד
// פירוש: הפונקציות קיימות אבל לא מחוברות ל-DB, מחזירות תשובות קבועות
// זה שימושי כדי "להשלים" את ה-API ולהמשיך לפתח בלי לעצור
module.exports = {

    // GET /order - אמור להחזיר את כל ההזמנות, כרגע מחזיר הודעה קבועה
    getAll: (req, res) => {
        res.status(200).json({ msg: 'all orders' });
    },

    // GET /order/:id - אמור להחזיר הזמנה לפי ID
    getById: (req, res) => {
        const oid = req.params.id; // שולף את ה-id מה-URL
        res.status(200).json({ msg: `get order id ${oid}` });
    },

    // DELETE /order/:id - אמור למחוק הזמנה
    delete: (req, res) => {
        const oid = req.params.id;
        res.status(200).json({ msg: `delete order id ${oid}` });
    },

    // PUT /order/:id - אמור לעדכן הזמנה
    update: (req, res) => {
        const oid = req.params.id;
        res.status(200).json({ msg: `update order id ${oid}` });
    },

    // POST /order - אמור ליצור הזמנה חדשה
    AddNew: (req, res) => {
        res.status(200).json({ msg: 'create order' });
    }
};