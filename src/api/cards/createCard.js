import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const create = async (req, res) => {
  const { number, exp_month: expMonth, exp_year: expYear, cvc } = req.body;

  if (!number || !expMonth || !expYear || !cvc) {
    throw new ApiError(400, 'number, exp_month, exp_year y cvc son requeridos');
  }

  const token = await stripe.tokens.create({
    card: {
      number,
      exp_month: expMonth,
      exp_year: expYear,
      cvc,
    },
  });

  return sendResponse(res, {
    statusCode: 201,
    message: 'Tarjeta tokenizada correctamente',
    data: {
      token_id: token.id,
      card_id: token.card.id,
      card_brand: token.card.brand,
      card_last4: token.card.last4,
    },
  });
};
