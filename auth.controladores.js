import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'



export const register = async (req, res) => {
    const {email, password, username, fnacimiento, direccion, sexo, telefono, rut} = req.body

    try {

        const usernameDuplicado = await User.findOne({username})
        if (usernameDuplicado)
            return res.json({message:"Usuario Duplicado"})

        const emailDuplicado = await User.findOne({email})
        if (emailDuplicado)
            return res.json({message:"Correo Electronico Duplicado"})

        const passwordHash = await bcrypt.hash(password, 10) 
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            fnacimiento,
            direccion,
            sexo,
            telefono,
            rut
        })
    
        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
        })
    

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({email})

        if (!userFound) return res.status(400).json({message: "Usuario No Encontrado"})


        const isMatch = await bcrypt.compare(password, userFound.password) 

        if (!isMatch) return res.status(400).json({message: "Contraseña Incorrecta"})

        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        })
    

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const actualizaUser = async (req, res) => {
    try {
        const {id} = req.params
        const updateData = req.body
        if (updateData.password){
            const encryptarContrasena = 10
            updateData.password = await bcrypt.hash(updateData.password, encryptarContrasena)
        }
        const updateUser = await User.findByIdAndUpdate(id, updateData, {new: true})
        if (!updateUser) return res.status(404).json({message: "Usuario No Encontrado"})
        res.json({message: "Usuario Actualizado",
        user:updateUser
    })
    } catch (error) {
        res.status(500).json({message: "No se Pudo Actualizar"})

        
    }



}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const perfil = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    
    if (!userFound) return res.status(400).json ({ message: "Usuario no encontrado"})
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        createdAt: userFound.updateAt,
    })
}