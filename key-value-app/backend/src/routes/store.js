const express = require('express');
const {KeyValue} = require('../modules/keyValue');

const keyValueRouter = express.Router();

keyValueRouter.post('/', async (req,res)=>{

    const {key, value} = req.body;
  
    if(!key || !value){
        return res.status(400).json({error:'Both  key and value required'});
    }

    try{
        const existingKey = await KeyValue.findOne({key});

        if(existingKey){
            return res.status(400).json({message: 'Key already exists'})
        }

        const keyValue = new KeyValue({key, value});
        await keyValue.save();
        return res.status(201).json({message:'Key-Value pair store succesfully'});
    }catch(err){
        res.status(500).json({error:'Internal server error'});
    }
    return res.send('creating key-value pair');
});
keyValueRouter.get('/:key',async (req,res) =>{
     const {key} = req.params;
    try{
        const keyValue = await KeyValue.findOne({ key })
        if(!keyValue){
            return res.status(404).json({error:'Key not found'})
        }
       console.log(key);
       return res.status(200).json({key, value:keyValue.value});

    }catch(err){
        res.status(500).json({error:'Internal server error'});
    }
    return res.send('get key-value pair');
});
keyValueRouter.put('/:key',async (req,res) =>{
    const {key} = req.params;
    const {value} = req.body;
    if(!value){
        return res.status(400).json({error:"value is reqired"});
    }

    try{ 
        const keyValue = await KeyValue.findOneAndUpdate(
            {key}, 
            {value}, 
            {new:true} 
        );
        if(!keyValue){
            return res.status(400).json({error:"Key not found"});
        }
        return res.status(200).json({message:" KEy value updateted succesfully"});

    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
    return res.send('put key-value pair');
});
keyValueRouter.delete('/:key', async(req,res) =>{
    const {key} = req.params;

    try{
          const keyValue = await KeyValue.findOneAndDelete({ key })
        if(!keyValue){
            return res.status(404).json({error:'Key not found'})
        }
        return res.status(200).json({message:"key value pair deleted succesfully"});
    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
    return res.send('delete key-value pair');
});

module.exports={
    keyValueRouter,
}