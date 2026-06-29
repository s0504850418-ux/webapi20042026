const mongoose=require('mongoose');
mongoose.pluralize(null);
const productSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    pid: Number,
    pname: String,
    price: Number,
    pdesc: String,
    picname: String,
    cid: String
});
const productModel =  mongoose.model('product', productSchema, 'product');

module.exports=productModel;