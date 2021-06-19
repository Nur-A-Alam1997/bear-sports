const route = require("express").Router();
const {
  postCreatePostController,
  postEditGetController,
} = require("../controller/postController");

route.get("/create", (req, res, next) => {
  res.status(202).render("./play/newProduct");
});

route.post("/create", postCreatePostController);

route.get("/edit/:prodId", postEditGetController);
route.post("/edit/:prodId", postEditPostController);
route.get("/delete/:prodId", postEditDeleteController);

module.exports = route;
