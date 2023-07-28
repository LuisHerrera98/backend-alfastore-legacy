import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
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
});

const Produt = mongoose.model('Product', productSchema);

export default Produt;
