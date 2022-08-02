const express = require("express")
const cors = require("cors")
const morgan = require("morgan")


const app = express()

//middleware


app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const posts = require("./routes/api/post")
app.use("/api/posts", posts)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(__dirname + "/public/"))
    app.get(/.*/, (req, res)=>res.sendFile(__dirname+"/public/index.html"))
}
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listening for requests on port:${port}`)
})