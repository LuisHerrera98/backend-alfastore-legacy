import Product from "../models/Product.js";
import { uploadImage } from "../utils/cloudinary.js";
import * as fs from "fs/promises";

export const productController = {

  getOne: async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findOne({_id});

    res.json(product)
  },

  getAll: async (req, res) => {
    const products = await Product.find({status: true});
    res.json(products);
  },

  getByCategory: async (req, res) => {
    const { category_id } = req.params;
    const products = await Product.find({category_id});
    res.json(products);
  },

  create: async (req, res) => {
    const { name, cost, price, category_id } = req.body;
    try {

      const images = [];

      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadImage(req.files[i].path);
        const url = result.secure_url;
        images.push(url)
        await fs.unlink(req.files[i].path);
      }

      if (req.files) {
        const product = new Product({
          name,
          cost,
          price,
          category_id,
          images
        });

        const saveProduct = await product.save();
        
        res.send(saveProduct)
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });

    }
  },

  update: async (req, res) => {
    const { _id } = req.params;
    try {
      const product = await Product.findOne({_id});
      product.set(req.body);
      await product.save();
      res.json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    const { _id } = req.params
    try {
      const product = await Product.findOne({_id});
      product.set({
        status: false
      });
      await product.save();
      res.json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
