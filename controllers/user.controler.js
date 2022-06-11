const { response, request } = require('express');  
const bcrypjs = require('bcryptjs');
const Usuarios = require('../models/usuario');




const getUser = (req = request , res = response) => {
    res.json({
        msg:'get api - controller '
    })
  }

  const putUser = (req = req.query, res) => {
    //ojo con eso asi capturamosd el req
    const {nombre, edad} = req.body;
    const params = req.query;
    const {q,apikey } = req.query;
    //ojo con esto asi podemos capturar data de body
    
    res.json({
        msg:'put api- controller',
         nombre,
         edad,
         q,
         apikey
         
    })
  }
  
  const postUser = async (req = request, res = response) => {
    
   
    
    const {nombre,correo,password,rol} = req.body;
    const usuario= new Usuarios({nombre,correo,password,rol});
    
    //verificar si el correo existe
      const existeEmail = await Usuarios.findOne({correo});
      if(existeEmail){
        return res.status(400).json({
          msg:'El correo ya esta registrado'
        })
      }   

    //encryptar contraseña
    const salt = bcrypjs.genSaltSync();
    usuario.password = await  bcrypjs.hashSync(password, salt);
    //guardar en bd
    await usuario.save();

    res.json({
        msg:'post api - controller',
        usuario
    })
  } 
  const deleteUser =  (req, res) => {
    res.json({
        msg:'delete api - controller'
    })
  }
  module.exports = {
      getUser,
      postUser,
      deleteUser,
      putUser
  }