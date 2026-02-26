import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const deleteCustomer = async (req, res) => {
  const customerId = req.params.id || req.body.userId;

  if (!customerId) {
    throw new ApiError(400, 'id del usuario es requerido');
  }

  await stripe.customers.del(customerId);

  return sendResponse(res, {
    message: 'Usuario eliminado con éxito',
    data: { id: customerId },
  });
};