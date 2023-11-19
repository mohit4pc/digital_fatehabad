const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

// Middleware to validate categoryId (if needed)
// ... (your categoryId validation middleware)

// GET all subcategories for a specific category
router.get(
  "/:categoryId/subcategories",
  subcategoryController.getAllSubcategories
);

// POST create a new subcategory for a specific category
router.post(
  "/:categoryId/subcategories",
  subcategoryController.createSubcategory
);

// PUT update a subcategory for a specific category
router.put(
  "/:categoryId/subcategories/:id",
  subcategoryController.updateSubcategory
);

// DELETE a subcategory for a specific category
router.delete(
  "/:categoryId/subcategories/:id",
  subcategoryController.deleteSubcategory
);

module.exports = router;
