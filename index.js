import app from "./app.js";
import { connectDB } from "./db.js";

async function main() {
    try {
        await connectDB();
        app.listen(3000);
        console.log(`Servidor enlazado en el puerto: 3000`);
    } catch (error) {
        console.error(error);
    }
}

main();