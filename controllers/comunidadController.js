const { request, response } = require("express");

const Comunity = require('../models/Comunity');

const comunidadAll = (req=request, res = response) =>{

    Comunity.find(function(err,comunidades){
        if(err){
            return res.status(500).json({
                message: 'Error al obtener todos las comunidades',
                error: err
            });
        }
        return res.json(comunidades);
    });
}

const comunidadOne = (req=request, res = response) =>{

    const idComunidad = req.params.id;

    Comunity.findOne({idComunidad:_id}, function(err, comunity){

        if(err){
            return res.status(500).json({
                message: 'Error when getting comunity'
            });
        }
        if(!comunity){
            return res.status(404).json({
                message: 'No se encuentra esa comunidad'
            });
        }
        return res.json(comunity);
    });
}

const comunidadChange = (req=request, res = response) =>{

    const idComunity = req.params.id;

    let comunity = await Comunity.findOneAndUpdate({idComunity,_id},{

        descripcion: req.body.descripcion
    })
    res.status(204).send(comunity);
}

const comunityNew = (req=request, res = response) =>{

    const newComunity = new Comunity({
        comunityId : req.body.comunityId,
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        userIds : req.body.userIds,
    });

    newComunity.save(function(err,comunity){
        if(err){
            return res.status(500).json({
                message: 'Error when create a new Comunity',
                error: err
            });
        }
        return res.send(comunity);
    });
}

const comunidadDelete = (req=request, res = response) =>{

    const idComunity = req.params.id;

    Comunity.deleteOne({idComunity}, function(err,comunity){
        if(err){
            return res.status(500).json({
                message: 'Error when delete a comunity',
                error: err
            });
        }

        return res.status(204).json({
            message: 'Comunity delete ok'
        });
    })
}

module.exports = {
    comunidadAll,
    comunidadOne,
    comunidadChange,
    comunityNew,
    comunidadDelete
}
