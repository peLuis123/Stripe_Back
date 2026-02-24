import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const createPayment = async (req, res) => {
  const { customer_id: customerId, amount, payment_method: paymentMethod } = req.body;

  if (!customerId || !amount || !paymentMethod) {
    throw new ApiError(400, 'customer_id, amount y payment_method son requeridos');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, 
    currency: 'EUR',
    payment_method_types: ['card'],
    payment_method: paymentMethod,
    customer: customerId,
  });

  return sendResponse(res, {
    statusCode: 201,
    message: 'Intento de pago creado correctamente',
    data: paymentIntent,
  });
};

