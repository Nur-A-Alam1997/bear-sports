const { Schema, model } = require("mongoose");
const commentSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true},
  body: {
    type: String,
    trim: true,
    required: true,
  },
  replies: [{
    body: {
      type: String,
      ref: "User",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createAt:{
        type:Date,
        default:new Date()
    }
  }],
});

const comment = model("Comment", commentSchema);
module.exports = comment;
