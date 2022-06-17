const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto,
   obtenerProductos,
    obtenerProducto,
     actualizarProductos,
     eliminarProducto } = require('../controllers/productos.controller');

 const { 
  existeCategoriaPorId, existeProductoPorId
       } = require('../helpers/db-validators');
const { validarCampos, validateJWT } = require('../middlewares');

 const router = Router();

  // todas las categorias
 router.get('/',obtenerProductos);

   // todas las categorias
   router.get('/:id',[
    check('id', 'se require un ID').not().isEmpty(),
    check('id','no es un ID valido').isMongoId(),
    check('id','No existe Producto con este ID').custom(existeProductoPorId),
    validarCampos
   ],obtenerProducto);


  // todas los Productos require jwt 
  router.post('/',[
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'Se requiere Categoria').not().isEmpty(),
    check('categoria','categoria no es un ID').isMongoId(),
    check('categoria','No existe categoria').custom(existeCategoriaPorId),
    validarCampos
  ],crearProducto);


  // todas las categorias
  router.put('/:id',[
    validateJWT,
    check('id', 'se require un ID').not().isEmpty(),
    check('id','no es un ID valido').isMongoId(),
    check('id','No existe Producto con este ID').custom(existeProductoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
  ],actualizarProductos);


  // todas las categorias
  router.delete('/:id',[
    validateJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id','No existe Producto con este ID').custom(existeProductoPorId),
    validarCampos
  ],eliminarProducto);




 module.exports = router