const { request, response } = require("express");

const publicacionAll = (req=request, res = response) =>{
    res.json({
        msg: 'get API All- controlador'
    })
}

const publicacionOne = (req=request, res = response) =>{
    res.json({
        msg: 'get API One- controlador'
    })
}

const publicacionChange = (req=request, res = response) =>{
    res.json({
        msg: 'put API All- controlador'
    })
}

const publicacionNew = (req=request, res = response) =>{
    res.json({
        msg: 'post API All- controlador'
    })
}

const publicacionDelete = (req=request, res = response) =>{
    res.json({
        msg: 'delete API- controlador'
    })
}

module.exports = {
    publicacionAll,
    publicacionOne,
    publicacionChange,
    publicacionNew,
    publicacionDelete
}