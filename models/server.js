const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.server = require('http').createServer(this.app);

        this.paths ={
            usuario:    '/api/user'
        }


        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes(this.usuariosPath,require('../routes/usuarioRouter'));
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        
        // lectura y parseo del body
        this.app.use( express.json() );
        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        
        this.app(this.paths.usuario, require('../routes/usuarioRouter') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ',process.env.PORT);
        })
    }
}

module.exports = Server;