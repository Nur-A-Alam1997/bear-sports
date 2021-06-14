const fs = require("fs");
const path = require("path");
const route = require("express").Router();
const formidable = require("formidable");
route.post("/uploadfile", (req, res, next) => {
  const form = formidable({
    multiples: true,
    uploadDir: "./assets/img/uploadImage",
    keepExtensions: true,
  });
  // console.log((req.body))
  var array = req.body;
  array.forEach((element) => {
    fs.writeFile(
      `./assets/img/uploadImage/${Date.now()}-${element.FileName}`,
      element.Content.toString(),{ encoding: "base64" },
      function (err) {
        console.log("File created", `${Date.now()}`);
      }
    );
    console.log(element.Content.toString());
  });
  
  res.send(array[0]["FileName"].toString());
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     console.log(error)
  //     next(err);
  //     return;
  //   }
  //   else{
  //       console.log(files)
  //   }
  //   res.json({ fields, files });
  // // next()

  // });
});

module.exports = route;
