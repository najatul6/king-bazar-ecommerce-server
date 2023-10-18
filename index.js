const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// MiddleWare 
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send('KING BAZZARS ECOMMERCE SITES SERVER IS RUNNING')
})

app.listen(port,()=>{
    console.log(`KING BAZZER SERVER IS RUNNING ON POSRT : ${port}`)
})