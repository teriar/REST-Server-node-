const { response, request } = require('express');  
const{encryptPassword} = require('../helpers/db-validators');
const Usuario = require('../models/usuario');




const getUser = async(req = request , res = response) => {
  const{ limit=0, since = 0 } =  req.query;
  const query = {estado:true}
  if(limit != Number(limit) || since != Number(since) ){
    
      res.json({msg:'the parameters is not numeric'})
      return
  }
  // const usuarios = await Usuario.find(query)
  // .skip(Number(since))
  // .limit(Number(limit));

  // const total = await Usuario.countDocuments(query) - since;
  const [total,usuarios] =  await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
  .skip(Number(since))
  .limit(Number(limit))
  ]);
  res.json({
        total,
        usuarios
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
    const usuario = await Usuario.findByIdAndUpdate(id,resto, {new: true});

    res.json(usuario)
  }
  
  const postUser = async (req = request, res = response) => {
    
   
    
    const {nombre,correo,password,rol} = req.body;
    const usuario= new Usuario({nombre,correo,password,rol});
    
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