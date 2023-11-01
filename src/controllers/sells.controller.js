import DateSell from "../models/DateSell.js";

export const sellsController = {
  createDate: async (req, res) => {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril',
      'mayo', 'junio', 'julio', 'agosto',
      'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = meses[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();

    console.log(`${dia} de ${mes} ${año}`);

    const createDate = new DateSell({
      date: `${dia} de ${mes} ${año}`
    });

    const date = await createDate.save();

    res.json(date);
  },

  registerSell: async () => {
    
  }
};
