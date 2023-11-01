import mongoose from "mongoose";

const dateSellSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  }
});

const DateSell = mongoose.model('DateSell', dateSellSchema);

export default DateSell;