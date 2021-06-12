const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
      required:true

      },
      lastName: {
        type: String,
        required:true
      },
      email: {
        type: String,
        required:true
      },
      password: {
        type: String,
        required:true
      },
      phone: {
        type: String,
        required:true
      },
      address: {
        city: {
            type: String,
           required:true
        },
        street: {
            type: String,
           required:true

        },
        country: {
            type: String,
            required:true
        },
        zip: {
            type: String,
           required:true

        },
    },
    isAdmin: {
      type: Boolean,
      default:false

      },
      date: {
        type: Date,
        default: Date.now,
      },






});
module.exports = User = mongoose.model("user", UserSchema);

