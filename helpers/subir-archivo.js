const { v4: uuidv4, stringify } = require('uuid');
const path = require('path');


const subirArchivo = async (files, extensionesValidas=['png','jpg','jpeg','gif'],carpeta='')=>{
    return new Promise((resolve,reject)=>{
       
        const nombreCortado = files.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1]
        
        if(!extensionesValidas.includes(extension)){
    
    return reject(`La extension: ${extension} no es permitida, ${extensionesValidas}`);
           
    }
    
        const nombreTemp = uuidv4() + '.' + extension;
       const uploadPath = path.join(__dirname ,'../uploads', carpeta ,nombreTemp);
       // Use the mv() method to place the file somewhere on your server
       files.mv(uploadPath, (err)=> {
           if (err){
               
               reject(err);
            }
            
         return resolve(nombreTemp);
        });

    })
  
}

module.exports={subirArchivo}