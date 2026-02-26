import stripe from '../../config/stripe.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const getAllCustomers = async (req, res) => {
  const customer = await stripe.customers.list({
    limit: 10,
  });

  return sendResponse(res, {
    message: 'Clientes listados correctamente',
    data: customer,
  });
};