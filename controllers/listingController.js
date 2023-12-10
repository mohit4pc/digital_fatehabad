const Listing = require("../models/Listing");

const listingController = {
  createListing: async (req, res) => {
    const {
      name,
      businessName,
      description,
      address,
      mobile,
      email,
      websiteUrl,
      whatsappNo,
      SubCatgoriesId,
    } = req.body;
    try {
      const newListing = new Listing({
        name,
        businessName,
        description,
        address,
        mobile,
        email,
        websiteUrl,
        whatsappNo,
        SubCatgoriesId,
      });
      const savedListing = await newListing.save();
      res.status(201).json(savedListing);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllListings: async (req, res) => {
    const SubCatgoriesId = req.params.SubCatgoriesId;

    try {
      const listings = await Listing.find({ SubCatgoriesId });
      res.json(listings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateListing: async (req, res) => {
    const listingId = req.params.id;
    const {
      name,
      businessName,
      description,
      address,
      mobile,
      email,
      websiteUrl,
      whatsappNo,
      // Additional fields as per your Listing model
    } = req.body;

    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        listingId,
        {
          name,
          businessName,
          description,
          address,
          mobile,
          email,
          websiteUrl,
          whatsappNo,
          // Additional fields as per your Listing model
        },
        { new: true } // To return the updated document
      );

      if (!updatedListing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      res.json(updatedListing);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteListing: async (req, res) => {
    const listingId = req.params.id;

    try {
      const deletedListing = await Listing.findByIdAndDelete(listingId);

      if (!deletedListing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      res.json({ message: "Listing deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getListingsCount: async (req, res) => {
    try {
      const listingsCount = await Listing.countDocuments();
      console.log(listingsCount);
      res.json({ count: listingsCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = listingController;
