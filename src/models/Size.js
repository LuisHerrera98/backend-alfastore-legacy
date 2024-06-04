import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:false
  },
  category_id: {
    type: String,
    require: true,
    unique: false
  },
  unique: {
    type: String,
    unique: true
  }
});

const Size = mongoose.model('Size', sizeSchema);
export default Size;