const Product = require("../model/database/Product");
const Comment = require("../model/database/Comment");

exports.commentPostController = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: "not allowed" });
  }
  let { prodId } = req.params;
  let   comments  = req.body.comments;
  console.log(prodId, comments)

  let comment = new Comment({
    product: prodId,
    user: req.user._id,
    body: comments,
    replies: [],
  });

  try {
    let createdComment = await comment.save();
    await Product.findOneAndUpdate(
      { _id: prodId },
      { $push: { comment: createdComment._id } }
    );
    let commentJSON = await Comment.findById(createdComment._id).populate({
      path: "user",
      select: "profilePic name",
    });
    console.log(commentJSON)
    return res.status(202).json(commentJSON);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.replyCommentPostController = async (req, res, next) => {
  let { commentId } = req.params;
  let { body } = req.body;

  if (!req.user) {
    return res.status(403).json({ error: "not allowed" });
  }

  let reply = {
    body,
    user: req.user._id,
  };
  try {
    await Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies: reply } }
    );
    res.status(202).json({ ...reply, profilePic: req.user.profilePic });
  } catch (error) {
    res.status(503).send({error:"server error"})
  }
};
