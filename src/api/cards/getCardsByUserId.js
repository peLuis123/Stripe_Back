import stripe from '../../config/stripe.js';

export const getCards = async (req, res) => {
        try {
            const cards = await stripe.customers.listSources(
                req.params.id,
                {
                    object: 'card',
                    limit: 10
                }
            );
            if (cards) {
                res.status(201).send({
                    data: cards.data,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "El usuario no tiene una cuenta registrada",
                status: false,
            })
        }
}