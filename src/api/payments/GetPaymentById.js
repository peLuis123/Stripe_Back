import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const getPaymentById = async (req, res) => {
  const { paymentIntentId } = req.params;

  if (!paymentIntentId) {
    throw new ApiError(400, 'paymentIntentId es requerido');
  }

  const payment = await stripe.paymentIntents.retrieve(paymentIntentId);

  return sendResponse(res, {
    message: 'Pago obtenido correctamente',
    data: payment,
  });
};