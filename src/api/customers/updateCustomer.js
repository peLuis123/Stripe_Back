import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const updateCustomer = async (req, res) => {
  const { userId, email, name, phone } = req.body;

  if (!userId) {
    throw new ApiError(400, 'userId es requerido');
  }

  const customer = await stripe.customers.update(userId, {
    email,
    name,
    phone,
  });

  return sendResponse(res, {
    message: 'Cliente actualizado correctamente',
    data: {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
    },
  });
};