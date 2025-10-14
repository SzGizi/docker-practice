const express = require('express');

const keyValueRouter = express.Router();

keyValueRouter.post('/', (req,res)=>{});
keyValueRouter.get('/:key',(req,res) =>{});
keyValueRouter.put('/:key',(req,res) =>{});
keyValueRouter.delete('/:key',(req,res) =>{});

module.exports={
    keyValueRouter,
}