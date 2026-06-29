// מייבא את ה-model של user מ-Mongoose (MongoDB)
const userModel = require('../modoels/user');

// bcrypt - ספרייה להצפנת סיסמאות. לעולם לא שומרים סיסמה כטקסט רגיל ב-DB
const bcrypt = require('bcrypt');

// jsonwebtoken - ספרייה ליצירת ובדיקת JWT tokens לאוטנטיקציה
const jwt = require('jsonwebtoken');

module.exports = {

    // GET /user - מחזיר את כל המשתמשים מ-MongoDB
    getAll: async (req, res) => {
        try {
            // find() בלי פרמטרים = תחזיר הכל
            const data = await userModel.find();
            console.log('collection:', userModel.collection.name, 'count:', data.length);
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // GET /user/:uid - מחזיר משתמש לפי uid
    getById: async (req, res) => {
        try {
            // שולף את ה-uid מהURL
            const uid = req.params.uid;

            // מחפש ב-MongoDB משתמש שה-uid שלו מתאים
            const data = await userModel.find({ uid });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE /user/:uid - מוחק משתמש (מוגן ב-JWT)
    delete: async (req, res) => {
        try {
            const uid = req.params.uid;

            // מוחק מסמך אחד שמתאים ל-uid
            const data = await userModel.deleteOne({ uid });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT /user/:uid - מעדכן משתמש (מוגן ב-JWT)
    update: async (req, res) => {
        try {
            const uid = req.params.uid;

            // findOneAndUpdate: מוצא לפי uid, מעדכן עם כל מה שהגיע ב-body
            // { new: true } = מחזיר את המשתמש אחרי העדכון ולא לפניו
            const data = await userModel.findOneAndUpdate({ uid }, req.body, { new: true });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // POST /user - מוסיף משתמש חדש (מוגן ב-JWT)
    add: async (req, res) => {
        try {
            // יוצר instance חדש של ה-model עם הנתונים מה-body
            const user = new userModel(req.body);

            // שומר ב-MongoDB
            const data = await user.save();

            // 201 = Created
            return res.status(201).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // POST /user/login - כניסה למערכת, מחזיר JWT token
    // פונקציה זו עובדת מול MySQL (לא MongoDB) - לכן callback ולא async/await
    login: (req, res) => {
        // שולף email ו-pass מה-body של הבקשה
        let data = req.body;

        // בונה שאילתת SQL לחיפוש המשתמש לפי email
        let sql = `select * from t_user where email='${data.email}'`;

        // מריץ את השאילתה מול MySQL
        // mysqlDb.query מקבל: SQL, callback(err, results, fields)
        mysqlDb.query(sql, (err, results, fld) => {

            // אם הייתה שגיאה ב-DB
            if (err != null) {
                console.log(results);
                return res.status(500).json({ status: false, error: err.message, data: [] });
            }
            // אם לא נמצא משתמש עם האימייל הזה
            else if (results.length == 0) {
                return res.status(200).json({ status: false, erorr: null, data: [] });
            }

            // לוקח את המשתמש הראשון (ויחיד) שנמצא
            let user = results[0];

            // bcrypt.compare: משווה בין הסיסמה שהגיעה מהלקוח (data.pass)
            // לבין ה-hash שמאוחסן ב-DB (user.pass)
            // זה עובד כי bcrypt יודע לפתוח את ה-hash ולהשוות
            bcrypt.compare(data.pass, user.pass, (err, same) => {

                if (err != null) {
                    console.log(err);
                    return res.status(500).json({ status: false, error: err.message, data: [] });
                }

                // אם הסיסמה נכונה - same יהיה true
                if (same == true) {
                    // jwt.sign יוצר token חדש
                    // פרמטר 1: הנתונים שנכנסים לתוך ה-token (uid ו-email)
                    // פרמטר 2: המפתח הסודי מה-.env לחתימה
                    // פרמטר 3: הגדרות - תוקף של שעה אחת
                    const token = jwt.sign(
                        { uid: user.uid, email: user.email },
                        process.env.PRIVATE_KEY,
                        { expiresIn: '1h' }
                    );

                    // מחזיר הצלחה + נתוני המשתמש + ה-token
                    return res.status(200).json({ status: true, error: null, data: results, token });
                }
                else {
                    // הסיסמה שגויה
                    return res.status(200).json({ status: false, erorr: null, data: [] });
                }
            });
        });
    }
}
