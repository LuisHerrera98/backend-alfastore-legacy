import DateSell from "../models/DateSell.js";
import Sell from "../models/Sell.js";
import generateDate from "../utils/generateDate.js";

export const sellsController = {

  registerSell: async (req, res) => {
    const { name, category_name, cost, price, image, size_name, method_payment } = req.body;
    const date_hour = generateDate("hour");
    const date_sell = generateDate();

    const dateFind = await DateSell.find({ date: date_sell });

    console.log(dateFind);
    console.log(name, category_name, cost, price, image, size_name, method_payment, date_hour);

    try {
      if (dateFind.length == 0) {
        const createDate = new DateSell({
          date: date_sell
        });
        await createDate.save();
      }

      const createSell = new Sell({
        name,
        date_hour,
        date_sell,
        category_name,
        cost,
        price,
        image,
        size_name,
        method_payment
      })
      await createSell.save()

      return res.status(201).json(createSell);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  dateSells: async (req, res) => {
    try {
      const dateSells = await DateSell.find();
      return res.status(201).json(dateSells);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getSells: async (req, res) => {
    const { date } = req.params;
    try {
      const sells = await Sell.find({
        date_sell: date
      })
      return res.status(201).json(sells);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
