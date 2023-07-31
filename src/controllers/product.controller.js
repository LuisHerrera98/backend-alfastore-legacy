import Product from "../models/Product.js";
import Stock from "../models/Stock.js";
import { uploadImage } from "../utils/cloudinary.js";
import * as fs from "fs/promises";
import { ProductStock } from "./productStock.js";

export const productController = {
  getOne: async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });

    res.json(product);
  },

  getAll: async (req, res) => {
    const products = await Product.find({ status: true });
    res.json(products);
  },

  getByCategory: async (req, res) => {
    const { category_id } = req.params;
    const products = await Product.find({ category_id });
    res.json(products);
  },

  getProductBySizeAndCategory: async (req, res) => {
    const { size_id } = req.params;

    //traigo el stock por talle
    const getSizesProduct = await Stock.find({size_id})

    //creo un arreglo solo de los product_id de los stocks
    const productIds = getSizesProduct.map((size) => size.product_id);


    const getProduct = await Product.find({ _id: {$in: productIds}});

    let products = [];
    for (let i = 0; i < getProduct.length; i++) {
      for (let b = 0; b < getSizesProduct.length; b++) {
        if(getProduct[i]._id == getSizesProduct[b].product_id){
          const product = new ProductStock(
            getProduct[i]._id,
            getProduct[i].name,
            getProduct[i].cost,
            getProduct[i].price,
            getProduct[i].category_id,
            getProduct[i].images,
            getProduct[i].status,
            getSizesProduct[b]._id
          )
          products.push(product)
        }
        
      }
    }

    
    res.json(products)
    
  },

  create: async (req, res) => {
    const { name, cost, price, category_id } = req.body;

    try {
      const images = [];

      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadImage(req.files[i].path);
        console.log(result);
        const url = result.secure_url;
        images.push(url);
        await fs.unlink(req.files[i].path);
      }

      if (req.files) {

        //creo el producto con las imagenes urls
        const product = new Product({
          name,
          cost,
          price,
          category_id,
          images,
        });

        const saveProduct = await product.save();

        //creo los talles de los productos pasados
        let productNewId = saveProduct._id;
        let stocks = JSON.parse(req.body.stock);

        for (let i = 0; i < stocks.length; i++) {
          stocks[i].product_id = productNewId;
        }

        const createStock = await Stock.insertMany(stocks);

        res.json([saveProduct, createStock]);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    const { _id } = req.params;
    try {
      const product = await Product.findOne({ _id });
      product.set(req.body);
      await product.save();
      res.json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    const { _id } = req.params;
    try {
      const product = await Product.findOne({ _id });
      product.set({
        status: false,
      });
      await product.save();
      res.json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
