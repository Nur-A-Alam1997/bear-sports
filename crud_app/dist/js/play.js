const route = require("express").Router()
const upload = require("../../server/middleware/uploadMiddleware")
//Uploading multiple files
route.post('/uploadfile',upload.array('photos[]', 12), (req, res, next) => {
    const files = req.files
    console.log(files)
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
    
  })


  module.exports=route