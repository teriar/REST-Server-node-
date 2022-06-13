const mongoose =require('mongoose')


const dbConnection = async() => {
    
try{
await mongoose.connect(process.env.MONGODB_CNN)
console.log('Conexion establecida con la BD');

}catch(error){
    console.log(error);
    throw new Error('Error a la hora de iniciar base de datos');
}
}






module.exports={
dbConnection
}