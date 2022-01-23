
const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/User');

const validarJWT = async(req= request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token) {
        return res.status(401).json({
            msg: 'No hay token..'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY)

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'EL usuario no existe'
            })
        }

        // Validar si el usario esta activo

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'EL usuario autentificado no se encuentra activo'
            })
        }
        
        req.usuario = usuario;
        next();    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Token no valido'
        })
    }

    
}

module.exports = {
    validarJWT
}