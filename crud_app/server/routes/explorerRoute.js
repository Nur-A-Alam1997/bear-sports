const route =require("express").Router()

const {explorerGetController,searchGetController,
    singlePostGetController}=require("../controller/explorerController")

route.get("/",explorerGetController)
route.get("/search",searchGetController)
route.get("/:prodId",singlePostGetController)
module.exports=route