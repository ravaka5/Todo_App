// const express = requireK("express")
// Common js old one
// Module version
import express from "express"

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server has been initiated on port ${PORT}`)
})

console.log("what's up")