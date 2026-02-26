import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const getRefundsByPaymentIntent = async (req, res) => {
  const { paymentIntentId } = req.params;

  if (!paymentIntentId) {
    throw new ApiError(400, 'paymentIntentId es requerido');
  }

  const refunds = await stripe.refunds.list({
    payment_intent: paymentIntentId,
    limit: 100,
  });

  return sendResponse(res, {
    message: 'Reembolsos obtenidos correctamente',
    data: refunds,
  });
};