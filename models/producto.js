const { Schema, model} = require('mongoose');

const ProductoSchema= Schema({
nombre :{
    type :String,
    required:[true,'El nombre es obligatorio' ],
    unique:true
},
estado:{
    type:Boolean,
    default: true,
    required:true
},
usuario:{
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require:true
},
precio:{
    type: Number,
    default: 0
},
categoria:{
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    require:true
},
descripcion:{ type: String},
disponible: { type: Boolean, default: true},
img:{type: String}
});


ProductoSchema.methods.toJSON = function(){
    //para quitar  el __v y password en el response de la ruta
    const {__v , estado ,...data} = this.toObject();
    
    return data;
}
  

module.exports = model('Producto', ProductoSchema)