const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique:true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength:4
  },
  password: {
    type: String,
    required: true,
  },
});
const User=mongoose.model("user",userSchema)
module.exports=User
