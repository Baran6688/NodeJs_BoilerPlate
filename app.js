const express =require("express")
const app= express()
const path = require("path")
const AppError = require("./utils/AppError")

app.use(express.static(path.join(__dirname,"public"))) 

app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs") 
app.use(express.urlencoded({extended:true}))
// app.use(express.json()) If I wanted to work with JSON Files

app.get("/", (req,res)=> {
    res.render("home")
})
app.get("/new", (req,res)=> {
    res.render("home")
})


app.all("*",(req,res,next)=> {
    // res.send("Error 404! not found this page.")
    next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404))
})

app.use((err,req,res,next)=> {
  err.statusCode= err.statusCode || 500
  err.status = err.status || "error"
  res.send(err.message)
})




module.exports = app