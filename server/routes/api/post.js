const express = require("express")
const mongoose = require("mongoose")
const Post = require("../../models/post_model")


const router = express.Router()
const dbURI1 = "mongodb://127.0.0.1:27017/blog-site"
const dbURI = "mongodb+srv://RoDDy22:K5lKinzZzt65aM4E@cluster0.aabi9.mongodb.net/?retryWrites=true&w=majority"

const conn = async ()=>{
    await mongoose.connect(dbURI)
    .then(()=>console.log("Connected to db"))
    .catch((err)=>console.error(err))
}

conn()

router.get("/", async (req,res)=>{
    await Post.find().then((result)=>res.send(result)).catch((err)=>console.log(err))
})

router.post("/", async (req,res)=>{
    const post = new Post(req.body)
    post.save().then(()=>console.log("Data Saved")).catch((err)=>console.error(err))
    res.status(201).send()

})

router.delete("/:id", async(req,res)=>{
    await Post.deleteOne({_id: req.params.id}).then(()=>console.log("Data Deleted")).catch((err)=>console.error(err))
    res.status(200).send()
})


module.exports = router