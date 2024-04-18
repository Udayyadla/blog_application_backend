const Comment = require("../models/comment.model");
const Post = require("../models/blog.model");
const mongoose = require("mongoose");
const { post } = require("../routes/comment.route");

exports.postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    if (!postId) {
      return res.status(404).json({ error: "post not found" });
    }
    const newComment = new Comment({
      content,
      post: postId,
      author: req.user._id,
    });
    await newComment.save();
    res.status(201).json({ message: "comment added successfully", newComment });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json({ comments });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.updateCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const validateUser = await Comment.findOne({ author: userId });
    if (!validateUser) {
      return res.status(400).json({
        error:
          "Permission denied: Only the author of the comment can update it",
      });
    }
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "comment not found" });
    }
    res
      .status(200)
      .json({ message: "comment updated successfully!", updatedComment });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const validComment = await Comment.findById(commentId);
    const postId = await Post.findById(validComment.post);

    const postOwner = postId.postedBy;
    console.log(postOwner);
    const userId = req.user._id;

    if (userId != postOwner) {
      const validateUser = await Comment.findOne({ author: userId });
      if (!validateUser) {
        return res.status(404).json({
          error:
            "Permission denied: Only the author of the comment or post can delete it",
        });
      }
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "comment not found" });
    }
    res
      .status(200)
      .json({ message: "comment deleted successfully", deletedComment });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const validComment = await Comment.findById(commentId);
    res.status(200).json(validComment);
  } catch (err) {
    console.log("comment not found");
    res.status(500).json({ error: "internal server error" });
  }
};
