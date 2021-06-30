const {body} = require("express-validator")
const User = require("../../model/database/User")
module.exports= loginValidator =
    [body("email")
        .not().isEmpty().normalizeEmail().withMessage("cannot be empty")
    ,
    body("password")
        .not().isEmpty().withMessage("cannot be empty")
    
]