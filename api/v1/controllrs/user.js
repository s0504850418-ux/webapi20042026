const userModel = require('../modoels/user');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {

    getAll: async (req, res) => {
        try {
            const data = await userModel.find();
            console.log('collection:', userModel.collection.name, 'count:', data.length);
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    getById: async (req, res) => {
        try {
            const uid = req.params.uid;
            const data = await userModel.find({ uid });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    delete: async (req, res) => {
        try {
            const uid = req.params.uid;
            const data = await userModel.deleteOne({ uid });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }


    },

    update: async (req, res) => {
        try {
            const uid = req.params.uid;
            const data = await userModel.findOneAndUpdate({ uid }, req.body, { new: true });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    add: async (req, res) => {
        try {
            const user = new userModel(req.body);
            const data = await user.save();
            return res.status(201).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    login: (req, res) => {
        let data = req.body;
        let sql = `select * from t_user where email='${data.email}'`;
        mysqlDb.query(sql, (err, results, fld) => {
            if (err != null) {
                console.log(results);
                return res.status(500).json({ status: false, error: err.message, data: [] });
            }
            else if (results.length == 0) {
                return res.status(200).json({ status: false, erorr: null, data: [] });
            }
            let user = results[0];
            bcrypt.compare(data.pass, user.pass, (err, same) => {
                if (err != null) {
                    console.log(err);
                    return res.status(500).json({ status: false, error: err.message, data: [] });
                }
                if (same == true) {
                    const token = jwt.sign({ uid: user.uid, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
                    return res.status(200).json({ status: true, error: null, data: results, token });
                }
                else {
                    return res.status(200).json({ status: false, erorr: null, data: [] });
                }
            });
        });
    }
}
