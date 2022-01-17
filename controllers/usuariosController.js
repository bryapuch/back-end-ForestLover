const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/User');

const usuarioAll = async (req=request, res = response) =>{

    User.find(function(err,users){
        if(err){
            return res.status(500).json({
                message: 'Error al obtener todos los usuarios',
                error: err
            });
        }
        return res.json(users);
    });
}

const usuarioOne = async (req=request, res = response) =>{

    const idUsuario = req.params.id;

    User.findOne({idUsuario:_id}, function(err, user){

        if(err){
            return res.status(500).json({
                message: 'Error when getting user'
            });
        }
        if(!user){
            return res.status(404).json({
                message: 'No se encuentra ese usuario'
            });
        }
        return res.json(user);
    });
}

const usuarioChange = async (req=request, res = response) =>{

    const idUser = req.params.id;

    let user = await User.findOneAndUpdate({idUser,_id},{

        nickname: req.body.nickname
    })
    res.status(204).send(user);
}

const usuarioNew = async (req=request, res = response) =>{

    

    const {nickname,correo,password} = req.body;
    const usuario = new User({nickname,correo,password});

    // Verificar si el correo existe
    const existeEmail = await User.findOne({correo});

    if(existeEmail){
        return res.status(400).json({
            message: 'El correo ya esta registrado'
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioDelete = async (req=request, res = response) =>{

    const idUser = req.params.id;

    User.deleteOne({idUser}, function(err,user){
        if(err){
            return res.status(500).json({
                message: 'Error when delete a user',
                error: err
            });
        }

        return res.status(204).json({
            message: 'User delete ok'
        });
    })
}

module.exports = {
    usuarioAll,
    usuarioOne,
    usuarioChange,
    usuarioNew,
    usuarioDelete
}