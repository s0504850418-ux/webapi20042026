const mongoose=require('mongoose');
mongoose.pluralize(null);
const userSchema = mongoose.Schema({
    uid: Number,
    email: String,
    pass: String,
    fullname: String
});
const userModel =  mongoose.model('user', userSchema, 'user');

module.exports=userModel;