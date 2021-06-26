const Product = require ("../model/database/Product")


exports.likeGetController=async(req,res,next)=>{
    let {prodId}=req.params
    
    let userId= req.user._id
    let dislike=undefined
    let like=undefined
    if (!req.user) {
        return res.status(403).json({ error: "not allowed" });
      }
      try {
          let product=await Product.findById(prodId)
          if(product.dislike.includes(userId))
          {   dislike=false  
              await Product.findOneAndUpdate(
                  {_id:prodId},
                  {$pull:{"dislike":userId}}
              )
          }
          if(product.like.includes(userId))
          {
              await Product.findOneAndUpdate(
                  {_id:prodId},
                  {$pull:{"like":userId}}
              )
              like=false
          }else
          { console.log("visited")
              await Product.findOneAndUpdate(
                  {_id:prodId},
                  {$push:{"like":userId}}
              )
              like=true
              
          }
          let updateProduct=await Product.findById(prodId)
          console.log(updateProduct)
          res.status(202).json({
              like,dislike,
              totalLikes:updateProduct.like.length,
              totalDisLikes:updateProduct.dislike.length,}
          )

      } catch (error) {
          console.log(error)
          return res.status(500).json({ error: "error" });
      }
}



exports.disLikeGetController=async(req,res,next)=>{


    let {prodId}=req.params
    let userId= req.user._id
    let dislike = undefined
    let like=undefined
    if (!req.user) {
        return res.status(403).json({ error: "not allowed" });
      }
      try {
          let product=await Product.findById(prodId)
          if(product.like.includes(userId))
          {    like=false
              await Product.findOneAndUpdate(
                  {_id:prodId},
                  {$pull:{"like":userId}}
              )
          }
          if(product.dislike.includes(userId))
          {
              await Product.findOneAndUpdate(
                  {_id:prodId},
                  {$pull:{"dislike":userId}}
              )
              dislike=false
          }else
          {
              await Product.findOneAndUpdate(
                  {_id:prodId},
                  {$push:{"dislike":userId}}
              )
              dislike =true
          }
          let updateProduct=await Product.findById(prodId)
        //   console.log(updateProduct)
          res.status(202).json({
              dislike,like,
              totalLikes:updateProduct.like.length,
              totalDisLikes:updateProduct.dislike.length,}
          )

      } catch (error) {
          console.log(error)
          return res.status(500).json({ error: "bad error" });
      }
}