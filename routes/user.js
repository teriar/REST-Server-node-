const { Router } = require('express');
const { check } = require('express-validator');

 const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const {
  isAdminRol, 
  haveRol,
  validateJWT,
  validarCampos
  } =require('../middlewares/index')
// const { validarCampos } = require('../middlewares/validar-campos')
const { getUser,
  putUser,
  postUser,
  deleteUser } = require('../controllers/user.controler');

const router = Router();

router.get('/', getUser)


router.put('/:id',[
  check('id', 'No es un ID valido ').isMongoId(),
  check('id', 'El ID no existe').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  validarCampos
], putUser);

router.post('/', [
  //sobre express validator:
  //con check hacemos chekeo al atributo correo del schema, si no es valido saltara el segundo argumento como mensaje, esto esta validando
  //como si fuera email
  check('nombre', 'El nombre  es obligatorioa').not().isEmpty(),
  check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRolValido),
  check('correo').custom(existeEmail),
  validarCampos
], postUser)

router.delete('/:id',[
  validateJWT,
 //isAdminRol,
    haveRol('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID valido ').isMongoId(),
  check('id', 'El ID no existe').custom(existeUsuarioPorId),
  validarCampos
], deleteUser)


module.exports = router;