const mongoose=require('mongoose')
const CommentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogpost",
        required:true
    },

})
const Comment=mongoose.model("comment",CommentSchema)
module.exports=Comment