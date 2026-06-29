// מייבא את חיבור MySQL מהקובץ mysqldb.js
const mysqlDb = require('../modoels/mysqldb');

module.exports = {

    // GET /category - מחזיר את כל הקטגוריות מטבלת t_category ב-MySQL
    getAll: (req, res) => {
        const sql = 'SELECT * FROM t_category';

        // query מריץ את ה-SQL ומחזיר תוצאות דרך callback
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


    // GET /category/:cid - מחזיר קטגוריה אחת לפי cid
    getByid: (req, res) => {
        const cid = req.params.cid; // שולף את ה-cid מה-URL
        const sql = `SELECT * FROM t_category WHERE cid=${cid}`;

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

    // DELETE /category/:cid - מוחק קטגוריה לפי cid
    delete: (req, res) => {
        const cid = req.params.cid;
        const sql = `DELETE FROM t_category WHERE cid=${cid}`;
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


    // PUT /category/:cid - מעדכן קטגוריה, בונה שאילתה דינמית לפי ה-body
    update: (req, res) => {
        const cid = req.params.cid;
        let sql = 'update t_category set ';
        let data = req.body;

        // Object.keys מחזיר מערך של שמות השדות - לדוגמה: ["cname", "cdesc"]
        let arr = Object.keys(data);

        // לכל שדה מוסיף: שדה='ערך', לשאילתה
        for (let i = 0; i < arr.length; i++) {
            sql += `${arr[i]}='${data[arr[i]]}',`;
        }

        // מסיר את הפסיק האחרון שהלולאה הוסיפה בטעות
        sql = sql.substring(0, sql.length - 1);

        // מוסיף WHERE כדי לעדכן רק את הקטגוריה הנכונה
        sql += ' where cid=' + cid;

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


    // POST /category - מוסיף קטגוריה חדשה, בונה שאילתת INSERT דינמית
    add: (req, res) => {

        let data = req.body;
        let arr = Object.keys(data); // שמות השדות שהגיעו ב-body

        let fields = ""; // יצבור שמות עמודות: cname,cdesc
        let values = ""; // יצבור ערכים: 'ספרים','תיאור'

        // עובר על כל שדה ובונה את שתי הרשימות
        for (let i = 0; i < arr.length; i++) {

            fields += `${arr[i]},`;

            values += `'${data[arr[i]]}',`;
        }

        // מסיר פסיקים אחרונים מכל רשימה
        fields = fields.substring(0, fields.length - 1);
        values = values.substring(0, values.length - 1);

        // התוצאה: INSERT INTO t_category (cname,cdesc) VALUES ('ספרים','תיאור')
        let sql = `INSERT INTO t_category (${fields}) VALUES (${values})`;

        mysqlDb.query(sql, (err, results, fields) => {
            if (err == null) {

                console.log(results);

                return res.status(200).json(results);
            }
            else {

                console.log(err);

                return res.status(500).json({
                    error: err.message
                });
            }
        });
    }
};
