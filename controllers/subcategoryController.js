const Subcategory = require("../models/Subcategory");

const subcategoryController = {
  getAllSubcategories: async (req, res) => {
    try {
      const categoryId = req.params.categoryId; // Extract categoryId from the request parameters
      const page = parseInt(req.query.page) || 1; // Extract page from query params or default to page 1
      const limit = parseInt(req.query.limit) || 10; // Extract limit from query params or default to 10
      const skip = (page - 1) * limit;

      const totalSubcategories = await Subcategory.countDocuments({
        categoryId,
      }); // Get the total count of subcategories for the categoryId

      const totalPages = Math.ceil(totalSubcategories / limit);

      const subcategories = await Subcategory.find({ categoryId })
        .skip(skip)
        .limit(limit);

      res.setHeader("X-Current-Page", page);
      res.setHeader("X-Last-Page", totalPages);
      res.setHeader("X-Total-Pages", totalPages);
      res.setHeader("X-Total-Count", totalSubcategories);
      res.json({
        status: true,
        message: "Sub-Categories Fetch Succesfully.",
        subcategories,
        page,
        totalPages,
        totalSubcategories,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createSubcategory: async (req, res) => {
    const { name, categoryId } = req.body;

    try {
      const newSubcategory = new Subcategory({ name, categoryId });
      const savedSubcategory = await newSubcategory.save();
      res.status(201).json(savedSubcategory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateSubcategory: async (req, res) => {
    const subcategoryId = req.params.id;
    const { name, categoryId } = req.body;

    try {
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        subcategoryId,
        { name, categoryId },
        { new: true }
      );

      if (!updatedSubcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      res.json(updatedSubcategory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteSubcategory: async (req, res) => {
    const subcategoryId = req.params.id;

    try {
      const deletedSubcategory = await Subcategory.findByIdAndDelete(
        subcategoryId
      );

      if (!deletedSubcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      res.json({ message: "Subcategory deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getSubCategoriesCount: async (req, res) => {
    try {
      const categoriesCount = await Subcategory.countDocuments();
      res.json({ count: categoriesCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = subcategoryController;
