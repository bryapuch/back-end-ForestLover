const { request, response } = require("express");

const User = require('../models/User');

const usuarioAll = (req=request, res = response) =>{

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

const usuarioOne = (req=request, res = response) =>{

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

const usuarioChange = (req=request, res = response) =>{

    const idUser = req.params.id;

    let user = await User.findOneAndUpdate({idUser,_id},{

        nickname: req.body.nickname
    })
    res.status(204).send(user);
}

const usuarioNew = (req=request, res = response) =>{

    const newUser = new User({
        userId : req.body.userId,
        nickname : req.body.nickname,  
        correo : req.body.correo,
        password : req.body.password,  
        prefeI : req.body.prefeId
    });

    newUser.save(function(err,user){
        if(err){
            return res.status(500).json({
                message: 'Error when create a new User',
                error: err
            });
        }
        return res.send(user);
    });
}

const usuarioDelete = (req=request, res = response) =>{

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