import mongoose from "mongoose";

const sellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
    default: true
  },
  stock: {
    type: Array,
    required: true,
  },
});

const Sell = mongoose.model('sells', sellSchema);

export default Sell;
