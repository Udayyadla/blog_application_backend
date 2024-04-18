const express=require("express")
require("dotenv").config()
const mongoose=require('mongoose')
const cookieParser=require("cookie-parser")
const app=express()
const userRoutes=require("./routes/user.route")
const postRoutes=require('./routes/blogpost.route')
const commentRoutes=require("./routes/comment.route")
app.use(express.json())
app.use(cookieParser())
const PORT=8080;
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("db connection successful")
    app.listen((PORT),()=>console.log('app is listening at port',PORT))
}).catch((err)=>console.log(err.message))

