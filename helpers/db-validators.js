const Role = require('../models/role');
const Usuario = require('../models/usuario') 
const bcrypjs = require('bcryptjs');
const { Categoria, Producto } = require('../models');

 const esRolValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no esta registrado en la DB `);
    }
}

const existeEmail = async(correo= '')=>{ 
     const existeEmailVerificacion =  await Usuario.findOne({correo});

      if(existeEmailVerificacion){
       throw new Error(`El correo ${correo} ya esta en uso`);
      }   
    }

const encryptPassword = async(pass) =>{
      const salt = bcrypjs.genSaltSync();    
      return await bcrypjs.hashSync(pass ,salt);
    }

 const existeUsuarioPorId = async(id)=>{
  try{
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`El ID: ${id} no existe`);
  }
}catch(error){
  throw new Error(`El ID: ${id} no existe`);
}
 } 
 
 
 const existeCategoriaPorId = async(id)=>{
  try{
  const existeCategoria = await Categoria.findById(id);
  if(!existeCategoria){
   throw new Error(`El ID ${id} no existe`);
  }
  }catch(error){
  throw new Error(`El ID ${id} no existe`);
  }     
   }


   const existeProductoPorId = async(id)=>{
    try{
    const existeCategoria = await Producto.findById(id);
    if(!existeCategoria){
     throw new Error(`El ID ${id} no existe`);
    }
    }catch(error){
    throw new Error(`El ID ${id} no existe`);
    }     
     }  

module.exports ={
    esRolValido,
    existeEmail,
    encryptPassword,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}