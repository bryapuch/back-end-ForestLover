const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../db/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            usuario:        '/api/user',
            publicacion:    '/api/publication'
        }

        // conectar la base de datos
        this.dbConnection();
        // Middlewares
        this.middlewares();

        // lectura y parseo del body
        this.app.use(express.json());

        // Rutas de mis aplicaciones
        this.routes();
    }

    async dbConnection(){

        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use(this.paths.usuario, require('../routes/usuarioRouter'));
        this.app.use(this.paths.publicacion, require('../routes/publicationRoutes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

module.exports = Server;