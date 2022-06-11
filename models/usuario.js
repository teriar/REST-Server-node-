
const {Schema, model} = require('mongoose')
const UsuariosSchema= Schema({
    nombre:{
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'la contraseña es obligatorio'],
    },
    img:{
        type: String,
       
    },
    rol:{
        type: String,
        required: [true],
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
});

UsuariosSchema.methods.toJSON = function(){
    //para quitar  el __v y password en el response de la ruta
    const {__v , password, ...usuario} = this.toObject();
    return usuario
}

module.exports=model('Usuario', UsuariosSchema);
