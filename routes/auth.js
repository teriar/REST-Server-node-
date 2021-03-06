const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const {login, googleSingIn} = require('../controllers/auth.controller.js');


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password  es obligatorio').not().isEmpty(),
    validarCampos
], login)

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    
    validarCampos
], googleSingIn)



module.exports = router;