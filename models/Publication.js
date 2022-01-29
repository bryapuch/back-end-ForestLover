
const { Schema, model } = require('mongoose');


const PublicationSchema = Schema({
    username:{
        type: String,
        required: true
    },
    body:{
        type: String,
        require: true
    },
    coverImage:{
        type: String,
        default: ""
    },
    likes:{
        type: Number,
        default: 0
    },
    comments:{
        type: Number,
        default: 0
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
