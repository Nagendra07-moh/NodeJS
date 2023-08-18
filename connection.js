const mongoose = require('mongoose');
 
async function connectMongodB (url){

   return mongoose.connect(url);
   // mongoose.connect('mongodb://127.0.0.1:27017/my-db-1').then(()=> console.log("Mongo is live!!")).catch((err)=> console.log("Mongo got some Error!!",err))
}
module.exports = {
   connectMongodB,
}