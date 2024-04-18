const express=require("express")
const { Signup, login, logout } = require("../controllers/user.controller")
const router=express.Router()
router.post("/signup",Signup)
router.post("/login",login)
router.post("/logout",logout)
module.exports=router