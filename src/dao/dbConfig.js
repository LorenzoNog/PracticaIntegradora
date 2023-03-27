import mongoose from "mongoose";

mongoose.connect('mongodb+srv://bachicha:bachicha@cluster0.ummjcbo.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(()=> console.log('Conectado correctamente'))
.catch((error)=> console.log(error))