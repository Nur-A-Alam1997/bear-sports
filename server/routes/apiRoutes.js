const route = require("express").Router()
const {isAuthenticated}=require("../middleware/authMiddleware")
const {commentPostController,
    replyCommentPostController}
    =require("../controller/commentController")
const {bookmarksGetController}=require("../controller/bookmarksController")
const {hasProfile}=require("../controller/postController")

const {likeGetController,disLikeGetController}=require("../controller/likeDislikeController")

route.post("/comment/:prodId",isAuthenticated,commentPostController)
route.post("/comment/:commentId",isAuthenticated,replyCommentPostController)

route.get("/like/:prodId",isAuthenticated,likeGetController)
route.get("/dislike/:prodId",isAuthenticated,disLikeGetController)

route.get("/bookmarks/:prodId",isAuthenticated,hasProfile,bookmarksGetController)

module.exports=route