const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {profileUpdateController}= require("../controller/profileUpdateController")
const profileValidator=require("../validator/profile/profileValidator")


const {
  uploadProfilePicController,
  removeProfilePicController,
} = require("../controller/uploadController");


// router.post("/profilePic",isAuthenticated,upload.single("profilePic"),uploadProfilePic)
router.get("/crop", (req, res) => {
  res.render("ckEditor");
});
router.post("/crop", uploadProfilePicController);
// router.delete("/crop", removeProfilePicController);


router.get("/createProfile", (req, res) => {
  res.render("createProfile", { title: "Create Profile" });
});
router.post("/createProfile", uploadProfilePicController);
router.delete("/createProfile", removeProfilePicController);



router.post("/bio",profileValidator, profileUpdateController)



router.get("/edit", (req, res) => {
  res.render("editProfile");
});
router.post("/edit", uploadProfilePicController);
router.delete("/edit", removeProfilePicController);

module.exports = router;
