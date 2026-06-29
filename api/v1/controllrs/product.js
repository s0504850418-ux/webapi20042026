const productModel = require('../modoels/product');

module.exports = {

    getAll: async (req, res) => {
        try {
            const data = await productModel.find();
            console.log('collection:', productModel.collection.name, 'count:', data.length);
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    getById: async (req, res) => {
        try {
            const pid = req.params.pid;
            const data = await productModel.find({ pid: pid });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    delete: async (req, res) => {
        try {
            const pid = req.params.pid;
            const data = await productModel.deleteOne({ pid: pid });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }

    },

    update: async (req, res) => {
        try {
            const pid = req.params.id;
            const data = await productModel.findOneAndUpdate({ pid: pid }, req.body, { new: true });
            return res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    add: async (req, res) => {
        try {
            const product = new productModel(req.body);
            const data = await product.save();
            return res.status(201).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};
