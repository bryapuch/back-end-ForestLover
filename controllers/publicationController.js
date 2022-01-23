const { request, response } = require("express");

const Publication = require('../models/Publication');

const publicationAll = async (req=request, res = response) =>{

    Publication.find(function(err,publicaciones){
        if(err){
            return res.status(500).json({
                message: 'Error al obtener todas las publicaciones',
                error: err
            });
        }
        return res.json(publicaciones);
    });
}

const publicationOne = async (req=request, res = response) =>{

    const idPublication = req.params.id;

    Publication.findOne({_id:idPublication}, function(err, publicaciones){

        if(err){
            return res.status(500).json({
                message: 'Error when getting publication'
            });
        }
        if(!publicaciones){
            return res.status(404).json({
                message: 'No se encuentra esa publicacion'
            });
        }
        return res.json(publicaciones);
    });
}

const publicationChange = async (req=request, res = response) =>{

    const idPublication = req.params.id;

    const {userId, ...resto} = req.body;

    const publication = await Publication.findByIdAndUpdate(idPublication, resto);

    res.json({
        publication
    })
}

const publicationNew = async (req=request, res = response) =>{

    const newPublication = new Publication({
        userId : req.body.userId,  
        image : req.body.image,
        calificacion : req.body.calificacion,  
        etiqueta : req.body.etiqueta, 
        ubicationId : req.body.ubicationId
    });

    newPublication.save(function(err,publicaciones){
        if(err){
            return res.status(500).json({
                message: 'Error when create a new Publication',
                error: err
            });
        }
        return res.send(publicaciones);
    });
}

const publicationDelete = async (req=request, res = response) =>{

    const idPublication = req.params.id;

    Publication.deleteOne({idPublication}, function(err,publicaciones){
        if(err){
            return res.status(500).json({
                message: 'Error when delete a publication',
                error: err
            });
        }

        return res.status(200).json({
            message: 'Publication delete ok'
        });
    })
}
module.exports = {
    publicationAll,
    publicationOne,
    publicationChange,
    publicationNew,
    publicationDelete
}