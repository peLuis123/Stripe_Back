import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'id es requerido');
  }

  const customer = await stripe.customers.retrieve(id);

  return sendResponse(res, {
    message: 'Cliente obtenido correctamente',
    data: customer,
  });
};