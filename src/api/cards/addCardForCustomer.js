import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const assignCard = async (req, res) => {
  const { userId, source } = req.body;

  if (!userId || !source) {
    throw new ApiError(400, 'userId y source son requeridos');
  }

  const card = await stripe.customers.createSource(userId, { source });

  return sendResponse(res, {
    message: 'Tarjeta añadida con éxito',
    data: {
      cardId: card.id,
      brand: card.brand,
      last4: card.last4,
    },
  });
};