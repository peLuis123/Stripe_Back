import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.VUE_APP_STRIPE_SECRET;

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY or VUE_APP_STRIPE_SECRET in environment variables');
}

const stripe = new Stripe(stripeSecretKey);

export default stripe;
