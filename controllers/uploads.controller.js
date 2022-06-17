const {response} = require('express');
const {subirArchivo} = require('../helpers');
const { Usuario, Producto } = require('../models');
const usuario = require('../models/usuario');
const path = require('path');
const fs = require('fs');

const cargarArchivo = async(req,res = response)=>{

   try{
    // const pathArchivo = await subirArchivo(req.files.archivo, ['txt','md'],'textos')
    const pathArchivo = await subirArchivo(req.files.archivo,undefined ,'imgs')
    res.json({
        nombre:pathArchivo
     })
    
   }catch(err){
    res.status(400).json({err, dsa:'sa'
  
    });
   }
   

    
    

}

const ActualizarImagen= async(req,res=response)=>{
   


  

    const{id,coleccion}= req.params;
   
   let modelo;
  
   switch (coleccion) {
    case 'usuarios':
       modelo = await Usuario.findById(id);
       if(!modelo){
        return res.status(400).json({
          msg: `No existe usuario con este ID: ${id}`
        })
       }
      break;
     
      case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo){
         return res.status(400).json({
           msg: `No existe producto con este ID: ${id}`
         })
        }
      break;
   
    default:
      return res.status(500).json({
        msg:`Error al actualizar imagen en, este errror puede ocurrir 
        si las hubo un error en las rutas estipuladas: ${coleccion} y ${id} 
        comuniquese con administrador `
      })
      break;

   }
   //limpiar imagenes 

   try{

        if(modelo.img){
            const pathImagen = path.join(__dirname, '../uploads',coleccion, modelo.img); //el path
            if(fs.existsSync(pathImagen)){ //si existe
              fs.unlinkSync(pathImagen); //borrar imagen
            }
        }


   }catch(err){
    console.log(err);
   }

   const nombre = await subirArchivo(req.files.archivo, undefined, coleccion);
   modelo.img = nombre;

   await modelo.save();

   res.json(modelo);


}

module.exports ={ cargarArchivo,ActualizarImagen}
