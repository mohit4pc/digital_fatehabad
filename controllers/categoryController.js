const Category = require("../models/Category");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createCategory: async (req, res) => {
    const { name } = req.body; // Assuming the request body contains the 'name' parameter

    try {
      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory); // Sending back the newly created category
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateCategory: async (req, res) => {
    const categoryId = req.params.id; // Extracting the category ID from the request parameters
    const { name } = req.body; // Assuming the request body contains the updated 'name' parameter

    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(updatedCategory); // Responding with the updated category
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    const categoryId = req.params.id; // Extracting the category ID from the request parameters

    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);

      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json({ message: "Category deleted successfully" }); // Responding with a success message
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = categoryController;
