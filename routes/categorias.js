const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria, 
    eliminarCategoria
    } = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validateJWT, validarCampos, isAdminRol } = require('../middlewares');


const router = Router();


//obtener todas las categorias - publico
router.get('/',obtenerCategorias);
// todas las categorias
router.get('/:id',[
    check('id', 'se require un ID').not().isEmpty(),
    check('id','no es un ID valido').isMongoId(),
    check('id','No existe Categoria con este ID').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria);

//privada cualquier persona con token valido
router.post('/',[
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],createCategoria);
//actualizar categoria con token valido
router.put('/:id',[
    validateJWT,
    check('id', 'se require un ID').not().isEmpty(),
    check('id','no es un ID valido').isMongoId(),
    check('id','No existe Categoria con este ID').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

//borrar una catergoria- ADMIN
router.delete('/:id',[
    validateJWT,
    isAdminRol,
    check('id', 'se require un ID').not().isEmpty(),
    check('id','no es un ID valido').isMongoId(),
    check('id','No existe Categoria con este ID').custom(existeCategoriaPorId),
    validarCampos
],eliminarCategoria);


module.exports = router