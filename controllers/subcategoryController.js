const Subcategory = require("../models/Subcategory");

const subcategoryController = {
  getAllSubcategories: async (req, res) => {
    try {
      const categoryId = req.params.categoryId; // Extract categoryId from the request parameters
      const subcategories = await Subcategory.findById(categoryId); // Filter subcategories by categoryId
      console.log(subcategories);
      res.json(subcategories);
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
};

module.exports = subcategoryController;
