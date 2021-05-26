const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const PORT=3000;
const path=require("path")

app.use((express.urlencoded()))
app.set("view engine","hbs")
app.set("views",path.resolve(__dirname,"views"))

const hbs = require('hbs')
hbs.registerPartials(path.join(__dirname,"/views/partials"))
hbs.registerHelper('loud', function(string) {
    return string.toUpperCase()});
// app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.resolve(__dirname,"assets")))

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/userList",(req,res)=>{
    // res.render("userList",{"user" : ["a","b","n"]})
    res.render("userList",{"user":["Nur-A-Alam ","Tanzina Arpa","Mohammad Sayam"]})
})

app.get("/test",(req,res)=>{
    res.render("test",{
        author: true,
        firstName: "Yehuda",
        lastName: "Katz",
      })
})

app.listen(PORT||3000,()=>{
    console.log(`hit me baby on http://localhost:${PORT}`)
})