import stripe from '../../config/stripe.js';

export const stripeWebhook = (req, res) => {
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({
      status: false,
      message: 'Missing STRIPE_WEBHOOK_SECRET in environment variables',
    });
  }

  if (!signature) {
    return res.status(400).json({
      status: false,
      message: 'Missing stripe-signature header',
    });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Webhook signature verification failed: ${error.message}`,
    });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log(' Webhook: payment_intent.succeeded', event.data.object.id);
      break;
    case 'payment_intent.payment_failed':
      console.log(' Webhook: payment_intent.payment_failed', event.data.object.id);
      break;
    default:
      console.log(`Webhook event received: ${event.type}`);
  }

  return res.status(200).json({
    status: true,
    message: 'Webhook recibido correctamente',
    data: {
      received: true,
      type: event.type,
    },
  });
};