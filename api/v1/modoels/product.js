// מייבא את mongoose לעבודה עם MongoDB
const mongoose=require('mongoose');

// מבטל את ה-pluralize האוטומטי של mongoose
// בלי זה mongoose היה מחפש קולקציה בשם "products" (עם s) במקום "product"
mongoose.pluralize(null);

// מגדיר את מבנה המסמך (Schema) - כמו טבלה ב-SQL, מגדיר אילו שדות יש ומה הסוג שלהם
const productSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId, // MongoDB יוצר _id אוטומטית, לא צריך להגדיר
    pid: Number,       // מזהה מוצר
    pname: String,     // שם המוצר
    price: Number,     // מחיר
    pdesc: String,     // תיאור המוצר
    picname: String,   // שם קובץ התמונה
    cid: String        // מזהה קטגוריה שאליה המוצר שייך
});

// יוצר את ה-Model - זה האובייקט שדרכו מבצעים שאילתות ל-MongoDB
// פרמטר 1: שם ה-model, פרמטר 2: ה-schema, פרמטר 3: שם הקולקציה ב-DB
const productModel =  mongoose.model('product', productSchema, 'product');

// מייצא את ה-model כדי שה-controller יוכל להשתמש בו
module.exports=productModel;