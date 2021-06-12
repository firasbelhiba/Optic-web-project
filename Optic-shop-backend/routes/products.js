const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

//@route POST api/products/
//@desc add product
//@access Private
router.post("/", async (req, res) => {
  try {
    const category=await Category.findById(req.body.category);
    if(!category){
      return res.status(400).send("Invalid category");
    }
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      //   image: req.body.image,
      //   images: req.body.images,
      //   brand: req.body.brand,
      //   price: req.body.price,
         category: req.body.category,
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

//@route PUT products/:id
//@desc update product
//@access Private
router.put(
  "/:id",async (req, res) => {
    try {
      const newProduct = {
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
      };

      let product = await Product.findOne({ _id: req.params.id });

      if (!product) {
        return res.status(404).json({ message: "Product not Found " });
      }

      if (product) {
        product = await Product.findOneAndUpdate(
          { _id: req.params.id },
          { $set: newProduct },
          { new: true }
        );
        return res.json(product);
      }

      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ message: "Product not Found " });
      }
      res.status(500).send("Server error");
    }
  }
);
//@route DELETE api/products/:id
//@desc DELETE by id product
//@access Private

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.remove();
    res.json({ message: "Product Deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not Found " });
    }
    res.status(500).send("Server error");
  }
});



module.exports = router;
