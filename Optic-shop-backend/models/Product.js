const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  rating: {
    type: Number,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  countInSock: {
    type: Number,
    min: 0,
    max: 50,
    require: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
