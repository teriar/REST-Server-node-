const { response } = require("express");
const {  isValidObjectId } = require('mongoose');
const{Usuario,Categoria,Producto} = require('../models');
const { findById } = require("../models/categoria");


const coleccionesPermitidas = [
    'Categoria',
    'Producto',
    'Usuarios',
    'Roles',
];

const buscarUsuarios = async(termino = '', res=response)=>{
   
    const esMongoID = await isValidObjectId(termino); //true

    if(esMongoID){
        
        const usuario = await Usuario.findById(termino);
       return res.status(200).json({
            results:(usuario) ? [usuario] :[]
        });
    }
    const regex = new RegExp(termino,'i'); 

    const usuarios = await Usuario.find({
        $or:[
            {nombre:regex,},
            {correo:regex},
        ],
        $and: [{estado:true}]
    });
    res.json({
        results:usuarios
    })
}

const buscarCategoria = async(termino = '', res=response)=>{

    const esMongoID = await isValidObjectId(termino); //true

    if(esMongoID){
        
        const categoria = await Categoria.findById(termino);
       return res.status(200).json({
            results:(categoria) ? [categoria] :[]
        }); 
    }

    const regex = new RegExp(termino,'i'); 

    const categoria = await Categoria.find({
        $or:[
            {nombre:regex},
            
        ],
        $and: [{estado:true}]
    });
    res.json({
        results:categoria
    })

}

const buscarProductos = async(termino = '' ,res=response)=>{
    
    const esMongoID = await isValidObjectId(termino);
    
    if(esMongoID){
      const producto  = await findById(termino).populate('categoria','nombre');
      return res.status(200).json({
        results:(producto) ? [producto] :[]
    });
    }
    const regex = new RegExp(termino,'i'); 

    const producto = await Producto.find({  $or:[  {nombre:regex,}], $and: [{estado:true}]}).populate('categoria','nombre');
    res.json({
        results:producto
    })



}
const buscar =(req,res=response)=>{
  
const {coleccion, termino} = req.params;


if(!coleccionesPermitidas.includes(coleccion) ){
    
    return res.status(400).json({
        msg:`Las Coneciones Permitidas son ${coleccionesPermitidas}`
    })
} 

switch (coleccion) {
    case 'Usuarios':
        buscarUsuarios(termino,res)
        break;
    case 'Categoria':
        buscarCategoria(termino,res)
        break;
    case 'Producto':
        buscarProductos(termino,res)
        break;

    default:
        res.status(500).json({
            msg:`Comuniquese con administrador`
        })    
}



    // res.json({
    //     coleccion,
    //     termino,
    //     msg:'Buscar....'
    // })
}


module.exports = {
    buscar
}