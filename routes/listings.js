const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

// Route to get all listings or filter by SubCatgoriesId
router.get("/:SubCatgoriesId", listingController.getAllListings);

// Route to create a new listing
router.post("/", listingController.createListing);

// Route to update a listing by ID
router.put("/:id", listingController.updateListing);

// Route to delete a listing by ID
router.delete("/:id", listingController.deleteListing);

module.exports = router;
