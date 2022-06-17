const { request, response } = require("express")
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");
const validateJWT= async (req = request,res = response,netx) => {
    
    const token= req.header('x-token');
    
    
    
    if(!token){
        console.log('dsa')
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }
    try{
     //VERIFICACION DE TOKEN 
    const {uid} = jwt.verify(token, process.env.SECRETKEY);
 
    const usuario = await Usuario.findById(uid);

    if(!usuario){
        return res.status(401).json({
            msg:'Token no valido - usuario no existe en BD'
        });
    }
   //verificar si el usuario esta activo
   if(!usuario.estado){
    return res.status(401).json({
        msg:'Token no valido - usuario con estado en false'
    });
   }
   req.usuario = usuario;
  
     netx();


}catch(error){
  console.log(error)
  res.status(401).json({
    msg:'Token no valido'
});
}

  
  
  
    
}


module.exports = {
    validateJWT
}