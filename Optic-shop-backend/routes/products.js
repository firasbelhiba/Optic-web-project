const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//@route POST api/products/
//@desc add product
//@access Private
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      //   image: req.body.image,
      //   images: req.body.images,
      //   brand: req.body.brand,
      //   price: req.body.price,
      //   category: req.body.category,
      //   rating: req.body.rating,
      //   isFeatured: req.body.isFeatured,
      //   countInSock: req.body.countInSock,
      //   status: req.body.status,
    });
    const product = await newProduct.save();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/products
//@desc Get all products
//@access Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
