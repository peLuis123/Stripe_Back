import stripe from '../../config/stripe.js';

export const updateCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.update(
      req.body.userId,
      {
        email: req.body.email,
        name: req.body.name,
        //description: req.body.description,
        phone: req.body.phone,
      }
    );
    if (customer) {
      res.send({
        message: 'Customer updated successfully',
        id: customer.id,
        email: customer.email,
        status: true,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "Verifique que los datos sean correctos",
      status: false,
    })
  }

}