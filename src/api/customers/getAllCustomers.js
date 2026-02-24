import stripe from '../../config/stripe.js';

export const getAllCustomers = async (req, res) => {
  try {
    const customer = await stripe.customers.list({
      limit: 10,
    });
    if (customer) {
      res.send({
        status: true,
        data: customer,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "Verifique que las keys esten ingresadas correctamente",
      status: false,
    })
  }

}