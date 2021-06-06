const express = require("express");
const app = express();
const mongoose = require("mongoose")
const hbs = require('hbs')
const path=require("path")
const session=require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session)
const {bindUserwithRequest} = require("./server/middleware/authMiddleware")
const setLocals = require("./server/middleware/setLocals")
const authRoutes=require("./server/routes/authRoute")
const dashboardRoute = require("./server/routes/dashboardRoute");
const uploadRoute =require("./server/routes/uploadRoute")



const store = new MongoDBStore({
    uri: 'mongodb+srv://admin:64@cluster0.fqlyv.mongodb.net/e-sports?retryWrites=true&w=majority',
    collection: 'mySessions',
    expires:1000*60*60*7
  });
// const bodyParser = require("body-parser");
const PORT=3000;

app.set("view engine","hbs")
app.set("views",path.resolve(__dirname,"views"))

hbs.registerPartials(path.join(__dirname,"/views/partials"))
hbs.registerHelper('loud', function(string) {
    return string.toUpperCase()});
    // app.set("views",path.join(__dirname,"views"))
    
app.use((express.urlencoded({limit: '10mb',extended:true})))
app.use(express.static(path.resolve(__dirname,"assets")))
app.use(session({
    secret:process.env.SECRET_KEY||"SECRET_KEY",
    resave:false,
    saveUninitialized:false,
    store:store
                })
        )
app.use(bindUserwithRequest())
app.use(setLocals())



app.use("/auth",authRoutes)
app.use("/dashboard",dashboardRoute)

app.use("/profilePic",uploadRoute)

app.get("/createProfile",(req,res)=>{
    res.render("createProfile",{title:"Create Profile"})
})
app.get("/crop",(req,res)=>{
    // console.log(req.body.data)
    res.render("cropped")
})
// app.post("/crop",(req,res)=>{
    // console.log(req.body.img)
    // console.log(req.body.name)
    // res.status(202).send(req.body.img)
// })


const fs = require("fs");
app.post("/crop",(req,res)=>{
    // console.log(req.body.img)
    let base64String = req.body.img; // Not a real image
    // Remove header
    let base64Image = base64String.split(';base64,').pop();
    // console.log(buffer)
    fs.writeFile(`./assets/img/uploadImage/'+${Date.now()}+"-"+${req.body.name}`, base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });
    res.render("crop")
})

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


app.get("/",(req,res)=>{
    res.render("index")
})


mongoose.connect("mongodb+srv://admin:64@cluster0.fqlyv.mongodb.net/e-sports?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
.then(()=>{
    console.log("connected")
    app.listen(PORT||3000,()=>{
        console.log(`hit me baby on http://localhost:${PORT}`)
    })

}).catch((e)=>{console.log(e)})

