const express = require('express');

const app = express();

app.get('/',(req,res)=> res.json({message: 'hello from notebooks'}));

app.listen(3000,()=>{
    console.log("notebooks Server lisening 3000");
});