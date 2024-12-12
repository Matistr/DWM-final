import app from "./App.js"
import { connectDB } from "./db.js"


connectDB(); //inicia conexion con base de datos 
app.listen(4000) // incia servidor 
console.log(">> Servidor en el puerto", 4000)