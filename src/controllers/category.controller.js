import Category from "../models/Category.js";
import { uploadImage } from "../utils/cloudinary.js";
import * as fs from "fs/promises";

export const categoryController = {
  create: async (req, res) => {
    const image = [];
    const { name } = req.body;

    try {
      if (!name) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadImage(req.files[i].path);
        const url = result.secure_url;
        image.push(url);
        await fs.unlink(req.files[i].path);
      }

      const category = new Category({
        name,
        image,
      });
      await category.save();
      return res.status(201).json({ message: "Categoria creada"});
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "Categoria ya existe" });
      }
      return res.status(500).json({ message: error.message });
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
    const { _id } = req.params;
    try {
      const category = await Category.findOne({ _id });
      category.set({
        status: false,
      });
      await category.save();
      res.json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteAll: async (req, res) => {
    await Category.deleteMany();
    return res.json({ message: "deleted categories" });
  },
};
