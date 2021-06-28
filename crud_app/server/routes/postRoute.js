const route = require("express").Router();
const {
  postCreatePostController,
  postEditGetController,
  postEditPostController,
  postDeleteController,
  allPostGetController,
  wishListGetController,
  hasProfile
} = require("../controller/postController");
const {isAuthenticated}=require("../middleware/authMiddleware")

route.get("/create",isAuthenticated,hasProfile, (req, res, next) => {
  res.status(202).render("./play/newProduct");
});

route.post("/create",isAuthenticated,hasProfile, postCreatePostController);

route.get("/edit/:prodId",isAuthenticated, postEditGetController);
route.post("/edit/:prodId",isAuthenticated, postEditPostController);
route.post("/delete/:prodId",isAuthenticated, postDeleteController);

route.get("/wishlist",isAuthenticated,hasProfile, wishListGetController)

route.get("/",isAuthenticated,allPostGetController)

module.exports = route;
