import stripe from '../../config/stripe.js';

export const getCustomerById = async (req, res) => {
  const id = req.params.id
  try {
    const customer = await stripe.customers.retrieve(
      id
    );
    if (customer) {
      res.send({
        data: customer,
        status: true,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "el usuario no existe intente nuevamente" + id,
      status: false,
    })
  }
}