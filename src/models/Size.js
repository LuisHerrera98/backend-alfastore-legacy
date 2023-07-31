import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    require: true
  },
  unique: {
    type: String,
    unique: true
  }
});

const Size = mongoose.model('Size', sizeSchema);
export default Size;