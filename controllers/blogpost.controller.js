const blogPost = require("../models/blog.model");

exports.createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;
    const newPost = new blogPost({ title, content, postedBy: userId });
    await newPost.save();
    res.status(201).json({ message: "post created successfully", newPost });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await blogPost.find({}).populate("postedBy");
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.updatePostbyId = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId=req.user._id   
    //user can only update his own posts 
    const author=await blogPost.findOne({postedBy:userId})
    if(!author){
        return res.status(400).json({error:"Permission denied: Only the author of the post can update it"})
    }
    const { title, content } = req.body;
    const updatedPost = await blogPost.findByIdAndUpdate(postId, {
      title,
      content,
    },{new:true});
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.deletePostbyId = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId=req.user._id   
    //user can only delete his posts 
    const author=await blogPost.findOne({postedBy:userId})
    if(!author){
        return res.status(400).json({error:"Permission denied: Only the author of the post can delete it"})
    }

    const deletedPost = await blogPost.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
