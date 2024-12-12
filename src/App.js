import express from "express"
import morgan from "morgan";
import cors from "cors";


import authRoutes from "./routes/auth.routes.js"
import compraRoutes from './routes/compra.routes.js'
import ordenRoutes from './routes/orden.routes.js'
import ordenesDelDiaRouter from './routes/ordenesDelDia.routes.js'
import ordenesDespachoRouter from './routes/ordenesDespacho.routes.js'

//configurar codigo de backend 
const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())

app.use("/api", authRoutes);
app.use("/api", compraRoutes);
app.use("/api", ordenRoutes);
app.use("/api", ordenesDelDiaRouter);
app.use("/api", ordenesDespachoRouter);


app.get('/', (req, res) => {
    res.send('Servidor corriendo...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;