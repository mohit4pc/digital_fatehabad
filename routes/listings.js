const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to get all listings or filter by SubCatgoriesId
router.get("/:SubCatgoriesId", listingController.getAllListings);

// Route to create a new listing
router.post(
  "/",
  // authMiddleware.verifyToken,
  listingController.createListing
);

// Route to update a listing by ID
router.put(
  "/:id",
  // authMiddleware.verifyToken,
  listingController.updateListing
);

// Route to delete a listing by ID
router.delete(
  "/:id",
  // authMiddleware.verifyToken,
  listingController.deleteListing
);
router.get(
  "/count",
  // authMiddleware.verifyToken,
  listingController.getListingsCount
);
module.exports = router;
