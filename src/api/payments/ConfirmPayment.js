import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const confirmPayment = async (req, res) => {
  const { paymentId } = req.body;

  if (!paymentId) {
    throw new ApiError(400, 'paymentId es requerido');
  }

  const paymentIntent = await stripe.paymentIntents.confirm(paymentId);

  return sendResponse(res, {
    message: 'Pago confirmado correctamente',
    data: paymentIntent,
  });
};
