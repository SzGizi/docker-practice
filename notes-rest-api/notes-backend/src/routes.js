const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const {Note} = require("./models");

const nodebooksApiUrl = process.env.NOTEBOOKS_API_URL;
const noteRouter = express.Router();

// Create new notes: POST /
// Retrive all notes: GET
//Retrive a single notes: GET /:id http://localhost:5000/api/notes/id
//Delete a single notes: DELET /:id http://localhost:5000/api/notes/id
//UPDate a single notes: PUT /:id http://localhost:5000/api/notes/id
const validateId = (req,res,next) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"note not found"});
    }
    next();
}

noteRouter.post('/', async(req, res) => {
    try{
        const {title, content, notebookId} = req.body;

        let validateNotebookId = null;
        if(!notebookId){
            console.log({
                message:
                "Notebook ID not provided, Storing note without notebook."
            })
        } else if (!mongoose.Types.ObjectId.isValid(notebookId)){
            return res.status(400).json({error:'Notebook not found', notebookId});
        } else {
            try{
                await axios.get(`${nodebooksApiUrl}{/${notebookId}`);
            }catch(err){
                const jsonError = err.toJSON();
                if(jsonError.status === 404){
                   return res
                   .status(404)
                   .json({error: "Notebook not found", notebookId}); 
                } else{
                    console.log({
                        message: 
                        "Error verifying the notebook Id, Upstrem notebooks service not available. Storing note with provided Id for later validataion. ",
                        notebookId,
                        error: err.message,
                    });
                } 
            }finally{
                validateNotebookId = notebookId;
            }
        }
        if(!title || !content){
            res.status(400).json({error:"'name' field is required"});
        }
        const note = new Note({title,content, notebookId: validateNotebookId});
        await note.save();
        res.status(201).json({data, note});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
noteRouter.get('/', async(req, res) => {
    try{
        const notes = new Note.find();
        return res.status(200).json({data:notes});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
noteRouter.get('/:id', validateId , async(req, res) => {
    try{
        const note = new Note.findById(req.params.id);
        
        if(!note){
            res.status(404).json({error:"note not found"});
        }
        res.status(201).json({data, note});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
noteRouter.put('/:id', validateId , async(req, res) => {
     try{
        const {title, content} = req.body;
        if(!title){
            res.status(400).json({error:"'title' field is required"});
        }
        

        const note = new Note.findByIdAndUpdate(req.params.id,{title, content}, {new:true});
        
    
        res.status(201).json({data, note});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});
noteRouter.delete('/:id',validateId, async(req, res) => {
    try{
        const note = new Note.findByIdAndDelete(req.params.id);
        
        if(!note){
            res.status(404).json({error:"note not found"});
        }
        res.status(204).json({data, note});

    }catch(err){
        res.status(500).json({error:err.message});
    }

});


module.exports={
    noteRouter,
}