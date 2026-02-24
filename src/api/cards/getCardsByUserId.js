import stripe from '../../config/stripe.js';
import ApiError from '../../utils/ApiError.js';
import { sendResponse } from '../../utils/sendResponse.js';

export const getCards = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'id es requerido');
    }

    const cards = await stripe.customers.listSources(id, {
        object: 'card',
        limit: 10,
    });
     
    return sendResponse(res, {
        message: 'Tarjetas listadas correctamente',
        data: cards.data,
    });
};