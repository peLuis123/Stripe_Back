import stripe from '../../config/stripe.js';

export const create = async (req, res) => {
  try {
    const token = await stripe.tokens.create({
      card: {
        number: req.body.number,
        exp_month: req.body.exp_month,
        exp_year: req.body.exp_year,
        cvc: req.body.cvc,
      },
    });
    if (token) {
      res.send({
        token_id: token.id,
        card_id: token.card.id,
        card_brand: token.card.brand,
        card_last4: token.card.last4,
        status: true,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "los datos ingresados son incorrectos",
      status: false,
    })
  }
}
