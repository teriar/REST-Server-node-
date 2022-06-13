const { response, request } = require("express");

const isAdminRol=(req = request, res = response,next)=>{
       
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
       }


       const{rol,nombre} = req.usuario

       if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`El usuario : ${nombre} no mantiene los permisos para esta accion`
        });
       }

       next();
}


module.exports = isAdminRol