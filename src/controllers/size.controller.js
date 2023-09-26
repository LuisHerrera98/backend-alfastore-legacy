import Size from "../models/Size.js";

export const sizeController = {
  create: async (req, res) => {
    try {
      const { name, category_id } = req.body;
      const unique = name + category_id;
      const size = new Size({
        name,
        category_id,
        unique,
      });
      const saveSize = await size.save();
      res.json(saveSize);
    } catch (error) {
      res.json({ message: "Error create size or duplicated size" });
    }
  },

  getSizesByCategory: async (req, res) => {
    const { category_id } = req.params;
    const sizesByCategory = await Size.find({ category_id });
    res.json(sizesByCategory);
  },

  update: async (req, res) => {
    const { _id } = req.params;
    try {
      const size = await Size.findOne({ _id });
      const category_id = size.category_id;
      size.set({
        name: req.body.name,
        unique: req.body.name + category_id,
      });
      await size.save();
      res.json(size);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteAll: async (req, res) => {
    try {
      await Size.deleteMany();
      return res.json({message: "deleted sizes"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  
};
