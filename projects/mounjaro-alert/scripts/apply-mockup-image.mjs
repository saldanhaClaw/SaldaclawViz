import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function applyMockupImage() {
  const priceId = process.env.MOUNJARO_PRICE_ID;
  if (!priceId) throw new Error('MOUNJARO_PRICE_ID not set');

  const price = await stripe.prices.retrieve(priceId);
  const productId = typeof price.product === 'string' ? price.product : price.product.id;

  // Use the newly generated 3D mockup (square, 1024x1024) for Stripe product image
  const imageUrl = 'https://mounjaro-alert.vercel.app/assets/ebook-mockup-luxury.png';

  await stripe.products.update(productId, {
    images: [imageUrl],
  });

  console.log('✅ Product image updated to:', imageUrl);

  // Verify
  const product = await stripe.products.retrieve(productId);
  console.log('Product now has images:', product.images);
}

applyMockupImage().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});