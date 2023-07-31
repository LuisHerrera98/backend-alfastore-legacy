import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  cuantity: {
    type: Number,
    required: true,
  },
  size_id: {
    type: String,
    require: true
  },
  product_id: {
    type: String,
    require: true
  }
});

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;