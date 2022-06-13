const { response } = require("express");
const Usuario = require ('../models/usuario');
const bcrypjs = require('bcryptjs');
const generarJWT = require("../helpers/generar-jwt");

const login = async(req, res = response)=>{
    
  const  {correo , password} = req.body;
 
 
 
  try{     
     //verificar si el email existe
    const usuario =  await Usuario.findOne({correo});
    if(!usuario){
        return res.status(400).json({
            msg:'Usuario / Password no son correctos - correo'
        });
    }
     //si el usuario esta acttivo
      if(!usuario.estado){
        return res.status(400).json({
            msg:'Usuario / Password no son correctos - estado:false'
        });
      }

     //verifical la contraseña
      const validPassword = await bcrypjs.compareSync(password,usuario.password);
      if(!validPassword){
        return res.status(400).json({
            msg:'Usuario / Password no son correctos - password'
        });
      }
     //generar jwt
       const token = await generarJWT(usuario.id);
        

       res.json({
          usuario,
          token
           
       })
   }catch(error){
    console.log(error);
     res.status(500).json({
     msg:'Hable con el administrador'
    });
   }
}


module.exports = login;