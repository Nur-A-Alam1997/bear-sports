const fs = require("fs");
const Product = require("../model/database/Product");
const Profile = require("../model/database/Profile");

exports.postCreatePostController = async (req, res, next) => {
  let { title, description, price, image,category,condition,location } = req.body;

  let images = [];

  if (image) {
    image.forEach((element) => {
      viewPath = `/img/uploadImage/${Date.now()}-${element.FileName}`;
      filePath = `./assets${viewPath}`;
      images.push(viewPath);
      fs.writeFile(
        filePath,
        element.Content.toString(),
        { encoding: "base64" },
        function (err) {
          return console.log("File created", filePath);
        }
      );
    });
  }

  let product = new Product({
    title,
    price,
    category,condition,location,
    description,
    images,
    user: req.user._id,
  });

  try {
    await product.save();
    console.log(product._id);
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { product: product._id } }
    );
    res.send("/post/edit/" + `${product._id}`);
  } catch (error) {
    console.log(error);
  }

  // res.send("DOne")
};

exports.postEditGetController = async (req, res, next) => {
  let prodId = req.params.prodId;
  try {
    let product = await Product.findOne({
      user: req.user._id,
      _id: prodId,
    });
    res.render("./play/editProduct", { product });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditPostController = async (req, res, next) => {
  try {
    let { title, description, price ,category,condition,location} = req.body;
    let newFiles = req.body.newFiles;
    let newImage = [];
    if (newFiles) {
      newFiles.forEach((element) => {
        viewPath = `/img/uploadImage/${Date.now()}-${element.FileName}`;
        filePath = `./assets${viewPath}`;
        newImage.push(viewPath);
        fs.writeFile(
          filePath,
          element.Content.toString(),
          { encoding: "base64" },
          function (err) {
            return console.log("File created", filePath);
          }
        );
      });
    }
    console.log(newImage);
    let prodId = req.params.prodId;
    let oldFiles = req.body.oldFiles;
    let product = await Product.findOne({ user: req.user._id, _id: prodId });
    let images = [];
    images = images.concat(newImage);
    console.log(images);

    let removeImage = product.images.filter(function (n) {
      return !this.has(n);
    }, new Set(oldFiles));

    if (removeImage) {
      for (var i = 0; i < removeImage.length; i++) {
        fs.unlink(`./assets${removeImage[i]}`, async function (err) {
          console.log("Done");
        });
      }
    }

    let keepImage = oldFiles.filter(function (n) {
      return this.has(n);
    }, new Set(product.images));

    images = images.concat(keepImage);
    console.log(images);

    await Product.findOneAndUpdate(
      { user: req.user.id, _id: prodId },
      { $set: { title, description, price, images,category,condition,location } },
      { returnNewDocument: true }
    );
    res.status(202).send("Done");
  } catch (error) {}
};

exports.postDeleteController = async (req, res, next) => {
  let { prodId } = req.params;

  try {
    let product = await Product.findOneAndDelete({
      user: req.user._id,
      _id: prodId,
    });
    if (product)
    {
      for (var i = 0; i < product.images.length; i++) {
        fs.unlink(`./assets${product.images[i]}`, async function (err) {
          console.log("Done");
        });
      }
  
      console.log(product.images);
  
      await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { product: prodId } }
      );
  
    }
    // for (var i = 0; i < product.images.length; i++) {
    //   fs.unlink(`./assets${product.images[i]}`, async function (err) {
    //     console.log("Done");
    //   });
    // }

    // console.log(product.images);

    // await Profile.findOneAndUpdate(
    //   { user: req.user._id },
    //   { $pull: { product: prodId } }
    // );
    res.redirect("/post/");
  } catch (error) {
    console.log(error);
  }
};



exports.wishListGetController=async (req,res,next)=>{


  try {
    let itemPerPage = 5
    let currentPage = req.query.currentPage || 1

    let wishList = await Profile.find({ user: req.user._id })
    .populate(
      {
      path:"bookmarks",
      // Model:"Product",
      select:"title price timestamps"
      })
      // .skip((itemPerPage * currentPage)-itemPerPage)
      // .limit(itemPerPage)
      
      let wishlist = wishList[0]["bookmarks"]
      .slice((itemPerPage * currentPage)-itemPerPage,itemPerPage * currentPage)
      // console.log(JSON.stringify(wishlist))

      let totalPost=wishList[0]["bookmarks"].length
      
      // console.log(totalPost,wishList[0]["bookmarks"].length)
      let totalPage =Math.ceil(totalPost/itemPerPage)


    res.status(202).render("./play/wishList", { wishlist,itemPerPage,totalPage,currentPage });
  } 
    catch (error) {
    console.log(error);
  }
}




exports.allPostGetController = async (req, res, next) => {
  try {
    let products = await Product.find({ user: req.user._id });
    //for(var i=0;i<2;i++){console.log(products[i])}
    // console.log(products.toString())
    res.status(202).render("./play/post", { products });
    // res.send(products)
  } catch (error) {
    console.log(error);
  }
};
