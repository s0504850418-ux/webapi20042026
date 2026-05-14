module.exports = {

    getAll: (req, res) => {
        res.status(200).json({ msg: 'all categorys' });
    },

    getById: (req, res) => {
        const cuid = req.params.id;
        res.status(200).json({ msg: `get category id ${cuid}` });
    },

    delete: (req, res) => {
        const cuid = req.params.id;
        res.status(200).json({ msg: `delete category id ${cuid}` });
    },

    update: (req, res) => {
        const cuid = req.params.id;
        res.status(200).json({ msg: `update category id ${cuid}` });
    },

    AddNew: (req, res) => {
        res.status(200).json({ msg: 'create category' });
    }
};