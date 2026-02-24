import stripe from '../../config/stripe.js';

export const cardDefault = async (req, res) => {
  try {
    const customer = await stripe.customers.update(
      req.body.userId,
      {
        default_source: req.body.default_source,
      }

    );
    if (customer) {
      res.send({
        message: 'Metodo de pago Actualizado con exito',
        data: customer,
        status: true,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "Valida los datos de la tarjeta",
      status: false,
    })
  }
}