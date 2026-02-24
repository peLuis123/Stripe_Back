import stripe from '../../config/stripe.js';

export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await stripe.customers.del(
      req.params.id,
    );
    if (deleted) {
      res.send({
        message: 'usuario eliminado con exito',
        status: true,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "el usuario no existe",
      status: false,
    })
  }
}