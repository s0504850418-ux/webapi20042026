// מייבא את mongoose לעבודה עם MongoDB
const mongoose=require('mongoose');

// מבטל pluralize - mongoose לא יוסיף s לשם הקולקציה אוטומטית
mongoose.pluralize(null);

// מגדיר את מבנה המסמך של משתמש
const userSchema = mongoose.Schema({
    uid: Number,       // מזהה משתמש
    email: String,     // אימייל
    pass: String,      // סיסמה (מוצפנת עם bcrypt לפני השמירה)
    fullname: String   // שם מלא
});

// יוצר את ה-Model על בסיס ה-schema
// שם הקולקציה ב-MongoDB יהיה 'user'
const userModel =  mongoose.model('user', userSchema, 'user');

// מייצא את ה-model לשימוש ב-controller
module.exports=userModel;