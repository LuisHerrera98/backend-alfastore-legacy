import Size from "../models/Size.js";
import Product from "../models/Product.js"

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
  },

  sizeIncrement: async (req, res) => {
    const { product_id, size_id } = req.body;
    console.log(product_id, size_id);
    try {
      await Product.updateOne(
        {
          _id: product_id,
          "stock.id": size_id
        },
        {
          $inc: {
            "stock.$.cuantity": +1
          }
        }
      );
      return res.json({message: "increment"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  sizeDecrement: async (req, res) => {
    const { product_id, size_id } = req.body;
    try {
      await Product.updateOne(
        {
          _id: product_id,
          "stock.id": size_id
        },
        {
          $inc: {
            "stock.$.cuantity": -1
          }
        }
      );
      return res.json({message: "increment"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
