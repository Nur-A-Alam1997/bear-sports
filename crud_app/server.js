const express = require("express");
const app = express();
const mongoose = require("mongoose");
const hbs = require("hbs");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const moment = require("moment")
const { bindUserwithRequest } = require("./server/middleware/authMiddleware");
const setLocals = require("./server/middleware/setLocals");
const authRoutes = require("./server/routes/authRoute");
const dashboardRoute = require("./server/routes/dashboardRoute");
const uploadRoute = require("./server/routes/uploadRoute");
const postRoute = require("./server/routes/postRoute");
const apiRoutes=require("./server/routes/apiRoutes")
const explorerRoute=require("./server/routes/explorerRoute")
const {emailVerification}=require("./server/middleware/emailMiddleware")


const store = new MongoDBStore({
  uri: "mongodb+srv://admin:64@cluster0.fqlyv.mongodb.net/e-sports?retryWrites=true&w=majority",
  collection: "mySessions",
  expires: 1000 * 60 * 60 * 24,
});
// const bodyParser = require("body-parser");
const PORT = 3000;

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, "/views/partials"));


hbs.registerHelper("moment", function (time) {
  return moment.utc(time).startOf('day').fromNow();
});

hbs.registerHelper('trimString', function(passedString, startstring, endstring) {
  var theString = passedString.substring( startstring, endstring );
  return new hbs.SafeString(theString)
});

hbs.registerHelper('check', function(val1, val2) {
  return val1 == val2;
});
hbs.registerHelper('eq', function(array, b) {
  if(array.includes(b)) // Or === depending on your needs
      return true;
  else
      return false;
});

hbs.registerHelper("ifCond", function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});


hbs.registerHelper('ifConD', function (v1, operator, v2, options) {

  switch (operator) {
      case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
  }
});

hbs.registerHelper('for', function(from, to, incr, block) {
  var accum = '';
  for(var i = from; i < to; i += incr)
      accum += block.fn(i);
  return accum;
});

hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
      
  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});




hbs.registerHelper("toJSON", function (obj) {
  return JSON.stringify(obj);
});
// app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({ limit: "50MB", extended: true }));
app.use(express.json({ limit: "50MB" }));
app.use(express.static(path.resolve(__dirname, "assets")));
app.use(
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(bindUserwithRequest());
app.use(setLocals());

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoute);
app.use("/post", postRoute);
app.use("/api",apiRoutes);
app.use("/explorer",explorerRoute);
app.use("/profilePic", uploadRoute);

app.get("/createProfile", (req, res) => {
  res.render("createProfile", { title: "Create Profile" });
});
app.get("/crop", (req, res) => {
  // console.log(req.body.data)
  res.render("cropped");
});
// app.post("/crop",(req,res)=>{
// console.log(req.body.img)
// console.log(req.body.name)
// res.status(202).send(req.body.img)
// })

const fs = require("fs");
app.post("/crop", (req, res) => {
  // console.log(req.body.img)
  let base64String = req.body.img; // Not a real image
  // Remove header
  let base64Image = base64String.split(";base64,").pop();
  // console.log(buffer)
  //writefile use relative path
  fs.writeFile(
    `./assets/img/uploadImage/${Date.now()}-${req.body.name}`,
    base64Image,
    { encoding: "base64" },
    function (err) {
      console.log("File created", `${Date.now()}`);
    }
  );
  res.render("crop");
});

// app.post("/home",async(req,res)=>{
//     try {
//         const email=req.body.email
//         const pass=req.body.pass
//         const file=req.body.file
//         res.status(202).render("test",{email,pass,file})

//     } catch (err) {
//         res.status(403).send("cannot get")
//     }
// })
// app.get("/hoe",async(req,res)=>{
//     try {
//         res.render("sidebarFIxedHeader",{email:"email",pass:"pass"})

//     } catch (err) {
//         res.status(403).send("cannot get")
//     }
// })

// app.get("/userList",(req,res)=>{
//     // res.render("userList",{"user" : ["a","b","n"]})
//     res.render("userList",{"user":["Nur-A-Alam ","Tanzina Arpa","Mohammad Sayam"]})
// })

// app.get("/test",(req,res)=>{
//     res.render("test",{
//         author: true,
//         firstName: "Yehuda",
//         lastName: "Katz",
//     })
// })
const play = require("./dist/js/play");
const form = require("./server/middleware/formidable");
app.use("/u", form);

app.get("/",emailVerification, (req, res) => {
  // res.render("index");
  yourCities = [
    "stockholm",
    "moscow",
    "barcelona",
    "bordeaux",
    "helsinki",
    "london",
  ];
  res.render("test", { city: yourCities });
});

mongoose
  .connect(
    "mongodb+srv://admin:64@cluster0.fqlyv.mongodb.net/e-sports?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("connected");
    app.listen(PORT || 3000, () => {
      console.log(`hit me baby on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
