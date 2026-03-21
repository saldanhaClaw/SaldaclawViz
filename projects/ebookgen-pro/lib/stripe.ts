import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe() {
  if (stripeInstance) return stripeInstance;
  
  const key = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_STANDARD_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not defined');
  
  stripeInstance = new Stripe(key, { apiVersion: '2023-10-16' as any });
  return stripeInstance;
}
