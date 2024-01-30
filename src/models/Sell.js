import mongoose from "mongoose";

const sellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date_hour: {
    type: String,
    required: true,
  },
  date_sell: {
    type: String,
    required: true,
  },
  category_name: {
    type: String,
    required: false,
  },
  cost: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  size_name: {
    type: String,
    required: false,
  },
  method_payment: {
    type: String,
    required: true,
  }
});

const Sell = mongoose.model('sells', sellSchema);

export default Sell;
