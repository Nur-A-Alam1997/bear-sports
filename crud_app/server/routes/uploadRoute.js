const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {profileUpdateController,
  profileEditGetController,
  profileGetController}= require("../controller/profileUpdateController")
const{createProfileGetController}=require("../controller/dashboardGetController")
const profileValidator=require("../validator/profile/profileValidator")


const {
  uploadProfilePicController,
  removeProfilePicController,
} = require("../controller/uploadController");


// router.post("/profilePic",isAuthenticated,upload.single("profilePic"),uploadProfilePic)


router.post("/crop", uploadProfilePicController);
// router.delete("/crop", removeProfilePicController);



router.get("/createProfile",isAuthenticated,createProfileGetController, (req, res,next) => {
   res.render("newProfile", { title: "Create Profile" });

});
router.post("/createProfile",isAuthenticated, uploadProfilePicController);
router.delete("/createProfile",isAuthenticated, removeProfilePicController);



router.post("/update",isAuthenticated,profileValidator, profileUpdateController)



router.get("/edit",isAuthenticated,profileEditGetController);

// router.get("/edit",isAuthenticated, (req, res) => {
//   res.render("editProfile");
// // });
// router.post("/edit",isAuthenticated, uploadProfilePicController);
// router.delete("/edit",isAuthenticated, removeProfilePicController);

router.get("/:userId",profileGetController)

module.exports = router;
