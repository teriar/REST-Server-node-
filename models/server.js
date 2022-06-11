const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{

constructor(){
    this.app = express();
    this.port= process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    //conecion a base de datos 
    this.conectarDB();
    //middlewares
     this.middlewares();
     //rutas de mi aplicacion

    this.routes();
}
async conectarDB(){
    
    await dbConnection()
}

middlewares(){
    //cors
    this.app.use(cors());
    //Parseo y lectura del body
    this.app.use(express.json())
    //directorio publico
    this.app.use(express.static('public'));
}
  
routes() {
  
    this.app.use( this.usuariosPath, require('../routes/user'));
}
listen() {
    this.app.listen(this.port,() =>{
        console.log('Servidor corriendo en puerto', process.env.PORT)
    });
}
}


module.exports = Server




