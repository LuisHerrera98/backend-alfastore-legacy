import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: Array,
    required: true,
  },
  status: {
    type: Boolean,
    default: true
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;