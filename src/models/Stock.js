import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  cuantity: {
    type: number,
    required: true,
  },
  stock_id: {
    type: String,
    require: true
  },
  product_id: {
    type: String,
    require: true
  }

});

const Stock = mongoose.model('Size', stockSchema);

export default Stock;