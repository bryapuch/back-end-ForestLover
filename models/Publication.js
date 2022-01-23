
const { Schema, model } = require('mongoose');


const PublicationSchema = Schema({
    userId:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required:true
    },
    calificacion:{
        type: String,
        required: true
    },
    etiqueta:{
        type: String,
        required: true
    },
    ubicationId:{
        type: String,

    },
});

PublicationSchema.methods.toJSON = function(){
    const {__v,_id, ...publication} = this.toObject();
    publication.uid = _id;
    return publication
}

module.exports = model( 'Publication', PublicationSchema);
