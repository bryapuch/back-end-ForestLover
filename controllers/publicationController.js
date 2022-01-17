const { request, response } = require("express");

const Publication = require('../models/Publication');

const publicationAll = (req=request, res = response) =>{

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

const publicationOne = (req=request, res = response) =>{

    const idPublication = req.params.id;

    Publication.findOne({idPublication:_id}, function(err, publicaciones){

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

const publicationChange = (req=request, res = response) =>{

    const idPublication = req.params.id;

    let publications = await Publication.findOneAndUpdate({idPublication,_id},{

        nickname: req.body.nickname
    })
    res.status(204).send(publicaciones);
}

const publicationNew = (req=request, res = response) =>{

    const newPublication = new User({
        publicationId : req.body.publicationId,
        userId : req.body.userId,  
        image : req.body.image,
        calificacion : req.body.calificacion,  
        etigueta : req.body.etigueta, 
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

const publicationDelete = (req=request, res = response) =>{

    const idPublication = req.params.id;

    Publication.deleteOne({idPublication}, function(err,publicaciones){
        if(err){
            return res.status(500).json({
                message: 'Error when delete a publication',
                error: err
            });
        }

        return res.status(204).json({
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