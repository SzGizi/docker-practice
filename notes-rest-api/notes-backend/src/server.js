const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/',(req,res)=> res.json({message: 'h ello from  notes!'}));

const port = process.env.PORT;

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to MOngoDB! Start server");

    app.listen(port,()=>{
        console.log(`notes Server lisening ${port}`);
    });
}).catch(err => {
    console.log('Something went wrong');
    console.log(err);
});