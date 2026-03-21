import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function check() {
  const priceId = process.env.MOUNJARO_PRICE_ID;
  if (!priceId) {
    console.error('MOUNJARO_PRICE_ID não definida');
    process.exit(1);
  }

  // Get price and product
  const price = await stripe.prices.retrieve(priceId);
  const productId = typeof price.product === 'string' ? price.product : price.product.id;

  const product = await stripe.products.retrieve(productId);

  console.log('=== Stripe Product Details ===');
  console.log('Product ID:', product.id);
  console.log('Product Name:', product.name);
  console.log('Product Images:', product.images);
  console.log('==============================');

  // If no image, force update with the known URL
  if (!product.images || product.images.length === 0) {
    console.log('⚠️ Product has no images. Updating...');
    const imageUrl = 'https://mounjaro-alert.vercel.app/assets/001-professional-female-pharmacist-doctor-he.png';
    await stripe.products.update(productId, { images: [imageUrl] });
    console.log('✅ Product image updated to:', imageUrl);

    // Verify update
    const updated = await stripe.products.retrieve(productId);
    console.log('Updated images:', updated.images);
  } else {
    console.log('✅ Product already has image:', product.images[0]);
  }
}

check().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});