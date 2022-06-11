const mongoose =require('mongoose')


const dbConnection = async() => {
    
try{
await mongoose.connect(process.env.MONGODB_CNN)
.then(console.log("Conexion exitosa"))
.catch( err => console.log(err))

}catch(error){
    console.log(error);
    throw new Error('Error a la hora de iniciar base de datos');
}
}






module.exports={
dbConnection
}