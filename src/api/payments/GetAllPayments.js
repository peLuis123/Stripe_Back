import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const getAllPayments = async (req, res) => {
  const userId = req.query.userId;
  const limit = req.query.limit ? Number(req.query.limit) : 20;

  if (!userId) {
    throw new ApiError(400, 'userId es requerido');
  }

  const payments = await stripe.paymentIntents.list({
    customer: userId,
    limit: Number.isNaN(limit) ? 20 : Math.min(limit, 100),
  });

  return sendResponse(res, {
    message: 'Pagos del usuario obtenidos correctamente',
    data: payments,
  });
};