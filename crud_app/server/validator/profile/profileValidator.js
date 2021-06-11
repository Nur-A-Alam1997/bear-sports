const {body} = require("express-validator")
module.exports= profileValidator =
    [body("bio")
    .isLength({min:50,max:255})
    .withMessage("Must be between 50 to 255 chars")
    .trim()
    ,]