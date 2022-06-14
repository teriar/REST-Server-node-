const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{

constructor(){
    this.app = express();
    this.port= process.env.PORT;
    this.paths ={
        auth:       '/api/auth',
        categorias: '/api/categorias',
        usuarios:   '/api/usuarios',
        productos: '/api/productos'
    }
   
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
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.usuarios, require('../routes/user'));
    this.app.use( this.paths.categorias, require('../routes/categorias'));
    this.app.use( this.paths.productos, require('../routes/productos'));
}
listen() {
    this.app.listen(this.port,() =>{
        console.log('Servidor corriendo en puerto', process.env.PORT)
    });
}
}


module.exports = Server




