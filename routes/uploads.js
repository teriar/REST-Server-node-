const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, ActualizarImagen } = require('../controllers/uploads.controller.js');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivo,validarCampos } = require('../middlewares');
const {  } = require('../middlewares/validar-campos.js');



const router = Router();


router.post('/',validarArchivo,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','ID no es de Mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],ActualizarImagen)

module.exports = router;