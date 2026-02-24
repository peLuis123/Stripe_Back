import stripe from '../../config/stripe.js';

export const assignCard = async (req, res) => {
  try {
    const card = await stripe.customers.createSource(
      req.body.userId,
      { source: req.body.source }
    );
    if (card) {
      res.send({
        message: 'Tarjeta añadida con exito',

        cardId: card.id,
        status: true,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "verifique que el usuario este registrado",
      status: false,
    })
  }
}