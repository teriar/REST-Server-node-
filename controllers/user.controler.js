const { response, request } = require('express');  
const{encryptPassword} = require('../helpers/db-validators');
const Usuarios = require('../models/usuario');




const getUser = (req = request , res = response) => {
    res.json({
        msg:'get api - controller '
    })
  }

  const putUser = async(req=request  , res = response) => {
    //ojo con eso asi capturamosd el req
    // const {nombre, edad} = req.body;
    // const params = req.query;
    // const {q,apikey } = req.query;
    //ojo con esto asi podemos capturar data de body
    const {id} = req.params;
    const {_id,password,google,correo, ... resto} = req.body;
    //validar contra base de datos
    if(password){
      resto.password = await encryptPassword(password);
    }
    const usuario = await Usuarios.findByIdAndUpdate(id,resto, {new: true});

    res.json({
        msg:'put api- controller', 
        usuario
    })
  }
  
  const postUser = async (req = request, res = response) => {
    
   
    
    const {nombre,correo,password,rol} = req.body;
    const usuario= new Usuarios({nombre,correo,password,rol});
    
    //encryptar contraseña
    usuario.password = await  encryptPassword(usuario.password);
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