import stripe from '../../config/stripe.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
    })
    if (customer) {
      res.send({
        id: customer.id,
        email: customer.email,
        status: true,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "Verifique que todos los datos sean correctos",
      status: false,
    })
  }
}