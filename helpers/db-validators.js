const Role = require('../models/role');
const Usuarios = require('../models/usuario') 


 const esRolValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no esta registrado en la DB `);
    }
}

const existeEmail = async(correo= '')=>{ 
       await Usuarios.findOne({correo});
      if(existeEmail){
       throw new Error(`El correo ${correo} ya esta en uso`)
      }   
    }

module.exports ={
    esRolValido,
    existeEmail
}