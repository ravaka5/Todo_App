import express from "express"
import db from "../db.js"

const router = express.Router()
//get all the todos for an user
router.get('/',(req,res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
    res.json(todos)
})
//create to dos
router.post("/",(req,res)=>{

})

// update todos
router.put("/:id",(req,res)=>{

})

// delete todos
router.delete("/:id",(req,res)=>{

})

export default router
