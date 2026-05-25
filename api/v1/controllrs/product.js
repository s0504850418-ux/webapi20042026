const mysqlDb = require('../modoels/mysqldb');
module.exports = {

    getAll: (req, res) => {
        const sql = 'SELECT * FROM t_product';
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
        const pid = req.params.id;
        const sql = `SELECT * FROM t_product WHERE pid=${pid}`;

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
        const pid = req.params.pid;
        const sql = `DELETE FROM t_product WHERE pid=${pid}`;
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
        const pid = req.params.id;
        let sql = 'update t_product set ';
        let data = req.body;
        let arr = Object.keys(data);
        for (let i = 0; i < arr.length; i++) {
            sql += `${arr[i]}='${data[arr[i]]}',`;
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ' where pid=' + pid;
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

        for (let i = 0; i < arr.length; i++) {

            fields += `${arr[i]},`;

            values += `'${data[arr[i]]}',`;
        }

        fields = fields.substring(0, fields.length - 1);
        values = values.substring(0, values.length - 1);
        let sql = `INSERT INTO t_product (${fields}) VALUES (${values})`;
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
//     AddNew: (req, res) => {
//         let sql = 'INSERT INTO t_product SET ';
//         let data = req.body;
//         let arr = Object.keys(data);
//         let values = '';

//         let filds = ''
//         for (let i = 0; i < arr.length; i++) {
//             sql += `${arr[i]}='${data[arr[i]]}',`;
//         }
//         sql = sql.substring(0, sql.length - 1);
//         sql += ' where pid=' + pid;
//         mysqlDb.query(sql, (err, results, feilds) => {
//             if (err == null) {
//                 console.log(results);
//                 return res.status(200).json(results);
//             }
//             else {
//                 console.log(err);
//                 return res.status(500).json({ 'error': err.message });
//             }
//         });
//     }
// };







