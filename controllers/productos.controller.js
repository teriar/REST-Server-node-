const { response } = require("express")
const {Producto} = require('../models')


const obtenerProductos = async(req, res)=>{

    const{ limit=0, since = 0 } =  req.query;
    
    if(limit != Number(limit) || since != Number(since) ){
    
        res.json({msg:'the parameters is not numeric'})
        return
    }

    const estado = {estado: true}


    const [total, productos] = await  Promise.all([
        Producto.countDocuments(estado),
        Producto.find(estado)
        .skip(since)
        .limit(limit)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    ]);
    
    res.status(200).json({
        total,
        productos
    })

}

const obtenerProducto = async (req,res)=>{
    const id  = req.params.id;
         try{  
        const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria','nombre');
        if(!producto){
            res.status(401).json({
                msg:"no existe un producto con este id"
            })
        }

        res.status(200).json(
            producto
        )
         }catch(error){
            res.status(500).json({
                msg:`Comuniquese con el administrador error:${error}`
            })
         }
}

const crearProducto= async (req, res=response)=>{
    
    const {nombre, categoria, descripcion = '',precio} = req.body;
    
  try{  
   const productoDB = await Producto.findOne({nombre});

   if(productoDB){
    return res.status(400).json({
        msg:`El Producto ${productoDB.nombre} ya existe`
    });
   }
   //Generar data a guardar
   const data = {
    nombre,
    usuario: req.usuario._id,
    categoria,
    descripcion,
    precio
   }
   
    const producto = new Producto(data);
   
   await producto.save();

    res.status(200).json(producto);
}catch(error){
    res.status(400).json({
        msg: `error comuniquese con administrador ${error}`
    })
}
}

const actualizarProductos = async (req,res=response )=>{
    const id = req.params.id;
    const data = req.body;
     if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
     }
   
    try{
     const producto = await Producto.findByIdAndUpdate(id, data,{new:true})
     .populate('usuario', 'nombre')
     .populate('categoria', 'nombre');
      console.log(producto);
      
     res.status(200).json(producto)

    }catch(error){
        res.json(500).json({
            msg:`La peticion actual a generado el siguiente error:${error} Comuniquese con 
            administrados`
        })
    }



}
const eliminarProducto=async(req,res=response)=>{
 
    const id = req.params.id;

    const estado = {estado:false};
    try{
        
        const producto =  await Producto.findByIdAndUpdate(id, estado, {new:true})
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

        res.status(200).json(producto);
    }catch(err){
        res.status(500).json({
            msg:`Error: ${err} comuniquese con administrador`
        })
    }

    
}
module.exports ={
    obtenerProductos,
    crearProducto,
    obtenerProducto,
    actualizarProductos,
    eliminarProducto
}