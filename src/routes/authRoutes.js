import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"

const router  = express.Router()

router.post('/register', (req,res) => {
    const {username , password } = req.body

    const hashedPassword = bcrypt.hashSync(password,8)
    // save the new user and hashed password to the db
    try {
        const InsertUser = db.prepare(`
            INSERT INTO users (username,password) VALUES (?,?)`)
        const result = InsertUser.run(username,hashedPassword);

        const defaultTodo = `Hello , add your first todo !`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id,task) VALUES (? , ? )`)
        insertTodo.run(result.lastInsertRowid , defaultTodo)

        const token = jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})

        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})

router.post('/login',(req,res)=>{
    const {username , password } = req.body
    try {
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
        const user = getUser.get(username)
        // Check if the user is valid
        if(!user){
            return res.status(404).send({message:"user not found"})
        }
        // synchroniously compare the password with the use password
        const passwordisValid = bcrypt.compareSync(password , user.password)
        // Check if the password is valid
        if(!passwordisValid){
            return res.status(501).send({message:"Invalid password"})
        }

        // The valid authentification case
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})
        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})
export default router