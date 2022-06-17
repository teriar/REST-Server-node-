const { response } = require("express");

const validarArchivo = (req,res=response,netx)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          msg:'No hay archivos que subir'
        });
      }
    
      if (!req.files.archivo) {
          return res.status(400).json({
            msg:'No hay archivos que subir'
          });
        }
        netx();
}

module.exports ={validarArchivo}