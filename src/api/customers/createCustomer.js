import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const createCustomer = async (req, res) => {
  const { email, name, phone } = req.body;

  if (!email || !name || !phone) {
    throw new ApiError(400, 'email, name y phone son requeridos');
  }

  const customer = await stripe.customers.create({
    email,
    name,
    phone,
  });

  return sendResponse(res, {
    statusCode: 201,
    message: 'Cliente creado correctamente',
    data: {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
    },
  });
};