
const { Schema, model } = require('mongoose');


const UserSchema = Schema({
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
    estado:{
        type: Boolean,
        default: true
    },
    prefeId:{
        type: String,
        default: ''
    },
});

UserSchema.methods.toJSON = function(){
    const {__v, password,_id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'User', UserSchema);
