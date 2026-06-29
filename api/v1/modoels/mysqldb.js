// מייבא את ספריית mysql2 לחיבור ל-MySQL
const mysql=require('mysql2');

// יוצר חיבור קבוע ל-MySQL עם פרטים מקובץ .env
// createConnection יוצר חיבור יחיד (לא pool) - מספיק לפרויקט לימודי
const conn=mysql.createConnection(
    {
      host:process.env.MYSQLSRV,       // כתובת שרת MySQL
      user:process.env.MYSQLUSER,      // שם משתמש
      password:process.env.MYSQLPASS,  // סיסמה
      port:process.env.MYSQLPORT,      // פורט (ברירת מחדל: 3306)
      database:process.env.MYSQLDB     // שם ה-database
    }
);

// מייצא את החיבור כדי שכל controller יוכל לייבא ולהשתמש בו
module.exports=conn;

