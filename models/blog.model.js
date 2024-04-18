const mongoose = require("mongoose");
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    }
    },
  {
    timestamps: true,
  }
);
const blogPost=mongoose.model('blogpost',blogPostSchema)
module.exports=blogPost