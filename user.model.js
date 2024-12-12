import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    fnacimiento: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
    }


}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)