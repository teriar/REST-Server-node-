const  validateFields = require('../middlewares/validar-campos');
const   validateJWT  = require('../middlewares/validate-jwt');
const validateRol = require('../middlewares/validar-roles');
const validarArchivo = require ('../middlewares/validar-archivo')


module.exports={
    ...validateFields,
    ...validateJWT,
    ...validateRol,
    ...validarArchivo

}