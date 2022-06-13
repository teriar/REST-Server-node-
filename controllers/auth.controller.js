const { response, json } = require("express");
const Usuario = require ('../models/usuario');
const bcrypjs = require('bcryptjs');
const generarJWT = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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



const googleSingIn = async(req, res=response)=>{
  
  
  const {id_token} = req.body;


  try{

    const {correo,nombre,img} =  await googleVerify(id_token);
   
    let usuario = await Usuario.findOne({correo});

    if(!usuario){
      //crear
      const data = {
         nombre,
         correo,
         password: ':P',
         img,
         google: true,
         rol: "USER_ROLE",
      };
      usuario = new Usuario(data);
      await usuario.save();
    }
    //estado del usuario
    if(!usuario.estado){
       return res.status(401).json({
          msg:'Hable con el administrador, usuario bloqueado'
       });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    })

  }catch(error){
    console.log(error)
    res.status(400).json({
      ok:false,
      msg:"Token no se pudo verificar"
    })
  }

}


module.exports = {login, googleSingIn}