const express = require("express");
const mongoose = require("mongoose");
const {Notebooks} = require("./models");

const notebookRouter = express.Router();

// Create new notebooks: POST /
// Retrive all notebooks: GET
//Retrive a single notebooks: GET /:id http://localhost:5000/api/notebooks/id
//Delete a single notebooks: DELET /:id http://localhost:5000/api/notebooks/id
//UPDate a single notebooks: PUT /:id http://localhost:5000/api/notebooks/id
const validateId = (req,res,next) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"notebook not found"});
    }
    next();
}

notebookRouter.post('/', async(req, res) => {
    try{
        const {name, description} = req.body;
        if(!name){
            res.status(400).json({error:"'name' field is required"});
        }
        const notebook = new Notebook({name,description});
        await notebook.save();
        res.status(201).json({data, notebook});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
notebookRouter.get('/', async(req, res) => {
    try{
        const notebooks = new Notebook.find();
        return res.status(200).json({data:notebooks});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
notebookRouter.get('/:id', validateId , async(req, res) => {
    try{
        const notebook = new Notebook.findById(req.params.id);
        
        if(!notebook){
            res.status(404).json({error:"notebook not found"});
        }
        res.status(201).json({data, notebook});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
notebookRouter.put('/:id', validateId , async(req, res) => {
     try{
        const {name, description} = req.body;
        if(!name){
            res.status(400).json({error:"'name' field is required"});
        }
        

        const notebook = new Notebook.findByIdAndUpdate(req.params.id,{name, description}, {new:true});
        
    
        res.status(201).json({data, notebook});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
notebookRouter.delete('/:id',validateId, async(req, res) => {
    try{
        const notebook = new Notebook.findByIdAndDelete(req.params.id);
        
        if(!notebook){
            res.status(404).json({error:"notebook not found"});
        }
        res.status(204).json({data, notebook});

    }catch(err){
        res.status(500).json({error:err.message});
    }

});


module.exports={
    notebookRouter,
}