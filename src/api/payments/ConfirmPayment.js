import stripe from '../../config/stripe.js';

export const confirmPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(
      req.body.paymentId,
    );
    if (paymentIntent) {
      res.send({
        status: true,
        data: paymentIntent,

      })
    }
  } catch (error) {
    res.status(404).json({
      message: "verifique que el payment intent ahya sido creado",
      status: false,
    })
  }
}
