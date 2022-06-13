const  validateFields = require('../middlewares/validar-campos');
const   validateJWT  = require('../middlewares/validate-jwt');
const validateRol = require('../middlewares/validar-roles');



module.exports={
    ...validateFields,
    ...validateJWT,
    ...validateRol,

}