// מגדיר שרתי DNS חיצוניים (Google ו-Cloudflare) כדי שהחיבור ל-MongoDB Atlas יעבוד
// בלי זה Node.js משתמש בDNS של הרשת המקומית שלפעמים לא מוצא את כתובת Atlas
require('dns').setServers(['8.8.8.8', '1.1.1.1']);

// מייבא את מודול http המובנה של Node.js - זה מה שיוצר שרת אמיתי שמקשיב לבקשות
const http = require('http');

// מייבא את קובץ app.js שמכיל את כל הגדרות Express (routes, middleware, חיבור לDB)
const app = require('./app');

// הפורט שעליו השרת יקשיב - 5053
const port = 5053;

// יוצר שרת HTTP ומעביר אליו את אפליקציית Express
// הפרדה בין http.createServer לבין app מאפשרת גמישות (למשל הוספת WebSockets בעתיד)
const srv = http.createServer(app);

// מפעיל את השרת ומאזין לחיבורים
// הפונקציה בתוך listen רצה פעם אחת כשהשרת מוכן
srv.listen(port, () => {
    console.log('server is up'); // מדפיס לקונסולה כשהשרת עלה בהצלחה
});
