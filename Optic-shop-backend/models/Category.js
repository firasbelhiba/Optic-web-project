const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});

module.exports = Category = mongoose.model("category", CategorySchema);
