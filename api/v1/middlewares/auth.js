// מייבא את ספריית jsonwebtoken לאימות tokens
const jwt=require('jsonwebtoken');

// מייצא פונקציית middleware - Express מפעיל אותה לפני ה-controller בכל route מוגן
// req = הבקשה, res = התשובה, next = פונקציה שמעבירה את הבקשה הלאה ל-controller
module.exports=(req,res,next)=>{

    try{
        // שולף את ה-token מה-header
        // הלקוח אמור לשלוח: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
        // split(' ')[1] לוקח את החלק אחרי המילה "Bearer"
        const token=req.headers.authorization.split(' ')[1];

        // jwt.verify בודק שה-token תקין, לא פג תוקף, ולא זויף
        // אם משהו לא תקין - זורק exception ומגיע ל-catch
        // PRIVATE_KEY הוא המפתח הסודי שאיתו ה-token נוצר ב-login
        const user=jwt.verify(token,process.env.PRIVATE_KEY);

        // מוסיף את פרטי המשתמש המפוענחים מה-token לאובייקט הבקשה
        // ככה ה-controller יכול לדעת מי שלח את הבקשה דרך req.user
        req.user=user;

        // מעביר את הבקשה הלאה ל-controller (בלי next() הבקשה נתקעת כאן)
        next();
    }
    catch{
        // אם ה-token חסר, פג תוקף או לא תקין - מחזיר 401 Unauthorized
        return res.status(401).json({status:false,data:[],msg:'invalid token'});
    }
};