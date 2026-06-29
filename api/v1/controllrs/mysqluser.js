// מייבא את חיבור MySQL מהקובץ mysqldb.js
const mysqlDb = require('../modoels/mysqldb');

// bcrypt להצפנת סיסמאות
const bcrypt = require('bcrypt');

// jsonwebtoken לניהול אוטנטיקציה
const jwt = require('jsonwebtoken');

module.exports = {

    // GET /user - מחזיר את כל המשתמשים מ-MySQL
    getAll: (req, res) => {
        // שאילתת SQL פשוטה שמושכת הכל מטבלת t_user
        const sql = 'SELECT * FROM t_user';

        // query מריץ את ה-SQL ומחזיר תוצאות ב-callback
        // err = שגיאה אם הייתה, results = שורות שחזרו, feilds = מידע על העמודות
        mysqlDb.query(sql, (err, results, feilds) => {
            if (err == null) {
                console.log(results);
                res.status(200).json(results);
            }
            else {
                console.log(err);
                res.status(500).json({ 'error': err.message });
            }
        });
    },

    // GET /user/:uid - מחזיר משתמש לפי uid
    getById: (req, res) => {
        // שולף uid מהURL
        const uid = req.params.uid;

        // WHERE uid=... מסנן רק את השורה עם ה-uid הזה
        const sql = `SELECT * FROM t_user WHERE uid=${uid}`;

        mysqlDb.query(sql, (err, results, feilds) => {
            if (err == null) {
                console.log(results);
                res.status(200).json(results);
            }
            else {
                console.log(err);
                res.status(500).json({ 'error': err.message });
            }
        });
    },

    // DELETE /user/:uid - מוחק משתמש לפי uid
    delete: (req, res) => {
        const uid = req.params.uid;

        // DELETE FROM מוחק שורות שמתאימות לתנאי WHERE
        const sql = `DELETE FROM t_user WHERE uid=${uid}`;

        mysqlDb.query(sql, (err, results, feilds) => {
            if (err == null) {
                console.log(results);
                res.status(200).json(results);
            }
            else {
                console.log(err);
                res.status(500).json({ 'error': err.message });
            }
        });
    },

    // PUT /user/:uid - מעדכן שדות של משתמש
    update: (req, res) => {
        const uid = req.params.uid;

        // בונה שאילתת UPDATE דינמית לפי מה שהגיע ב-body
        let sql = 'update t_user set ';
        let data = req.body;

        // Object.keys מחזיר מערך של שמות השדות מה-body
        // לדוגמה: { fullname: "יוסי", email: "x@x.com" } → ["fullname", "email"]
        let arr = Object.keys(data);

        // עובר על כל שדה ומוסיף אותו לשאילתה בפורמט: שדה='ערך',
        for (let i = 0; i < arr.length; i++) {
            sql += `${arr[i]}='${data[arr[i]]}',`;
        }

        // מסיר את הפסיק האחרון שנוסף בטעות בלולאה
        sql = sql.substring(0, sql.length - 1);

        // מוסיף את תנאי ה-WHERE כדי לעדכן רק את המשתמש הנכון
        sql += ' where uid=' + uid;

        mysqlDb.query(sql, (err, results, feilds) => {
            if (err == null) {
                console.log(results);
                return res.status(200).json(results);
            }
            else {
                console.log(err);
                return res.status(500).json({ 'error': err.message });
            }
        });
    },

    // POST /user - מוסיף משתמש חדש עם הצפנת סיסמה
    add: (req, res) => {
        let data = req.body;
        let arr = Object.keys(data); // שמות כל השדות שהגיעו
        let fields = ""; // יצבור את שמות העמודות לשאילתה
        let values = ""; // יצבור את הערכים לשאילתה

        // קודם בודק אם המשתמש כבר קיים לפי email
        let sql = `select * from t_user where email='${data.email}'`;

        mysqlDb.query(sql, (err, results, fld) => {
            if (err != null) {
                console.log(results);
                return res.status(500).json({ error: err.message });
            }

            // אם כבר יש משתמש עם האימייל הזה - עוצר ומחזיר הודעה
            else if (results.length > 0) {
                console.log(err);
                return res.status(200).json({ msg: 'User allready exists' });
            }

            // בונה את רשימת השדות והערכים להכנסה
            for (let i = 0; i < arr.length; i++) {
                // אם השדה הוא "pass" - מצפין אותו לפני השמירה
                if (arr[i] == "pass") {
                    let pass = data[arr[i]];

                    // hashSync מצפין בצורה סינכרונית (חוסם עד שמסיים)
                    // 10 = מספר ה"rounds" - ככל שגבוה יותר, חזק יותר אבל איטי יותר
                    let hashPass = bcrypt.hashSync(pass, 10);
                    fields += `${arr[i]},`;
                    values += `'${hashPass}',`; // שומר את ה-hash ולא הסיסמה המקורית
                }
                else {
                    fields += `${arr[i]},`;
                    values += `'${data[arr[i]]}',`;
                }
            }

            // מסיר פסיק אחרון מרשימת השדות ומרשימת הערכים
            fields = fields.substring(0, fields.length - 1);
            values = values.substring(0, values.length - 1);

            // בונה שאילתת INSERT עם השדות והערכים שנבנו
            sql = `insert into t_user (${fields}) values (${values})`;

            mysqlDb.query(sql, (err, results, fld) => {
                if (err == null) {
                    console.log(results);
                    return res.status(200).json(results);
                }
                else {
                    console.log(err);
                    return res.status(500).json({ error: err.message });
                }
            });
        });
    },

    // POST /user/login - כניסה למערכת
    login: (req, res) => {
        let data = req.body;

        // מחפש משתמש לפי email
        let sql = `select * from t_user where email='${data.email}'`;

        mysqlDb.query(sql, (err, results, fld) => {
            if (err != null) {
                console.log(results);
                return res.status(500).json({ status: false, error: err.message, data: [] });
            }

            // אם לא נמצא משתמש עם האימייל
            else if (results.length == 0) {
                return res.status(200).json({ status: false, erorr: null, data: [] });
            }

            let user = results[0]; // לוקח את המשתמש שנמצא

            // bcrypt.compare: משווה סיסמה גולמית לHash שב-DB
            // אי אפשר לפענח את ה-hash - bcrypt בונה hash חדש ומשווה
            bcrypt.compare(data.pass, user.pass, (err, same) => {
                if (err != null) {
                    console.log(err);
                    return res.status(500).json({ status: false, error: err.message, data: [] });
                }

                if (same == true) {
                    // יוצר JWT token עם uid ו-email בתוכו
                    // Token זה מה שהלקוח ישלח בכל בקשה מוגנת בעתיד
                    const token = jwt.sign(
                        { uid: user.uid, email: user.email },
                        process.env.PRIVATE_KEY,
                        { expiresIn: '1h' } // Token יפוג אחרי שעה
                    );
                    return res.status(200).json({ status: true, error: null, data: results, token });
                }
                else {
                    // הסיסמה לא תואמת
                    return res.status(200).json({ status: false, erorr: null, data: [] });
                }
            });
        });
    }
}
