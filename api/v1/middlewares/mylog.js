// middleware לוגים מותאם אישית שכתבת לבד (לפני שעברת ל-morgan)
// מייצא פונקציה שרצה על כל בקשה שמגיעה לשרת
module.exports=(req,res,next)=>{
    // מדפיס את ה-method (GET/POST/...) ואת הנתיב של הבקשה
    // לדוגמה: GET /product--my log
    console.log(`${req.method} ${req.path}--my log`)

    // חייב לקרוא ל-next() כדי להעביר את הבקשה הלאה
    // בלי זה הבקשה נתקעת ולא מגיעה לשום route
    next();
};