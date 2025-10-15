const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        reqired: true,
    }, 
    content: {
        type: String,
        reqired: false,
        default: null,
    },
    notebookId: {
        type: Schema.Types.ObjectId,
        reqired: false,
        default: null,
    },
},
{
    timestamps:true
}
);

const Note = mongoose.model('Notebook',NoteSchema);

module.exports ={
    Note,
}