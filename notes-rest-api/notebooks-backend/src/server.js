const express = require('express');

const app = express();

app.get('/',(req,res)=> res.json({message: 'hello from notebooks'}));

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`notebooks Server lisening ${port}`);
});