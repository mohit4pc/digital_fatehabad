const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
  },
  whatsappNo: {
    type: String,
    required: true,
  },
  SubCatgoriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
