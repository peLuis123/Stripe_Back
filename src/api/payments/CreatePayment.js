import stripe from '../../config/stripe.js';

export const createPayment = async (req, res) => {
  try {
    const customerId = req.body.customer_id;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "EUR",
      payment_method_types: ['card'],
      payment_method: req.body.payment_method,
      //payment_method: 'card_1Mg8wlIo7cwSV9VQ2Gl3Rm03',
      customer: customerId,
    });

    if (paymentIntent) {

      res.send({
        status: true,
        data: paymentIntent,
        id: paymentIntent.id,
        customer: paymentIntent.customer
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "verifique que la tarjeta ingresada sea valida",
      status: false,
    })
  }

}
