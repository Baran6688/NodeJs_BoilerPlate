const mongoose = require("mongoose")
require("dotenv").config()
const DatabaseURL =  process.env.DB
process.on("uncaughtException", err=> {
    console.log(err.name, err.message)
    process.exit(1)
});

const app = require("./app")

mongoose.connect(DatabaseURL)
.then(()=> {console.log("MongoDB Connecting Successed!!")})
.catch((e)=> {console.log("Error Occured during connecting to MongoDB")})


const port = process.env.PORT || 80
const server = app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})

process.on("unhandledRejection", (err)=> {
    console.log(err.name, err.message)
    server.close(()=> {
        process.exit(1)
    })
})