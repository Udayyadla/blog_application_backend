const { createBlogPost, getAllPosts, updatePostbyId, deletePostbyId } = require('../controllers/blogpost.controller')
const { protectedRoute } = require('../middlewares/protectedRoute')

const router=require('express').Router()
router.post("/createpost",protectedRoute,createBlogPost)
router.get("/getAllPosts",protectedRoute,getAllPosts)
router.put("/updatePost/:postId",protectedRoute,updatePostbyId)
router.delete("/deletePost/:postId",protectedRoute,deletePostbyId)
module.exports=router