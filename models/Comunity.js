
const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    comunityId:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion:{
        type: String,
        required: [ true, 'La descripcion es obligatoria'],
    },
    userIds:{
        type: Array<String>,

    },
});

module.exports = model( 'Articulos', ArticuloSchema);
