const Product = require ("../model/database/Product")
const Profile = require ("../model/database/Profile")
const moment = require ("moment")


function getDate(days){
    let date = moment().subtract(days,"days")
    return date.toDate()
}

function generateFilterObject(filter){
    let filterObj={}
    let order=1

    switch(filter)
    {
        case "week":
            {
            filterObj=
            {
                timestamps:
                {
                    $gt:getDate(7)
                }
            }
            order =-1
            break
        }
        case "month":
        {
            filterObj=
            {
                timestamps:
                {
                    $gt:getDate(30)
                }
            }
            order =-1
            break
        }
        case "all":
        {
           
            order =-1
            break
        }
    }
    return {filterObj,order}
}

exports.explorerGetController=async (req,res,next)=>{
    let filter = req.query.filter||"latest"
    
    let {filterObj,order}= generateFilterObject(filter.toLowerCase())
    try {
        let currentPage = req.query.currentPage || 1
        let itemPerPage = 1
        let product =await Product.find().populate("user","name")
        .sort(order == 1 ? "-timestamps":"timestamps")
        .skip((itemPerPage * currentPage)-itemPerPage)
        .limit(itemPerPage)
        // product=prod.reverse()
        let totalPost=await Product.countDocuments()
        let totalPage =totalPost/itemPerPage

        let bookmarks=[]
        if (req.user){
            // console.log(req.user._id)
            let profile=await Profile.findOne({user:req.user._id})
            if (profile){
                bookmarks=profile.bookmarks
            }
        }
        // console.log(bookmarks)
        res.render("./play/explorer",{
            title:"ExploreAllPost",
            filter,itemPerPage,totalPage,currentPage,
            product,bookmarks
        })
    } catch (error) {
        console.log(error)
    }
    
}

exports.singlePostGetController=async(req,res,next)=>{

    let {prodId}=req.params
    try {
        let product= await Product.findById(prodId)
        // .populate({user,profilePic})
        .populate("user","name profilePic")
        .populate({
            path:"Comments",
            populate:{
                path:"user",
                select:"name profilePic"
            }
        })
        .populate({
            path:"Comments",
            populate:{
                path:"replies.user",
                select:"name profilePic"
            }
        })


    if (!product){
        
        return res.status(403).json({ error: "not allowed" });
        
    }
    let bookmarks=[]
    if (req.user){
        // console.log(req.user._id)
        let profile=await Profile.findOne({user:req.user._id})
        if (profile){
            bookmarks=profile.bookmarks
            // console.log(bookmarks,profile)
        }
    }
    res.render("./play/singlePage",{
        title:"SinglePage",
        
        product,bookmarks
    })
    } catch (error) {
        next(error)
    }


}


exports.searchGetController=async( req,res,next)=>{
    try {
        const {prod}=req.query
        const regex =new RegExp(prod,"i")
        let currentPage = req.query.currentPage || 1
        let itemPerPage = 2

        
        let productDescription = await Product.find({description:regex})
        // .skip((itemPerPage * currentPage)-itemPerPage)
        // .limit(itemPerPage)

        let productTitle = await Product.find({title:regex})
        // .skip((itemPerPage * currentPage)-itemPerPage)
        // .limit(itemPerPage)

        res.status(200).send({productDescription,productTitle})

        //http://localhost:3000/explorer/search?prod=lorem
    } catch (error) {
        next(error)
    }
}