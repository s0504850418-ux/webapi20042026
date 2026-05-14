module.exports = {

    getAll: (req, res) => {
        res.status(200).json({ msg: 'all orders' });
    },

    getById: (req, res) => {
        const oid = req.params.id;
        res.status(200).json({ msg: `get order id ${oid}` });
    },

    delete: (req, res) => {
        const oid = req.params.id;
        res.status(200).json({ msg: `delete order id ${oid}` });
    },

    update: (req, res) => {
        const oid = req.params.id;
        res.status(200).json({ msg: `update order id ${oid}` });
    },

    AddNew: (req, res) => {
        res.status(200).json({ msg: 'create order' });
    }
};