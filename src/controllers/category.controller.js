import Category from "../models/Category.js";
import { uploadImage } from "../utils/cloudinary.js";
import * as fs from "fs/promises";

export const categoryController = {

  create: async (req, res) => {

    const image = [];

    try {
      const { name } = req.body;
      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadImage(req.files[i].path);
        console.log(result);
        const url = result.secure_url;
        image.push(url);
        await fs.unlink(req.files[i].path);
      }

      const category = new Category({
        name,
        image
      });
      await category.save();
      res.json({message: 'create category'})
    } catch (error) {
      console.log(error);
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
  },

  deleteAll: async (req, res) => {
    await Category.deleteMany()
    return res.json({message: "deleted categories"})
  }
};
