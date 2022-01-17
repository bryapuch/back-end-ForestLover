const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/User');

const usuarioAll = async (req=request, res = response) =>{

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true };
    const [ total, usuarios ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);
    res.json({
        total,
        usuarios
    });
    // end - 1 forma de get all user
    // -- Start - 2 forma de get all user
    // User.find(function(err,users){
    //     if(err){
    //         return res.status(500).json({
    //             message: 'Error al obtener todos los usuarios',
    //             error: err
    //         });
    //     }
    //     return res.json(users);
    // });
    // --End - 2 forma de get all user
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

    const {id} = req.params;

    const {password, ...resto} = req.body;

    // Validando si viene el password
    if(password){
        // Encriptar el password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await User.findByIdAndUpdate(id,resto);

    // let user = await User.findOneAndUpdate({id,uid},{
    //     nickname: req.body.nickname
    // })
    res.json({
        usuario
    })
}

const usuarioNew = async (req=request, res = response) =>{

    const {nickname,correo,password} = req.body;
    const usuario = new User({nickname,correo,password});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioDelete = async (req=request, res = response) =>{

    // Start - 1 form delete
    const { id } = req.params;
    const usuario = await User.findByIdAndUpdate( id, { estado: false } );
    res.json(usuario);
    // End - 1 form delete

    // Start - 2 form delete
    // const idUser = req.params.id;
    // User.deleteOne({idUser}, function(err,user){
    //     if(err){
    //         return res.status(500).json({
    //             message: 'Error when delete a user',
    //             error: err
    //         });
    //     }
    //     return res.status(204).json({
    //         message: 'User delete ok'
    //     });
    // })
}

module.exports = {
    usuarioAll,
    usuarioOne,
    usuarioChange,
    usuarioNew,
    usuarioDelete
}