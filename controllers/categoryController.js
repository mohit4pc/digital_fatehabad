const Category = require("../models/Category");

const categoryController = {
  getAllCategories: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit);
    try {
      const categories = await Category.find().skip(skip).limit(limit);
      res.json({
        status: true,
        message: "Categories Fetch Succesfully.",
        categories,
        page,
        totalPages,
        totalCategories,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createCategory: async (req, res) => {
    const { name } = req.body;

    try {
      const existingCategory = await Category.findOne({ name });

      if (existingCategory) {
        return res.status(400).json({ error: "Category Already Exists" });
      }

      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
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
  getCategoriesCount: async (req, res) => {
    try {
      const categoriesCount = await Category.countDocuments();
      res.json({ count: categoriesCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = categoryController;
