// const express = requireK("express")
// Common js old one
// Module version
import express from "express"
import path,{dirname} from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = process.env.PORT || 5000

// get the filepath from URL of the current module
const __filename = fileURLToPath(import.meta.url)

// get directory name from filepath
const __dirname = dirname(__filename)

// Render the files in the public directory as static files
app.use(express.static(path.join(__dirname,"../public")))
// Serving the html file from the / path
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"../public","index.html"))
})

app.listen(PORT,()=>{
    console.log(`Server has been initiated on port ${PORT}`)
})
