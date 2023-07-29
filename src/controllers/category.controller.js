import Category from "../models/Category.js";

export const categoryController = {

  create: async (req, res) => {
    try {
      const { name } = req.body;
      const category = new Category({
        name,
      });
      const saveCategory = await category.save();
      res.json(saveCategory);
    } catch (error) {
        res.json({message: "Duplicate name in categories"})
    }
  },

  getAllCategories: async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  },

  update: async (req, res) => {
    const { _id } = req.params;
    try {
      const category = await Category.findOne({ _id });
      category.set(req.body);
      await category.save();
      res.json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    const { _id } = req.params
    try {
      const category = await Category.findOne({_id});
      category.set({
        status: false
      });
      await category.save();
      res.json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
