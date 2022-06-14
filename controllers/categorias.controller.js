const { response } = require("express")
const {Categoria} = require('../models')


const obtenerCategorias =async (req , res = response)=>{

    const{ limit=0, since = 0 } =  req.query;
    
    if(limit != Number(limit) || since != Number(since) ){
    
        res.json({msg:'the parameters is not numeric'})
        return
    }

    const estado = {estado: true}


    const [total,categorias] = await  Promise.all([
        Categoria.countDocuments(estado),
        Categoria.find(estado)
        .skip(since)
        .limit(limit)
        .populate('usuario', 'nombre')
    ]);
    
    res.status(200).json({
        total,
        categorias
    })
}

const obtenerCategoria = async (req ,res = response) =>{

    const id  = req.params.id;
   
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
        if(!categoria){
            res.status(401).json({
                msg:"no existe una categoria con este id"
            })
        }

        res.status(200).json(
            categoria
        )
}

const createCategoria = async (req,res = response)=>{
   
   const nombre = req.body.nombre.toUpperCase();
   
   const categoriaDB = await Categoria.findOne({nombre});

   if(categoriaDB){
    return res.status(400).json({
        msg:`La categoria ${categoriaDB.nombre} ya existe`
    });


   }
   //Generar data a guardar
   const data = {
    nombre,
    usuario: req.usuario._id
   }
   
   const categoria = new Categoria(data)
   
   await categoria.save();

    res.status(200).json(categoria)
}

const actualizarCategoria = async (req,res=response) =>{
    
    try{
    const id = req.params.id;
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({id});
    
    if(!categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre} no existe`
        });
    }

    const data = {
        nombre,
        usuario:req.usuario._id
    }
      console.log(data);
    const actualizar = await Categoria.findByIdAndUpdate(id, data, {new:true}).populate('usuario');
         res.status(200).json(actualizar);
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg:"internal server error"
        })
    }
}

const eliminarCategoria = async (req,res=response)=>{
    const id = req.params.id;
    try{
    const categoria = await Categoria.findById(id);

    if(!categoria){
          res.status(400).json({
            msg:`No existe cateogira con el id ${id}`
          })
    }

    const data ={
        estado:false
    }

    const categoriaEliminada = await Categoria.findByIdAndUpdate(id,data,{new:true}).populate('usuario');
    res.status(200).json({
        categoriaEliminada
    })
}catch(err){
    console.log(err);
    res.status(500);

}
}

module.exports = {
    createCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}