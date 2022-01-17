
const { Schema, model } = require('mongoose');


const PublicationSchema = Schema({
    publicationId:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    image:{
        type: Image,
        required:true
    },
    calificacion:{
        type: String,
        required: true
    },
    etigueta:{
        type: String,
        required: true
    },
    ubicationId:{
        type: String,

    },
});

module.exports = model( 'Articulos', ArticuloSchema);
