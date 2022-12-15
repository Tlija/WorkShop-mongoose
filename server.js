const express = require("express");

const app = express();
const port = 3000;

const mongoose = require("mongoose");
const conectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/test");
    console.log("data base is connect");
  } catch (error) {
    console.log(error);
  }
};
conectDB();

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  price: { type: Number, required: true },
  category: [String],
  createdate: { type: Date, default: Date.now },
  instoke: { type: Boolean, default: true },
  qtes: { type: Number, required: true },
  image: { type: String },
});

const productModel = mongoose.model("product", productSchema);
//methode 1
// const newproduct = new productModel({
//   title: "produit1",
//   description: "tayara",
//   price: 120,
//   category: ["homme", "vetement"],
//   qtes: 10,
//   image:
//     "data:image/jpeg;base64,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",
// });
// console.log(newproduct)
// newproduct.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });
// methode 2
// productModel.create({
//     title: "produit2",
//       description: "khayeb",
//       price: 1,
//       category: ["homme", "vetement"],
//       qtes: 5,
//       image:'https://www.exist.com.tn/26894-large_default/exist-colors.jpg'
//  }, function (err, data) {
//     if (err) return handleError(err);
//     // saved!

const getallProuducts = async () => {
  try {
    const products = await productModel.find({});
    console.log(products);
  } catch (error) {
    console.log(error);
  }
};
// getallProuducts();
const updateProd = async () => {
  try {
    let res = await productModel.findOneAndUpdate(
      { _id: "639b45c56b75ff3b1d82db49" },
      {
        title: "produit3",
        description: "khayeb 5las",
        price: 1,
        category: ["homme", "vetement"],
        qtes: 5,
        image: "https://www.exist.com.tn/26894-large_default/exist-colors.jpg",
      },
      {
        new: true,
      }
    );
    console.log(res)
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`le server is runing on port ${port}`);
});
// updateProd()
productModel.deleteOne({ title
    : "produit2" }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
