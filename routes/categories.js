const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const categoryController = require("../controllers/categoryController");
router.get("/", categoryController.getAllCategories);
router.post(
  "/",
  // authMiddleware.verifyToken,
  categoryController.createCategory
);
router.put(
  "/:id",
  // authMiddleware.verifyToken,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  // authMiddleware.verifyToken,
  categoryController.deleteCategory
);
// Route to get the count of categories
router.get(
  "/count",
  // authMiddleware.verifyToken,
  categoryController.getCategoriesCount
);

module.exports = router;
