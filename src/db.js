import mongoose from "mongoose";


export const connectDB = async () => {
   try {
    await mongoose.connect("mongodb://localhost/productos");
    console.log(">>> BD esta conectada.")
   } catch (error) {
    console.log(error);
   }
};