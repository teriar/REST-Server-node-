const { response } = require('express');  
const {request} = require('express');


const getUser = (req = request , res = response) => {
    res.json({
        msg:'get api - controller '
    })
  }

  const putUser = (req = req.query, res) => {
    //ojo con eso asi capturamosd el req
    const body = req.body;
    const params = req.query;
    //ojo con esto asi podemos capturar data de body
    const {nombre, edad } = req.body;
    res.json({
        msg:'put api- controller',
         nombre,
         edad,
         query
    })
  }
  
  const postUser = (req, res) => {
    
    res.json({
        msg:'post api - controller'
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