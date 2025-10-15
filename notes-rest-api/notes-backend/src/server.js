const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { noteRouter} = require('./routes')

const app = express();

app.use(bodyParser.json());
app.use('/api/notes',noteRouter);


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