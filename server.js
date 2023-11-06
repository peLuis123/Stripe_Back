const app = require('./app');
const PORT = process.env.PORT
app.listen(process.env.PORT || 3000,(err)=>{
    console.log(`🚀 server is runing 🚀${PORT}`)
})