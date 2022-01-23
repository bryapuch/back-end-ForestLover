const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/User');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {

    const { correo, password } = req.body;
    try {

        // Verificando si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - correo'
            })
        }

        // Verificar si el usuario esta activo

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'La cuenta no se encuentra activa'
            })
        }
        //Verificar el password
        const validarPassword = bcryptjs.compareSync(password,usuario.password);

        if(!validarPassword){
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - password'
            })
        }

        // Generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {
    login
}