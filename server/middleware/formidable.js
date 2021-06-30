const route = require("express").Router();
const fs = require("fs");



route.post("/uploadfile", (req, res, next) => {
 
  // console.log((req.body))
  var array1= req.body.City
  var array2= ["stockholm", "moscow", null, null, "helsinki", "london"];
  const intersection = array1.filter(element => array2.includes(element));
  console.log(intersection)

  var arrayNew = req.body.New;
  // arrayNew.forEach(element => {
  //     element.FileName.toString()  
  //     console.log(element.FileName)
  // });

  if (arrayNew){
    arrayNew.forEach((element) => {
      fs.writeFile(
        `./assets/img/uploadImage/${Date.now()}-${element.FileName}`,
        element.Content.toString(),{ encoding: "base64" },
        function (err) {
          console.log("File created", `${Date.now()}`);
        }
      );
    });
  }
 
  
  // res.send(array[0]["FileName"].toString());
  res.send(req.body)
});

module.exports = route;
