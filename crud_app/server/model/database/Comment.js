const { Schema, model } = require("mongoose");
const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    red: "User",
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
      red: "User",
      required: true,
    },
    createAt:{
        type:Date,
        default:new Date()
    }
  }],
});

const comment = model("Comments", commentSchema);
module.exports = comment;
