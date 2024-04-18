const { postComment, getAllComments, updateCommentById, getCommentById, deleteCommentById } = require("../controllers/comment.controller")
const { protectedRoute } = require("../middlewares/protectedRoute")

const router=require("express").Router()
router.post("/postComment/:postId",protectedRoute,postComment)
router.get("/getAllComments",protectedRoute,getAllComments)
router.get("/getComment/:commentId",protectedRoute,getCommentById)
router.put("/updateComment/:commentId",protectedRoute,updateCommentById)
router.delete("/deleteComment/:commentId",protectedRoute,deleteCommentById)
module.exports=router