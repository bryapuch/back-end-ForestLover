const { request, response } = require("express");

const usuarioAll = (req=request, res = response) =>{
    res.json({
        msg: 'get API All- controlador'
    })
}

const usuarioOne = (req=request, res = response) =>{
    res.json({
        msg: 'get API One- controlador'
    })
}

const usuarioChange = (req=request, res = response) =>{
    res.json({
        msg: 'put API All- controlador'
    })
}

const usuarioNew = (req=request, res = response) =>{
    res.json({
        msg: 'post API All- controlador'
    })
}

const usuarioDelete = (req=request, res = response) =>{
    res.json({
        msg: 'delete API- controlador'
    })
}

module.exports = {
    usuarioAll,
    usuarioOne,
    usuarioChange,
    usuarioNew,
    usuarioDelete
}