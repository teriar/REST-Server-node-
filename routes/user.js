const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role')
const {validarCampos} =require('./middlewares/validar-campos')
const { getUser,
  putUser,
  postUser,
  deleteUser } = require('../controllers/user.controler');
const router = Router();


router.get('/:id', getUser)
//sobre express validator:
//con check hacemos chekeo al atributo correo del schema, si no es valido saltara el segundo argumento como mensaje, esto esta validando
//como si fuera email

router.put('/', putUser)

router.post('/',[
  check('nombre', 'El nombre  es obligatorioa').not().isEmpty(),
  check('password', 'El password debe de ser mas de 6 letras').isLength({min:6}),
  check('correo', 'El correo no es valido').isEmail(),
  // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( async(rol='')=>{
      const existeRol = await Role.findOne({rol});
      if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la DB `);
      }
  }),
  validarCampos
], postUser)

router.delete('/', deleteUser)


module.exports = router;