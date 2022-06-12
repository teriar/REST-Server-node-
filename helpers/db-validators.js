const Role = require('../models/role');
const Usuario = require('../models/usuario') 
const bcrypjs = require('bcryptjs');

 const esRolValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no esta registrado en la DB `);
    }
}

const existeEmail = async(correo= '')=>{ 
       await Usuario.findOne({correo});
      if(existeEmail){
       throw new Error(`El correo ${correo} ya esta en uso`);
      }   
    }

const encryptPassword = async(pass) =>{
      const salt = bcrypjs.genSaltSync();    
      return await bcrypjs.hashSync(pass ,salt);
    }
 const existeUsuarioPorId = async(id)=>{
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`El id: ${id} no existe`);
  }
 }   
module.exports ={
    esRolValido,
    existeEmail,
    encryptPassword,
    existeUsuarioPorId
}