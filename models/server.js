const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../db/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.server = require('http').createServer(this.app);

        this.paths ={
            usuario:    '/api/user'
        }

        // conectar la base de datos
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes(this.usuariosPath,require('../routes/usuarioRouter'));
    }

    async dbConnection(){

        await dbConnection();
    }

    middlewares() {


        this.app.use(morgan('dev'));
        // CORS
        this.app.use( cors() );
        
        // lectura y parseo del body
        this.app.use( express.json() );
        // Directorio publico
        this.app.use(express.static('public'))

        this.app.use(express.urlencoded({ extended: true }));
    }

    routes(){
        
        this.app.use(this.paths.usuario, require('../routes/usuarioRouter') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ',process.env.PORT);
        })
    }
}

module.exports = Server;