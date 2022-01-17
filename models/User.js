
const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    userId:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [ true, 'La contraseña es obligatorio'],
    },
    prefeId:{
        type: String,

    },
});

module.exports = model( 'Articulos', ArticuloSchema);
