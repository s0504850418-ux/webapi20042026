const http=require('http');
const app=require('./app')
const port=5053;
const srv=http.createServer(app);
srv.listen(port,()=>{
    console.log('server is up')
})
//nv akunl bufks