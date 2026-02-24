import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const cardDefault = async (req, res) => {
  const { userId, default_source: defaultSource } = req.body;

  if (!userId || !defaultSource) {
    throw new ApiError(400, 'userId y default_source son requeridos');
  }

  const customer = await stripe.customers.update(userId, {
    default_source: defaultSource,
  });

  return sendResponse(res, {
    message: 'Método de pago actualizado con éxito',
    data: customer,
  });
};