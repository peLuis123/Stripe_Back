import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const refundPayment = async (req, res) => {
  const {
    chargeId,
    amount,
    reason,
  } = req.body;

  if (!chargeId) {
    throw new ApiError(400, 'chargeId es requerido');
  }

  const payload = {
    charge: chargeId,
  };

  if (amount !== undefined && amount !== null) {
    const refundAmount = Number(amount);

    if (Number.isNaN(refundAmount) || refundAmount <= 0) {
      throw new ApiError(400, 'amount debe ser un número mayor a 0');
    }

    payload.amount = Math.round(refundAmount * 100);
  }

  if (reason) {
    payload.reason = reason;
  }

  const refund = await stripe.refunds.create(payload);

  return sendResponse(res, {
    statusCode: 201,
    message: 'Reembolso creado correctamente',
    data: refund,
  });
};