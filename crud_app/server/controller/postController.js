const fs = require("fs");
const Product = require("../model/database/Product");
const Profile = require("../model/database/Profile");

exports.postCreatePostController = async (req, res, next) => {
  let { title, description, price, image } = req.body;

  let images = [];

  if (image) {
    image.forEach((element) => {
      filePath = `./assets/img/uploadImage/${Date.now()}-${element.FileName}`;
      viewPath=`/img/uploadImage/${Date.now()}-${element.FileName}`
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
    description,
    images,
    user: req.user._id,
  });

  try {
    await product.save();
    console.log(product._id);
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { "product": product._id } }
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
    console.log(error)
  }
};
