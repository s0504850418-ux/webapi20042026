const mysqlDb = require('../modoels/mysqldb');
const bcrypt = require('bcrypt');
module.exports = {


    getAll: (req, res) => {
        const sql = 'SELECT * FROM t_user';
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
    getById: (req, res) => {
        const uid = req.params.uid;
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

    delete: (req, res) => {
        const uid = req.params.uid;
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

    update: (req, res) => {
        const uid = req.params.uid;
        let sql = 'update t_user set ';
        let data = req.body;
        let arr = Object.keys(data);
        for (let i = 0; i < arr.length; i++) {
            sql += `${arr[i]}='${data[arr[i]]}',`;
        }
        sql = sql.substring(0, sql.length - 1);
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


    add: (req, res) => {
        let data = req.body;
        let arr = Object.keys(data);
        let fields = "";
        let values = "";
        let sql = `select * from t_user where email='${data.email}'`;
        mysqlDb.query(sql, (err, results, fld) => {
            if (err != null) {
                console.log(results);
                return res.status(500).json({ error: err.message });

            }
            else if (results.length > 0) {
                console.log(err);
                return res.status(200).json({ msg: 'User allready exists' });
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == "pass") {
                    let pass = data[arr[i]];
                    let hashPass = bcrypt.hashSync(pass, 10);
                    fields += `${arr[i]},`;
                    values += `'${hashPass}',`;
                }
                else {
                    fields += `${arr[i]},`;
                    values += `'${data[arr[i]]}',`;
                }
            }
            fields = fields.substring(0, fields.length - 1);
            values = values.substring(0, values.length - 1);
            sql = `insert into t_user (${fields}) values (${values})`;
            mysqlDb.query(sql, (err, results, fld) => {
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
            })
        });


    }
};


